import svgPaths from "@/imports/svg-t7e50z2hox";
import imgAlexJonathan from "@/assets/Alex.png";
import { IconPencil, IconEye, IconArrowRight, IconFileText, IconUser, IconClipboardCheck, IconDoorExit, IconSettings, IconX, IconPlus, IconPhoto, IconMoodAngry, IconMoodSad, IconMoodHappy, IconMoodNeutral, IconAlertCircle, IconClock, IconFlame, IconMoodCrazyHappy, IconUsers, IconChevronDown, IconTrash, IconCheck, IconPlayerStop, IconMessage, IconPhoneOff, IconUserUp, IconTimeDuration10, IconSearch, IconRefresh } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

interface ScenarioDetailScreenProps {
  onBack: () => void;
  onAttachWorkflow?: (workflowId: string, workflowName: string) => void;
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

export function ScenarioDetailScreen({ onBack, onAttachWorkflow }: ScenarioDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scenario");
  const [activeMode, setActiveMode] = useState<"voice" | "chat" | "hybrid">("voice");
  const [scenarioTitle, setScenarioTitle] = useState("Dealing with angry customer for refund scenario");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Workflow modal state
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [workflowTab, setWorkflowTab] = useState<"draft" | "ready">("ready");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("1"); // Pre-select first workflow
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

  const getExitConditionIcon = (icon: ExitCondition["icon"]) => {
    switch (icon) {
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

  const getExitConditionColor = (icon: ExitCondition["icon"]) => {
    switch (icon) {
      case "resolution":
        return { bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconBg: "#dcfce7", iconColor: "#16a34a" };
      case "time":
        return { bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", iconBg: "#fef3c7", iconColor: "#d97706" };
      case "escalate":
        return { bg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", iconBg: "#ede9fe", iconColor: "#7c3aed" };
      case "end":
        return { bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", iconBg: "#fee2e2", iconColor: "#dc2626" };
      default:
        return { bg: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)", iconBg: "#f3f4f6", iconColor: "#6b7280" };
    }
  };

  const addExitCondition = () => {
    const newId = String(Date.now());
    const icons: ExitCondition["icon"][] = ["resolution", "time", "escalate", "end"];
    const newCondition: ExitCondition = {
      id: newId,
      trigger: "New condition",
      action: "End scenario",
      icon: icons[exitConditions.length % icons.length],
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

  const cycleExitConditionIcon = (id: string) => {
    const icons: ExitCondition["icon"][] = ["resolution", "time", "escalate", "end"];
    setExitConditions(
      exitConditions.map((c) => {
        if (c.id === id) {
          const currentIndex = icons.indexOf(c.icon);
          const nextIndex = (currentIndex + 1) % icons.length;
          return { ...c, icon: icons[nextIndex] };
        }
        return c;
      })
    );
  };
  
  // Persona management
  interface Persona {
    id: string;
    name: string;
    avatar: string | null;
    emotionalStates: string[];
    behavioralTraits: string[];
    reasonForContact: string;
    likelyBehaviour: string;
  }

  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "1",
      name: "Alex Jonathan",
      avatar: imgAlexJonathan,
      emotionalStates: ["Frustrated", "Angry"],
      behavioralTraits: ["Short-tempered", "Angry"],
      reasonForContact: "Wants a full refund for a product they bought",
      likelyBehaviour: "Wants a full refund for a product they bought",
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: null,
      emotionalStates: ["Neutral", "Calm"],
      behavioralTraits: ["Patient", "Polite"],
      reasonForContact: "Inquiring about product features and pricing",
      likelyBehaviour: "Will ask detailed questions and compare options",
    },
    {
      id: "3",
      name: "Michael Chen",
      avatar: null,
      emotionalStates: ["Happy", "Excited"],
      behavioralTraits: ["Enthusiastic", "Eager"],
      reasonForContact: "Wants to upgrade to a premium plan",
      likelyBehaviour: "Will be receptive to upsells and recommendations",
    },
  ]);

  const [currentPersonaId, setCurrentPersonaId] = useState("1");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newTagType, setNewTagType] = useState<"emotional" | "behavioral" | null>(null);

  const currentPersona = personas.find(p => p.id === currentPersonaId) || personas[0];

  const updateCurrentPersona = (updates: Partial<Persona>) => {
    setPersonas(personas.map(p => 
      p.id === currentPersonaId ? { ...p, ...updates } : p
    ));
  };

  const setPersonaName = (name: string) => updateCurrentPersona({ name });
  const setPersonaAvatar = (avatar: string | null) => updateCurrentPersona({ avatar });
  const setEmotionalStates = (states: string[]) => updateCurrentPersona({ emotionalStates: states });
  const setBehavioralTraits = (traits: string[]) => updateCurrentPersona({ behavioralTraits: traits });
  const setReasonForContact = (reason: string) => updateCurrentPersona({ reasonForContact: reason });
  const setLikelyBehaviour = (behaviour: string) => updateCurrentPersona({ likelyBehaviour: behaviour });

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
    content: `
      <h2>Learner Brief</h2>
      <p>You are a Customer Support Executive handling incoming support requests. A customer is reaching out regarding a refund for a product they purchased.</p>
      
      <h2>Scenario</h2>
      <p>A customer named Alex is contacting support to request a full refund for a product they recently bought. Alex is frustrated and expects a quick resolution. Your job is to handle this conversation professionally while following company policy.</p>
      
      <h2>Learning objective</h2>
      <p>The learner should de-escalate the situation—calm the customer down, acknowledge their concerns, and guide the conversation toward a resolution while maintaining professionalism.</p>
    `,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-sm max-w-none',
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-h-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#eee] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Title Section */}
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

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Attach Button */}
              <button 
                className="bg-[#d0450b] hover:bg-[#b83d0a] text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                onClick={() => setShowWorkflowModal(true)}
              >
                Attach to workflow
                <IconArrowRight className="size-4" stroke={2} />
              </button>
            </div>
          </div>

          {/* Author */}
          <p className="text-sm text-[#8d8ba7] mt-2">By Sarah Johnson</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation */}
          <div className="w-[240px] border-r border-[#eee] bg-white flex flex-col relative">
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#8d8ba7] px-4 pt-4 pb-3">CONTEXT</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("scenario")}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 relative ${
                    activeTab === "scenario"
                      ? "bg-[#f0f0f5] text-[#0975d7]"
                      : "text-[#8d8ba7] hover:bg-gray-50"
                  }`}
                >
                  {activeTab === "scenario" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0975d7] rounded-r" />
                  )}
                  <IconFileText className={`w-4 h-4 ${activeTab === "scenario" ? "text-[#0975d7]" : "text-[#8d8ba7]"}`} stroke={2} />
                  Scenario
                </button>
                <button
                  onClick={() => setActiveTab("persona")}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 relative ${
                    activeTab === "persona"
                      ? "bg-[#f0f0f5] text-[#0975d7]"
                      : "text-[#8d8ba7] hover:bg-gray-50"
                  }`}
                >
                  {activeTab === "persona" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0975d7] rounded-r" />
                  )}
                  <IconUser className={`w-4 h-4 ${activeTab === "persona" ? "text-[#0975d7]" : "text-[#8d8ba7]"}`} stroke={2} />
                  Customer persona
                </button>
                <button
                  onClick={() => setActiveTab("evaluation")}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 relative ${
                    activeTab === "evaluation"
                      ? "bg-[#f0f0f5] text-[#0975d7]"
                      : "text-[#8d8ba7] hover:bg-gray-50"
                  }`}
                >
                  {activeTab === "evaluation" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0975d7] rounded-r" />
                  )}
                  <IconClipboardCheck className={`w-4 h-4 ${activeTab === "evaluation" ? "text-[#0975d7]" : "text-[#8d8ba7]"}`} stroke={2} />
                  Evaluation
                </button>
                <button
                  onClick={() => setActiveTab("exit")}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 relative ${
                    activeTab === "exit"
                      ? "bg-[#f0f0f5] text-[#0975d7]"
                      : "text-[#8d8ba7] hover:bg-gray-50"
                  }`}
                >
                  {activeTab === "exit" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0975d7] rounded-r" />
                  )}
                  <IconDoorExit className={`w-4 h-4 ${activeTab === "exit" ? "text-[#0975d7]" : "text-[#8d8ba7]"}`} stroke={2} />
                  Exit conditions
                </button>
              </div>
            </div>
            <div className="border-t border-[#eee]">
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 relative ${
                  activeTab === "settings"
                    ? "bg-[#f0f0f5] text-[#0975d7]"
                    : "text-[#8d8ba7] hover:bg-gray-50"
                }`}
              >
                {activeTab === "settings" && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0975d7] rounded-r" />
                )}
                <IconSettings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#0975d7]" : "text-[#8d8ba7]"}`} stroke={2} />
                Settings
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
                <div className="bg-white flex-1 overflow-y-auto">
                  <div className="px-6 py-4 h-full">
                    <div className="prose prose-sm max-w-none">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
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
                    <div className="relative">
                      <button
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="flex items-center gap-2 px-3 py-2 border border-[#ececf3] rounded-lg hover:border-[#0975d7] transition-colors bg-white"
                      >
                        <IconUsers className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                        <span className="text-sm font-medium text-[#2b2b40]">Switch user</span>
                        <IconChevronDown className={`w-4 h-4 text-[#8d8ba7] transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} stroke={2} />
                      </button>
                      {showUserDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowUserDropdown(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white border border-[#ececf3] rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                            {personas.map((persona) => (
                              <button
                                key={persona.id}
                                onClick={() => {
                                  setCurrentPersonaId(persona.id);
                                  setShowUserDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f0f0f5] transition-colors ${
                                  currentPersonaId === persona.id ? 'bg-[#f0f0f5]' : ''
                                }`}
                              >
                                {persona.avatar ? (
                                  <img
                                    src={persona.avatar}
                                    alt={persona.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-[#f0f0f5] flex items-center justify-center">
                                    <IconUser className="w-5 h-5 text-[#8d8ba7]" stroke={2} />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${currentPersonaId === persona.id ? 'text-[#0975d7]' : 'text-[#2b2b40]'}`}>
                                    {persona.name}
                                  </p>
                                  <p className="text-xs text-[#8d8ba7] line-clamp-1">
                                    {persona.reasonForContact}
                                  </p>
                                </div>
                                {currentPersonaId === persona.id && (
                                  <div className="w-2 h-2 rounded-full bg-[#0975d7]" />
                                )}
                              </button>
                            ))}
                            <div className="border-t border-[#ececf3] px-4 py-2">
                              <button
                                onClick={() => {
                                  const newId = String(personas.length + 1);
                                  const newPersona: Persona = {
                                    id: newId,
                                    name: "New Persona",
                                    avatar: null,
                                    emotionalStates: [],
                                    behavioralTraits: [],
                                    reasonForContact: "",
                                    likelyBehaviour: "",
                                  };
                                  setPersonas([...personas, newPersona]);
                                  setCurrentPersonaId(newId);
                                  setShowUserDropdown(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-[#0975d7] hover:bg-[#f0f0f5] rounded-lg transition-colors flex items-center gap-2"
                              >
                                <IconPlus className="w-4 h-4" stroke={2} />
                                Add new persona
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Persona Card */}
                <div className="bg-white border-b border-[#eee] py-4">
                  <div className="px-6">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="relative group">
                        {currentPersona.avatar ? (
                          <img
                            src={currentPersona.avatar}
                            alt={currentPersona.name}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-lg bg-[#f0f0f5] flex items-center justify-center">
                            <IconUser className="w-12 h-12 text-[#8d8ba7]" stroke={2} />
                          </div>
                        )}
                        <button
                          onClick={() => {
                            // In a real app, this would open a file picker
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
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        >
                          <IconPhoto className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" stroke={2} />
                        </button>
                      </div>
                      {editingField === "name" ? (
                        <input
                          type="text"
                          value={currentPersona.name}
                          onChange={(e) => setPersonaName(e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingField(null);
                          }}
                          className="mt-2 text-sm font-medium text-[#2b2b40] text-center border-b border-[#0975d7] focus:outline-none bg-transparent w-full"
                          autoFocus
                        />
                      ) : (
                        <div className="mt-2 flex items-center gap-1 group">
                          <p className="text-sm font-medium text-[#2b2b40] text-center">{currentPersona.name}</p>
                          <button
                            onClick={() => setEditingField("name")}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <IconPencil className="w-3 h-3 text-[#8d8ba7]" stroke={2} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Traits */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-[#2b2b40] mb-2">Emotional state:</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {currentPersona.emotionalStates.map((state, index) => {
                            const Icon = getEmotionalIcon(state);
                            const colors = getEmotionalColor(state);
                            return (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 font-medium"
                                style={{ backgroundColor: colors.bg, color: colors.text }}
                              >
                                <Icon className="w-3.5 h-3.5" stroke={2} style={{ color: colors.icon }} />
                                {state}
                                <button
                                  onClick={() => setEmotionalStates(currentPersona.emotionalStates.filter((_, i) => i !== index))}
                                  className="hover:opacity-70 transition-opacity ml-0.5"
                                  style={{ color: colors.text }}
                                >
                                  <IconX className="w-3 h-3" stroke={2} />
                                </button>
                              </span>
                            );
                          })}
                          {newTagType === "emotional" ? (
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onBlur={() => {
                                if (newTag.trim()) {
                                  setEmotionalStates([...currentPersona.emotionalStates, newTag.trim()]);
                                }
                                setNewTag("");
                                setNewTagType(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && newTag.trim()) {
                                  setEmotionalStates([...currentPersona.emotionalStates, newTag.trim()]);
                                  setNewTag("");
                                  setNewTagType(null);
                                } else if (e.key === "Escape") {
                                  setNewTag("");
                                  setNewTagType(null);
                                }
                              }}
                              className="px-3 py-1.5 border border-[#0975d7] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0975d7] w-28"
                              placeholder="Add..."
                              autoFocus
                            />
                          ) : (
                            <button
                              onClick={() => setNewTagType("emotional")}
                              className="px-3 py-1.5 border border-dashed border-[#d0d0d0] rounded-full text-sm text-[#8d8ba7] hover:border-[#0975d7] hover:text-[#0975d7] transition-colors flex items-center gap-1.5"
                            >
                              <IconPlus className="w-3.5 h-3.5" stroke={2} />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2b2b40] mb-2">Behavioral traits:</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {currentPersona.behavioralTraits.map((trait, index) => {
                            const Icon = getBehavioralIcon(trait);
                            const colors = getBehavioralColor(trait);
                            return (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 font-medium"
                                style={{ backgroundColor: colors.bg, color: colors.text }}
                              >
                                <Icon className="w-3.5 h-3.5" stroke={2} style={{ color: colors.icon }} />
                                {trait}
                                <button
                                  onClick={() => setBehavioralTraits(currentPersona.behavioralTraits.filter((_, i) => i !== index))}
                                  className="hover:opacity-70 transition-opacity ml-0.5"
                                  style={{ color: colors.text }}
                                >
                                  <IconX className="w-3 h-3" stroke={2} />
                                </button>
                              </span>
                            );
                          })}
                          {newTagType === "behavioral" ? (
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onBlur={() => {
                                if (newTag.trim()) {
                                  setBehavioralTraits([...currentPersona.behavioralTraits, newTag.trim()]);
                                }
                                setNewTag("");
                                setNewTagType(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && newTag.trim()) {
                                  setBehavioralTraits([...currentPersona.behavioralTraits, newTag.trim()]);
                                  setNewTag("");
                                  setNewTagType(null);
                                } else if (e.key === "Escape") {
                                  setNewTag("");
                                  setNewTagType(null);
                                }
                              }}
                              className="px-3 py-1.5 border border-[#0975d7] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0975d7] w-28"
                              placeholder="Add..."
                              autoFocus
                            />
                          ) : (
                            <button
                              onClick={() => setNewTagType("behavioral")}
                              className="px-3 py-1.5 border border-dashed border-[#d0d0d0] rounded-full text-sm text-[#8d8ba7] hover:border-[#0975d7] hover:text-[#0975d7] transition-colors flex items-center gap-1.5"
                            >
                              <IconPlus className="w-3.5 h-3.5" stroke={2} />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Reason for Contact */}
                <div className="border-b border-[#eee] py-4">
                  <div className="px-6 grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-[#2b2b40]">Reason for contact</h3>
                      {editingField !== "reason" && (
                        <button
                          onClick={() => setEditingField("reason")}
                          className="text-[#0975d7] hover:text-[#0861b8]"
                        >
                          <IconPencil className="w-4 h-4" stroke={2} />
                        </button>
                      )}
                    </div>
                    {editingField === "reason" ? (
                      <textarea
                        value={currentPersona.reasonForContact}
                        onChange={(e) => setReasonForContact(e.target.value)}
                        onBlur={() => setEditingField(null)}
                        className="bg-white border border-[#0975d7] rounded-lg p-4 min-h-[138px] w-full text-sm text-[#525066] focus:outline-none focus:ring-2 focus:ring-[#0975d7] resize-none"
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => setEditingField("reason")}
                        className="bg-[#f8f8f8] border border-[#e4dddd] rounded-lg p-4 min-h-[138px] cursor-text hover:border-[#0975d7] transition-colors"
                      >
                        <p className="text-sm text-[#525066] whitespace-pre-wrap">
                          {currentPersona.reasonForContact || "Click to add reason for contact..."}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-[#2b2b40]">Likely behaviour</h3>
                      {editingField !== "behaviour" && (
                        <button
                          onClick={() => setEditingField("behaviour")}
                          className="text-[#0975d7] hover:text-[#0861b8]"
                        >
                          <IconPencil className="w-4 h-4" stroke={2} />
                        </button>
                      )}
                    </div>
                    {editingField === "behaviour" ? (
                      <textarea
                        value={currentPersona.likelyBehaviour}
                        onChange={(e) => setLikelyBehaviour(e.target.value)}
                        onBlur={() => setEditingField(null)}
                        className="bg-white border border-[#0975d7] rounded-lg p-4 min-h-[138px] w-full text-sm text-[#525066] focus:outline-none focus:ring-2 focus:ring-[#0975d7] resize-none"
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => setEditingField("behaviour")}
                        className="bg-[#f8f8f8] border border-[#e4dddd] rounded-lg p-4 min-h-[138px] cursor-text hover:border-[#0975d7] transition-colors"
                      >
                        <p className="text-sm text-[#525066] whitespace-pre-wrap">
                          {currentPersona.likelyBehaviour || "Click to add likely behaviour..."}
                        </p>
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "evaluation" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-[#eee] py-4 shrink-0">
                  <div className="px-6">
                    <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Evaluation</h2>
                    <p className="text-sm text-[#8d8ba7]">Select competencies to assess</p>
                  </div>
                </div>

                {/* Competencies */}
                <div className="flex-1 overflow-y-auto">
                  {evaluationParameters.map((parameter) => (
                    <div key={parameter.id} className="bg-[#f8f8f8] border-b border-[#e4dddd] py-4">
                      <div className="px-6">
                        <div className="flex items-center justify-between mb-4">
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
                              className="text-base font-semibold text-[#2b2b40] border-b border-[#0975d7] focus:outline-none bg-transparent flex-1"
                              autoFocus
                            />
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <h3 className="text-base font-semibold text-[#2b2b40]">
                                {parameter.title}
                              </h3>
                              <button
                                onClick={() => {
                                  setEditingEvaluation({ type: "title", parameterId: parameter.id });
                                  setEditingValue(parameter.title);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <IconPencil className="w-3.5 h-3.5 text-[#8d8ba7]" stroke={2.5} />
                              </button>
                            </div>
                          )}
                        </div>
                        <ul className="space-y-2 text-sm text-[#525066] mb-4">
                          {parameter.criteria.map((criterion, index) => (
                            <li key={index} className="flex items-start gap-2 group">
                              {editingEvaluation?.type === "criteria" &&
                              editingEvaluation.parameterId === parameter.id &&
                              editingEvaluation.criteriaIndex === index ? (
                                <textarea
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue.trim()) {
                                      const newCriteria = [...parameter.criteria];
                                      newCriteria[index] = editingValue.trim();
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
                                      newCriteria[index] = editingValue.trim();
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
                                  className="flex-1 text-sm text-[#525066] border-b border-[#0975d7] focus:outline-none bg-transparent resize-none"
                                  autoFocus
                                  rows={2}
                                />
                              ) : (
                                <>
                                  <span>•</span>
                                  <span className="flex-1">{criterion}</span>
                                  <button
                                    onClick={() => {
                                      setEditingEvaluation({
                                        type: "criteria",
                                        parameterId: parameter.id,
                                        criteriaIndex: index,
                                      });
                                      setEditingValue(criterion);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                                  >
                                    <IconPencil className="w-3 h-3 text-[#8d8ba7]" stroke={2.5} />
                                  </button>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-3 relative">
                          <span className="text-sm text-[#8d8ba7]">Mapped competency</span>
                          <div className="relative" data-competency-dropdown>
                            <button
                              onClick={() => {
                                setOpenCompetencyDropdown(
                                  openCompetencyDropdown === parameter.id ? null : parameter.id
                                );
                              }}
                              className="flex items-center gap-2 px-3 py-1 bg-[#d4e6dd] text-[#0f5323] text-sm rounded hover:bg-[#c4d6cd] transition-colors"
                            >
                              <span>{parameter.mappedCompetency}</span>
                              <IconChevronDown className={`w-3 h-3 transition-transform ${openCompetencyDropdown === parameter.id ? 'rotate-180' : ''}`} stroke={2} />
                            </button>
                            {openCompetencyDropdown === parameter.id && (
                              <div className="absolute left-0 top-[calc(100%+4px)] bg-white rounded-lg shadow-lg border border-[#e4dddd] py-2 min-w-[200px] max-w-[300px] z-50 max-h-[300px] overflow-y-auto">
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
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] transition-colors ${
                                      parameter.mappedCompetency === competency
                                        ? 'bg-[#d4e6dd] text-[#0f5323] font-medium'
                                        : 'text-[#3d3c52]'
                                    }`}
                                  >
                                    {competency}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Add New Parameter Button */}
                  <div className="bg-white border-b border-[#e4dddd] py-4">
                    <div className="px-6">
                      <button
                        onClick={() => {
                          const newId = String(evaluationParameters.length + 1);
                          const newParameter: EvaluationParameter = {
                            id: newId,
                            title: "New Evaluation Parameter",
                            criteria: [
                              "0-2: [Enter description]",
                              "3-4: [Enter description]",
                              "5-6: [Enter description]",
                              "7-8: [Enter description]",
                              "9-10: [Enter description]",
                            ],
                            mappedCompetency: "New Competency",
                          };
                          setEvaluationParameters([...evaluationParameters, newParameter]);
                        }}
                        className="w-full py-3 border-2 border-dashed border-[#d0d0d0] rounded-lg text-[#8d8ba7] hover:border-[#0975d7] hover:text-[#0975d7] transition-colors flex items-center justify-center gap-2"
                      >
                        <IconPlus className="w-4 h-4" stroke={2} />
                        Add evaluation parameter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "exit" && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f0f4f8]">
                <div className="border-b border-[#eee] py-4 shrink-0 bg-white">
                  <div className="px-6">
                    <h2 className="text-lg font-semibold text-[#2b2b40] mb-1">Exit conditions</h2>
                    <p className="text-sm text-[#8d8ba7]">Define when the scenario should end</p>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto py-8 px-6">
                  <div className="max-w-3xl mx-auto">
                    {/* Conditions flow */}
                    <div className="relative">
                      {exitConditions.map((condition, index) => {
                        const Icon = getExitConditionIcon(condition.icon);
                        const colors = getExitConditionColor(condition.icon);
                        const isEditingTrigger = editingExitCondition?.id === condition.id && editingExitCondition?.field === "trigger";
                        const isEditingAction = editingExitCondition?.id === condition.id && editingExitCondition?.field === "action";
                        const isLastCard = index === exitConditions.length - 1;

                        return (
                          <div key={condition.id} className="relative group">
                            {/* Connector FROM this card to the next (if not last) */}
                            {!isLastCard && (
                              <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ top: '100%' }}>
                                {/* Top connecting line */}
                                <div className="w-0.5 h-6 bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] mx-auto" />
                                {/* OR badge */}
                                <div className="flex items-center justify-center">
                                  <span className="text-[10px] font-bold tracking-wider text-[#9ca3af] bg-white border border-[#e5e7eb] px-3 py-1 rounded-full shadow-sm">OR</span>
                                </div>
                                {/* Bottom connecting line */}
                                <div className="w-0.5 h-6 bg-gradient-to-b from-[#9ca3af] to-[#d1d5db] mx-auto" />
                              </div>
                            )}

                            {/* Spacing for cards after first */}
                            {index > 0 && <div className="h-16" />}

                            {/* Card container */}
                            <div className="relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e5e7eb] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#d1d5db]">
                              {/* Top gradient bar */}
                              <div 
                                className="h-1.5"
                                style={{ background: colors.bg }}
                              />
                              
                              <div className="p-5">
                                {/* If-Then layout */}
                                <div className="flex items-stretch gap-4">
                                  {/* IF section */}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                      <span className="text-[10px] font-bold tracking-wider text-[#6b7280] uppercase bg-[#f3f4f6] px-2 py-1 rounded">If</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <button
                                        onClick={() => cycleExitConditionIcon(condition.id)}
                                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                                        style={{ backgroundColor: colors.iconBg }}
                                        title="Click to change icon"
                                      >
                                        <Icon className="w-5 h-5" stroke={2} style={{ color: colors.iconColor }} />
                                      </button>
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
                                          className="flex-1 text-sm text-[#374151] font-medium border-b-2 border-[#0975d7] focus:outline-none bg-transparent py-1"
                                          autoFocus
                                        />
                                      ) : (
                                        <div
                                          onClick={() => {
                                            setEditingExitCondition({ id: condition.id, field: "trigger" });
                                            setExitConditionEditValue(condition.trigger);
                                          }}
                                          className="flex-1 text-sm text-[#374151] font-medium cursor-text hover:text-[#0975d7] transition-colors py-1"
                                        >
                                          {condition.trigger}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Arrow connector */}
                                  <div className="flex items-center px-2">
                                    <div className="flex items-center gap-1">
                                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#d1d5db] to-[#9ca3af] rounded" />
                                      <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                                        style={{ background: colors.bg }}
                                      >
                                        <IconArrowRight className="w-4 h-4 text-white" stroke={2.5} />
                                      </div>
                                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#9ca3af] to-[#d1d5db] rounded" />
                                    </div>
                                  </div>

                                  {/* THEN section */}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                      <span className="text-[10px] font-bold tracking-wider text-[#6b7280] uppercase bg-[#f3f4f6] px-2 py-1 rounded">Then</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <div 
                                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: "#fee2e2" }}
                                      >
                                        <IconPlayerStop className="w-5 h-5" stroke={2} style={{ color: "#dc2626" }} />
                                      </div>
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
                                          className="flex-1 text-sm text-[#374151] font-medium border-b-2 border-[#0975d7] focus:outline-none bg-transparent py-1"
                                          autoFocus
                                        />
                                      ) : (
                                        <div
                                          onClick={() => {
                                            setEditingExitCondition({ id: condition.id, field: "action" });
                                            setExitConditionEditValue(condition.action);
                                          }}
                                          className="flex-1 text-sm text-[#374151] font-medium cursor-text hover:text-[#0975d7] transition-colors py-1"
                                        >
                                          {condition.action}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => deleteExitCondition(condition.id)}
                                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-[#fee2e2] rounded-lg self-start"
                                    title="Delete condition"
                                  >
                                    <IconTrash className="w-4 h-4 text-[#dc2626]" stroke={2} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add new condition button */}
                    <div className="mt-8">
                      <button
                        onClick={addExitCondition}
                        className="w-full py-4 px-6 border-2 border-dashed border-[#d1d5db] rounded-2xl text-[#6b7280] hover:border-[#0975d7] hover:text-[#0975d7] hover:bg-[#f0f7ff] transition-all duration-300 flex items-center justify-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#f3f4f6] group-hover:bg-[#dbeafe] flex items-center justify-center transition-colors">
                          <IconPlus className="w-4 h-4" stroke={2} />
                        </div>
                        <span className="font-medium">Add exit condition</span>
                      </button>
                    </div>

                    {/* Helper text */}
                    <p className="mt-6 text-center text-xs text-[#9ca3af]">
                      Click on any text to edit • Click icons to change type • Hover to delete
                    </p>
                  </div>
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
                    if (selectedWorkflow && onAttachWorkflow) {
                      onAttachWorkflow(selectedWorkflow.id, selectedWorkflow.name);
                    }
                    setShowWorkflowModal(false);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#0975d7] rounded-md hover:bg-[#0861b8] transition-colors"
                >
                  Attach
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}