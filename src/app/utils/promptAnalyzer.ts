/**
 * Analyzes user prompts to determine completeness and extract scenario information
 */

export type PromptQuality = "complete" | "partial" | "vague" | "empty";

export interface ExtractedScenarioInfo {
  customerName?: string;
  emotion?: string;
  trainee?: string;
  scenario?: string;
  modality?: string;
  difficulty?: string;
}

export interface PromptAnalysisResult {
  quality: PromptQuality;
  extracted: ExtractedScenarioInfo;
  missingFields: string[];
  suggestions: string[];
  aiGreeting: string;
}

// Common emotions to detect
const EMOTIONS = [
  "angry", "frustrated", "upset", "furious", "irate",
  "confused", "puzzled", "uncertain",
  "anxious", "worried", "nervous", "stressed",
  "disappointed", "sad", "unhappy",
  "happy", "satisfied", "pleased",
  "neutral", "calm"
];

// Common trainee roles
const TRAINEE_ROLES = [
  "customer support", "support executive", "support agent", "agent",
  "sales rep", "sales representative", "salesperson",
  "technical support", "tech support",
  "manager", "supervisor",
  "representative", "rep"
];

// Common scenario types
const SCENARIO_TYPES = [
  "refund", "return", "exchange",
  "complaint", "issue", "problem",
  "billing", "payment", "charge",
  "order", "delivery", "shipping",
  "cancellation", "cancel",
  "inquiry", "question", "information",
  "technical", "support", "help"
];

/**
 * Extract potential customer name from prompt
 */
function extractCustomerName(prompt: string): string | undefined {
  // Look for patterns like "named X", "called X", "name is X"
  const namePatterns = [
    /(?:named|called|name is|name:)\s+([A-Z][a-z]+)/i,
    /customer\s+([A-Z][a-z]+)/i,
  ];
  
  for (const pattern of namePatterns) {
    const match = prompt.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return undefined;
}

/**
 * Extract emotion from prompt
 */
function extractEmotion(prompt: string): string | undefined {
  const lowerPrompt = prompt.toLowerCase();
  for (const emotion of EMOTIONS) {
    if (lowerPrompt.includes(emotion)) {
      return emotion.charAt(0).toUpperCase() + emotion.slice(1);
    }
  }
  return undefined;
}

/**
 * Extract trainee role from prompt
 */
function extractTrainee(prompt: string): string | undefined {
  const lowerPrompt = prompt.toLowerCase();
  for (const role of TRAINEE_ROLES) {
    if (lowerPrompt.includes(role)) {
      return role.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }
  return undefined;
}

/**
 * Extract scenario type/goal from prompt
 */
function extractScenarioType(prompt: string): string | undefined {
  const lowerPrompt = prompt.toLowerCase();
  for (const type of SCENARIO_TYPES) {
    if (lowerPrompt.includes(type)) {
      return type;
    }
  }
  return undefined;
}

/**
 * Check if prompt is too short or gibberish
 */
function isVagueOrEmpty(prompt: string): boolean {
  const trimmed = prompt.trim();
  
  // Empty check
  if (trimmed.length === 0) return true;
  
  // Too short (less than 5 meaningful characters)
  if (trimmed.length < 5) return true;
  
  // Check if it's mostly non-alphabetic
  const alphaCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (alphaCount < trimmed.length * 0.5) return true;
  
  // Check for repeated characters (like "cscscs")
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, ""));
  if (uniqueChars.size < 3 && trimmed.length > 3) return true;
  
  return false;
}

/**
 * Generate AI greeting based on analysis
 */
