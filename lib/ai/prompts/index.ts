import { AITaskType, ProjectContext } from "../types";
import { FORGE_SYSTEM_PROMPT } from "./system";
import { buildOverviewPrompt } from "./strategist/overview";
import { buildPersonasPrompt } from "./strategist/personas";
import { buildScopePrompt } from "./strategist/scope";
import { buildFlowsPrompt } from "./strategist/flows";
import { buildLaunchPrompt } from "./strategist/launch";
import { buildWireframesPrompt } from "./ux/wireframes";
import { buildStackPrompt } from "./architect/stack";
import { buildBuildModePrompt } from "./architect/build-mode";
import { buildLandingCopyPrompt } from "./copywriter/landing-copy";

export interface PromptPair {
  systemPrompt: string;
  userPrompt: string;
}

export function buildPrompt(task: AITaskType, ctx: ProjectContext): PromptPair {
  let userPrompt: string;

  switch (task) {
    case "generate_overview":
      userPrompt = buildOverviewPrompt(ctx);
      break;
    case "generate_personas":
      userPrompt = buildPersonasPrompt(ctx);
      break;
    case "generate_scope":
      userPrompt = buildScopePrompt(ctx);
      break;
    case "generate_flows":
      userPrompt = buildFlowsPrompt(ctx);
      break;
    case "generate_wireframes":
      userPrompt = buildWireframesPrompt(ctx);
      break;
    case "generate_stack":
      userPrompt = buildStackPrompt(ctx);
      break;
    case "generate_launch":
      userPrompt = buildLaunchPrompt(ctx);
      break;
    case "generate_landing_copy":
      userPrompt = buildLandingCopyPrompt(ctx);
      break;
    case "generate_build_mode":
      userPrompt = buildBuildModePrompt(ctx);
      break;
    default:
      userPrompt = `Generate content for task: ${task}\n\nProject: ${ctx.rawIdea}`;
  }

  return { systemPrompt: FORGE_SYSTEM_PROMPT, userPrompt };
}
