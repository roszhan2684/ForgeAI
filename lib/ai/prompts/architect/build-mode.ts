import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildBuildModePrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the Build Mode implementation plan for this product.

Return strictly valid JSON with this exact structure:
{
  "screens": [
    { "name": "Screen Name", "purpose": "implementation purpose" }
  ],
  "components": [
    { "name": "ComponentName", "usedIn": ["Screen1", "Screen2"], "states": ["default", "loading", "empty"] }
  ],
  "tickets": [
    {
      "id": "T-001",
      "title": "ticket title",
      "description": "what needs to be built",
      "acceptanceCriteria": ["criteria 1", "criteria 2"],
      "dependencies": [],
      "complexity": "Low | Medium | High"
    }
  ],
  "apiPlan": [
    {
      "name": "Endpoint Name",
      "method": "GET | POST | PATCH | PUT | DELETE",
      "path": "/api/path",
      "purpose": "what this endpoint does",
      "requestShape": {},
      "responseShape": {}
    }
  ],
  "dataModel": [
    {
      "name": "EntityName",
      "fields": ["field1", "field2"],
      "relationships": ["belongs to X", "has many Y"]
    }
  ],
  "roadmap": [
    { "week": 1, "focus": "what to build this week" }
  ],
  "claudePrompt": "a complete, specific Claude Code build prompt for this product"
}

Requirements:
- Generate 5–8 tickets covering the full MVP implementation
- Ticket IDs should be sequential: T-001, T-002, etc.
- Components should use PascalCase names (React convention)
- API paths should follow REST conventions
- Data model should cover all core entities
- Roadmap should span 6–8 weeks realistically
- Claude prompt should be specific enough to actually scaffold the MVP — include stack, screens, core flows, and design direction
- Request and response shapes should use realistic field names and types`;
}
