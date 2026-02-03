import { IconArrowRight, IconLoader2, IconFileText, IconArrowLeft, IconMoodAngry, IconMoodSad, IconMoodNeutral, IconHeadphones, IconMessageCircle, IconTemplate, IconPlus, IconX, IconUser, IconCalendar, IconPlayerPlay, IconDotsVertical } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgAlexJonathan from "@/assets/Alex.png";

// Sample roleplay data
const existingRoleplays = [
  {
    id: "1",
    title: "Handling angry customer for refund",
    description: "Customer wants full refund for damaged product",
    createdBy: "Sarah Johnson",
    createdAt: "2026-01-28",
    modality: "Voice",
    difficulty: "High",
    status: "Published",
    attachedWorkflow: {
      id: "3",
      name: "Refund request | Billing system"
    }
  },
  {
    id: "2",
    title: "Upselling premium subscription",
    description: "Convert free users to paid plans",
    createdBy: "Mike Chen",
    createdAt: "2026-01-25",
    modality: "Chat",
    difficulty: "Medium",
    status: "Draft",
    attachedWorkflow: null
  },
  {
    id: "3",
    title: "Technical support troubleshooting",
    description: "Help customer resolve login issues",
    createdBy: "Sarah Johnson",
    createdAt: "2026-01-20",
    modality: "Voice",
    difficulty: "Low",
    status: "Published",
    attachedWorkflow: {
      id: "1",
      name: "New claim | Guidewire 2"
    }
  },
  {
    id: "4",
    title: "New feature walkthrough",
    description: "Guide customer through new dashboard features",
    createdBy: "Alex Rivera",
    createdAt: "2026-01-15",
    modality: "Hybrid",
    difficulty: "Medium",
    status: "Published",
    attachedWorkflow: null
  },
  {
    id: "5",
    title: "Cancellation prevention",
    description: "Retain customers who want to cancel subscription",
    createdBy: "Mike Chen",
    createdAt: "2026-01-10",
    modality: "Voice",
    difficulty: "High",
    status: "Draft",
    attachedWorkflow: {
      id: "5",
      name: "Cancel order | Order system"
    }
  }
];

// Template definitions for persona
const personaTemplates = [
  {
    id: "angry-refund",
    name: "Angry refund seeker",
    customerName: "Alex",
    emotion: "Frustrated",
    scenario: "they want a full refund for a product they bought"
  },
  {
    id: "confused-user",
    name: "Confused new user",
    customerName: "Jordan",
    emotion: "Confused",
    scenario: "they can't access their account"
  },
  {
    id: "delayed-order",
    name: "Disappointed by delay",
    customerName: "Sam",
    emotion: "Disappointed",
    scenario: "their order was delayed"
  },
  {
    id: "damaged-product",
    name: "Received damaged item",
    customerName: "Taylor",
    emotion: "Angry",
    scenario: "they received a damaged product"
  }
];

// Template definitions for evaluation
const evaluationTemplates = [
  {
    id: "de-escalation",
    name: "De-escalation focus",
    criteria: ["Empathy", "De-escalation", "Policy adherence"]
  },
  {
    id: "problem-solving",
    name: "Problem solving focus",
    criteria: ["Problem-solving", "Patience", "Product knowledge"]
  },
  {
    id: "communication",
    name: "Communication skills",
    criteria: ["Active listening", "Professionalism", "Communication"]
  },
  {
    id: "conflict-resolution",
    name: "Conflict resolution",
    criteria: ["Empathy", "Conflict resolution", "Time management"]
  }
];

interface ScenarioBuilderProps {
  onBack: () => void;
  onSwitchToPrompt: () => void;
  onGenerateScenario: (data: {
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
  }) => void;
  onNavigateToDetail?: (roleplayId: string, workflow?: { id: string; name: string } | null) => void;
}

interface CustomerPersona {
  name: string;
  gender: string;
  age: number;
  location: string;
  avatar?: string | null;
  emotionalStates?: string[];
  behavioralTraits?: string[];
  reasonForContact?: string;
  likelyBehaviour?: string;
}

