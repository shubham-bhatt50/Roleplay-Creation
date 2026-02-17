/**
 * Shared types for the Scenario Creation flow
 * 
 * ENTRY FLOWS:
 * 1. Builder path: User fills out ScenarioBuilder form → sets scenarioData, clears initialPrompt
 *    → ScenarioDetailScreen receives complete scenarioData, shows full content
 * 
 * 2. Prompt path: User enters prompt in PromptScreen → sets initialPrompt, clears scenarioData
 *    → ScenarioDetailScreen analyzes prompt:
 *      - If complete: generates scenarioData from extracted info
 *      - If partial/vague: shows placeholders, chat asks clarifying questions
 */

// Core scenario data from the builder
export interface ScenarioData {
  trainee: string;
  customerName: string;
  emotion: string;
  scenario: string;
  objective: string;
  criteria1: string;
  criteria2: string;
  criteria3: string;
  modality: string;
  difficulty: string;
}

// Persona for roleplay
export interface Persona {
  id: string;
  name: string;
  gender: string;
  age: number;
  location: string;
  avatar: string | null;
  emotionalStates: string[];
  behavioralTraits: string[];
  additionalRemarks: string;
}

// Persona template for saving/loading
export interface PersonaTemplate {
  id: string;
  name: string;
  description: string;
  persona: Omit<Persona, 'id'>;
}

// Evaluation parameter
export interface EvaluationParameter {
  id: string;
  title: string;
  criteria: string[];
  mappedCompetency: string;
}

// Evaluation template for saving/loading
export interface EvaluationTemplate {
  id: string;
  name: string;
  description: string;
  parameters: Omit<EvaluationParameter, 'id'>[];
}

// Exit condition
export interface ExitCondition {
  id: string;
  trigger: string;
  action: string;
  icon: "resolution" | "time" | "escalate" | "end";
}

// Tab types
export type TabType = "scenario" | "persona" | "evaluation" | "exit" | "settings";

// Available competencies for evaluation mapping
export const AVAILABLE_COMPETENCIES = [
  "Empathy",
  "Active Listening",
  "Problem-Solving",
  "Resolution",
  "Communication",
  "Knowledge",
  "Patience",
  "Professionalism",
  "Conflict Resolution",
  "Time Management",
  "Documentation",
  "Product Knowledge",
  "Customer Service",
  "De-escalation",
  "Policy Adherence",
] as const;

// Emotional state options for personas
export const EMOTIONAL_STATE_OPTIONS = [
  "Frustrated",
  "Angry",
  "Confused",
  "Anxious",
  "Disappointed",
  "Sad",
  "Happy",
  "Excited",
  "Neutral",
  "Calm",
  "Impatient",
  "Worried",
] as const;

// Behavioral trait options for personas
export const BEHAVIORAL_TRAIT_OPTIONS = [
  "Short-tempered",
  "Impatient",
  "Patient",
  "Polite",
  "Aggressive",
  "Enthusiastic",
  "Eager",
  "Uncertain",
  "Needs reassurance",
  "Loyal",
  "Expects better",
  "Demanding",
  "Cooperative",
  "Reserved",
] as const;
