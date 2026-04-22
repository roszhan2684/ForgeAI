/**
 * Live API test — verifies Gemini is generating real content, not mock data.
 * Run: node scripts/test-ai.mjs
 */

const BASE_URL = "https://forge-ai-nine-zeta.vercel.app";
const MOCK_FINGERPRINTS = ["FocusForge", "StudySync", "AccountMate", "SessionLock", "student accountability"];

const IDEA = "A SaaS tool for freelance developers to auto-generate invoices from GitHub commits";

let projectId = null;

function pass(msg) { console.log(`  ✅ ${msg}`); }
function fail(msg) { console.log(`  ❌ ${msg}`); process.exitCode = 1; }
function info(msg) { console.log(`  ℹ  ${msg}`); }

function isMockData(obj) {
  const str = JSON.stringify(obj);
  return MOCK_FINGERPRINTS.some((fp) => str.includes(fp));
}

async function step(label, fn) {
  console.log(`\n▶ ${label}`);
  try {
    return await fn();
  } catch (err) {
    fail(`Threw: ${err.message}`);
    return null;
  }
}

// ── 1. Create project ─────────────────────────────────────────────────────────
const project = await step("Create test project via POST /api/projects", async () => {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "AutoInvoice [AI TEST]",
      rawIdea: IDEA,
      targetUser: "freelance developers",
      skillLevel: "intermediate",
    }),
  });

  if (!res.ok) {
    fail(`HTTP ${res.status}: ${await res.text()}`);
    return null;
  }

  const { project } = await res.json();
  projectId = project.id;
  pass(`Project created — id: ${project.id}`);
  pass(`Title: "${project.title}"`);
  return project;
});

if (!project) process.exit(1);

// ── 2. Generate overview ──────────────────────────────────────────────────────
const overviewResult = await step("Generate 'overview' section via POST /api/ai/generate", async () => {
  console.log("  (calling Gemini 2.0 Flash — may take ~10s…)");
  const start = Date.now();

  const res = await fetch(`${BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, sectionType: "overview" }),
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  if (!res.ok) {
    const body = await res.text();
    fail(`HTTP ${res.status} after ${elapsed}s: ${body.slice(0, 200)}`);
    return null;
  }

  const data = await res.json();
  info(`Completed in ${elapsed}s`);
  info(`Provider: ${data.metadata?.provider ?? "unknown"}`);
  info(`Model: ${data.metadata?.model ?? "unknown"}`);
  return data;
});

if (!overviewResult) process.exit(1);

// ── 3. Validate provider ──────────────────────────────────────────────────────
await step("Check provider is Gemini (not mock)", async () => {
  const provider = overviewResult.metadata?.provider;
  if (provider === "gemini") {
    pass(`Provider = gemini ✓`);
  } else if (provider === "mock") {
    fail(`Provider = mock — Gemini failed, fell back to demo data`);
  } else {
    fail(`Provider = "${provider}" — unexpected`);
  }
});

// ── 4. Check content is not mock data ─────────────────────────────────────────
await step("Check content is AI-generated (not demo seed data)", async () => {
  const content = overviewResult.section?.content;
  if (!content) { fail("No content in response"); return; }

  if (isMockData(content)) {
    fail("Content matches mock seed data fingerprints — Gemini did NOT generate this");
    return;
  }
  pass("Content does not match any mock fingerprints");

  // Check it's actually about our idea
  const str = JSON.stringify(content).toLowerCase();
  const keywords = ["invoice", "freelance", "github", "developer", "commit"];
  const found = keywords.filter((k) => str.includes(k));
  if (found.length >= 2) {
    pass(`Content references idea keywords: [${found.join(", ")}]`);
  } else {
    fail(`Content doesn't reference the idea — may be wrong content (found: [${found.join(", ")}])`);
  }
});

// ── 5. Check content structure ────────────────────────────────────────────────
await step("Validate overview content structure", async () => {
  const c = overviewResult.section?.content;
  const required = ["oneLineSummary", "problemStatement", "valueProposition", "successMetrics"];
  const missing = required.filter((k) => !c?.[k]);
  if (missing.length === 0) {
    pass(`All required fields present: ${required.join(", ")}`);
  } else {
    fail(`Missing fields: ${missing.join(", ")}`);
  }

  if (Array.isArray(c?.productNameSuggestions) && c.productNameSuggestions.length > 0) {
    pass(`Product name suggestions: ${c.productNameSuggestions.slice(0, 3).join(", ")}`);
  }

  if (c?.oneLineSummary) {
    info(`One-liner: "${c.oneLineSummary}"`);
  }
});

// ── 6. Generate personas (second section — tests sequential context) ──────────
const personasResult = await step("Generate 'personas' section (tests context chain)", async () => {
  console.log("  (calling Gemini again…)");
  const start = Date.now();

  const res = await fetch(`${BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, sectionType: "personas" }),
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  if (!res.ok) { fail(`HTTP ${res.status} after ${elapsed}s`); return null; }

  const data = await res.json();
  info(`Completed in ${elapsed}s — provider: ${data.metadata?.provider}`);
  return data;
});

if (personasResult) {
  await step("Validate personas content", async () => {
    const personas = personasResult.section?.content?.personas;
    if (!Array.isArray(personas) || personas.length === 0) {
      fail("No personas array in response");
      return;
    }
    pass(`${personas.length} persona(s) generated`);

    const p = personas[0];
    const fields = ["name", "role", "goals", "frustrations", "quote"];
    const ok = fields.filter((f) => p?.[f]);
    pass(`Persona fields present: ${ok.join(", ")}`);
    info(`First persona: ${p?.name} — ${p?.role}`);
    info(`Quote: "${p?.quote?.slice(0, 80)}…"`);

    if (isMockData(personasResult.section.content)) {
      fail("Personas match mock seed data");
    } else {
      pass("Personas are AI-generated (not mock)");
    }
  });
}

// ── 7. Cleanup ────────────────────────────────────────────────────────────────
await step("Cleanup — delete test project from DB", async () => {
  const res = await fetch(`${BASE_URL}/api/projects/${projectId}`, { method: "DELETE" });
  if (res.ok || res.status === 404) {
    pass("Test project removed");
  } else {
    info(`DELETE returned ${res.status} — manual cleanup may be needed for id: ${projectId}`);
  }
});

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(50));
if (process.exitCode === 1) {
  console.log("❌  TESTS FAILED — check output above");
} else {
  console.log("✅  ALL TESTS PASSED — Gemini is generating real content");
}
