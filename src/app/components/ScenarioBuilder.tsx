import { IconArrowRight, IconLoader2, IconFileText, IconArrowLeft, IconMoodAngry, IconMoodSad, IconMoodNeutral, IconHeadphones, IconMessageCircle } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgAlexJonathan from "@/assets/Alex.png";

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

export function ScenarioBuilder({ onBack, onSwitchToPrompt, onGenerateScenario }: ScenarioBuilderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [customInputField, setCustomInputField] = useState<string | null>(null);
  const [customInputValue, setCustomInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
    criteria1: "Empathy",
    criteria2: "De-escalation",
    criteria3: "Policy adherence",
    modality: "Audio",
    difficulty: "High"
  });

  const dropdownOptions = {
    trainee: ["Customer support executives", "Sales executives", "Managers", "Technical support team", "Add custom..."],
    customerName: customerPersonas.map(p => p.name).concat("Add custom..."),
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
    criteria1: ["Empathy", "Active listening", "Problem-solving", "Communication", "Add custom..."],
    criteria2: ["De-escalation", "Conflict resolution", "Patience", "Professionalism", "Add custom..."],
    criteria3: ["Policy adherence", "Product knowledge", "Time management", "Documentation", "Add custom..."],
    modality: ["Audio", "Chat"],
    difficulty: ["Low", "Medium", "High"]
  };

  const handleSelect = (field: string, value: string) => {
    if (value === "Add custom...") {
      setCustomInputField(field);
      setCustomInputValue("");
    } else {
      setValues({ ...values, [field]: value });
      setOpenDropdown(null);
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
      setValues({ ...values, [field]: customInputValue.trim() });
      setOpenDropdown(null);
      setCustomInputField(null);
      setCustomInputValue("");
    }
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

    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => {
            setOpenDropdown(openDropdown === field ? null : field);
            setCustomInputField(null);
            setCustomInputValue("");
          }}
          className="inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full bg-white hover:bg-[#f9fafb] border border-[#d1d5db] hover:border-[#9ca3af] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
        >
          {isDifficultyField && (
            <DifficultyBars difficulty={value} size={14} />
          )}
          {isModalityField && ModalityIcon && (
            <ModalityIcon className="size-[14px] text-[#6b7280]" stroke={1.5} />
          )}
          {isEmotionField && EmotionIcon && (
            <EmotionIcon className="size-[14px]" style={{ color: emotionColor || undefined }} stroke={2} />
          )}
          {isCustomerFieldValue && customerPersona && (
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
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[15px] text-nowrap text-[#1f2937]">
            {value}
          </span>
        </button>
        {openDropdown === field && (
          <div className="absolute left-0 top-[calc(100%+4px)] bg-white rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] py-[4px] min-w-[200px] max-w-[400px] z-50">
            {customInputField === field ? (
              <div className="flex flex-col gap-[8px] px-[16px] py-[10px] w-full">
                <input
                  type="text"
                  value={customInputValue}
                  onChange={(e) => setCustomInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCustomSubmit(field);
                    } else if (e.key === "Escape") {
                      setCustomInputField(null);
                      setCustomInputValue("");
                    }
                  }}
                  className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] border border-[#d7d6d1] rounded-[4px] px-[12px] py-[8px] outline-none focus:border-[#0975d7]"
                  placeholder="Enter custom value"
                  autoFocus
                />
                <div className="flex gap-[8px] justify-end">
                  <button
                    onClick={() => {
                      setCustomInputField(null);
                      setCustomInputValue("");
                    }}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#6b697b] text-[14px] px-[12px] py-[6px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleCustomSubmit(field)}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px] bg-[#0975d7] px-[12px] py-[6px] rounded-[4px] hover:bg-[#0861b8] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              options.map((option, index) => {
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
              })
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const currentRef = dropdownRefs.current[openDropdown || ""];
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [openDropdown]);

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
              onClick={onBack}
              className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 hover:opacity-80 transition-opacity"
            >
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0975d7] text-[16px] text-nowrap">All existing roleplays</p>
            </button>
          </div>
        </div>


        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full relative">
          <div aria-hidden="true" className="absolute border-[#ececf3] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col gap-[12px] items-start relative w-[590px]">
            {/* Tab Group - Left aligned above content */}
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

            {/* Scenario Details */}
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
              <p className="font-['Inter:Regular',sans-serif] text-[15px] leading-[32px] text-[#4b5563] flex flex-wrap items-center gap-x-[6px] gap-y-[8px] mt-[12px]">
                <span>Evaluate on</span>
                <DropdownField field="criteria1" value={values.criteria1} options={dropdownOptions.criteria1} />
                <DropdownField field="criteria2" value={values.criteria2} options={dropdownOptions.criteria2} />
                <span>&</span>
                <DropdownField field="criteria3" value={values.criteria3} options={dropdownOptions.criteria3} />
              </p>

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
                  onGenerateScenario(values);
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
          </div>
        </div>
      </div>
    </div>
  );
}