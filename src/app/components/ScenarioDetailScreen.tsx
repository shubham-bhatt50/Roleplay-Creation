import svgPaths from "@/imports/svg-t7e50z2hox";
import imgAlexJonathan from "@/assets/Alex.png";
import { IconPencil, IconEye, IconArrowRight, IconArrowLeft, IconFileText, IconUser, IconClipboardCheck, IconDoorExit, IconSettings, IconX, IconPlus, IconPhoto, IconMoodAngry, IconMoodSad, IconMoodHappy, IconMoodNeutral, IconAlertCircle, IconClock, IconFlame, IconUsers, IconChevronDown, IconTrash, IconCheck, IconPlayerStop, IconPhoneOff, IconUserUp, IconTimeDuration10, IconSearch, IconDeviceFloppy, IconDownload, IconUserPlus, IconArrowUpRight } from "@tabler/icons-react";
import { ChatPanel } from "./ChatPanel";
import { EditorChangePreview } from "./EditorChangePreview";
import { DiffPreview } from "./DiffPreview";
import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

interface ScenarioData {
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

interface ScenarioDetailScreenProps {
  onBack: () => void;
  onAttachWorkflow?: (workflowId: string, workflowName: string) => void;
  scenarioData?: ScenarioData | null;
  attachedWorkflow?: { id: string; name: string } | null;
  onNavigateToWorkflow?: (workflowId: string, workflowName: string, roleplayName?: string) => void;
}

type TabType = "scenario" | "persona" | "evaluation" | "exit" | "settings";

// Available workflows for selection
const availableWorkflows = [
  { id: "1", name: "New claim | Guidewire 2", type: "Workflow" },
  { id: "2", name: "New claim | Guidewire 3", type: "Workflow" },
  { id: "3", name: "Refund request | Billing system", type: "Workflow" },
  { id: "4", name: "Return label | Shipping portal", type: "Workflow" },
  { id: "5", name: "Cancel order | Order system", type: "Workflow" },
  { id: "6", name: "Change address | Order system", type: "Workflow" },
  { id: "7", name: "Update payment | Billing system", type: "Workflow" },
];

export function ScenarioDetailScreen({ onBack, onAttachWorkflow, scenarioData, attachedWorkflow, onNavigateToWorkflow }: ScenarioDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scenario");
  const [activeMode, setActiveMode] = useState<"voice" | "chat" | "hybrid">("voice");
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingWorkflowId, setPendingWorkflowId] = useState<string | null>(null);
  const getDefaultTitle = (data: ScenarioData | null | undefined): string => {
    if (!data) return "Dealing with angry customer for refund scenario";
    return `${data.customerName} - ${data.emotion} customer scenario`;
  };

  const [scenarioTitle, setScenarioTitle] = useState(getDefaultTitle(scenarioData));
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // AI Change Preview State
  const [isPreviewingChanges, setIsPreviewingChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [proposedContent, setProposedContent] = useState<string>("");

  // Generate detailed scenario content based on scenario data
  const generateScenarioContent = (data: ScenarioData | null | undefined): string => {
    if (!data) {
      return `
      <h2>Scenario</h2>
      <p>You are <strong>Alex</strong>, a customer who is <strong>frustrated</strong> and contacting customer support because you want a full refund for a product you recently bought. You expect a quick resolution and are feeling upset about the situation.</p>
      
      <p>Your emotional state is <strong>frustrated</strong>, which means you may express your concerns with some intensity. You should communicate your need for a full refund clearly and firmly, while also expressing your dissatisfaction with the product or service you received.</p>
    `;
    }

    const modalityText = data.modality === "Audio" ? "phone call" : "chat conversation";
    const difficultyText = data.difficulty === "High" ? "challenging" : data.difficulty === "Medium" ? "moderate" : "straightforward";
    const emotionLower = data.emotion.toLowerCase();
    
    // Get emotion-specific behavior guidance
    const getEmotionGuidance = (emotion: string): string => {
      const lower = emotion.toLowerCase();
      if (lower.includes("angry") || lower.includes("frustrated")) {
        return "You may express your concerns with intensity and may be less patient with responses. You should communicate firmly and may show signs of irritation if the conversation doesn't progress quickly.";
      }
      if (lower.includes("confused")) {
        return "You may ask clarifying questions frequently and need more explanation. You should express uncertainty and seek reassurance about the process.";
      }
      if (lower.includes("disappointed") || lower.includes("sad")) {
        return "You may express your concerns with a more subdued tone, showing disappointment. You should communicate your needs clearly but may sound less energetic or enthusiastic.";
      }
      if (lower.includes("anxious")) {
        return "You may express urgency and concern about the situation. You should communicate your needs clearly while potentially showing signs of worry or stress.";
      }
      return "You should communicate your needs clearly and express your emotional state authentically throughout the conversation.";
    };
    
    const scenarioContent = `
      <h2>Scenario</h2>
      <p>You are <strong>${data.customerName}</strong>, a customer who is <strong>${emotionLower}</strong> and contacting a <strong>${data.trainee}</strong> via ${modalityText} because ${data.scenario}. You expect a quick resolution and are feeling ${emotionLower} about the situation.</p>
      
      <p>Your emotional state is <strong>${emotionLower}</strong>, which means ${getEmotionGuidance(data.emotion)} Throughout the ${modalityText}, you should maintain this emotional tone and respond authentically to the support representative's attempts to help you.</p>
      
      <p>This is a ${difficultyText} scenario, which means the interaction may involve ${data.difficulty === "High" ? "complex issues that require multiple steps to resolve, potential pushback, or situations where you may need to advocate strongly for your position" : data.difficulty === "Medium" ? "moderate complexity where some negotiation or clarification may be needed" : "relatively straightforward issues that should be resolvable with clear communication"}. The interaction will take place via ${modalityText}, so you should communicate in a manner appropriate for this ${data.modality.toLowerCase()} format.</p>
      
      <p>Your primary goal is to ${data.scenario}. You should express this need clearly and persistently, while also responding naturally to the support representative's questions and attempts to resolve your issue. Remember to stay in character as someone who is ${emotionLower} and maintain that emotional state throughout the conversation.</p>
      
      <p>As the AI playing ${data.customerName}, your role is to provide a realistic, ${emotionLower} customer experience. The ${data.difficulty.toLowerCase()} difficulty level means you should ${data.difficulty === "High" ? "present more complex challenges, potentially escalate if not handled well, and require the learner to work harder to resolve the situation" : data.difficulty === "Medium" ? "present moderate challenges that require some skill to navigate" : "present straightforward challenges that allow the learner to demonstrate basic competency"}.</p>
    `;

    return scenarioContent;
  };

  // Workflow modal state
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [workflowTab, setWorkflowTab] = useState<"draft" | "ready">("ready");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(attachedWorkflow?.id || "1"); // Pre-select attached workflow or first workflow
  const [workflowSearchQuery, setWorkflowSearchQuery] = useState("");

  // Evaluation state
  interface EvaluationParameter {
    id: string;
    title: string;
    criteria: string[];
    mappedCompetency: string;
  }

  // Available competencies for mapping
  const availableCompetencies = [
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
  ];

  const [evaluationParameters, setEvaluationParameters] = useState<EvaluationParameter[]>([
    {
      id: "1",
      title: "Empathy and Active Listening",
      criteria: [
        "0-2: Fails to acknowledge user feelings, interrupts frequently, and dismisses concerns.",
        "3-4: Shows limited empathy; listens but lacks understanding; responses often miss the mark.",
        "5-6: Generally empathetic, listens actively; addresses some concerns but could improve.",
        "7-8: Demonstrates strong empathy, listens attentively; addresses user's feelings effectively.",
        "9-10: Exceptional empathy, fully engaged listening; validates feelings and addresses all concerns thoroughly.",
      ],
      mappedCompetency: "Empathy",
    },
    {
      id: "2",
      title: "Problem-Solving and Resolution Skills",
      criteria: [
        "0-2: Offers no relevant solutions; escalates without assessing user's needs.",
        "3-4: Suggests limited solutions that may not address the core issue; slow to act.",
        "5-6: Provides reasonable solutions with some effectiveness; may require guidance.",
        "7-8: Efficiently identifies issues and suggests effective solutions; user feels supported.",
        "9-10: Proactively resolves issues with innovative solutions; user feels fully satisfied and valued.",
      ],
      mappedCompetency: "Resolution",
    },
    {
      id: "3",
      title: "Product Knowledge and Expertise",
      criteria: [
        "0-2: Lacks basic knowledge of the product; unable to answer user inquiries.",
        "3-4: Has some product knowledge but misses key features; provides vague information.",
        "5-6: Understands most product features; can answer standard questions with some detail.",
        "7-8: Well-versed in product details; answers questions clearly and accurately.",
        "9-10: Comprehensive knowledge of the product; provides insightful information and anticipates further queries.",
      ],
      mappedCompetency: "Knowledge",
    },
  ]);

  const [editingEvaluation, setEditingEvaluation] = useState<{
    type: "title" | "criteria" | "competency";
    parameterId: string;
    criteriaIndex?: number;
  } | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [openCompetencyDropdown, setOpenCompetencyDropdown] = useState<string | null>(null);

  // Evaluation Template management
  interface EvaluationTemplate {
    id: string;
    name: string;
    description: string;
    parameters: Omit<EvaluationParameter, 'id'>[];
  }

  const [evaluationTemplates, setEvaluationTemplates] = useState<EvaluationTemplate[]>([
    {
      id: "et1",
      name: "Customer support basics",
      description: "Essential evaluation criteria for customer support",
      parameters: [
        {
          title: "Empathy and Active Listening",
          criteria: [
            "0-2: Fails to acknowledge user feelings, interrupts frequently, and dismisses concerns.",
            "3-4: Shows limited empathy; listens but lacks understanding; responses often miss the mark.",
            "5-6: Generally empathetic, listens actively; addresses some concerns but could improve.",
            "7-8: Demonstrates strong empathy, listens attentively; addresses user's feelings effectively.",
            "9-10: Exceptional empathy, fully engaged listening; validates feelings and addresses all concerns thoroughly.",
          ],
          mappedCompetency: "Empathy",
        },
        {
          title: "Problem-Solving and Resolution Skills",
          criteria: [
            "0-2: Offers no relevant solutions; escalates without assessing user's needs.",
            "3-4: Suggests limited solutions that may not address the core issue; slow to act.",
            "5-6: Provides reasonable solutions with some effectiveness; may require guidance.",
            "7-8: Efficiently identifies issues and suggests effective solutions; user feels supported.",
            "9-10: Proactively resolves issues with innovative solutions; user feels fully satisfied and valued.",
          ],
          mappedCompetency: "Resolution",
        },
      ],
    },
    {
      id: "et2",
      name: "Sales performance",
      description: "Evaluation metrics for sales conversations",
      parameters: [
        {
          title: "Product Knowledge",
          criteria: [
            "0-2: Cannot explain product features; lacks basic understanding.",
            "3-4: Knows basic features but struggles with details; may provide inaccurate information.",
            "5-6: Good understanding of product features; can handle most questions.",
            "7-8: Strong product knowledge; explains features confidently and accurately.",
            "9-10: Expert-level knowledge; anticipates questions and provides comprehensive information.",
          ],
          mappedCompetency: "Knowledge",
        },
        {
          title: "Objection Handling",
          criteria: [
            "0-2: Cannot address objections; becomes defensive or dismissive.",
            "3-4: Attempts to address objections but lacks persuasion; may give up easily.",
            "5-6: Handles common objections adequately; uses some persuasion techniques.",
            "7-8: Skilled at addressing objections; turns concerns into opportunities.",
            "9-10: Expert objection handler; uses advanced techniques to build trust and close deals.",
          ],
          mappedCompetency: "Communication",
        },
      ],
    },
    {
      id: "et3",
      name: "Technical support",
      description: "Evaluation for technical troubleshooting scenarios",
      parameters: [
        {
          title: "Technical Expertise",
          criteria: [
            "0-2: Unable to diagnose issues; lacks technical understanding.",
            "3-4: Can identify simple issues but struggles with complex problems.",
            "5-6: Solid technical knowledge; resolves most common issues.",
            "7-8: Strong technical skills; efficiently diagnoses and resolves complex issues.",
            "9-10: Expert technician; handles advanced issues and provides thorough explanations.",
          ],
          mappedCompetency: "Product Knowledge",
        },
        {
          title: "Clear Communication",
          criteria: [
            "0-2: Uses jargon; confuses customers; cannot simplify explanations.",
            "3-4: Sometimes unclear; inconsistent in explaining technical concepts.",
            "5-6: Generally clear communication; adapts language to customer level.",
            "7-8: Excellent at explaining technical concepts in simple terms.",
            "9-10: Outstanding communicator; makes complex topics accessible to anyone.",
          ],
          mappedCompetency: "Communication",
        },
      ],
    },
  ]);

  const [showEvaluationTemplateMenu, setShowEvaluationTemplateMenu] = useState(false);
  const [evaluationMenuView, setEvaluationMenuView] = useState<"main" | "load" | "save">("main");
  const [newEvaluationTemplateName, setNewEvaluationTemplateName] = useState("");
  const [newEvaluationTemplateDescription, setNewEvaluationTemplateDescription] = useState("");
  const [collapsedEvalParams, setCollapsedEvalParams] = useState<string[]>([]);

  // Change tracking for sections
  const [savedEvaluationParameters, setSavedEvaluationParameters] = useState<EvaluationParameter[]>(evaluationParameters);
  const [isSavingEvaluation, setIsSavingEvaluation] = useState(false);

  // Check if evaluation parameters have unsaved changes
  const hasEvaluationChanges = JSON.stringify(evaluationParameters) !== JSON.stringify(savedEvaluationParameters);

  // Save evaluation changes
  const saveEvaluationChanges = () => {
    setIsSavingEvaluation(true);
    // Simulate API call delay
    setTimeout(() => {
      setSavedEvaluationParameters([...evaluationParameters]);
      setIsSavingEvaluation(false);
    }, 500);
  };

  // Discard evaluation changes
  const discardEvaluationChanges = () => {
    setEvaluationParameters([...savedEvaluationParameters]);
  };

  const loadEvaluationFromTemplate = (template: EvaluationTemplate) => {
    const newParameters: EvaluationParameter[] = template.parameters.map((param, index) => ({
      id: String(Date.now() + index),
      ...param,
    }));
    setEvaluationParameters([...newParameters, ...evaluationParameters]);
    setShowEvaluationTemplateMenu(false);
    setEvaluationMenuView("main");
  };

  const saveEvaluationAsTemplate = () => {
    if (!newEvaluationTemplateName.trim()) return;
    
    const newTemplate: EvaluationTemplate = {
      id: String(Date.now()),
      name: newEvaluationTemplateName.trim(),
      description: newEvaluationTemplateDescription.trim() || `Template with ${evaluationParameters.length} parameters`,
      parameters: evaluationParameters.map(({ title, criteria, mappedCompetency }) => ({
        title,
        criteria,
        mappedCompetency,
      })),
    };
    setEvaluationTemplates([...evaluationTemplates, newTemplate]);
    setNewEvaluationTemplateName("");
    setNewEvaluationTemplateDescription("");
    setShowEvaluationTemplateMenu(false);
    setEvaluationMenuView("main");
  };

  // Handle clicking outside competency dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside any competency dropdown
      const competencyDropdown = target.closest('[data-competency-dropdown]');
      if (!competencyDropdown && openCompetencyDropdown) {
        setOpenCompetencyDropdown(null);
      }
    };