function generateAIGreeting(quality: PromptQuality, extracted: ExtractedScenarioInfo, missingFields: string[]): string {
  switch (quality) {
    case "complete":
      return `Great! I've created a scenario with ${extracted.customerName || "your customer"} as ${extracted.emotion?.toLowerCase() || "a"} customer ${extracted.scenario ? `dealing with ${extracted.scenario}` : ""}. The ${extracted.trainee || "support agent"} will practice handling this situation. Let me know if you'd like any changes!`;
    
    case "partial":
      const assumptions: string[] = [];
      const questions: string[] = [];
      
      if (!extracted.customerName) {
        assumptions.push("I'll name the customer **Alex**");
      }
      if (!extracted.emotion) {
        questions.push("What emotional state should the customer have? (e.g., angry, confused, anxious)");
      }
      if (!extracted.trainee) {
        assumptions.push("I'll set this for **customer support executives**");
      }
      if (!extracted.difficulty) {
        assumptions.push("I'll set difficulty to **Medium**");
      }
      
      let greeting = `I'll create a scenario`;
      if (extracted.scenario) {
        greeting += ` about **${extracted.scenario}**`;
      }
      greeting += ".\n\n";
      
      if (assumptions.length > 0) {
        greeting += "I'm assuming:\n" + assumptions.map(a => `• ${a}`).join("\n") + "\n\n";
      }
      
      if (questions.length > 0) {
        greeting += "Quick questions:\n" + questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
        greeting += "\n\nOr just say 'looks good' to proceed with defaults!";
      } else {
        greeting += "Let me know if you'd like to change anything!";
      }
      
      return greeting;
    
    case "vague":
      return `I didn't quite catch that. Could you describe your scenario in more detail?\n\nFor example:\n• "An angry customer calling about a delayed order"\n• "A confused customer asking about billing"\n• "Sales training for handling objections"\n\nOr click one of the templates to get started!`;
    
    case "empty":
    default:
      return `Hi! I can help you create a training scenario. Describe what you need, like:\n\n• "Angry customer wants a refund"\n• "Technical support for software issues"\n• "Sales call with hesitant buyer"\n\nOr pick a template to get started!`;
  }
}

/**
 * Main analysis function
 */
export function analyzePrompt(prompt: string): PromptAnalysisResult {
  const trimmedPrompt = prompt.trim();
  
  // Check for empty/vague prompts first
  if (isVagueOrEmpty(trimmedPrompt)) {
    return {
      quality: trimmedPrompt.length === 0 ? "empty" : "vague",
      extracted: {},
      missingFields: ["customerName", "emotion", "trainee", "scenario"],
      suggestions: ["Describe the customer situation", "Specify the emotion", "Mention who is being trained"],
      aiGreeting: generateAIGreeting(trimmedPrompt.length === 0 ? "empty" : "vague", {}, [])
    };
  }
  
  // Extract information
  const extracted: ExtractedScenarioInfo = {
    customerName: extractCustomerName(trimmedPrompt),
    emotion: extractEmotion(trimmedPrompt),
    trainee: extractTrainee(trimmedPrompt),
    scenario: extractScenarioType(trimmedPrompt),
  };
  
  // Determine missing fields
  const missingFields: string[] = [];
  if (!extracted.customerName) missingFields.push("customerName");
  if (!extracted.emotion) missingFields.push("emotion");
  if (!extracted.trainee) missingFields.push("trainee");
  if (!extracted.scenario) missingFields.push("scenario");
  
  // Determine quality
  let quality: PromptQuality;
  const foundFields = 4 - missingFields.length;
  
  if (foundFields >= 3) {
    quality = "complete";
  } else if (foundFields >= 1) {
    quality = "partial";
  } else {
    quality = "vague";
  }
  
  // Generate suggestions
  const suggestions: string[] = [];
  if (!extracted.emotion) suggestions.push("Add an emotion like 'angry' or 'confused'");
  if (!extracted.scenario) suggestions.push("Describe what the customer wants");
  if (!extracted.trainee) suggestions.push("Specify who is being trained");
  
  return {
    quality,
    extracted,
    missingFields,
    suggestions,
    aiGreeting: generateAIGreeting(quality, extracted, missingFields)
  };
}

/**
 * Generate default scenario data from extracted info
 */
export function generateDefaultScenarioData(extracted: ExtractedScenarioInfo): {
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
} {
  return {
    trainee: extracted.trainee || "Customer support executives",
    customerName: extracted.customerName || "Alex",
    emotion: extracted.emotion || "Frustrated",
    scenario: extracted.scenario 
      ? `they want help with ${extracted.scenario}` 
      : "they want a full refund for a product they bought",
    objective: "Resolve the customer's issue effectively",
    criteria1: "Empathy",
    criteria2: "Problem resolution",
    criteria3: "Communication",
    modality: extracted.modality || "Audio",
    difficulty: extracted.difficulty || "Medium",
  };
}
