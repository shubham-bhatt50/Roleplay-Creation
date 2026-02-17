import { IconFileText, IconPlus, IconMicrophone, IconArrowRight, IconArrowLeft, IconLoader2, IconX, IconUser, IconCalendar, IconPlayerPlay, IconDotsVertical } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

interface PromptScreenProps {
  onBack: () => void;
  onSwitchToBuilder: () => void;
  onGenerateScenario: (prompt: string) => void;
  onNavigateToDetail?: (roleplayId: string, workflow?: { id: string; name: string } | null) => void;
}

const promptTemplates = [
  {
    title: "Customer Service",
    content: "Create a training scenario for customer service representatives to handle an angry customer who wants to return a product but doesn't have a receipt. The customer should be frustrated and the representative needs to de-escalate the situation while following company policies."
  },
  {
    title: "Sales Training",
    content: "Design a roleplay scenario where a sales executive needs to upsell additional services to a customer who is already interested in the base product. The customer should be price-conscious and the executive needs to demonstrate value without being pushy."
  },
  {
    title: "Technical Support",
    content: "Build a scenario for technical support staff to help a confused customer troubleshoot a software issue. The customer has limited technical knowledge and the support agent needs to explain steps clearly and patiently."
  },
  {
    title: "Conflict Resolution",
    content: "Create a training scenario for managers to mediate a conflict between two team members. One team member feels their work is being undermined while the other believes they're just trying to help. The manager needs to facilitate a productive conversation."
  },
  {
    title: "Product Demo",
    content: "Design a roleplay where a sales representative needs to demonstrate a new product feature to a skeptical customer. The customer has concerns about complexity and the representative needs to show how the feature solves their specific problem."
  }
];

export function PromptScreen({ onBack, onSwitchToBuilder, onGenerateScenario, onNavigateToDetail }: PromptScreenProps) {
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTemplateClick = (content: string) => {
    setPromptText(content);
  };

  const handleSend = () => {
    if (promptText.trim() && !isGenerating) {
      setIsGenerating(true);
      // Simulate loading time before navigating
      setTimeout(() => {
        onGenerateScenario(promptText.trim());
      }, 2000); // 2 second delay
    }
  };

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
            <div className="flex gap-[8px] items-center bg-white rounded-[8px] p-[4px] border border-[#ececf3] w-fit">
              <motion.button
                onClick={onSwitchToBuilder}
                className="px-[16px] py-[8px] rounded-[6px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#6b697b] hover:text-[#3d3c52] hover:bg-[#f5f5f5] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Scenario builder
              </motion.button>
              <motion.button
                onClick={() => {}}
                className="px-[16px] py-[8px] rounded-[6px] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#3d3c52] bg-[#f0f0f0] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Prompt
              </motion.button>
            </div>

            {/* Prompt Input Box */}
            <motion.div 
              className="content-stretch flex flex-col items-start relative shrink-0 w-full mt-[16px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="bg-white relative rounded-[12px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_12px_12px_0px_rgba(0,0,0,0.04)]" />
                <div className="content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative w-full">
                  {/* Input Text Container */}
                  <div className="relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[8px] py-[12px] relative w-full">
                        <textarea
                          value={promptText}
                          onChange={(e) => setPromptText(e.target.value)}
                          className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-[60px] min-w-px not-italic relative shrink-0 text-[#3d3c52] text-[14px] border-none outline-none resize-none bg-transparent w-full placeholder:text-[#8c899f]"
                          placeholder="For eg. Make learners learn about how to handle an angry customer who is not able to return a product item"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[180px]">
                      <div className="content-stretch flex items-center relative shrink-0">
                        <button className="bg-[#f6f6f9] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 hover:bg-[#ececf3] transition-colors">
                          <div className="relative shrink-0 size-[20px]">
                            <IconPlus className="size-[20px] text-[#8C899F]" stroke={2.5} />
                          </div>
                        </button>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0">
                        <button className="bg-[#f6f6f9] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 hover:bg-[#ececf3] transition-colors">
                          <div className="relative shrink-0 size-[20px]">
                            <IconMicrophone className="size-[20px] text-[#8C899F]" stroke={2.5} />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <button 
                        onClick={handleSend}
                        className={`content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 transition-all ${
                          promptText.trim() && !isGenerating
                            ? 'bg-[#0975d7] hover:bg-[#0861b8] cursor-pointer' 
                            : 'bg-[#d0d0d0] hover:bg-[#c0c0c0] cursor-not-allowed opacity-50'
                        }`}
                        disabled={!promptText.trim() || isGenerating}
                      >
                        <div className="relative shrink-0 size-[20px]">
                          {isGenerating ? (
                            <IconLoader2 className="size-[20px] text-white animate-spin" stroke={2.5} />
                          ) : (
                            <IconArrowRight className={`size-[20px] ${promptText.trim() ? 'text-white' : 'text-[#8C899F]'}`} stroke={2.5} />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Prompt Templates */}
            <motion.div 
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full mt-[24px] pb-[8px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#6b697b] text-[14px]">Prompt Templates</p>
              <div className="flex flex-wrap gap-[8px] items-start relative w-full">
                {promptTemplates.map((template, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTemplateClick(template.content)}
                    className="bg-white border border-[#ececf3] rounded-[8px] px-[12px] py-[8px] hover:bg-[#f5f5f5] hover:border-[#0975d7] transition-all text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#3d3c52] text-[14px]">
                      {template.title}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Roleplay Sidebar */}
      <RoleplaySidebar />
    </div>
  );
}