    if (openCompetencyDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openCompetencyDropdown]);

  // Exit conditions state
  interface ExitCondition {
    id: string;
    trigger: string;
    action: string;
    icon: "resolution" | "time" | "escalate" | "end";
  }

  const [exitConditions, setExitConditions] = useState<ExitCondition[]>([
    {
      id: "1",
      trigger: "Customer receives a resolution",
      action: "End scenario with success",
      icon: "resolution",
    },
    {
      id: "2",
      trigger: "Conversation reaches 10 minutes",
      action: "End scenario with timeout",
      icon: "time",
    },
    {
      id: "3",
      trigger: "Customer escalates to supervisor",
      action: "End scenario with escalation",
      icon: "escalate",
    },
    {
      id: "4",
      trigger: "Customer ends the call/chat",
      action: "End scenario immediately",
      icon: "end",
    },
  ]);

  const [editingExitCondition, setEditingExitCondition] = useState<{
    id: string;
    field: "trigger" | "action";
  } | null>(null);
  const [exitConditionEditValue, setExitConditionEditValue] = useState("");

  // Automatically determine icon based on trigger text
  const getIconForTrigger = (trigger: string): ExitCondition["icon"] => {
    const lower = trigger.toLowerCase();
    if (lower.includes("resolution") || lower.includes("resolve") || lower.includes("success")) {
      return "resolution";
    }
    if (lower.includes("time") || lower.includes("minute") || lower.includes("timeout")) {
      return "time";
    }
    if (lower.includes("escalate") || lower.includes("supervisor") || lower.includes("manager")) {
      return "escalate";
    }
    return "end";
  };

  const getExitConditionIcon = (trigger: string) => {
    const iconType = getIconForTrigger(trigger);
    switch (iconType) {
      case "resolution":
        return IconCheck;
      case "time":
        return IconTimeDuration10;
      case "escalate":
        return IconUserUp;
      case "end":
        return IconPhoneOff;
      default:
        return IconPlayerStop;
    }
  };

  const addExitCondition = () => {
    const newId = String(Date.now());
    const newCondition: ExitCondition = {
      id: newId,
      trigger: "New condition",
      action: "End scenario",
      icon: "end",
    };
    setExitConditions([...exitConditions, newCondition]);
  };

  const deleteExitCondition = (id: string) => {
    setExitConditions(exitConditions.filter((c) => c.id !== id));
  };

  const updateExitCondition = (id: string, field: "trigger" | "action", value: string) => {
    setExitConditions(
      exitConditions.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };
  
  // Persona management
  interface Persona {
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

  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "1",
      name: "Alex",
      gender: "Male",
      age: 25,
      location: "Minnesota",
      avatar: imgAlexJonathan,
      emotionalStates: ["Frustrated", "Angry"],
      behavioralTraits: ["Short-tempered", "Impatient"],
      additionalRemarks: "A dissatisfied customer who wants a full refund for a product they bought. May escalate if not handled properly and expects immediate resolution. Has been a customer for 2 years.",
    },
    {
      id: "2",
      name: "Jordan",
      gender: "Non-binary",
      age: 30,
      location: "California",
      avatar: null,
      emotionalStates: ["Neutral", "Calm"],
      behavioralTraits: ["Patient", "Polite"],
      additionalRemarks: "Inquiring about product features and pricing. Will ask detailed questions and compare options before making a decision. Values transparency and good service.",
    },
    {
      id: "3",
      name: "Sam",
      gender: "Female",
      age: 28,
      location: "Texas",
      avatar: null,
      emotionalStates: ["Happy", "Excited"],
      behavioralTraits: ["Enthusiastic", "Eager"],
      additionalRemarks: "Wants to upgrade to a premium plan. Will be receptive to upsells and recommendations. Loves the product and has referred friends.",
    },
    {
      id: "4",
      name: "Taylor",
      gender: "Male",
      age: 35,
      location: "New York",
      avatar: null,
      emotionalStates: ["Confused", "Anxious"],
      behavioralTraits: ["Uncertain", "Needs reassurance"],
      additionalRemarks: "Technical issue with the product. Will need step-by-step guidance and patience. First-time user who is not tech-savvy.",
    },
    {
      id: "5",
      name: "Morgan",
      gender: "Female",
      age: 22,
      location: "Florida",
      avatar: null,
      emotionalStates: ["Disappointed", "Sad"],
      behavioralTraits: ["Loyal", "Expects better"],
      additionalRemarks: "Had a bad experience after years of being a customer. Will reference past positive experiences and expects acknowledgment of loyalty. Long-term customer since 2019.",
    },
  ]);

  const [currentPersonaId, setCurrentPersonaId] = useState("1");
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [personaMenuView, setPersonaMenuView] = useState<"main" | "switch" | "load" | "save">("main");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showEmotionalDropdown, setShowEmotionalDropdown] = useState(false);
  const [showBehavioralDropdown, setShowBehavioralDropdown] = useState(false);

  // Predefined options for emotional states and behavioral traits
  const emotionalStateOptions = [
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
  ];

  const behavioralTraitOptions = [
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
  ];

  // Template management
  interface PersonaTemplate {
    id: string;
    name: string;
    description: string;
    persona: Omit<Persona, 'id'>;
  }

  const [personaTemplates, setPersonaTemplates] = useState<PersonaTemplate[]>([
    {
      id: "t1",
      name: "Angry refund seeker",
      description: "A frustrated customer demanding a refund",
      persona: {
        name: "Alex",
        gender: "Male",
        age: 25,
        location: "Minnesota",
        avatar: null,
        emotionalStates: ["Frustrated", "Angry"],
        behavioralTraits: ["Short-tempered", "Impatient"],
        additionalRemarks: "Wants a full refund for a product they bought. May escalate if not handled properly, expects immediate resolution.",
      },
    },
    {
      id: "t2",
      name: "Confused first-timer",
      description: "A new customer needing guidance",
      persona: {
        name: "Jamie",
        gender: "Non-binary",
        age: 24,
        location: "Seattle",
        avatar: null,
        emotionalStates: ["Confused", "Anxious"],
        behavioralTraits: ["Uncertain", "Needs reassurance"],
        additionalRemarks: "First time using the product and needs help getting started. Will ask many questions, needs patient explanations.",
      },
    },
    {
      id: "t3",
      name: "Disappointed loyalist",
      description: "A long-time customer who feels let down",
      persona: {
        name: "Morgan",
        gender: "Female",
        age: 45,
        location: "Chicago",
        avatar: null,
        emotionalStates: ["Disappointed", "Sad"],
        behavioralTraits: ["Loyal", "Expects better"],
        additionalRemarks: "Had a bad experience after years of being a customer. Will reference past positive experiences, expects acknowledgment.",
      },
    },
    {
      id: "t4",
      name: "Happy upgrader",
      description: "An enthusiastic customer wanting to upgrade",
      persona: {
        name: "Taylor",
        gender: "Male",
        age: 32,
        location: "Austin",
        avatar: null,
        emotionalStates: ["Happy", "Excited"],
        behavioralTraits: ["Enthusiastic", "Eager"],
        additionalRemarks: "Wants to upgrade to a premium plan. Will be receptive to upsells and recommendations.",
      },
    },
  ]);

  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");

  const currentPersona = personas.find(p => p.id === currentPersonaId) || personas[0];

  const loadFromTemplate = (template: PersonaTemplate) => {
    const newId = String(Date.now());
    const newPersona: Persona = {
      id: newId,
      ...template.persona,
    };
    setPersonas([...personas, newPersona]);
    setCurrentPersonaId(newId);
    setShowPersonaMenu(false);
  };

  const saveAsTemplate = () => {
    if (!newTemplateName.trim()) return;
    
    const newTemplate: PersonaTemplate = {
      id: String(Date.now()),
      name: newTemplateName.trim(),
      description: newTemplateDescription.trim() || `Template based on ${currentPersona.name}`,
      persona: {
        name: currentPersona.name,
        gender: currentPersona.gender,
        age: currentPersona.age,
        location: currentPersona.location,
        avatar: null, // Don't save avatar in templates
        emotionalStates: currentPersona.emotionalStates,
        behavioralTraits: currentPersona.behavioralTraits,
        additionalRemarks: currentPersona.additionalRemarks,
      },
    };
    setPersonaTemplates([...personaTemplates, newTemplate]);
    setNewTemplateName("");
    setNewTemplateDescription("");
    setShowPersonaMenu(false);
  };

  const updateCurrentPersona = (updates: Partial<Persona>) => {
    setPersonas(personas.map(p => 
      p.id === currentPersonaId ? { ...p, ...updates } : p
    ));
  };

  const setPersonaName = (name: string) => updateCurrentPersona({ name });
  const setPersonaAvatar = (avatar: string | null) => updateCurrentPersona({ avatar });
  const setEmotionalStates = (states: string[]) => updateCurrentPersona({ emotionalStates: states });
  const setBehavioralTraits = (traits: string[]) => updateCurrentPersona({ behavioralTraits: traits });
  const setAdditionalRemarks = (remarks: string) => updateCurrentPersona({ additionalRemarks: remarks });

  // Helper functions for tag icons and colors
  const getEmotionalIcon = (state: string) => {
    const lower = state.toLowerCase();
    if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("irritated")) {
      return IconMoodAngry;
    }
    if (lower.includes("sad") || lower.includes("upset") || lower.includes("disappointed")) {
      return IconMoodSad;
    }
    if (lower.includes("happy") || lower.includes("joyful") || lower.includes("pleased")) {
      return IconMoodHappy;
    }
    if (lower.includes("neutral") || lower.includes("calm")) {
      return IconMoodNeutral;
    }
    return IconMoodNeutral;
  };

  const getEmotionalColor = (state: string) => {
    const lower = state.toLowerCase();
    if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("irritated")) {
      return { bg: "#fee2e2", text: "#991b1b", icon: "#dc2626" };
    }
    if (lower.includes("sad") || lower.includes("upset") || lower.includes("disappointed")) {
      return { bg: "#dbeafe", text: "#1e40af", icon: "#3b82f6" };
    }
    if (lower.includes("happy") || lower.includes("joyful") || lower.includes("pleased")) {
      return { bg: "#dcfce7", text: "#166534", icon: "#22c55e" };
    }
    if (lower.includes("neutral") || lower.includes("calm")) {
      return { bg: "#f3f4f6", text: "#374151", icon: "#6b7280" };
    }
    return { bg: "#fef3c7", text: "#92400e", icon: "#f59e0b" };
  };

  const getBehavioralIcon = (trait: string) => {
    const lower = trait.toLowerCase();
    if (lower.includes("short") || lower.includes("temper") || lower.includes("impatient")) {
      return IconFlame;
    }
    if (lower.includes("angry") || lower.includes("aggressive")) {
      return IconMoodAngry;
    }
    if (lower.includes("alert") || lower.includes("cautious")) {
      return IconAlertCircle;
    }
    if (lower.includes("time") || lower.includes("urgent") || lower.includes("rushed")) {
      return IconClock;
    }
    return IconUser;
  };

  const getBehavioralColor = (trait: string) => {
    const lower = trait.toLowerCase();
    if (lower.includes("short") || lower.includes("temper") || lower.includes("impatient") || lower.includes("angry")) {
      return { bg: "#fee2e2", text: "#991b1b", icon: "#dc2626" };
    }
    if (lower.includes("alert") || lower.includes("cautious")) {
      return { bg: "#fef3c7", text: "#92400e", icon: "#f59e0b" };
    }
    if (lower.includes("time") || lower.includes("urgent") || lower.includes("rushed")) {
      return { bg: "#ddd6fe", text: "#6b21a8", icon: "#8b5cf6" };
    }
    return { bg: "#e0e7ff", text: "#3730a3", icon: "#6366f1" };
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0975d7] underline',
        },
      }),
    ],
    content: generateScenarioContent(scenarioData),
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-sm max-w-none',
      },
    },
  });

  // Update editor content when scenarioData changes
  useEffect(() => {
    if (editor) {
      if (scenarioData) {
        editor.commands.setContent(generateScenarioContent(scenarioData));
        setScenarioTitle(getDefaultTitle(scenarioData));
      }
    }
  }, [scenarioData, editor]);

  // Sync persona changes with scenario content
  useEffect(() => {
    if (editor && currentPersona) {
      // Update scenario content to reflect persona changes
      const updatedScenarioData: ScenarioData = {
        trainee: scenarioData?.trainee || "Customer support executives",
        customerName: currentPersona.name,
        emotion: currentPersona.emotionalStates[0] || scenarioData?.emotion || "Frustrated",
        scenario: scenarioData?.scenario || "they want a full refund for a product they bought",
        objective: scenarioData?.objective || "De-escalate the situation",
        criteria1: scenarioData?.criteria1 || "Empathy",
        criteria2: scenarioData?.criteria2 || "De-escalation",
        criteria3: scenarioData?.criteria3 || "Policy adherence",
        modality: scenarioData?.modality || "Audio",
        difficulty: scenarioData?.difficulty || "High",
      };
      editor.commands.setContent(generateScenarioContent(updatedScenarioData));
      setScenarioTitle(`${currentPersona.name} - ${currentPersona.emotionalStates[0] || 'Customer'} scenario`);
    }
  }, [currentPersona?.name, currentPersona?.emotionalStates, currentPersona?.gender, currentPersona?.age, currentPersona?.location]);

  // AI Change Preview Handlers
  const handlePreviewChange = (original: string, proposed: string) => {
    setOriginalContent(editor?.getHTML() || "");
    setProposedContent(proposed);
    setIsPreviewingChanges(true);
    // Don't apply to editor yet - show diff preview instead
  };

  const handleAcceptChange = (proposed: string) => {
    // Apply the proposed content to the editor
    if (editor) {
      editor.commands.setContent(proposed);
    }
    setIsPreviewingChanges(false);
    setOriginalContent("");
    setProposedContent("");
  };

  const handleRejectChange = () => {
    // Just exit preview mode - original content is still in editor
    setIsPreviewingChanges(false);
    setOriginalContent("");
    setProposedContent("");
  };

  // Get current editor content for the chat panel
  const getCurrentEditorContent = (): string => {
    return editor?.getHTML() || "";
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
      {/* AI Chat Panel - Fixed Right Sidebar */}
      <div className="absolute top-0 right-0 bottom-0 w-[320px] border-l border-[#eee] z-10">
        <ChatPanel 
          activeTab={activeTab}
          editorContent={getCurrentEditorContent()}
          onPreviewChange={handlePreviewChange}
          onAcceptChange={handleAcceptChange}
          onRejectChange={handleRejectChange}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-h-0 overflow-hidden pr-[320px]">
        {/* Header */}
        <div className="border-b border-[#eee] px-6 py-4">
          <div className="flex items-start justify-between">
            {/* Left Section - Title and Workflow Link */}
            <div className="flex flex-col">
              {/* Title Row */}
              <div className="flex items-center gap-3">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={scenarioTitle}
                    onChange={(e) => setScenarioTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsEditingTitle(false);
                      } else if (e.key === "Escape") {
                        setIsEditingTitle(false);
                      }
                    }}
                    className="text-[20px] font-semibold text-[#2b2b40] border-b border-[#0975d7] focus:outline-none bg-transparent"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-[20px] font-semibold text-[#2b2b40]">
                    {scenarioTitle}
                  </h1>
                )}
                <button 
                  onClick={() => setIsEditingTitle(true)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <IconPencil className="w-4 h-4 text-[#8d8ba7]" stroke={2.5} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <IconEye className="w-4 h-4 text-[#8d8ba7]" stroke={2.5} />
                </button>
              </div>

              {/* Workflow Link - Below Title */}
              {attachedWorkflow && (
                <button 
                  className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#8d8ba7] hover:text-[#6b6b80] transition-colors group"
                  onClick={() => {
                    // Navigate to workflow detail page
                    onNavigateToWorkflow?.(attachedWorkflow.id, attachedWorkflow.name, scenarioTitle);
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#f0f0f5] flex items-center justify-center group-hover:bg-[#e5e5ea] transition-colors">
                    <IconArrowUpRight className="w-3 h-3 text-[#8d8ba7]" stroke={2} />
                  </div>
                  <span className="group-hover:underline">{attachedWorkflow.name}</span>
                </button>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Attach/Update Button */}
              <button 
                className="bg-[#d0450b] hover:bg-[#b83d0a] text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                onClick={() => {
                  if (attachedWorkflow) {
                    // If workflow is already attached, show warning dialog first
                    setShowWorkflowModal(true);
                  } else {
                    setShowWorkflowModal(true);
                  }
                }}
              >
                {attachedWorkflow ? "Update workflow" : "Attach to workflow"}
                <IconArrowRight className="size-4" stroke={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with Horizontal Tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Horizontal Tab Navigation */}
          <div className="border-b border-[#eee] bg-white shrink-0">
            <div className="flex items-center px-4">
              <button
                onClick={() => setActiveTab("scenario")}
                className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "scenario" ? "text-[#0975d7]" : "text-[#8d8ba7] hover:text-[#6b697b]"
                }`}
              >
                <IconFileText className="w-4 h-4" stroke={2} />
                Scenario
                {activeTab === "scenario" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("persona")}
                className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "persona" ? "text-[#0975d7]" : "text-[#8d8ba7] hover:text-[#6b697b]"
                }`}
              >
                <IconUser className="w-4 h-4" stroke={2} />
                Customer persona
                {activeTab === "persona" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("evaluation")}
                className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "evaluation" ? "text-[#0975d7]" : "text-[#8d8ba7] hover:text-[#6b697b]"
                }`}
              >
                <IconClipboardCheck className="w-4 h-4" stroke={2} />
                Evaluation
                {activeTab === "evaluation" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("exit")}
                className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "exit" ? "text-[#0975d7]" : "text-[#8d8ba7] hover:text-[#6b697b]"
                }`}
              >
                <IconDoorExit className="w-4 h-4" stroke={2} />
                Exit conditions
                {activeTab === "exit" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "settings" ? "text-[#0975d7]" : "text-[#8d8ba7] hover:text-[#6b697b]"
                }`}
              >
                <IconSettings className="w-4 h-4" stroke={2} />
                Settings
                {activeTab === "settings" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === "scenario" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-[#eee] py-4 shrink-0">
                  <div className="px-6">
                    <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Scenario</h2>
                    <p className="text-sm text-[#8d8ba7]">Define the situation learners will practice</p>
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="bg-white border-b border-[#eee] py-2 shrink-0">
                  <div className="px-6 flex items-center gap-2">
                  <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
                    title="Bold"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
                    title="Italic"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive('underline') ? 'bg-gray-200' : ''
                    }`}
                    title="Underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1" />

                  <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive('bulletList') ? 'bg-gray-200' : ''
                    }`}
                    title="Bullet List"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive('orderedList') ? 'bg-gray-200' : ''
                    }`}
                    title="Numbered List"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                      <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1" />

                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Left"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${
                      editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Right"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>

                  <div className="flex-1" />

                  <select 
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'paragraph') {
                        editor?.chain().focus().setParagraph().run();
                      } else if (value === 'h1') {
                        editor?.chain().focus().toggleHeading({ level: 1 }).run();
                      } else if (value === 'h2') {
                        editor?.chain().focus().toggleHeading({ level: 2 }).run();
                      } else if (value === 'h3') {
                        editor?.chain().focus().toggleHeading({ level: 3 }).run();
                      }
                    }}
                  >
                    <option value="paragraph">Normal text</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                  </select>

                  <button className="p-2 rounded hover:bg-gray-100" title="More options">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="3" cy="8" r="1.5" />
                      <circle cx="8" cy="8" r="1.5" />
                      <circle cx="13" cy="8" r="1.5" />
                    </svg>
                  </button>
                  </div>
                </div>

                {/* Editor */}
                <div className="bg-white flex-1 overflow-y-auto relative">
                  <div className="px-6 py-4 h-full">
                    {isPreviewingChanges ? (
                      /* Show diff preview when previewing changes */
                      <DiffPreview
                        originalContent={originalContent}
                        proposedContent={proposedContent}
                        isVisible={isPreviewingChanges}
                      />
                    ) : (
                      /* Show normal editor when not previewing */
                      <div className="prose prose-sm max-w-none">
                        <EditorContent editor={editor} />
                      </div>
                    )}
                  </div>
                  
                  {/* AI Change Preview Action Bar */}
                  <EditorChangePreview
                    isVisible={isPreviewingChanges}
                    onAccept={() => handleAcceptChange(proposedContent)}
                    onReject={handleRejectChange}
                    changesSummary="AI suggested changes"
                  />
                </div>
              </div>
            )}

            {activeTab === "persona" && (
              <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="border-b border-[#eee] py-4 shrink-0">
                  <div className="px-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Customer persona</h2>
                      <p className="text-sm text-[#8d8ba7]">Define who the learner is interacting with</p>
                    </div>
                    {/* Combined Persona Menu */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowPersonaMenu(!showPersonaMenu);
                          setPersonaMenuView("main");
                        }}
                        className="flex items-center gap-2 px-3 py-2 border border-[#ececf3] rounded-lg hover:border-[#0975d7] hover:bg-[#f8fafc] transition-colors bg-white"
                      >
                        <IconUser className="w-4 h-4 text-[#0975d7]" stroke={2} />
                        <span className="text-sm font-medium text-[#2b2b40]">Manage persona</span>
                        <IconChevronDown className={`w-4 h-4 text-[#8d8ba7] transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} stroke={2} />
                      </button>
                      {showPersonaMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => {
                              setShowPersonaMenu(false);
                              setPersonaMenuView("main");
                            }}
                          />
                          <div className="absolute right-0 mt-2 w-72 bg-white border border-[#ececf3] rounded-xl shadow-xl z-20 overflow-hidden">
                            {personaMenuView === "main" && (
                              <div className="py-2">
                                <button
                                  onClick={() => setPersonaMenuView("switch")}
                                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#f0f4ff] flex items-center justify-center">
                                    <IconUsers className="w-4 h-4 text-[#0975d7]" stroke={2} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-[#2b2b40]">Switch persona</p>
                                    <p className="text-xs text-[#8d8ba7]">Change to another persona</p>
                                  </div>
                                  <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                                </button>
                                <button
                                  onClick={() => setPersonaMenuView("load")}
                                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#f0fff4] flex items-center justify-center">
                                    <IconDownload className="w-4 h-4 text-[#10b981]" stroke={2} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-[#2b2b40]">Load template</p>
                                    <p className="text-xs text-[#8d8ba7]">Use a saved template</p>
                                  </div>
                                  <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                                </button>
                                <button
                                  onClick={() => {
                                    setPersonaMenuView("save");
                                    setNewTemplateName(currentPersona.name + " template");
                                    setNewTemplateDescription("");
                                  }}
                                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                                    <IconDeviceFloppy className="w-4 h-4 text-[#d97706]" stroke={2} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-[#2b2b40]">Save as template</p>
                                    <p className="text-xs text-[#8d8ba7]">Save current persona</p>
                                  </div>
                                  <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                                </button>
                                <div className="border-t border-[#ececf3] mt-2 pt-2">
                                  <button
                                    onClick={() => {
                                      const newId = String(Date.now());
                                      const newPersona: Persona = {
                                        id: newId,
                                        name: "New Persona",
                                        gender: "Not specified",
                                        age: 30,
                                        location: "Unknown",
                                        avatar: null,
                                        emotionalStates: [],
                                        behavioralTraits: [],
                                        additionalRemarks: "",
                                      };
                                      setPersonas([...personas, newPersona]);
                                      setCurrentPersonaId(newId);
                                      setShowPersonaMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-[#f0f0f5] flex items-center justify-center">
                                      <IconUserPlus className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                    </div>
                                    <p className="text-sm font-medium text-[#2b2b40]">Create new persona</p>
                                  </button>
                                </div>
                              </div>
                            )}
                            {personaMenuView === "switch" && (
                              <div>
                                <div className="px-4 py-3 border-b border-[#ececf3] flex items-center gap-2">
                                  <button onClick={() => setPersonaMenuView("main")} className="p-1 hover:bg-[#f0f0f5] rounded">
                                    <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                  </button>
                                  <span className="text-sm font-medium text-[#2b2b40]">Switch persona</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                            {personas.map((persona) => (
                              <button
                                key={persona.id}
                                onClick={() => {
                                  setCurrentPersonaId(persona.id);
                                        setShowPersonaMenu(false);
                                        setPersonaMenuView("main");
                                }}
                                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors ${
                                        currentPersonaId === persona.id ? 'bg-[#f0f4ff]' : ''
                                }`}
                              >
                                {persona.avatar ? (
                                  <img
                                    src={persona.avatar}
                                    alt={persona.name}
                                          className="w-10 h-10 rounded-lg object-cover ring-2 ring-white shadow-sm"
                                  />
                                ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-sm">
                                          <span className="text-sm font-bold text-white">
                                            {persona.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                          </span>
                                  </div>
                                )}
                                      <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${currentPersonaId === persona.id ? 'text-[#0975d7]' : 'text-[#2b2b40]'}`}>
                                    {persona.name}
                                  </p>
                                        <p className="text-xs text-[#8d8ba7]">
                                          {persona.gender}, {persona.age} yrs, {persona.location}
                                  </p>
                                </div>
                                {currentPersonaId === persona.id && (
                                        <IconCheck className="w-4 h-4 text-[#0975d7]" stroke={2} />
                                )}
                              </button>
                            ))}
                                </div>
                              </div>
                            )}
                            {personaMenuView === "load" && (
                              <div>
                                <div className="px-4 py-3 border-b border-[#ececf3] flex items-center gap-2">
                                  <button onClick={() => setPersonaMenuView("main")} className="p-1 hover:bg-[#f0f0f5] rounded">
                                    <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                  </button>
                                  <span className="text-sm font-medium text-[#2b2b40]">Load template</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                  {personaTemplates.map((template) => (
                              <button
                                      key={template.id}
                                onClick={() => {
                                        loadFromTemplate(template);
                                        setShowPersonaMenu(false);
                                        setPersonaMenuView("main");
                                      }}
                                      className="w-full text-left px-4 py-3 hover:bg-[#f5f7fa] transition-colors border-b border-[#f5f5f5] last:border-b-0"
                                    >
                                      <p className="text-sm font-medium text-[#2b2b40]">{template.name}</p>
                                      <p className="text-xs text-[#8d8ba7] mt-0.5">{template.description}</p>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {template.persona.emotionalStates.slice(0, 2).map((state, idx) => (
                                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b]">
                                            {state}
                                          </span>
                                        ))}
                                      </div>
                              </button>
                                  ))}
                            </div>
                              </div>
                            )}
                            {personaMenuView === "save" && (
                              <div>
                                <div className="px-4 py-3 border-b border-[#ececf3] flex items-center gap-2">
                                  <button onClick={() => setPersonaMenuView("main")} className="p-1 hover:bg-[#f0f0f5] rounded">
                                    <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                  </button>
                                  <span className="text-sm font-medium text-[#2b2b40]">Save as template</span>
                                </div>
                                <div className="p-4 space-y-3">
                                  <div>
                                    <label className="block text-xs font-medium text-[#6b697b] mb-1">Template name</label>
                                    <input
                                      type="text"
                                      value={newTemplateName}
                                      onChange={(e) => setNewTemplateName(e.target.value)}
                                      placeholder="E.g., Angry refund seeker"
                                      className="w-full px-3 py-2 text-sm border border-[#d7d6d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-[#6b697b] mb-1">Description</label>
                                    <input
                                      type="text"
                                      value={newTemplateDescription}
                                      onChange={(e) => setNewTemplateDescription(e.target.value)}
                                      placeholder="Brief description..."
                                      className="w-full px-3 py-2 text-sm border border-[#d7d6d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                                    />
                                  </div>
                                  <button
                                    onClick={() => {
                                      saveAsTemplate();
                                      setShowPersonaMenu(false);
                                      setPersonaMenuView("main");
                                    }}
                                    disabled={!newTemplateName.trim()}
                                    className="w-full py-2 text-sm font-medium text-white bg-[#0975d7] rounded-lg hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Save template
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Persona Card */}
                <div className="bg-gradient-to-br from-[#fafbfc] to-white border-b border-[#eee] py-6">
                  <div className="px-6">
                    {/* Top Row: Avatar + Name/Demographics */}
                    <div className="flex items-center gap-5 mb-5">
                    {/* Avatar */}
                      <div className="shrink-0">
                      <div className="relative group">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md ring-2 ring-white bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                        {currentPersona.avatar ? (
                          <img
                            src={currentPersona.avatar}
                            alt={currentPersona.name}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center top' }}
                          />
                        ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-xl font-bold text-white">
                                  {currentPersona.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                          </div>
                        )}
                          </div>
                        <button
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setPersonaAvatar(event.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }}
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                        >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-0.5">
                              <IconPhoto className="w-4 h-4 text-white" stroke={2} />
                              <span className="text-[9px] text-white font-medium">Change</span>
                            </div>
                        </button>
                      </div>
                      </div>

                      {/* Name and Demographics */}
                      <div className="flex-1 min-w-0">
                        {/* Name */}
                      {editingField === "name" ? (
                        <input
                          type="text"
                          value={currentPersona.name}
                          onChange={(e) => setPersonaName(e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingField(null);
                          }}
                            className="text-xl font-semibold text-[#2b2b40] border-b-2 border-[#0975d7] focus:outline-none bg-transparent w-full max-w-[200px] mb-2"
                          autoFocus
                        />
                      ) : (
                          <div className="flex items-center gap-2 group cursor-pointer mb-2" onClick={() => setEditingField("name")}>
                            <h3 className="text-xl font-semibold text-[#2b2b40]">{currentPersona.name}</h3>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/80 rounded">
                              <IconPencil className="w-3.5 h-3.5 text-[#8d8ba7]" stroke={2} />
                            </button>
                          </div>
                        )}

                        {/* Demographics Pills */}
                        {editingField === "demographics" ? (
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#8d8ba7]">Gender:</span>
                              <input
                                type="text"
                                value={currentPersona.gender}
                                onChange={(e) => updateCurrentPersona({ gender: e.target.value })}
                                className="text-sm px-2 py-1 border border-[#0975d7] rounded-md focus:outline-none bg-white w-24"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#8d8ba7]">Age:</span>
                              <input
                                type="number"
                                value={currentPersona.age}
                                onChange={(e) => updateCurrentPersona({ age: parseInt(e.target.value) || 0 })}
                                className="text-sm px-2 py-1 border border-[#0975d7] rounded-md focus:outline-none bg-white w-16"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#8d8ba7]">Location:</span>
                              <input
                                type="text"
                                value={currentPersona.location}
                                onChange={(e) => updateCurrentPersona({ location: e.target.value })}
                                className="text-sm px-2 py-1 border border-[#0975d7] rounded-md focus:outline-none bg-white w-28"
                              />
                            </div>
                          <button
                              onClick={() => setEditingField(null)}
                              className="text-xs text-white bg-[#0975d7] hover:bg-[#0861b8] px-3 py-1 rounded-md transition-colors"
                            >
                              Done
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="flex flex-wrap items-center gap-2 group cursor-pointer"
                            onClick={() => setEditingField("demographics")}
                          >
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#e5e7eb] rounded-full text-xs text-[#4b5563]">
                              <svg className="w-3 h-3 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {currentPersona.gender}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#e5e7eb] rounded-full text-xs text-[#4b5563]">
                              <svg className="w-3 h-3 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {currentPersona.age} years old
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#e5e7eb] rounded-full text-xs text-[#4b5563]">
                              <svg className="w-3 h-3 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {currentPersona.location}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded">
                            <IconPencil className="w-3 h-3 text-[#8d8ba7]" stroke={2} />
                          </button>
                        </div>
                      )}
                      </div>
                    </div>

                    {/* Traits Section - Full Width */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Emotional States */}
                      <div>
                        <p className="text-xs font-medium text-[#6b697b] uppercase tracking-wide mb-2">Emotional state</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {currentPersona.emotionalStates.map((state, index) => {
                            const Icon = getEmotionalIcon(state);
                            const colors = getEmotionalColor(state);
                            return (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 font-medium bg-[#f3f4f6] text-[#374151]"
                              >
                                <Icon className="w-3.5 h-3.5" stroke={2} style={{ color: colors.icon }} />
                                {state}
                                <button
                                  onClick={() => setEmotionalStates(currentPersona.emotionalStates.filter((_, i) => i !== index))}
                                  className="hover:opacity-70 transition-opacity ml-0.5 text-[#6b7280]"
                                >
                                  <IconX className="w-3 h-3" stroke={2} />
                                </button>
                              </span>
                            );
                          })}
                          {/* Dropdown selector for emotional states */}
                          <div className="relative">
                            <button
                              onClick={() => setShowEmotionalDropdown(!showEmotionalDropdown)}
                              className="px-3 py-1.5 border border-dashed border-[#d0d0d0] rounded-full text-sm text-[#8d8ba7] hover:border-[#0975d7] hover:text-[#0975d7] transition-colors flex items-center gap-1.5"
                            >
                              <IconPlus className="w-3.5 h-3.5" stroke={2} />
                              Add
                              <IconChevronDown className={`w-3 h-3 transition-transform ${showEmotionalDropdown ? 'rotate-180' : ''}`} stroke={2} />
                            </button>
                            {showEmotionalDropdown && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowEmotionalDropdown(false)} />
                                <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#ececf3] rounded-lg shadow-lg z-20 max-h-56 overflow-y-auto py-1">
                                  {emotionalStateOptions
                                    .filter(option => !currentPersona.emotionalStates.includes(option))
                                    .map((option) => {
                                      const Icon = getEmotionalIcon(option);
                                      const colors = getEmotionalColor(option);
                                      return (
                                        <button
                                          key={option}
                                          onClick={() => {
                                            setEmotionalStates([...currentPersona.emotionalStates, option]);
                                            setShowEmotionalDropdown(false);
                                          }}
                                          className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f7fa] transition-colors flex items-center gap-2"
                                        >
                                          <Icon className="w-4 h-4" stroke={2} style={{ color: colors.icon }} />
                                          <span style={{ color: colors.text }}>{option}</span>
                                        </button>
                                      );
                                    })}
                                  {emotionalStateOptions.filter(option => !currentPersona.emotionalStates.includes(option)).length === 0 && (
                                    <p className="px-3 py-2 text-sm text-[#8d8ba7] italic">All options selected</p>
                          )}
                        </div>
                              </>
                            )}
                      </div>
                        </div>
                      </div>

                      {/* Behavioral Traits */}
                      <div>
                        <p className="text-xs font-medium text-[#6b697b] uppercase tracking-wide mb-2">Behavioral traits</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {currentPersona.behavioralTraits.map((trait, index) => {
                            const Icon = getBehavioralIcon(trait);
                            const colors = getBehavioralColor(trait);
                            return (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 font-medium bg-[#f3f4f6] text-[#374151]"
                              >
                                <Icon className="w-3.5 h-3.5" stroke={2} style={{ color: colors.icon }} />
                                {trait}
                                <button
                                  onClick={() => setBehavioralTraits(currentPersona.behavioralTraits.filter((_, i) => i !== index))}
                                  className="hover:opacity-70 transition-opacity ml-0.5 text-[#6b7280]"
                                >
                                  <IconX className="w-3 h-3" stroke={2} />
                                </button>
                              </span>
                            );
                          })}
                          {/* Dropdown selector for behavioral traits */}
                          <div className="relative">
                            <button
                              onClick={() => setShowBehavioralDropdown(!showBehavioralDropdown)}
                              className="px-3 py-1.5 border border-dashed border-[#d0d0d0] rounded-full text-sm text-[#8d8ba7] hover:border-[#0975d7] hover:text-[#0975d7] transition-colors flex items-center gap-1.5"
                            >
                              <IconPlus className="w-3.5 h-3.5" stroke={2} />
                              Add
                              <IconChevronDown className={`w-3 h-3 transition-transform ${showBehavioralDropdown ? 'rotate-180' : ''}`} stroke={2} />
                            </button>
                            {showBehavioralDropdown && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowBehavioralDropdown(false)} />
                                <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#ececf3] rounded-lg shadow-lg z-20 max-h-56 overflow-y-auto py-1">
                                  {behavioralTraitOptions
                                    .filter(option => !currentPersona.behavioralTraits.includes(option))
                                    .map((option) => {
                                      const Icon = getBehavioralIcon(option);
                                      const colors = getBehavioralColor(option);
                                      return (
                                        <button
                                          key={option}
                                          onClick={() => {
                                            setBehavioralTraits([...currentPersona.behavioralTraits, option]);
                                            setShowBehavioralDropdown(false);
                                          }}
                                          className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f7fa] transition-colors flex items-center gap-2"
                                        >
                                          <Icon className="w-4 h-4" stroke={2} style={{ color: colors.icon }} />
                                          <span style={{ color: colors.text }}>{option}</span>
                                        </button>
                                      );
                                    })}
                                  {behavioralTraitOptions.filter(option => !currentPersona.behavioralTraits.includes(option)).length === 0 && (
                                    <p className="px-3 py-2 text-sm text-[#8d8ba7] italic">All options selected</p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Remarks */}
                <div className="border-b border-[#eee] py-5">
                  <div className="px-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[#2b2b40]">Additional remarks</h3>
                        <p className="text-xs text-[#8d8ba7] mt-0.5">Describe context, behaviour patterns, and other details about this persona</p>
                      </div>
                      {editingField !== "remarks" && (
                        <button
                          onClick={() => setEditingField("remarks")}
                          className="text-[#0975d7] hover:text-[#0861b8] p-1"
                        >
                          <IconPencil className="w-4 h-4" stroke={2} />
                        </button>
                      )}
                    </div>
                    {editingField === "remarks" ? (
                      <textarea
                        value={currentPersona.additionalRemarks}
                        onChange={(e) => setAdditionalRemarks(e.target.value)}
                        onBlur={() => setEditingField(null)}
                        className="bg-white border border-[#0975d7] rounded-lg p-4 min-h-[120px] w-full text-sm text-[#525066] focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 resize-none"
                        placeholder="E.g., Customer is frustrated because their order was delayed for the third time. They have been a loyal customer for 5 years and expect better service..."
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => setEditingField("remarks")}
                        className="bg-[#fafafa] border border-[#e8e8e8] rounded-lg p-4 min-h-[120px] cursor-text hover:border-[#0975d7] transition-colors"
                      >
                        <p className="text-sm text-[#525066] whitespace-pre-wrap leading-relaxed">
                          {currentPersona.additionalRemarks || "Click to add additional context and remarks about this persona..."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "evaluation" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-[#eee] py-4 shrink-0">
                  <div className="px-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Evaluation</h2>
                      <p className="text-sm text-[#8d8ba7]">Select competencies to assess</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Show either save controls OR normal controls, not both */}
                      {hasEvaluationChanges ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={discardEvaluationChanges}
                            className="px-3 py-2 text-sm text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg transition-colors"
                          >
                            Discard
                          </button>
                          <button
                            onClick={saveEvaluationChanges}
                            disabled={isSavingEvaluation}
                            className="flex items-center gap-2 px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors text-sm font-medium disabled:opacity-70"
                          >
                            {isSavingEvaluation ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <IconCheck className="w-4 h-4" stroke={2} />
                                Save changes
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <>
                      {/* Template Menu - only show when no unsaved changes */}
                      <div className="relative" data-evaluation-template-menu>
                        <button
                          onClick={() => {
                            setShowEvaluationTemplateMenu(!showEvaluationTemplateMenu);
                            setEvaluationMenuView("main");
                          }}
                          className="flex items-center gap-2 px-3 py-2 border border-[#d7d6d1] text-[#525066] rounded-lg hover:bg-[#f5f5f5] transition-colors text-sm font-medium"
                        >
                          <IconDeviceFloppy className="w-4 h-4" stroke={2} />
                          Templates
                          <IconChevronDown className={`w-3 h-3 transition-transform ${showEvaluationTemplateMenu ? 'rotate-180' : ''}`} stroke={2} />
                        </button>
                        {showEvaluationTemplateMenu && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => {
                                setShowEvaluationTemplateMenu(false);
                                setEvaluationMenuView("main");
                              }}
                            />
                            <div className="absolute right-0 top-[calc(100%+4px)] bg-white rounded-xl shadow-xl border border-[#e4e4e7] w-80 z-50 overflow-hidden">
                              {evaluationMenuView === "main" && (
                                <div className="py-2">
                                  <button
                                    onClick={() => setEvaluationMenuView("load")}
                                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-[#f0fff4] flex items-center justify-center">
                                      <IconDownload className="w-4 h-4 text-[#10b981]" stroke={2} />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-[#2b2b40]">Load template</p>
                                      <p className="text-xs text-[#8d8ba7]">Use a saved template</p>
                                    </div>
                                    <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEvaluationMenuView("save");
                                      setNewEvaluationTemplateName("");
                                      setNewEvaluationTemplateDescription("");
                                    }}
                                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                                      <IconDeviceFloppy className="w-4 h-4 text-[#d97706]" stroke={2} />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-[#2b2b40]">Save as template</p>
                                      <p className="text-xs text-[#8d8ba7]">Save current parameters</p>
                                    </div>
                                    <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                                  </button>
                                </div>
                              )}
                              {evaluationMenuView === "load" && (
                                <div>
                                  <div className="px-4 py-3 border-b border-[#ececf3] flex items-center gap-2">
                                    <button onClick={() => setEvaluationMenuView("main")} className="p-1 hover:bg-[#f0f0f5] rounded">
                                      <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                    </button>
                                    <span className="text-sm font-medium text-[#2b2b40]">Load template</span>
                                  </div>
                                  <div className="max-h-64 overflow-y-auto">
                                    {evaluationTemplates.length === 0 ? (
                                      <div className="px-4 py-6 text-center">
                                        <p className="text-sm text-[#8d8ba7]">No templates saved yet</p>
                                      </div>
                                    ) : (
                                      evaluationTemplates.map((template) => (
                                        <button
                                          key={template.id}
                                          onClick={() => loadEvaluationFromTemplate(template)}
                                          className="w-full text-left px-4 py-3 hover:bg-[#f5f7fa] transition-colors border-b border-[#f5f5f5] last:border-b-0"
                                        >
                                          <p className="text-sm font-medium text-[#2b2b40]">{template.name}</p>
                                          <p className="text-xs text-[#8d8ba7] mt-0.5">{template.description}</p>
                                          <div className="flex flex-wrap gap-1 mt-2">
                                            {template.parameters.slice(0, 2).map((param, idx) => (
                                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#e0f2fe] text-[#0369a1]">
                                                {param.title.length > 25 ? param.title.substring(0, 25) + '...' : param.title}
                                              </span>
                                            ))}
                                            {template.parameters.length > 2 && (
                                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f0f5] text-[#6b697b]">
                                                +{template.parameters.length - 2} more
                                              </span>
                                            )}
                                          </div>
                                        </button>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )}
                              {evaluationMenuView === "save" && (
                                <div>
                                  <div className="px-4 py-3 border-b border-[#ececf3] flex items-center gap-2">
                                    <button onClick={() => setEvaluationMenuView("main")} className="p-1 hover:bg-[#f0f0f5] rounded">
                                      <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                                    </button>
                                    <span className="text-sm font-medium text-[#2b2b40]">Save as template</span>
                                  </div>
                                  <div className="p-4 space-y-3">
                                    <div>
                                      <label className="block text-xs font-medium text-[#6b697b] mb-1">Template name</label>
                                      <input
                                        type="text"
                                        value={newEvaluationTemplateName}
                                        onChange={(e) => setNewEvaluationTemplateName(e.target.value)}
                                        placeholder="E.g., Customer support basics"
                                        className="w-full px-3 py-2 text-sm border border-[#d7d6d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-[#6b697b] mb-1">Description</label>
                                      <input
                                        type="text"
                                        value={newEvaluationTemplateDescription}
                                        onChange={(e) => setNewEvaluationTemplateDescription(e.target.value)}
                                        placeholder="Brief description..."
                                        className="w-full px-3 py-2 text-sm border border-[#d7d6d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#8d8ba7] bg-[#f5f7fa] rounded-lg px-3 py-2">
                                      <IconClipboardCheck className="w-4 h-4" stroke={2} />
                                      <span>{evaluationParameters.length} parameter{evaluationParameters.length !== 1 ? 's' : ''} will be saved</span>
                                    </div>
                                    <button
                                      onClick={saveEvaluationAsTemplate}
                                      disabled={!newEvaluationTemplateName.trim() || evaluationParameters.length === 0}
                                      className="w-full py-2 text-sm font-medium text-white bg-[#0975d7] rounded-lg hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      Save template
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                        </>
                      )}

                      {/* Add button */}
                      <button
                        onClick={() => {
                          const newId = String(evaluationParameters.length + 1);
                          const newParameter: EvaluationParameter = {
                            id: newId,
                            title: "New evaluation parameter",
                            criteria: [
                              "0-2: [Enter description]",
                              "3-4: [Enter description]",
                              "5-6: [Enter description]",
                              "7-8: [Enter description]",
                              "9-10: [Enter description]",
                            ],
                            mappedCompetency: "Empathy",
                          };
                          setEvaluationParameters([newParameter, ...evaluationParameters]);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0975d7] text-white rounded-lg hover:bg-[#0861b8] transition-colors text-sm font-medium"
                      >
                        <IconPlus className="w-4 h-4" stroke={2} />
                        Add evaluation parameter
                      </button>
                    </div>
                  </div>
                </div>

                {/* Evaluation Parameters */}
                <div className="flex-1 overflow-y-auto">
                  {evaluationParameters.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center mb-3">
                        <IconClipboardCheck className="w-6 h-6 text-[#9ca3af]" stroke={1.5} />
                      </div>
                      <h3 className="text-sm font-medium text-[#374151] mb-1">No evaluation parameters</h3>
                      <p className="text-xs text-[#9ca3af] max-w-xs">Add parameters to define assessment criteria</p>
                    </div>
                  ) : (
                    evaluationParameters.map((parameter) => {
                      const scoreRanges = ["0-2", "3-4", "5-6", "7-8", "9-10"];
                      
                      return (
                        <div 
                          key={parameter.id} 
                          className="border-b border-[#e5e7eb]"
                        >
                          {/* Header Row */}
                          <div className="px-6 py-4 flex items-center gap-4">
                            {/* Title */}
                            <div className="flex-1 min-w-0">
                              {editingEvaluation?.type === "title" && editingEvaluation.parameterId === parameter.id ? (
                                <input
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue.trim()) {
                                      setEvaluationParameters(
                                        evaluationParameters.map((p) =>
                                          p.id === parameter.id ? { ...p, title: editingValue.trim() } : p
                                        )
                                      );
                                    }
                                    setEditingEvaluation(null);
                                    setEditingValue("");
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && editingValue.trim()) {
                                      setEvaluationParameters(
                                        evaluationParameters.map((p) =>
                                          p.id === parameter.id ? { ...p, title: editingValue.trim() } : p
                                        )
                                      );
                                      setEditingEvaluation(null);
                                      setEditingValue("");
                                    } else if (e.key === "Escape") {
                                      setEditingEvaluation(null);
                                      setEditingValue("");
                                    }
                                  }}
                                  className="w-full text-sm font-medium text-[#1f2937] border-b border-[#0975d7] focus:outline-none bg-transparent"
                                  autoFocus
                                />
                              ) : (
                                <div className="flex items-center gap-2 group/title">
                                  <span className="text-sm font-medium text-[#1f2937]">
                                    {parameter.title}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setEditingEvaluation({ type: "title", parameterId: parameter.id });
                                      setEditingValue(parameter.title);
                                    }}
                                    className="opacity-0 group-hover/title:opacity-100 p-0.5 rounded hover:bg-[#f0f0f0] transition-all"
                                  >
                                    <IconPencil className="w-3 h-3 text-[#9ca3af]" stroke={2} />
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            {/* Competency */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm text-[#9ca3af]">Mapped competency</span>
                              <div className="relative" data-competency-dropdown>
                                <button
                                  onClick={() => {
                                    setOpenCompetencyDropdown(
                                      openCompetencyDropdown === parameter.id ? null : parameter.id
                                    );
                                  }}
                                  className="flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-md border border-dashed border-[#d1d5db] hover:border-[#059669] hover:bg-[#ecfdf5] transition-colors"
                                >
                                  <span className="text-[#059669] font-medium">{parameter.mappedCompetency}</span>
                                  <IconChevronDown className={`w-3 h-3 text-[#059669] transition-transform ${openCompetencyDropdown === parameter.id ? 'rotate-180' : ''}`} stroke={2} />
                                </button>
                                {openCompetencyDropdown === parameter.id && (
                                  <div className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-lg shadow-lg border border-[#e5e7eb] py-1 min-w-[180px] z-50 max-h-[280px] overflow-y-auto">
                                    {availableCompetencies.map((competency) => (
                                      <button
                                        key={competency}
                                        onClick={() => {
                                          setEvaluationParameters(
                                            evaluationParameters.map((p) =>
                                              p.id === parameter.id
                                                ? { ...p, mappedCompetency: competency }
                                                : p
                                            )
                                          );
                                          setOpenCompetencyDropdown(null);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f5f5f5] transition-colors ${
                                          parameter.mappedCompetency === competency
                                            ? 'bg-[#ecfdf5] text-[#059669] font-medium'
                                            : 'text-[#374151]'
                                        }`}
                                      >
                                        {competency}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Delete */}
                            <button
                              onClick={() => {
                                setEvaluationParameters(
                                  evaluationParameters.filter((p) => p.id !== parameter.id)
                                );
                              }}
                              className="p-1.5 rounded hover:bg-[#fef2f2] transition-colors group/del shrink-0"
                              title="Delete parameter"
                            >
                              <IconTrash className="w-4 h-4 text-[#d1d5db] group-hover/del:text-[#ef4444]" stroke={1.5} />
                            </button>
                          </div>
                          
                          {/* Criteria List */}
                          <div className="px-6 pb-5 pt-1">
                            <div className="space-y-0">
                                {parameter.criteria.map((criterion, index) => {
                                  const scoreMatch = criterion.match(/^(\d+-\d+):\s*(.*)$/);
                                  const scoreRange = scoreMatch ? scoreMatch[1] : scoreRanges[index] || "";
                                  const description = scoreMatch ? scoreMatch[2] : criterion;
                                  const isEditing = editingEvaluation?.type === "criteria" &&
                                    editingEvaluation.parameterId === parameter.id &&
                                    editingEvaluation.criteriaIndex === index;
                                  
                                  return (
                                    <div 
                                      key={index} 
                                      className={`flex items-start gap-3 py-2.5 px-2 -mx-2 rounded-md group/row transition-all ${
                                        isEditing 
                                          ? 'bg-[#f0f7ff]' 
                                          : 'hover:bg-[#f9fafb] cursor-pointer'
                                      }`}
                                      onClick={() => {
                                        if (!isEditing) {
                                          setEditingEvaluation({
                                            type: "criteria",
                                            parameterId: parameter.id,
                                            criteriaIndex: index,
                                          });
                                          setEditingValue(description);
                                        }
                                      }}
                                    >
                                      <span className="text-xs font-medium text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded w-12 text-center shrink-0 mt-0.5">
                                        {scoreRange}
                                      </span>
                                      {isEditing ? (
                                        <textarea
                                          value={editingValue}
                                          onChange={(e) => setEditingValue(e.target.value)}
                                          onBlur={() => {
                                            if (editingValue.trim()) {
                                              const newCriteria = [...parameter.criteria];
                                              newCriteria[index] = `${scoreRange}: ${editingValue.trim()}`;
                                              setEvaluationParameters(
                                                evaluationParameters.map((p) =>
                                                  p.id === parameter.id ? { ...p, criteria: newCriteria } : p
                                                )
                                              );
                                            }
                                            setEditingEvaluation(null);
                                            setEditingValue("");
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey && editingValue.trim()) {
                                              e.preventDefault();
                                              const newCriteria = [...parameter.criteria];
                                              newCriteria[index] = `${scoreRange}: ${editingValue.trim()}`;
                                              setEvaluationParameters(
                                                evaluationParameters.map((p) =>
                                                  p.id === parameter.id ? { ...p, criteria: newCriteria } : p
                                              )
                                              );
                                              setEditingEvaluation(null);
                                              setEditingValue("");
                                            } else if (e.key === "Escape") {
                                              setEditingEvaluation(null);
                                              setEditingValue("");
                                            }
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex-1 text-sm text-[#374151] bg-white rounded-md px-3 py-2 border border-[#0975d7] focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 resize-none"
                                          autoFocus
                                          rows={2}
                                        />
                                      ) : (
                                        <div className="flex-1 flex items-start gap-2 group/text">
                                          <p className="flex-1 text-sm text-[#4b5563] leading-relaxed">{description}</p>
                                          <IconPencil className="w-3.5 h-3.5 text-[#d1d5db] opacity-0 group-hover/row:opacity-100 transition-opacity shrink-0 mt-0.5" stroke={2} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === "exit" && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white">
                <div className="border-b border-[#eee] py-4 shrink-0">
                  <div className="px-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Exit conditions</h2>
                      <p className="text-sm text-[#8d8ba7]">Define when the scenario should end</p>
                    </div>
                    <button
                      onClick={addExitCondition}
                      className="flex items-center gap-2 px-4 py-2 border border-[#e5e5ea] text-[#2b2b40] rounded-lg hover:bg-[#f5f5f7] transition-colors text-sm font-medium"
                    >
                      <IconPlus className="w-4 h-4" stroke={2} />
                      Add condition
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto py-6 px-6">
                  <div className="max-w-4xl mx-auto space-y-3">
                    {exitConditions.map((condition, index) => {
                      const Icon = getExitConditionIcon(condition.trigger);
                      const isEditingTrigger = editingExitCondition?.id === condition.id && editingExitCondition?.field === "trigger";
                      const isEditingAction = editingExitCondition?.id === condition.id && editingExitCondition?.field === "action";

                      return (
                        <div key={condition.id} className="group">
                          {/* Condition row */}
                          <div className="flex items-center gap-3 p-4 bg-[#fafafa] rounded-lg border border-[#e5e5ea] hover:border-[#d1d1d6] transition-colors">
                            {/* Number indicator */}
                            <div className="shrink-0 w-6 h-6 rounded-full bg-[#e5e5ea] flex items-center justify-center">
                              <span className="text-xs font-medium text-[#6b697b]">{index + 1}</span>
                            </div>

                            {/* Icon - auto-assigned based on trigger text */}
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-[#e5e5ea] flex items-center justify-center">
                              <Icon className="w-4 h-4 text-[#6b697b]" stroke={2} />
                            </div>

                            {/* Condition text */}
                            <div className="flex-1 flex items-center gap-2 min-w-0">
                              <span className="text-xs font-semibold text-[#8d8ba7] uppercase tracking-wide shrink-0">If</span>
                              {isEditingTrigger ? (
                                <input
                                  type="text"
                                  value={exitConditionEditValue}
                                  onChange={(e) => setExitConditionEditValue(e.target.value)}
                                  onBlur={() => {
                                    if (exitConditionEditValue.trim()) {
                                      updateExitCondition(condition.id, "trigger", exitConditionEditValue.trim());
                                    }
                                    setEditingExitCondition(null);
                                    setExitConditionEditValue("");
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && exitConditionEditValue.trim()) {
                                      updateExitCondition(condition.id, "trigger", exitConditionEditValue.trim());
                                      setEditingExitCondition(null);
                                      setExitConditionEditValue("");
                                    } else if (e.key === "Escape") {
                                      setEditingExitCondition(null);
                                      setExitConditionEditValue("");
                                    }
                                  }}
                                  className="flex-1 text-sm text-[#2b2b40] border-b border-[#0975d7] focus:outline-none bg-transparent"
                                  autoFocus
                                />
                              ) : (
                                <span
                                  onClick={() => {
                                    setEditingExitCondition({ id: condition.id, field: "trigger" });
                                    setExitConditionEditValue(condition.trigger);
                                  }}
                                  className="text-sm text-[#2b2b40] cursor-text hover:text-[#0975d7] transition-colors"
                                >
                                  {condition.trigger}
                                </span>
                              )}
                            </div>

                            {/* Arrow */}
                            <IconArrowRight className="shrink-0 w-4 h-4 text-[#c5c5c5]" stroke={2} />

                            {/* Action text */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-semibold text-[#8d8ba7] uppercase tracking-wide shrink-0">Then</span>
                              {isEditingAction ? (
                                <input
                                  type="text"
                                  value={exitConditionEditValue}
                                  onChange={(e) => setExitConditionEditValue(e.target.value)}
                                  onBlur={() => {
                                    if (exitConditionEditValue.trim()) {
                                      updateExitCondition(condition.id, "action", exitConditionEditValue.trim());
                                    }
                                    setEditingExitCondition(null);
                                    setExitConditionEditValue("");
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && exitConditionEditValue.trim()) {
                                      updateExitCondition(condition.id, "action", exitConditionEditValue.trim());
                                      setEditingExitCondition(null);
                                      setExitConditionEditValue("");
                                    } else if (e.key === "Escape") {
                                      setEditingExitCondition(null);
                                      setExitConditionEditValue("");
                                    }
                                  }}
                                  className="flex-1 text-sm text-[#2b2b40] border-b border-[#0975d7] focus:outline-none bg-transparent"
                                  autoFocus
                                />
                              ) : (
                                <span
                                  onClick={() => {
                                    setEditingExitCondition({ id: condition.id, field: "action" });
                                    setExitConditionEditValue(condition.action);
                                  }}
                                  className="text-sm text-[#2b2b40] cursor-text hover:text-[#0975d7] transition-colors"
                                >
                                  {condition.action}
                                </span>
                              )}
                            </div>

                            {/* Delete button */}
                            <button
                              onClick={() => deleteExitCondition(condition.id)}
                              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#fee2e2] rounded"
                              title="Delete condition"
                            >
                              <IconX className="w-3.5 h-3.5 text-[#dc2626]" stroke={2} />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Empty state */}
                    {exitConditions.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                          <IconDoorExit className="w-6 h-6 text-[#8d8ba7]" stroke={1.5} />
                        </div>
                        <p className="text-sm text-[#8d8ba7] mb-4">No exit conditions defined</p>
                        <button
                          onClick={addExitCondition}
                          className="text-sm text-[#0975d7] hover:underline font-medium"
                        >
                          Add your first condition
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Helper text */}
                  {exitConditions.length > 0 && (
                    <p className="mt-6 text-center text-xs text-[#b5b5b5]">
                      Click text to edit
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
                  </div>
                </div>

      {/* Workflow Selection Modal */}
      {showWorkflowModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee]">
              <h2 className="text-xl font-semibold text-[#2b2b40]">Select Workflow</h2>
              <button
                onClick={() => setShowWorkflowModal(false)}
                className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
              >
                <IconX className="w-5 h-5 text-[#6b697b]" stroke={2} />
              </button>
                  </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Tabs and Search */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee]">
                <div className="flex gap-6">
                  <button
                    onClick={() => setWorkflowTab("draft")}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                      workflowTab === "draft"
                        ? "text-[#0975d7] border-[#0975d7]"
                        : "text-[#6b697b] border-transparent hover:text-[#3d3c52]"
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => setWorkflowTab("ready")}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                      workflowTab === "ready"
                        ? "text-[#0975d7] border-[#0975d7]"
                        : "text-[#6b697b] border-transparent hover:text-[#3d3c52]"
                    }`}
                  >
                    Ready
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for the workflow"
                    value={workflowSearchQuery}
                    onChange={(e) => setWorkflowSearchQuery(e.target.value)}
                    className="w-[220px] pl-3 pr-10 py-2 text-sm border border-[#d7d6d1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                  />
                  <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b697b]" stroke={2} />
              </div>
              </div>

              {/* Workflow List */}
              <div className="flex-1 overflow-y-auto">
                {availableWorkflows
                  .filter((w) =>
                    w.name.toLowerCase().includes(workflowSearchQuery.toLowerCase())
                  )
                  .map((workflow) => (
                    <label
                      key={workflow.id}
                      className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0] cursor-pointer hover:bg-[#fafafa] transition-colors"
                    >
                      <span className="text-sm text-[#2b2b40]">{workflow.name}</span>
                      <div className="relative">
                        <input
                          type="radio"
                          name="workflow"
                          value={workflow.id}
                          checked={selectedWorkflowId === workflow.id}
                          onChange={() => setSelectedWorkflowId(workflow.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedWorkflowId === workflow.id
                              ? "border-[#0975d7] bg-[#0975d7]"
                              : "border-[#d7d6d1]"
                          }`}
                        >
                          {selectedWorkflowId === workflow.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>
                    </label>
                  ))}
      </div>
    </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#eee] bg-[#fafafa]">
              <button className="text-sm text-[#0975d7] hover:underline">
                Don't have a workflow, create one
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWorkflowModal(false)}
                  className="px-5 py-2.5 text-sm font-medium text-[#3d3c52] bg-white border border-[#d7d6d1] rounded-md hover:bg-[#f5f5f5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const selectedWorkflow = availableWorkflows.find(
                      (w) => w.id === selectedWorkflowId
                    );
                    if (selectedWorkflow) {
                      // If workflow is already attached and user is selecting a different one, show warning
                      if (attachedWorkflow && attachedWorkflow.id !== selectedWorkflowId) {
                        setPendingWorkflowId(selectedWorkflowId);
                        setShowWarningDialog(true);
                        setShowWorkflowModal(false);
                      } else if (onAttachWorkflow) {
                        // If no workflow attached or same workflow selected, attach directly
                        onAttachWorkflow(selectedWorkflow.id, selectedWorkflow.name);
                        setShowWorkflowModal(false);
                      }
                    }
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#0975d7] rounded-md hover:bg-[#0861b8] transition-colors"
                >
                  {attachedWorkflow ? "Update" : "Attach"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Dialog for Workflow Update */}
      {showWarningDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-5 border-b border-[#eee]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center flex-shrink-0">
                  <IconAlertCircle className="size-5 text-[#f59e0b]" stroke={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1f2937]">Update workflow?</h3>
                  <p className="text-sm text-[#6b7280] mt-1">This will replace the current workflow</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="bg-[#fef3c7] border border-[#fde68a] rounded-md p-4 mb-4">
                <p className="text-sm text-[#92400e] font-medium mb-2">Warning</p>
                <p className="text-sm text-[#92400e]">
                  Updating the workflow will disrupt any ongoing training sessions, active learners, or scheduled activities associated with this roleplay. This action cannot be undone.
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6b7280] mt-1.5 flex-shrink-0"></div>
                  <p className="text-[#4b5563]">
                    <span className="font-medium">Current workflow:</span> {attachedWorkflow?.name}
                  </p>
                </div>
                {pendingWorkflowId && (
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0975d7] mt-1.5 flex-shrink-0"></div>
                    <p className="text-[#4b5563]">
                      <span className="font-medium">New workflow:</span> {availableWorkflows.find(w => w.id === pendingWorkflowId)?.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#eee] flex items-center justify-end gap-3 bg-[#fafafa]">
              <button
                onClick={() => {
                  setShowWarningDialog(false);
                  setPendingWorkflowId(null);
                }}
                className="px-5 py-2.5 text-sm font-medium text-[#3d3c52] bg-white border border-[#d7d6d1] rounded-md hover:bg-[#f5f5f5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (pendingWorkflowId && onAttachWorkflow) {
                    const selectedWorkflow = availableWorkflows.find(
                      (w) => w.id === pendingWorkflowId
                    );
                    if (selectedWorkflow) {
                      onAttachWorkflow(selectedWorkflow.id, selectedWorkflow.name);
                    }
                  }
                  setShowWarningDialog(false);
                  setPendingWorkflowId(null);
                }}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#dc2626] rounded-md hover:bg-[#b91c1c] transition-colors"
              >
                Update workflow
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}