export function ScenarioBuilder({ onBack, onSwitchToPrompt, onGenerateScenario, onNavigateToDetail }: ScenarioBuilderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [customInputField, setCustomInputField] = useState<string | null>(null);
  const [customInputValue, setCustomInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [evaluationCriteria, setEvaluationCriteria] = useState<string[]>(["Empathy", "De-escalation", "Policy adherence"]);
  const [dropdownView, setDropdownView] = useState<"main" | "templates">("main");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<"tags" | "underline" | "interview" | "story">("tags");
  const [interviewStep, setInterviewStep] = useState(0);
  const [activeStorySlot, setActiveStorySlot] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Display modes for cycling
  const displayModes: Array<"tags" | "underline" | "interview" | "story"> = ["tags", "underline", "interview", "story"];
  const displayModeNames = {
    tags: "Tags",
    underline: "Underline", 
    interview: "Interview",
    story: "Story"
  };

  // Interview mode steps configuration
  const interviewSteps = [
    { field: "trainee", question: "Who are you training?", hint: "Select the role or team that will be practicing this scenario" },
    { field: "customerName", question: "Who is the customer?", hint: "Choose a customer persona for this roleplay" },
    { field: "emotion", question: "How are they feeling?", hint: "Select the customer's emotional state" },
    { field: "scenario", question: "What's the situation?", hint: "Describe why the customer is reaching out" },
    { field: "objective", question: "What should the learner achieve?", hint: "Define the learning goal for this scenario" },
    { field: "criteria", question: "How will you evaluate?", hint: "Select the criteria to assess performance" },
    { field: "modality", question: "What format?", hint: "Choose the communication channel" },
    { field: "difficulty", question: "How challenging?", hint: "Set the difficulty level" },
  ];

  // Keyboard shortcut for toggling display mode (Cmd/Ctrl + Shift + M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setDisplayMode(prev => {
          const currentIndex = displayModes.indexOf(prev);
          const nextIndex = (currentIndex + 1) % displayModes.length;
          return displayModes[nextIndex];
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const customerPersonas: CustomerPersona[] = [
    {
      name: "Alex",
      gender: "Male",
      age: 25,
      location: "Minnesota",
      avatar: imgAlexJonathan,
      emotionalStates: ["Frustrated", "Angry"],
      behavioralTraits: ["Short-tempered", "Angry"],
      reasonForContact: "Wants a full refund for a product they bought",
      likelyBehaviour: "Wants a full refund for a product they bought",
    },
    {
      name: "Jordan",
      gender: "Non-binary",
      age: 30,
      location: "California",
    },
    {
      name: "Sam",
      gender: "Female",
      age: 28,
      location: "Texas",
    },
    {
      name: "Taylor",
      gender: "Male",
      age: 35,
      location: "New York",
    },
    {
      name: "Morgan",
      gender: "Female",
      age: 22,
      location: "Florida",
    },
  ];

  const [values, setValues] = useState({
    trainee: "Customer support executives",
    customerName: "Alex",
    emotion: "Frustrated",
    scenario: "they want a full refund for a product they bought",
    objective: "De-escalate the situation",
    modality: "Audio",
    difficulty: "High"
  });

  const dropdownOptions = {
    trainee: ["Customer support executives", "Sales executives", "Managers", "Technical support team", "Add custom..."],
    customerName: [...personaTemplates.map(t => `template:${t.id}`), ...customerPersonas.map(p => p.name), "Add custom..."],
    emotion: ["Frustrated", "Angry", "Confused", "Disappointed", "Anxious", "Add custom..."],
    scenario: [
      "they want a full refund for a product they bought",
      "their order was delayed",
      "they received a damaged product",
      "they can't access their account",
      "Add custom..."
    ],
    objective: [
      "De-escalate the situation",
      "Resolve the complaint",
      "Upsell additional services",
      "Gather customer feedback",
      "Add custom..."
    ],
    criteria: ["Empathy", "Active listening", "Problem-solving", "Communication", "De-escalation", "Conflict resolution", "Patience", "Professionalism", "Policy adherence", "Product knowledge", "Time management", "Documentation", "Add custom..."],
    evaluationTemplate: evaluationTemplates.map(t => `template:${t.id}`),
    modality: ["Audio", "Chat"],
    difficulty: ["Low", "Medium", "High"]
  };

  const handleSelect = (field: string, value: string) => {
    if (value === "Add custom...") {
      setCustomInputField(field);
      setCustomInputValue("");
    } else if (field === "customerName" && value.startsWith("template:")) {
      // Handle persona template selection
      const templateId = value.replace("template:", "");
      const template = personaTemplates.find(t => t.id === templateId);
      if (template) {
        setValues(prev => ({
          ...prev,
          customerName: template.customerName,
          emotion: template.emotion,
          scenario: template.scenario
        }));
      }
      setOpenDropdown(null);
    } else if (field === "evaluationTemplate" && value.startsWith("template:")) {
      // Handle evaluation template selection
      const templateId = value.replace("template:", "");
      const template = evaluationTemplates.find(t => t.id === templateId);
      if (template) {
        setEvaluationCriteria(template.criteria);
      }
      setOpenDropdown(null);
    } else {
      setValues({ ...values, [field]: value });
      setOpenDropdown(null);
    }
  };

  const handleCriteriaSelect = (index: number, value: string) => {
    if (value === "Add custom...") {
      setCustomInputField(`criteria_${index}`);
      setCustomInputValue("");
    } else {
      const newCriteria = [...evaluationCriteria];
      newCriteria[index] = value;
      setEvaluationCriteria(newCriteria);
      setOpenDropdown(null);
    }
  };

  const handleAddCriteria = () => {
    const availableOptions = dropdownOptions.criteria.filter(
      opt => opt !== "Add custom..." && !evaluationCriteria.includes(opt)
    );
    if (availableOptions.length > 0) {
      setEvaluationCriteria([...evaluationCriteria, availableOptions[0]]);
    }
  };

  const handleRemoveCriteria = (index: number) => {
    if (evaluationCriteria.length > 2) {
      setEvaluationCriteria(evaluationCriteria.filter((_, i) => i !== index));
    }
  };

  const getCustomerPersona = (name: string): CustomerPersona | undefined => {
    return customerPersonas.find(p => p.name === name);
  };

  const getCustomerAttributes = (persona: CustomerPersona): string => {
    return `${persona.gender}, ${persona.age}, ${persona.location}`;
  };

  const getEmotionIcon = (emotion: string) => {
    const lower = emotion.toLowerCase();
    if (lower.includes("angry") || lower.includes("frustrated")) {
      return IconMoodAngry;
    }
    if (lower.includes("sad") || lower.includes("disappointed")) {
      return IconMoodSad;
    }
    if (lower.includes("confused")) {
      return IconMoodNeutral;
    }
    if (lower.includes("anxious")) {
      return IconMoodNeutral;
    }
    return IconMoodNeutral;
  };

  const getEmotionColor = (emotion: string): string => {
    const lower = emotion.toLowerCase();
    if (lower.includes("angry") || lower.includes("frustrated")) {
      return "#dc2626"; // Red
    }
    if (lower.includes("sad") || lower.includes("disappointed")) {
      return "#3b82f6"; // Blue
    }
    if (lower.includes("confused")) {
      return "#f59e0b"; // Amber/Orange
    }
    if (lower.includes("anxious")) {
      return "#f97316"; // Orange
    }
    return "#6b7280"; // Gray
  };

  const getModalityIcon = (modality: string) => {
    const lower = modality.toLowerCase();
    if (lower === "audio") return IconHeadphones;
    if (lower === "chat") return IconMessageCircle;
    return IconHeadphones;
  };

  const getDifficultyLevel = (difficulty: string): number => {
    const lower = difficulty.toLowerCase();
    if (lower === "low") return 1;
    if (lower === "medium") return 2;
    if (lower === "high") return 3;
    return 0;
  };

  const getDifficultyColor = (difficulty: string): string => {
    const lower = difficulty.toLowerCase();
    if (lower === "low") return "#22c55e"; // Green
    if (lower === "medium") return "#f59e0b"; // Amber
    if (lower === "high") return "#ef4444"; // Red
    return "#6b7280"; // Gray
  };

  const DifficultyBars = ({ difficulty, size = 14 }: { difficulty: string; size?: number }) => {
    const level = getDifficultyLevel(difficulty);
    const color = getDifficultyColor(difficulty);
    const barWidth = size / 4;
    const gap = size / 8;
    
    return (
      <div className="flex items-end" style={{ gap: `${gap}px`, height: `${size}px` }}>
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            style={{
              width: `${barWidth}px`,
              height: `${(bar / 3) * size}px`,
              backgroundColor: bar <= level ? color : "#e5e7eb",
              borderRadius: `${barWidth / 4}px`,
            }}
          />
        ))}
      </div>
    );
  };

  const handleCustomSubmit = (field: string) => {
    if (customInputValue.trim()) {
      if (field.startsWith("criteria_")) {
        const index = parseInt(field.replace("criteria_", ""));
        const newCriteria = [...evaluationCriteria];
        newCriteria[index] = customInputValue.trim();
        setEvaluationCriteria(newCriteria);
      } else {
      setValues({ ...values, [field]: customInputValue.trim() });
      }
      setOpenDropdown(null);
      setCustomInputField(null);
      setCustomInputValue("");
    }
  };

  // Get contextual info for custom input fields
  const getCustomInputConfig = (field: string) => {
    const configs: { [key: string]: { label: string; placeholder: string; hint: string; examples?: string[] } } = {
      trainee: {
        label: "Custom trainee role",
        placeholder: "e.g., HR representatives",
        hint: "Enter the job role or team you want to train",
        examples: ["HR representatives", "Account managers", "Team leads", "New hires"]
      },
      customerName: {
        label: "Custom persona name",
        placeholder: "e.g., Chris",
        hint: "Enter a name for your custom customer persona",
        examples: ["Chris", "Jamie", "Riley", "Casey"]
      },
      emotion: {
        label: "Custom emotional state",
        placeholder: "e.g., Skeptical",
        hint: "Describe how the customer is feeling",
        examples: ["Skeptical", "Impatient", "Overwhelmed", "Hopeful"]
      },
      scenario: {
        label: "Custom scenario",
        placeholder: "e.g., they need help with billing",
        hint: "Describe the customer's situation or problem",
        examples: ["they need help with billing", "they want to upgrade their plan", "they're comparing with competitors"]
      },
      objective: {
        label: "Custom learning objective",
        placeholder: "e.g., Build rapport with the customer",
        hint: "What should the learner achieve in this scenario?",
        examples: ["Build rapport with the customer", "Handle objections effectively", "Close the sale"]
      }
    };
    
    // Handle criteria fields
    if (field.startsWith("criteria_")) {
      return {
        label: "Custom evaluation criteria",
        placeholder: "e.g., Negotiation skills",
        hint: "What competency should be evaluated?",
        examples: ["Negotiation skills", "Technical accuracy", "Cultural sensitivity", "Closing ability"]
      };
    }
    
    return configs[field] || {
      label: "Custom value",
      placeholder: "Enter custom value",
      hint: "",
      examples: []
    };
  };

  // Custom Input Component
  const CustomInputPanel = ({ field, onSubmit, onCancel }: { field: string; onSubmit: () => void; onCancel: () => void }) => {
    const config = getCustomInputConfig(field);
    
    return (
      <div className="flex flex-col gap-[10px] px-[16px] py-[12px] w-full min-w-[280px]">
        <div className="flex flex-col gap-[4px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#1f2937]">
            {config.label}
          </p>
          {config.hint && (
            <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6b7280]">
              {config.hint}
            </p>
          )}
        </div>
        <input
          type="text"
          value={customInputValue}
          onChange={(e) => setCustomInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            } else if (e.key === "Escape") {
              onCancel();
            }
          }}
          className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] border border-[#d7d6d1] rounded-[6px] px-[12px] py-[10px] outline-none focus:border-[#0975d7] focus:ring-1 focus:ring-[#0975d7]/20"
          placeholder={config.placeholder}
          autoFocus
        />
        {config.examples && config.examples.length > 0 && (
          <div className="flex flex-col gap-[6px]">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#9ca3af] uppercase tracking-wide">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {config.examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomInputValue(example)}
                  className="px-[8px] py-[4px] rounded-[4px] bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[12px] text-[#4b5563] font-['Inter:Regular',sans-serif] transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-[8px] justify-end mt-[4px]">
          <button
            onClick={onCancel}
            className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#6b697b] text-[13px] px-[12px] py-[6px] rounded-[6px] hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!customInputValue.trim()}
            className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[13px] bg-[#0975d7] px-[12px] py-[6px] rounded-[6px] hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  const DropdownField = ({ 
    field, 
    value, 
    options 
  }: { 
    field: keyof typeof values; 
    value: string; 
    options: string[] 
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isCustomerFieldDropdown = field === "customerName";

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          if (openDropdown === field) {
            setOpenDropdown(null);
            setCustomInputField(null);
            setCustomInputValue("");
            setDropdownView("main");
          }
        }
      };

      if (openDropdown === field) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [openDropdown, field]);


    const isEmotionField = field === "emotion";
    const isCustomerFieldValue = field === "customerName";
    const isDifficultyField = field === "difficulty";
    const isModalityField = field === "modality";
    const EmotionIcon = isEmotionField ? getEmotionIcon(value) : null;
    const emotionColor = isEmotionField ? getEmotionColor(value) : null;
    const customerPersona = isCustomerFieldValue ? getCustomerPersona(value) : null;
    const ModalityIcon = isModalityField ? getModalityIcon(value) : null;

    const tagModeClasses = "inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full bg-white hover:bg-[#f9fafb] border border-[#d1d5db] hover:border-[#9ca3af] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]";
    const underlineModeClasses = "inline-flex items-center gap-[5px] border-b border-dashed border-[#9ca3af] hover:border-[#6b7280] transition-all pb-[1px]";

    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => {
            if (openDropdown === field) {
              setOpenDropdown(null);
              setDropdownView("main");
            } else {
              setOpenDropdown(field);
            }
            setCustomInputField(null);
            setCustomInputValue("");
          }}
          className={displayMode === "tags" ? tagModeClasses : underlineModeClasses}
        >
          {displayMode === "tags" && isDifficultyField && (
            <DifficultyBars difficulty={value} size={14} />
          )}
          {displayMode === "tags" && isModalityField && ModalityIcon && (
            <ModalityIcon className="size-[14px] text-[#6b7280]" stroke={1.5} />
          )}
          {displayMode === "tags" && isEmotionField && EmotionIcon && (
            <EmotionIcon className="size-[14px]" style={{ color: emotionColor || undefined }} stroke={2} />
          )}
          {displayMode === "tags" && isCustomerFieldValue && customerPersona && (
            customerPersona.avatar ? (
              <img
                src={customerPersona.avatar}
                alt={customerPersona.name}
                className="size-[18px] rounded-full object-cover"
              />
            ) : (
              <div className="size-[18px] rounded-full bg-[#e5e7eb] flex items-center justify-center">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] text-[#6b697b] text-[10px]">
                  {customerPersona.name.charAt(0)}
                </p>
              </div>
            )
          )}
          <span className={displayMode === "tags" 
            ? "font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[15px] text-nowrap text-[#1f2937]"
            : "font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[15px] text-nowrap text-[#374151]"
          }>
            {value}
          </span>
        </button>
        {openDropdown === field && (
          <div className="absolute left-0 top-[calc(100%+4px)] bg-white rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] py-[4px] min-w-[200px] max-w-[400px] z-50">
            {customInputField === field ? (
              <CustomInputPanel 
                field={field}
                onSubmit={() => handleCustomSubmit(field)}
                onCancel={() => {
                      setCustomInputField(null);
                      setCustomInputValue("");
                    }}
              />
            ) : (
              <>
                {/* Templates View for Customer Field */}
                {isCustomerFieldDropdown && dropdownView === "templates" ? (
                  <>
                  <button
                      className="flex items-center gap-[8px] px-[12px] py-[8px] w-full hover:bg-[#f5f5f5] transition-colors text-left border-b border-[#f3f4f6]"
                      onClick={() => setDropdownView("main")}
                    >
                      <IconArrowLeft className="size-[14px] text-[#6b697b]" stroke={2} />
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#6b697b] text-[13px]">
                        Back to personas
                      </p>
                  </button>
                    {personaTemplates.map((template) => (
                  <button
                        key={template.id}
                        className="flex items-center gap-[12px] px-[16px] py-[10px] w-full hover:bg-[#f0f9ff] transition-colors text-left"
                        onClick={() => {
                          handleSelect(field, `template:${template.id}`);
                          setDropdownView("main");
                        }}
                      >
                        <div className="w-[32px] h-[32px] rounded-[6px] bg-[#e0f2fe] flex-shrink-0 flex items-center justify-center">
                          <IconFileText className="size-[16px] text-[#0369a1]" stroke={1.5} />
                </div>
                        <div className="flex flex-col items-start">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#0369a1] text-[14px]">
                            {template.name}
                          </p>
                          <p className="font-['Inter:Regular',sans-serif] leading-[16px] text-[#6b697b] text-[12px] mt-[2px]">
                            {template.customerName} • {template.emotion}
                          </p>
              </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {/* Use Template Entry Point for Customer Field */}
                    {isCustomerFieldDropdown && (
                      <button
                        className="flex items-center gap-[10px] px-[16px] py-[10px] w-full hover:bg-[#f0f9ff] transition-colors text-left border-b border-[#f3f4f6] mb-[4px]"
                        onClick={() => setDropdownView("templates")}
                      >
                        <div className="w-[28px] h-[28px] rounded-[6px] bg-[#e0f2fe] flex-shrink-0 flex items-center justify-center">
                          <IconTemplate className="size-[14px] text-[#0369a1]" stroke={1.5} />
                        </div>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#0369a1] text-[14px]">
                          Use template
                        </p>
                        <IconArrowRight className="size-[14px] text-[#0369a1] ml-auto" stroke={2} />
                      </button>
                    )}
                    {options.map((option, index) => {
                      // Skip template options (they're rendered separately)
                      if (option.startsWith("template:")) return null;
                  
                if (isCustomerFieldDropdown && option !== "Add custom...") {
                  const persona = getCustomerPersona(option);
                  if (persona) {
                    return (
                      <button
                        key={index}
                        className="flex items-center gap-[12px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                        onClick={() => handleSelect(field, option)}
                      >
                        {persona.avatar ? (
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-[32px] h-[32px] rounded-[6px] object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-[32px] h-[32px] rounded-[6px] bg-[#e5e7eb] flex-shrink-0 flex items-center justify-center">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#6b697b] text-[14px]">
                              {persona.name.charAt(0)}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-col items-start">
                          <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                            {persona.name}
                          </p>
                          <p className="font-['Inter:Regular',sans-serif] leading-[16px] text-[#6b697b] text-[12px] mt-[2px]">
                            {getCustomerAttributes(persona)}
                          </p>
                        </div>
                      </button>
                    );
                  }
                }
                
                // Handle emotion field with icons
                if (field === "emotion" && option !== "Add custom...") {
                  const EmotionIcon = getEmotionIcon(option);
                  const emotionColor = getEmotionColor(option);
                  return (
                    <button
                      key={index}
                      className="flex items-center gap-[8px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                      onClick={() => handleSelect(field, option)}
                    >
                      <EmotionIcon className="size-[18px]" style={{ color: emotionColor }} stroke={2} />
                      <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                        {option}
                      </p>
                    </button>
                  );
                }

                // Handle modality field with icons
                if (field === "modality") {
                  const ModalityOptionIcon = getModalityIcon(option);
                  return (
                    <button
                      key={index}
                      className="flex items-center gap-[10px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                      onClick={() => handleSelect(field, option)}
                    >
                      <ModalityOptionIcon className="size-[18px] text-[#6b7280]" stroke={1.5} />
                      <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                        {option}
                      </p>
                    </button>
                  );
                }

                // Handle difficulty field with bars
                if (field === "difficulty") {
                  return (
                    <button
                      key={index}
                      className="flex items-center gap-[10px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                      onClick={() => handleSelect(field, option)}
                    >
                      <DifficultyBars difficulty={option} size={16} />
                      <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                        {option}
                      </p>
                    </button>
                  );
                }
                
                return (
                  <button
                    key={index}
                    className="flex items-center px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                    onClick={() => handleSelect(field, option)}
                  >
                    <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                      {option}
                    </p>
                  </button>
                );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  // Criteria Dropdown Component for evaluation parameters
  const CriteriaDropdown = ({ 
    index, 
    value,
    showRemove,
    onRemove
  }: { 
    index: number; 
    value: string;
    showRemove?: boolean;
    onRemove?: () => void;
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const fieldKey = `criteria_${index}`;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          if (openDropdown === fieldKey) {
            setOpenDropdown(null);
            setCustomInputField(null);
            setCustomInputValue("");
            setDropdownView("main");
          }
        }
      };

      if (openDropdown === fieldKey) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [openDropdown, fieldKey]);

    const tagModeClasses = "inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full bg-white hover:bg-[#f9fafb] border border-[#d1d5db] hover:border-[#9ca3af] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]";
    const underlineModeClasses = "inline-flex items-center gap-[5px] border-b border-dashed border-[#9ca3af] hover:border-[#6b7280] transition-all pb-[1px]";

    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => {
            if (openDropdown === fieldKey) {
              setOpenDropdown(null);
              setDropdownView("main");
            } else {
              setOpenDropdown(fieldKey);
            }
            setCustomInputField(null);
            setCustomInputValue("");
          }}
          className={displayMode === "tags" ? tagModeClasses : underlineModeClasses}
        >
          <span className={displayMode === "tags"
            ? "font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[15px] text-nowrap text-[#1f2937]"
            : "font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[15px] text-nowrap text-[#374151]"
          }>
            {value}
          </span>
          {displayMode === "tags" && showRemove && onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="inline-flex items-center justify-center size-[16px] rounded-full bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#6b7280] hover:text-[#4b5563] transition-all ml-[2px]"
              title="Remove evaluation parameter"
            >
              <IconX className="size-[10px]" stroke={2} />
            </button>
          )}
        </button>
        {openDropdown === fieldKey && (
          <div className="absolute left-0 top-[calc(100%+4px)] bg-white rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] py-[4px] min-w-[200px] max-w-[300px] z-50 max-h-[300px] overflow-y-auto">
            {customInputField === fieldKey ? (
              <CustomInputPanel 
                field={fieldKey}
                onSubmit={() => handleCustomSubmit(fieldKey)}
                onCancel={() => {
                  setCustomInputField(null);
                  setCustomInputValue("");
                }}
              />
            ) : dropdownView === "templates" ? (
              <>
                {/* Templates View */}
                <button
                  className="flex items-center gap-[8px] px-[12px] py-[8px] w-full hover:bg-[#f5f5f5] transition-colors text-left border-b border-[#f3f4f6]"
                  onClick={() => setDropdownView("main")}
                >
                  <IconArrowLeft className="size-[14px] text-[#6b697b]" stroke={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#6b697b] text-[13px]">
                    Back to criteria
                  </p>
                </button>
                {evaluationTemplates.map((template) => (
                  <button
                    key={template.id}
                    className="flex items-center gap-[8px] px-[12px] py-[10px] w-full hover:bg-[#f0f9ff] transition-colors text-left"
                    onClick={() => {
                      setEvaluationCriteria(template.criteria);
                      setOpenDropdown(null);
                      setDropdownView("main");
                    }}
                  >
                    <IconFileText className="size-[16px] text-[#0369a1]" stroke={1.5} />
                    <div className="flex flex-col items-start">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#0369a1] text-[14px]">
                        {template.name}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] leading-[16px] text-[#6b697b] text-[11px] mt-[1px]">
                        {template.criteria.join(", ")}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <>
                {/* Main View with Use Template Entry */}
                <button
                  className="flex items-center gap-[10px] px-[16px] py-[10px] w-full hover:bg-[#f0f9ff] transition-colors text-left border-b border-[#f3f4f6] mb-[4px]"
                  onClick={() => setDropdownView("templates")}
                >
                  <div className="w-[28px] h-[28px] rounded-[6px] bg-[#e0f2fe] flex-shrink-0 flex items-center justify-center">
                    <IconTemplate className="size-[14px] text-[#0369a1]" stroke={1.5} />
                  </div>
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#0369a1] text-[14px]">
                    Use template
                  </p>
                  <IconArrowRight className="size-[14px] text-[#0369a1] ml-auto" stroke={2} />
                </button>
                {dropdownOptions.criteria.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    className="flex items-center px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                    onClick={() => {
                      if (option === "Add custom...") {
                        setCustomInputField(fieldKey);
                        setCustomInputValue("");
                      } else {
                        handleCriteriaSelect(index, option);
                      }
                    }}
                  >
                    <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                      {option}
                    </p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  // Story Slot component for Story mode
  const StorySlot = ({ 
    field, 
    value, 
    isActive, 
    onClick 
  }: { 
    field: string; 
    value: string; 
    isActive: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`inline-block px-[6px] py-[2px] mx-[2px] rounded-[4px] transition-all cursor-pointer ${
        isActive
          ? "bg-[#dbeafe] ring-2 ring-[#0975d7] ring-offset-1"
          : value
            ? "bg-[#eff6ff] hover:bg-[#dbeafe] border-b border-dashed border-[#0975d7]"
            : "bg-[#f3f4f6] border-b border-dashed border-[#9ca3af] hover:bg-[#e5e7eb]"
      }`}
    >
      <span className={`font-['Inter:Medium',sans-serif] font-medium text-[15px] ${
        isActive ? "text-[#0975d7]" : value ? "text-[#0975d7]" : "text-[#6b697b] italic"
      }`}>
        {value || "select..."}
      </span>
    </button>
  );

  useEffect(() => {
    const currentRef = dropdownRefs.current[openDropdown || ""];
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [openDropdown]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    return status === "Published" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]";
  };

  const getDifficultyColorClass = (difficulty: string) => {
    if (difficulty === "High") return "text-[#dc2626]";
    if (difficulty === "Medium") return "text-[#f59e0b]";
    return "text-[#22c55e]";
  };

  // Roleplay Sidebar Component
  const RoleplaySidebar = () => (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)] z-50 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#ececf3]">
              <div className="flex flex-col gap-[2px]">
                <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#1f2937]">
                  All roleplays
                </h2>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b7280]">
                  {existingRoleplays.length} scenarios available
                </p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-[8px] rounded-[6px] hover:bg-[#f5f5f5] transition-colors"
              >
                <IconX className="size-[20px] text-[#6b7280]" stroke={2} />
              </button>
            </div>

            {/* Roleplay List */}
            <div className="flex-1 overflow-y-auto">
              {existingRoleplays.map((roleplay) => (
                <div
                  key={roleplay.id}
                  onClick={() => {
                    if (onNavigateToDetail) {
                      setIsSidebarOpen(false);
                      onNavigateToDetail(roleplay.id, roleplay.attachedWorkflow);
                    }
                  }}
                  className="px-[20px] py-[16px] border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-[12px]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[8px] mb-[4px]">
                        <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#1f2937] truncate">
                          {roleplay.title}
                        </h3>
                        <span className={`px-[6px] py-[2px] rounded-[4px] text-[11px] font-['Inter:Medium',sans-serif] font-medium ${getStatusColor(roleplay.status)}`}>
                          {roleplay.status}
                        </span>
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b7280] truncate mb-[10px]">
                        {roleplay.description}
                      </p>
                      
                      {/* Metadata */}
                      <div className="flex items-center gap-[16px] text-[12px]">
                        <div className="flex items-center gap-[4px] text-[#6b7280]">
                          <IconUser className="size-[14px]" stroke={1.5} />
                          <span className="font-['Inter:Regular',sans-serif]">{roleplay.createdBy}</span>
                        </div>
                        <div className="flex items-center gap-[4px] text-[#6b7280]">
                          <IconCalendar className="size-[14px]" stroke={1.5} />
                          <span className="font-['Inter:Regular',sans-serif]">{formatDate(roleplay.createdAt)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-[8px] mt-[10px]">
                        <span className="px-[8px] py-[3px] rounded-[4px] bg-[#f3f4f6] text-[11px] text-[#4b5563] font-['Inter:Medium',sans-serif]">
                          {roleplay.modality}
                        </span>
                        <span className={`text-[11px] font-['Inter:Medium',sans-serif] ${getDifficultyColorClass(roleplay.difficulty)}`}>
                          {roleplay.difficulty} difficulty
                        </span>
                      </div>

                      {/* Workflow Indicator */}
                      {roleplay.attachedWorkflow && (
                        <div className="flex items-center gap-[6px] mt-[8px]">
                          <div className="w-[4px] h-[4px] rounded-full bg-[#0975d7]"></div>
                          <span className="font-['Inter:Regular',sans-serif] text-[11px] text-[#0975d7]">
                            Attached: {roleplay.attachedWorkflow.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div 
                      className="flex items-center gap-[4px] opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="p-[6px] rounded-[4px] hover:bg-[#e5e7eb] transition-colors" title="Preview">
                        <IconPlayerPlay className="size-[16px] text-[#6b7280]" stroke={1.5} />
                      </button>
                      <button className="p-[6px] rounded-[4px] hover:bg-[#e5e7eb] transition-colors" title="More options">
                        <IconDotsVertical className="size-[16px] text-[#6b7280]" stroke={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex-1 bg-[#fcfcfd] flex flex-col overflow-hidden">
      <div className="flex flex-col gap-[12px] items-start p-[16px] flex-1 overflow-auto">
        {/* Header */}
        <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <button 
              onClick={onBack}
              className="flex items-center justify-center p-[8px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
              aria-label="Go back"
            >
              <IconArrowLeft className="size-[20px] text-[#3d3c52]" stroke={2} />
            </button>
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[#3d3c52] text-[22px] text-nowrap">Roleplay</p>
          </div>
          <div className="basis-0 content-stretch flex gap-[602px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 hover:opacity-80 transition-opacity"
            >
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0975d7] text-[16px] text-nowrap">All existing roleplays</p>
            </button>
          </div>
        </div>


        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full relative">
          <div aria-hidden="true" className="absolute border-[#ececf3] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col gap-[12px] items-start relative w-[590px] min-h-[500px]">
            {/* Tab Group - Left aligned above content */}
            <div className="flex gap-[8px] items-center justify-between w-full">
            <div className="flex gap-[8px] items-center bg-white rounded-[8px] p-[4px] border border-[#ececf3] w-fit">
              <motion.button
                onClick={() => {}}
                className="px-[16px] py-[8px] rounded-[6px] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#3d3c52] bg-[#f0f0f0] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Scenario builder
              </motion.button>
              <motion.button
                onClick={onSwitchToPrompt}
                className="px-[16px] py-[8px] rounded-[6px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#6b697b] hover:text-[#3d3c52] hover:bg-[#f5f5f5] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Prompt
              </motion.button>
            </div>

              {/* Mode Indicator */}
              <div 
                className="flex items-center gap-[6px] px-[10px] py-[5px] rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                onClick={() => {
                  setDisplayMode(prev => {
                    const currentIndex = displayModes.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % displayModes.length;
                    return displayModes[nextIndex];
                  });
                }}
                title="Click to switch mode (⌘+Shift+M)"
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#64748b] uppercase tracking-wide">
                  {displayModeNames[displayMode]}
                </span>
                <div className="flex gap-[3px]">
                  {displayModes.map((mode) => (
                    <div 
                      key={mode}
                      className={`w-[6px] h-[6px] rounded-full transition-colors ${
                        mode === displayMode ? "bg-[#0975d7]" : "bg-[#cbd5e1]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* INTERVIEW MODE */}
            {displayMode === "interview" && (
              <motion.div 
                className="flex flex-col w-full mt-[24px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Step indicators */}
                <div className="flex items-center gap-[8px] mb-[32px]">
                  {interviewSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInterviewStep(idx)}
                      className={`flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px] transition-all ${
                        idx === interviewStep
                          ? "bg-[#0975d7] text-white"
                          : idx < interviewStep
                            ? "bg-[#dcfce7] text-[#166534]"
                            : "bg-[#f3f4f6] text-[#6b697b] hover:bg-[#e5e7eb]"
                      }`}
                    >
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Current Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={interviewStep}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col"
                  >
                    <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b697b] mb-[6px]">
                      Step {interviewStep + 1} of {interviewSteps.length}
                    </p>
                    <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-[#3d3c52] leading-[28px]">
                      {interviewSteps[interviewStep].question}
                    </h2>
                    <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b697b] leading-[22px] mt-[8px]">
                      {interviewSteps[interviewStep].hint}
                    </p>

                    {/* Options */}
                    <div className="flex flex-wrap gap-[8px] mt-[20px]">
                      {interviewSteps[interviewStep].field === "criteria" ? (
                        dropdownOptions.criteria.filter(opt => opt !== "Add custom...").map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              if (!evaluationCriteria.includes(option)) {
                                if (evaluationCriteria.length < 5) {
                                  setEvaluationCriteria([...evaluationCriteria, option]);
                                }
                              } else {
                                if (evaluationCriteria.length > 2) {
                                  setEvaluationCriteria(evaluationCriteria.filter(c => c !== option));
                                }
                              }
                            }}
                            className={`px-[14px] py-[10px] rounded-[8px] border transition-all ${
                              evaluationCriteria.includes(option)
                                ? "border-[#0975d7] bg-[#eff6ff] text-[#0975d7]"
                                : "border-[#d7d6d1] bg-white text-[#3d3c52] hover:border-[#9ca3af] hover:bg-[#f9fafb]"
                            }`}
                          >
                            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px]">
                              {option}
                            </span>
                          </button>
                        ))
                      ) : (
                        (dropdownOptions[interviewSteps[interviewStep].field as keyof typeof dropdownOptions] as string[] || [])
                          .filter((opt: string) => opt !== "Add custom..." && !opt.startsWith("template:"))
                          .map((option: string) => {
                            const isSelected = values[interviewSteps[interviewStep].field as keyof typeof values] === option;
                            return (
                              <button
                                key={option}
                                onClick={() => handleSelect(interviewSteps[interviewStep].field, option)}
                                className={`px-[14px] py-[10px] rounded-[8px] border transition-all ${
                                  isSelected
                                    ? "border-[#0975d7] bg-[#eff6ff] text-[#0975d7]"
                                    : "border-[#d7d6d1] bg-white text-[#3d3c52] hover:border-[#9ca3af] hover:bg-[#f9fafb]"
                                }`}
                              >
                                <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px]">
                                  {option}
                                </span>
                              </button>
                            );
                          })
                      )}
                    </div>

                    {/* Selected criteria display (for criteria step) */}
                    {interviewSteps[interviewStep].field === "criteria" && evaluationCriteria.length > 0 && (
                      <div className="mt-[16px] flex flex-wrap items-center gap-[8px] pt-[12px] border-t border-[#ececf3]">
                        <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6b697b]">Selected:</span>
                        {evaluationCriteria.map((c) => (
                          <span key={c} className="px-[10px] py-[4px] bg-[#0975d7] text-white rounded-full text-[12px] font-['Inter:Medium',sans-serif] font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-[32px] pt-[20px] border-t border-[#ececf3]">
                  <button
                    onClick={() => setInterviewStep(Math.max(0, interviewStep - 1))}
                    disabled={interviewStep === 0}
                    className="flex items-center gap-[6px] px-[12px] py-[8px] text-[#6b697b] hover:text-[#3d3c52] hover:bg-[#f5f5f5] rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <IconArrowLeft className="size-[16px]" stroke={2} />
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">Back</span>
                  </button>

                  {interviewStep < interviewSteps.length - 1 ? (
                    <button
                      onClick={() => setInterviewStep(interviewStep + 1)}
                      className="flex items-center gap-[6px] px-[16px] py-[8px] bg-[#3d3c52] text-white rounded-[6px] hover:bg-[#2d2c42] transition-colors"
                    >
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">Continue</span>
                      <IconArrowRight className="size-[16px]" stroke={2} />
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-[6px] px-[16px] py-[8px] bg-[#c74900] text-white rounded-[6px] hover:bg-[#b04200] transition-colors disabled:opacity-70"
                      onClick={() => {
                        setIsGenerating(true);
                        onGenerateScenario({
                          ...values,
                          criteria1: evaluationCriteria[0] || "",
                          criteria2: evaluationCriteria[1] || "",
                          criteria3: evaluationCriteria[2] || ""
                        });
                      }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">Generating...</span>
                          <IconLoader2 className="size-[16px] animate-spin" stroke={2} />
                        </>
                      ) : (
                        <>
                          <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">Generate scenario</span>
                          <IconArrowRight className="size-[16px]" stroke={2} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* STORY MODE */}
            {displayMode === "story" && (
              <motion.div 
                className="flex flex-col w-full mt-[24px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Story narrative with fillable slots */}
                <div className="bg-white border border-[#ececf3] rounded-[8px] p-[24px]">
                  <div className="flex items-center gap-[8px] mb-[20px] pb-[12px] border-b border-[#ececf3]">
                    <IconFileText className="size-[16px] text-[#6b697b]" stroke={1.5} />
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#6b697b]">
                      Click on the highlighted text to edit
                    </span>
                  </div>

                  <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563]">
                    <span>I want to train </span>
                    <StorySlot 
                      field="trainee" 
                      value={values.trainee}
                      isActive={activeStorySlot === "trainee"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "trainee" ? null : "trainee")}
                    />
                    <span> to handle a customer named </span>
                    <StorySlot 
                      field="customerName" 
                      value={values.customerName}
                      isActive={activeStorySlot === "customerName"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "customerName" ? null : "customerName")}
                    />
                    <span> who is feeling </span>
                    <StorySlot 
                      field="emotion" 
                      value={values.emotion}
                      isActive={activeStorySlot === "emotion"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "emotion" ? null : "emotion")}
                    />
                    <span> because </span>
                    <StorySlot 
                      field="scenario" 
                      value={values.scenario}
                      isActive={activeStorySlot === "scenario"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "scenario" ? null : "scenario")}
                    />
                    <span>.</span>
                  </p>

                  <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] mt-[16px]">
                    <span>The learner should </span>
                    <StorySlot 
                      field="objective" 
                      value={values.objective}
                      isActive={activeStorySlot === "objective"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "objective" ? null : "objective")}
                    />
                    <span>. Evaluate on </span>
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#0975d7]">{evaluationCriteria.join(", ")}</span>
                    <span>.</span>
                  </p>

                  <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] mt-[16px]">
                    <span>The modality is </span>
                    <StorySlot 
                      field="modality" 
                      value={values.modality}
                      isActive={activeStorySlot === "modality"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "modality" ? null : "modality")}
                    />
                    <span> and the difficulty level should be </span>
                    <StorySlot 
                      field="difficulty" 
                      value={values.difficulty}
                      isActive={activeStorySlot === "difficulty"}
                      onClick={() => setActiveStorySlot(activeStorySlot === "difficulty" ? null : "difficulty")}
                    />
                    <span>.</span>
                  </p>
                </div>

                {/* Options panel that appears when a slot is active */}
                <AnimatePresence>
                  {activeStorySlot && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="mt-[12px] p-[16px] bg-white border border-[#ececf3] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    >
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#6b697b] mb-[10px]">
                        Choose an option:
                      </p>
                      <div className="flex flex-wrap gap-[6px]">
                        {(dropdownOptions[activeStorySlot as keyof typeof dropdownOptions] as string[] || [])
                          .filter((opt: string) => opt !== "Add custom..." && !opt.startsWith("template:"))
                          .map((option: string) => (
                            <button
                              key={option}
                              onClick={() => {
                                handleSelect(activeStorySlot, option);
                                setActiveStorySlot(null);
                              }}
                              className={`px-[12px] py-[6px] rounded-[6px] border transition-all ${
                                values[activeStorySlot as keyof typeof values] === option
                                  ? "border-[#0975d7] bg-[#eff6ff] text-[#0975d7]"
                                  : "border-[#d7d6d1] bg-white text-[#3d3c52] hover:border-[#9ca3af] hover:bg-[#f9fafb]"
                              }`}
                            >
                              <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">
                                {option}
                              </span>
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Generate Button */}
                <button
                  className="bg-[#c74900] flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[6px] hover:bg-[#b04200] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-[24px] w-fit"
                  onClick={() => {
                    setIsGenerating(true);
                    onGenerateScenario({
                      ...values,
                      criteria1: evaluationCriteria[0] || "",
                      criteria2: evaluationCriteria[1] || "",
                      criteria3: evaluationCriteria[2] || ""
                    });
                  }}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Generating scenario</span>
                      <IconLoader2 className="size-[18px] text-white animate-spin" stroke={1.5} />
                    </>
                  ) : (
                    <>
                      <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Generate detailed scenario</span>
                      <IconArrowRight className="size-[18px] text-white" stroke={1.5} />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* TAGS & UNDERLINE MODES (Original) */}
            {(displayMode === "tags" || displayMode === "underline") && (
            <motion.div 
              className="flex flex-col w-full mt-[24px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Section 1: Context */}
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] flex flex-wrap items-center gap-x-[6px] gap-y-[8px]">
                  <span>I want to train</span>
                  <DropdownField field="trainee" value={values.trainee} options={dropdownOptions.trainee} />
                </p>

                <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] flex flex-wrap items-center gap-x-[6px] gap-y-[8px]">
                  <span>The customer is</span>
                  <DropdownField field="customerName" value={values.customerName} options={dropdownOptions.customerName} />
                  <span>who is</span>
                  <DropdownField field="emotion" value={values.emotion} options={dropdownOptions.emotion} />
                  <span>because</span>
                  <DropdownField field="scenario" value={values.scenario} options={dropdownOptions.scenario} />
                </p>
              </div>

              {/* Fading Divider */}
              <div className="h-[1px] mt-[20px] mb-[16px] w-[60%] bg-gradient-to-r from-[#e5e7eb] via-[#e5e7eb]/30 to-transparent" />

              {/* Section 2: Learning Objective */}
              <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] flex flex-wrap items-center gap-x-[6px] gap-y-[8px]">
                <span>The learner should</span>
                <DropdownField field="objective" value={values.objective} options={dropdownOptions.objective} />
              </p>

              {/* Section 3: Evaluation */}
                <div className="flex flex-wrap items-center gap-x-[6px] gap-y-[8px] mt-[12px]">
                  <span className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563]">Evaluate on</span>
                  {evaluationCriteria.map((criterion, index) => (
                    <React.Fragment key={index}>
                      {/* Separator logic based on display mode */}
                      {index > 0 && displayMode === "tags" && index === evaluationCriteria.length - 1 && (
                        <span className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563]">&</span>
                      )}
                      {index > 0 && displayMode === "underline" && (
                        <span className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563]">,</span>
                      )}
                      <CriteriaDropdown 
                        index={index} 
                        value={criterion}
                        showRemove={evaluationCriteria.length > 2}
                        onRemove={() => handleRemoveCriteria(index)}
                      />
                    </React.Fragment>
                  ))}
                  {displayMode === "tags" && (
                    <button
                      onClick={handleAddCriteria}
                      className="inline-flex items-center justify-center size-[28px] rounded-full bg-[#f0f9ff] hover:bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] transition-all"
                      title="Add evaluation parameter"
                    >
                      <IconPlus className="size-[14px]" stroke={2} />
                    </button>
                  )}
                </div>

              {/* Fading Divider */}
              <div className="h-[1px] mt-[20px] mb-[16px] w-[60%] bg-gradient-to-r from-[#e5e7eb] via-[#e5e7eb]/30 to-transparent" />

              {/* Section 4: Settings */}
              <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] flex flex-wrap items-center gap-x-[6px] gap-y-[8px]">
                <span>The modality is</span>
                <DropdownField field="modality" value={values.modality} options={dropdownOptions.modality} />
                <span>and the difficulty level should be</span>
                <DropdownField field="difficulty" value={values.difficulty} options={dropdownOptions.difficulty} />
              </p>

              {/* Button */}
              <button
                className="bg-[#c74900] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[8px] hover:bg-[#b04200] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-[28px] w-fit"
                onClick={() => {
                  setIsGenerating(true);
                    onGenerateScenario({
                      ...values,
                      criteria1: evaluationCriteria[0] || "",
                      criteria2: evaluationCriteria[1] || "",
                      criteria3: evaluationCriteria[2] || ""
                    });
                }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Generating scenario</span>
                    <IconLoader2 className="size-[18px] text-white animate-spin" stroke={1.5} />
                  </>
                ) : (
                  <>
                    <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Generate detailed scenario</span>
                    <IconArrowRight className="size-[18px] text-white" stroke={1.5} />
                  </>
                )}
              </button>
            </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Roleplay Sidebar */}
      <RoleplaySidebar />
    </div>
  );
}