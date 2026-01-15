import { IconArrowRight, IconLoader2, IconFileText, IconArrowLeft } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScenarioBuilderProps {
  onBack: () => void;
  onSwitchToPrompt: () => void;
  onGenerateScenario: () => void;
}

export function ScenarioBuilder({ onBack, onSwitchToPrompt, onGenerateScenario }: ScenarioBuilderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [customInputField, setCustomInputField] = useState<string | null>(null);
  const [customInputValue, setCustomInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [values, setValues] = useState({
    trainee: "Customer support executives",
    customerName: "Alex",
    emotion: "Frustrated",
    scenario: "they want a full refund for a product they bought",
    objective: "De-escalate the situation",
    criteria1: "Empathy",
    criteria2: "De-escalation",
    criteria3: "Policy adherence",
    modality: "Audio call",
    difficulty: "High"
  });

  const dropdownOptions = {
    trainee: ["Customer support executives", "Sales executives", "Managers", "Technical support team", "Add custom..."],
    customerName: ["Alex", "Jordan", "Sam", "Taylor", "Morgan", "Add custom..."],
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
    modality: ["Audio call", "Video call", "Chat", "Email", "Add custom..."],
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

    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => {
            setOpenDropdown(openDropdown === field ? null : field);
            setCustomInputField(null);
            setCustomInputValue("");
          }}
          className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px] hover:text-[#0975d7] transition-colors"
        >
          <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-dotted font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[16px] text-nowrap underline">
            {value}
          </p>
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
              options.map((option, index) => (
                <button
                  key={index}
                  className="flex items-center px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors text-left"
                  onClick={() => handleSelect(field, option)}
                >
                  <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">
                    {option}
                  </p>
                </button>
              ))
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
              className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full pb-[8px] mt-[16px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Line 1 */}
              <div className="content-start flex flex-wrap font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[6px_8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full">
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">I want to train</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="trainee" value={values.trainee} options={dropdownOptions.trainee} />
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">The customer is</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="customerName" value={values.customerName} options={dropdownOptions.customerName} />
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">Who is</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="emotion" value={values.emotion} options={dropdownOptions.emotion} />
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">because</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="scenario" value={values.scenario} options={dropdownOptions.scenario} />
                </div>
              </div>

              {/* Line 2 */}
              <div className="content-start flex flex-wrap gap-[6px_8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full mt-[4px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">The learner should</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="objective" value={values.objective} options={dropdownOptions.objective} />
                </div>
              </div>

              {/* Line 3 */}
              <div className="content-start flex flex-wrap gap-[6px_8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full mt-[4px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">Evaluate on</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="criteria1" value={values.criteria1} options={dropdownOptions.criteria1} />
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="criteria2" value={values.criteria2} options={dropdownOptions.criteria2} />
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">&</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="criteria3" value={values.criteria3} options={dropdownOptions.criteria3} />
                </div>
              </div>

              {/* Line 4 */}
              <div className="content-start flex flex-wrap gap-[6px_8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full mt-[4px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">The modality is</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="modality" value={values.modality} options={dropdownOptions.modality} />
                </div>
              </div>

              {/* Difficulty */}
              <div className="content-start flex flex-wrap gap-[6px_8px] items-start leading-[0] not-italic relative shrink-0 text-nowrap w-full mt-[4px]">
                <div className="flex flex-col justify-center relative shrink-0 text-[#6b697b] text-[16px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-nowrap">The difficulty level should be</p>
                </div>
                <div className="flex flex-col justify-center overflow-ellipsis overflow-hidden relative shrink-0 text-[#3d3c52] text-[0px]">
                  <DropdownField field="difficulty" value={values.difficulty} options={dropdownOptions.difficulty} />
                </div>
              </div>

              {/* Button */}
              <button
                className="bg-[#c74900] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] shrink-0 hover:bg-[#b04200] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-[4px]"
                onClick={() => {
                  setIsGenerating(true);
                  onGenerateScenario();
                }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Generating scenario</p>
                    <IconLoader2 className="size-[20px] text-white animate-spin" stroke={2} />
                  </>
                ) : (
                  <>
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Generate detailed scenario</p>
                    <IconArrowRight className="size-[20px] text-white" stroke={2} />
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