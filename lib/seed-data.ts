import {
  Project,
  ProjectSection,
  OverviewContent,
  PersonasContent,
  ScopeContent,
  FlowsContent,
  WireframesContent,
  StackContent,
  LaunchContent,
  LandingCopyContent,
  BuildModeContent,
} from "@/types/project";

export const DEMO_PROJECT: Project = {
  id: "demo-focusforge",
  title: "FocusForge",
  rawIdea:
    "I want to build an app for students to find accountability partners, schedule focused work sessions, and stay motivated through streaks and rewards.",
  targetUser: "college students",
  preferredPlatform: "web",
  goal: "startup",
  skillLevel: "intermediate",
  preferredStack: "Next.js",
  brandTone: "minimal premium",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T12:00:00Z",
};

export const DEMO_SECTIONS: ProjectSection[] = [
  {
    id: "sec-overview",
    projectId: "demo-focusforge",
    sectionType: "overview",
    title: "Overview",
    summary: "High-level product definition and strategic framing.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:05:00Z",
    updatedAt: "2024-01-15T10:05:00Z",
    lastGeneratedAt: "2024-01-15T10:05:00Z",
    content: {
      productNameSuggestions: ["FocusForge", "StudySync", "AccountMate", "SessionLock"],
      oneLineSummary:
        "A student accountability app for finding focused study partners and scheduling structured work sessions.",
      problemStatement:
        "Students struggle to maintain consistency and build sustainable study habits when working alone — the absence of structure and social accountability leads to procrastination and low output.",
      targetAudience:
        "College and university students who want more structure, peer accountability, and better academic habits.",
      valueProposition:
        "FocusForge helps students stay motivated through intelligent partner matching, session scheduling, streak-based accountability, and behavioral reinforcement loops.",
      uniqueAngle:
        "Combines accountability partner matching with time-blocking and habit streak mechanics — making consistency a social, rewarding experience rather than a solo burden.",
      whyNow:
        "Post-pandemic students increasingly study independently, remote learning has isolated many, and short-form media has fractured attention — the need for structured, social accountability has never been higher.",
      successMetrics: [
        "Weekly active users",
        "Sessions booked per user per week",
        "7-day retention rate",
        "Repeat partner booking rate",
        "Streak completion rate",
        "Session completion rate",
      ],
    } as OverviewContent,
  },
  {
    id: "sec-personas",
    projectId: "demo-focusforge",
    sectionType: "personas",
    title: "User Personas",
    summary: "Representative users and their core needs.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:06:00Z",
    updatedAt: "2024-01-15T10:06:00Z",
    lastGeneratedAt: "2024-01-15T10:06:00Z",
    content: {
      personas: [
        {
          name: "Ananya",
          role: "First-year Computer Science student",
          ageRange: "18–20",
          goals: [
            "Stay consistent with coursework",
            "Find dependable study partners",
            "Build a structured routine",
          ],
          frustrations: [
            "Studying alone feels unmotivating",
            "Hard to find serious study partners",
            "Distractions at home derail focus",
          ],
          behaviors: [
            "Uses campus productivity apps",
            "Responds well to reminders and social cues",
            "Checks Discord and group chats regularly",
          ],
          primaryUseCase: "Find a reliable partner to co-study before exams and assignments.",
          techComfort: "High",
          motivations: ["Better grades", "Building a study routine", "Social connection"],
          quote: "I do better when someone expects me to show up.",
        },
        {
          name: "Marcus",
          role: "Graduate student, part-time worker",
          ageRange: "24–28",
          goals: [
            "Maximize limited study time",
            "Stay accountable across a busy schedule",
            "Complete thesis milestones consistently",
          ],
          frustrations: [
            "Time is fragmented across work and school",
            "Existing apps don't fit academic workflow",
            "Motivation spikes and crashes inconsistently",
          ],
          behaviors: [
            "Uses calendar blocking and time management systems",
            "Prefers async communication",
            "Highly goal-oriented",
          ],
          primaryUseCase: "Schedule structured 90-minute deep work sessions with a partner aligned on similar goals.",
          techComfort: "High",
          motivations: ["Efficiency", "Progress visibility", "Finishing what he starts"],
          quote: "If I can see my streak, I won't break it.",
        },
      ],
    } as PersonasContent,
  },
  {
    id: "sec-scope",
    projectId: "demo-focusforge",
    sectionType: "scope",
    title: "Feature Scope",
    summary: "Prioritized product scope from core MVP to future roadmap.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:07:00Z",
    updatedAt: "2024-01-15T10:07:00Z",
    lastGeneratedAt: "2024-01-15T10:07:00Z",
    content: {
      mvpFeatures: [
        {
          name: "User profiles",
          description: "Students create profiles with study preferences, goals, and availability windows.",
          reason: "Required to power matching and personalized session recommendations.",
          priority: "P0",
        },
        {
          name: "Partner matching",
          description: "Algorithm-light matching based on subject area, schedule, and stated goals.",
          reason: "Core differentiator — without matching, there is no accountability layer.",
          priority: "P0",
        },
        {
          name: "Session scheduling",
          description: "Users can propose, accept, and schedule focused study sessions.",
          reason: "The primary action of the product — everything else serves this moment.",
          priority: "P0",
        },
        {
          name: "Streak tracking",
          description: "Visual streak counter for session consistency per user and per partnership.",
          reason: "Behavioral reinforcement that drives retention and repeat usage.",
          priority: "P1",
        },
        {
          name: "Session check-in",
          description: "Simple in-session confirmation to log active study time.",
          reason: "Data point for streaks and accountability — low friction to implement.",
          priority: "P1",
        },
      ],
      niceToHaveFeatures: [
        {
          name: "In-app Pomodoro timer",
          description: "Simple shared timer during sessions.",
          reason: "Enhances the in-session experience but not required for core loop.",
          priority: "P2",
        },
        {
          name: "Session notes",
          description: "Brief post-session notes and reflection prompts.",
          reason: "Adds depth to the experience but increases scope meaningfully.",
          priority: "P2",
        },
      ],
      futureFeatures: [
        {
          name: "Group study rooms",
          description: "Expand from pairs to small group accountability pods.",
          reason: "Natural evolution after single-partner loop is proven.",
          priority: "Future",
        },
        {
          name: "Reward system",
          description: "Points, badges, and milestone rewards for consistency.",
          reason: "Strong engagement mechanic but risks scope creep in MVP.",
          priority: "Future",
        },
      ],
      outOfScope: [
        "AI tutoring or content generation",
        "Campus-wide social feed",
        "Video calling (integrate third-party instead)",
        "LMS integration for MVP",
      ],
      risks: [
        "Overbuilding matching complexity before validating core demand",
        "Low initial user density making partner discovery frustrating",
        "Session completion tracking adds friction — must stay low-effort",
      ],
    } as ScopeContent,
  },
  {
    id: "sec-flows",
    projectId: "demo-focusforge",
    sectionType: "flows",
    title: "User Flows",
    summary: "Key paths through the product experience.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:08:00Z",
    updatedAt: "2024-01-15T10:08:00Z",
    lastGeneratedAt: "2024-01-15T10:08:00Z",
    content: {
      primaryFlow: [
        { step: 1, actor: "User", action: "Lands on marketing page", result: "Understands value prop" },
        { step: 2, actor: "User", action: "Signs up with email", result: "Account created" },
        { step: 3, actor: "User", action: "Completes onboarding profile", result: "Preferences and availability saved" },
        { step: 4, actor: "System", action: "Suggests compatible partners", result: "Match list displayed" },
        { step: 5, actor: "User", action: "Selects a partner and proposes session", result: "Session request sent" },
        { step: 6, actor: "Partner", action: "Accepts session request", result: "Session confirmed" },
        { step: 7, actor: "User", action: "Joins session at scheduled time", result: "Study session begins" },
        { step: 8, actor: "User", action: "Checks in during session", result: "Streak updated, session logged" },
      ],
      onboardingFlow: [
        { step: 1, actor: "User", action: "Enters name and email", result: "Account created" },
        { step: 2, actor: "User", action: "Selects study subjects", result: "Subjects saved to profile" },
        { step: 3, actor: "User", action: "Sets weekly availability", result: "Calendar availability stored" },
        { step: 4, actor: "User", action: "States primary study goal", result: "Goal saved for matching" },
        { step: 5, actor: "System", action: "Shows first match suggestions", result: "User is ready to find a partner" },
      ],
      coreActionFlow: [
        { step: 1, actor: "User", action: "Opens dashboard", result: "Sees upcoming sessions and partner suggestions" },
        { step: 2, actor: "User", action: "Browses or searches partners", result: "Filtered partner list displayed" },
        { step: 3, actor: "User", action: "Views partner profile", result: "Compatibility details shown" },
        { step: 4, actor: "User", action: "Sends session request with time proposal", result: "Request queued" },
        { step: 5, actor: "Partner", action: "Receives notification and accepts", result: "Session confirmed and calendared" },
      ],
      edgeCases: [
        "No partners found matching preferences — suggest widening filters",
        "Partner cancels at short notice — suggest alternative from recent list",
        "User misses session — streak broken, gentle recovery prompt shown",
        "Session runs over time — auto log extended duration",
      ],
      emptyStates: [
        "No partners found: encourage broadening subject filters or inviting a friend",
        "No upcoming sessions: prominent CTA to find a partner or re-engage recent one",
        "First login: guided onboarding with warm welcome message",
      ],
    } as FlowsContent,
  },
  {
    id: "sec-wireframes",
    projectId: "demo-focusforge",
    sectionType: "wireframes",
    title: "Screen Wireframes",
    summary: "Screen-by-screen UI and UX guidance for the MVP.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:09:00Z",
    updatedAt: "2024-01-15T10:09:00Z",
    lastGeneratedAt: "2024-01-15T10:09:00Z",
    content: {
      screens: [
        {
          name: "Home Dashboard",
          purpose: "Surface upcoming sessions, active streak, and partner suggestions in one glance.",
          keyComponents: ["Top nav with user avatar", "Streak counter hero card", "Upcoming sessions list", "Partner suggestion carousel", "Quick-start session CTA"],
          primaryCTA: "Find Study Partner",
          secondaryCTAs: ["View Session", "Edit Availability"],
          layoutNotes: ["Keep top summary section compact", "Use card-based modules for each content area", "Sticky top nav with session count badge"],
          uxNotes: ["Show streak prominently to reinforce habit loop", "Upcoming session card should be the first thing visible"],
        },
        {
          name: "Partner Discovery",
          purpose: "Browse and filter compatible study partners by subject, availability, and goals.",
          keyComponents: ["Search and filter bar", "Partner cards grid", "Compatibility score chip", "Quick-request button per card"],
          primaryCTA: "Send Session Request",
          secondaryCTAs: ["View Profile", "Save for Later"],
          layoutNotes: ["Card grid layout, 2-column on desktop", "Sticky filter panel on left side"],
          uxNotes: ["Compatibility score builds immediate trust", "Avoid showing too much information per card — keep it scannable"],
        },
        {
          name: "Partner Profile",
          purpose: "Show full profile details and enable session booking from a single page.",
          keyComponents: ["Avatar and name header", "Goals and subjects list", "Availability calendar view", "Session history summary", "Request session form"],
          primaryCTA: "Propose a Session",
          secondaryCTAs: ["Message Partner", "Save Profile"],
          layoutNotes: ["Two-column layout: profile on left, booking on right", "Clean card-based structure"],
          uxNotes: ["Show shared subjects highlighted to build confidence", "Keep booking form simple: date, time, duration, goal"],
        },
        {
          name: "Session View",
          purpose: "Active session screen with check-in, timer, and shared goal display.",
          keyComponents: ["Session countdown timer", "Shared goal display", "Check-in button", "Partner presence indicator", "Session notes textarea"],
          primaryCTA: "Check In",
          secondaryCTAs: ["End Session", "Add Note"],
          layoutNotes: ["Centered, focused layout — remove distractions", "Minimal chrome — only what matters for the session"],
          uxNotes: ["Make check-in feel meaningful and rewarding", "Timer should be calming not stressful"],
        },
        {
          name: "Onboarding",
          purpose: "Collect user profile and preferences through a guided multi-step form.",
          keyComponents: ["Progress steps indicator", "Name and email fields", "Subject selector chips", "Availability weekly grid", "Goal statement input"],
          primaryCTA: "Continue",
          secondaryCTAs: ["Skip for now"],
          layoutNotes: ["Single-column centered layout", "One major step per screen to reduce overwhelm"],
          uxNotes: ["Keep steps short — max 5 steps", "Show progress clearly throughout"],
        },
      ],
    } as WireframesContent,
  },
  {
    id: "sec-stack",
    projectId: "demo-focusforge",
    sectionType: "stack",
    title: "Tech Stack",
    summary: "Recommended implementation stack and architecture tradeoffs.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:10:00Z",
    updatedAt: "2024-01-15T10:10:00Z",
    lastGeneratedAt: "2024-01-15T10:10:00Z",
    content: {
      frontend: "Next.js 15 with App Router, TypeScript, Tailwind CSS, shadcn/ui",
      backend: "Next.js route handlers and server actions for MVP",
      database: "PostgreSQL via Neon, ORM via Prisma",
      auth: "Clerk for managed auth and user sessions",
      infra: "Vercel for app deployment, Neon for serverless Postgres",
      analytics: "PostHog for product analytics and event tracking",
      tradeoffs: [
        "Full-stack Next.js is fastest to ship but limits backend flexibility at scale",
        "Clerk adds cost but removes auth complexity entirely",
        "Neon serverless Postgres has cold starts — acceptable for MVP",
      ],
      beginnerVersion: "Supabase full-stack with built-in auth and database",
      scalableVersion: "Next.js frontend + dedicated Node/Express backend + managed Postgres",
    } as StackContent,
  },
  {
    id: "sec-launch",
    projectId: "demo-focusforge",
    sectionType: "launch",
    title: "Launch Plan",
    summary: "Validation, beta acquisition, and go-to-market strategy.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:11:00Z",
    updatedAt: "2024-01-15T10:11:00Z",
    lastGeneratedAt: "2024-01-15T10:11:00Z",
    content: {
      validationPlan: [
        "Interview 10–15 students about current accountability habits and pain points",
        "Test landing page messaging with 50+ signups before building full product",
        "Run a 2-week manual accountability matching experiment via Discord or WhatsApp",
      ],
      betaUserProfile:
        "Students active in study groups, competitive programs, or campus communities who already care about academic performance.",
      preLaunchChecklist: [
        "Build and publish landing page with waitlist",
        "Set up email capture and onboarding flow",
        "Recruit first 20–30 beta users from target campus communities",
        "Define and instrument core activation events in PostHog",
        "Create basic onboarding email sequence",
      ],
      launchChannels: [
        "Reddit communities (r/college, r/productivity, r/studymotivation)",
        "Discord study servers",
        "University Facebook groups and campus Slack channels",
        "ProductHunt (post-beta, for broader visibility)",
        "Twitter/X threads targeting productivity and student audiences",
      ],
      first30Days: [
        "Measure activation rate — % of signups who complete onboarding and book a session",
        "Collect qualitative feedback through in-app prompts and 1:1 calls",
        "Identify top matching and scheduling friction points",
        "Iterate on partner suggestion quality based on early partner feedback",
      ],
      feedbackLoop: [
        "In-app NPS prompt after first completed session",
        "Post-session reflection prompt with 1-question feedback",
        "Weekly check-in email for first 30 days post-signup",
      ],
      analyticsGoals: [
        "Activation rate (signup → first session booked)",
        "DAU/WAU ratio",
        "Session completion rate",
        "Streak length distribution",
        "Partner repeat booking rate",
      ],
    } as LaunchContent,
  },
  {
    id: "sec-landing-copy",
    projectId: "demo-focusforge",
    sectionType: "landingCopy",
    title: "Landing Page Copy",
    summary: "Market-ready copy for the FocusForge product website.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:12:00Z",
    updatedAt: "2024-01-15T10:12:00Z",
    lastGeneratedAt: "2024-01-15T10:12:00Z",
    content: {
      headline: "Find your study rhythm with the right accountability partner.",
      subheadline:
        "Match with focused students, schedule structured sessions, and build consistency that actually lasts.",
      primaryCTA: "Join the Waitlist",
      secondaryCTA: "See How It Works",
      features: [
        {
          title: "Smart partner matching",
          description:
            "Get paired with students who share your subjects, schedule, and study goals — not just anyone available.",
        },
        {
          title: "Session scheduling",
          description:
            "Propose and confirm focused work sessions that fit your calendar. No back-and-forth friction.",
        },
        {
          title: "Streak accountability",
          description:
            "Track your consistency with visual streaks. See your momentum grow — and protect it.",
        },
        {
          title: "Session check-ins",
          description:
            "Simple in-session presence confirmation. Both of you show up, both of you grow.",
        },
      ],
      problemSection:
        "Studying alone works — until it doesn't. Without structure and accountability, even motivated students drift into procrastination and inconsistency.",
      solutionSection:
        "FocusForge pairs you with a compatible study partner, helps you schedule recurring sessions, and reinforces the habit loop through streaks and shared progress.",
      faq: [
        {
          question: "Is this only for college students?",
          answer:
            "The first version is designed specifically for college and university students. We plan to expand to other learner types in future releases.",
        },
        {
          question: "Do I need to be on a video call during sessions?",
          answer:
            "No. Sessions work with or without video. The core experience is about mutual accountability and check-ins, not constant communication.",
        },
        {
          question: "What if I can't find a compatible partner?",
          answer:
            "FocusForge shows you suggestions based on your profile. If there are no strong matches, we'll help you invite a friend or widen your preferences.",
        },
      ],
      finalCTA: "Start building better study habits — join the waitlist for free.",
    } as LandingCopyContent,
  },
  {
    id: "sec-build-mode",
    projectId: "demo-focusforge",
    sectionType: "buildMode",
    title: "Build Mode",
    summary: "Implementation-ready assets for engineering execution.",
    status: "generated",
    version: 1,
    edited: false,
    createdAt: "2024-01-15T10:13:00Z",
    updatedAt: "2024-01-15T10:13:00Z",
    lastGeneratedAt: "2024-01-15T10:13:00Z",
    content: {
      screens: [
        { name: "Landing Page", purpose: "Market the product and capture waitlist signups" },
        { name: "Sign Up / Sign In", purpose: "Authentication screen with email and OAuth options" },
        { name: "Onboarding (Step 1–5)", purpose: "Multi-step profile and preference setup" },
        { name: "Home Dashboard", purpose: "Central hub for streak, sessions, and partner suggestions" },
        { name: "Partner Discovery", purpose: "Browse and filter potential accountability partners" },
        { name: "Partner Profile", purpose: "View full profile and book a session" },
        { name: "Session Scheduling", purpose: "Confirm session time, goal, and duration" },
        { name: "Active Session", purpose: "In-session screen with check-in and timer" },
        { name: "Session History", purpose: "Past sessions log with streak visualization" },
        { name: "User Settings", purpose: "Update profile, availability, and notification preferences" },
      ],
      components: [
        { name: "PartnerCard", usedIn: ["Discovery", "Dashboard"], states: ["default", "selected", "loading"] },
        { name: "SessionCard", usedIn: ["Dashboard", "History"], states: ["upcoming", "active", "completed", "missed"] },
        { name: "StreakBadge", usedIn: ["Dashboard", "Profile"], states: ["active", "broken", "milestone"] },
        { name: "AvailabilityGrid", usedIn: ["Onboarding", "Settings"], states: ["empty", "filled", "conflict"] },
        { name: "SubjectChip", usedIn: ["Profile", "Discovery", "Onboarding"], states: ["default", "selected"] },
        { name: "SessionTimer", usedIn: ["ActiveSession"], states: ["running", "paused", "complete"] },
        { name: "OnboardingStep", usedIn: ["Onboarding"], states: ["active", "complete", "upcoming"] },
      ],
      tickets: [
        {
          id: "T-001",
          title: "Implement user authentication with Clerk",
          description: "Set up Clerk authentication with email and Google OAuth. Add protected routes and session middleware.",
          acceptanceCriteria: [
            "User can sign up and sign in with email/password",
            "Google OAuth sign-in works",
            "Protected routes redirect unauthenticated users",
            "User session persists across page refreshes",
          ],
          dependencies: [],
          complexity: "Low",
        },
        {
          id: "T-002",
          title: "Build multi-step onboarding flow",
          description: "Implement 5-step onboarding: name/email confirmation, subject selection, availability grid, study goal, and completion.",
          acceptanceCriteria: [
            "User can navigate forward and backward through steps",
            "Progress indicator shows current step",
            "Data is saved per step (no data loss on back)",
            "Completion redirects to dashboard",
          ],
          dependencies: ["T-001"],
          complexity: "Medium",
        },
        {
          id: "T-003",
          title: "Implement partner matching algorithm",
          description: "Build a simple matching function based on shared subjects, overlapping availability, and compatible goals.",
          acceptanceCriteria: [
            "Returns a ranked list of partners sorted by compatibility score",
            "Filters exclude already-connected partners",
            "Score is deterministic given the same inputs",
            "API endpoint returns paginated list",
          ],
          dependencies: ["T-002"],
          complexity: "High",
        },
        {
          id: "T-004",
          title: "Session scheduling and confirmation",
          description: "Allow users to propose session times, have partners accept/decline, and confirm bookings to both user calendars.",
          acceptanceCriteria: [
            "User can propose a session with date, time, and duration",
            "Partner receives notification and can accept or decline",
            "Confirmed sessions appear on both dashboards",
            "Session reminder notification sent 30 minutes before",
          ],
          dependencies: ["T-003"],
          complexity: "Medium",
        },
        {
          id: "T-005",
          title: "Streak tracking system",
          description: "Track per-user and per-partnership session completion streaks. Update streak on check-in, reset on missed session.",
          acceptanceCriteria: [
            "Streak increments on session completion",
            "Streak resets if a confirmed session is missed",
            "Current streak visible on dashboard",
            "Streak milestone events trigger in-app notifications",
          ],
          dependencies: ["T-004"],
          complexity: "Medium",
        },
      ],
      apiPlan: [
        {
          name: "Create User Profile",
          method: "POST",
          path: "/api/profiles",
          purpose: "Save user onboarding data and preferences",
          requestShape: { name: "string", subjects: ["string"], availability: "object", goal: "string" },
          responseShape: { id: "string", userId: "string", status: "success" },
        },
        {
          name: "Get Partner Suggestions",
          method: "GET",
          path: "/api/partners/suggestions",
          purpose: "Return ranked list of compatible study partners",
          requestShape: { page: "number", limit: "number" },
          responseShape: { partners: "Partner[]", total: "number", page: "number" },
        },
        {
          name: "Create Session Request",
          method: "POST",
          path: "/api/sessions",
          purpose: "Send a session proposal to a partner",
          requestShape: { partnerId: "string", proposedTime: "datetime", duration: "number", goal: "string" },
          responseShape: { sessionId: "string", status: "pending" },
        },
        {
          name: "Confirm Session",
          method: "PATCH",
          path: "/api/sessions/:id/confirm",
          purpose: "Accept a session request and confirm it",
          requestShape: { action: "accept | decline" },
          responseShape: { sessionId: "string", status: "confirmed | declined" },
        },
        {
          name: "Session Check-In",
          method: "POST",
          path: "/api/sessions/:id/checkin",
          purpose: "Log user presence during an active session",
          requestShape: { userId: "string", timestamp: "datetime" },
          responseShape: { checkedIn: "boolean", streakUpdated: "boolean", currentStreak: "number" },
        },
      ],
      dataModel: [
        {
          name: "User",
          fields: ["id", "clerkId", "email", "name", "createdAt"],
          relationships: ["has one Profile", "has many Sessions", "has many Partnerships"],
        },
        {
          name: "Profile",
          fields: ["id", "userId", "subjects", "availability", "goal", "bio", "techComfort"],
          relationships: ["belongs to User"],
        },
        {
          name: "Partnership",
          fields: ["id", "userId1", "userId2", "createdAt", "streakCount", "lastSessionAt"],
          relationships: ["belongs to User (x2)", "has many Sessions"],
        },
        {
          name: "Session",
          fields: ["id", "partnershipId", "proposedBy", "scheduledAt", "duration", "goal", "status", "completedAt"],
          relationships: ["belongs to Partnership"],
        },
        {
          name: "CheckIn",
          fields: ["id", "sessionId", "userId", "timestamp"],
          relationships: ["belongs to Session", "belongs to User"],
        },
      ],
      roadmap: [
        { week: 1, focus: "Project scaffold, auth setup, database schema, and basic routing" },
        { week: 2, focus: "Onboarding flow — profile creation, subject selection, availability grid" },
        { week: 3, focus: "Partner discovery — matching API and discovery UI" },
        { week: 4, focus: "Session scheduling — proposal, confirmation, and dashboard calendar" },
        { week: 5, focus: "Active session screen, check-in system, and streak tracking" },
        { week: 6, focus: "Notifications, polish, empty states, and bug fixes" },
        { week: 7, focus: "Beta launch prep — analytics, error handling, and onboarding copy" },
        { week: 8, focus: "Beta launch to first 30 users, feedback collection and iteration" },
      ],
      claudePrompt: `You are building FocusForge — a web app for students to find accountability partners, schedule structured study sessions, and build consistency through streaks.

Build the MVP using Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma, and PostgreSQL (Neon). Use Clerk for auth.

Core flows to implement:
1. Multi-step onboarding (name, subjects, availability, goal)
2. Partner discovery with compatibility scoring
3. Session proposal and confirmation between two users
4. Active session screen with check-in button
5. Streak tracking per user and per partnership

Key screens: Landing, Sign Up, Onboarding (5 steps), Dashboard, Partner Discovery, Partner Profile, Session View, Settings.

Design style: clean, minimal, premium. Mobile-responsive. Color: cobalt blue accent on neutral base.

Start with: project setup → auth → DB schema → onboarding → dashboard → discovery → sessions.`,
    } as BuildModeContent,
  },
];
