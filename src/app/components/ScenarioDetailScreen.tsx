/**
 * ScenarioDetailScreen - Main screen for editing scenario details
 * 
 * ENTRY FLOWS:
 * 1. Builder path: User fills ScenarioBuilder form → sets scenarioData, clears initialPrompt
 *    → Shows full content immediately
 * 
 * 2. Prompt path: User enters prompt in PromptScreen → sets initialPrompt, clears scenarioData
 *    → Analyzes prompt:
 *      - If complete: generates content from extracted info
 *      - If partial/vague: shows placeholders, chat asks clarifying questions
 */

import imgAlexJonathan from "@/assets/Alex.png";
import { IconPencil, IconEye, IconArrowRight, IconFileText, IconUser, IconClipboardCheck, IconDoorExit, IconSettings, IconX, IconSearch, IconSparkles, IconArrowUpRight, IconAlertCircle } from "@tabler/icons-react";
import { ChatPanel } from "./ChatPanel";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { analyzePrompt, PromptAnalysisResult } from "../utils/promptAnalyzer";
import { Editor } from '@tiptap/react';

// Import extracted tab components
import { ScenarioEditorTab } from "./tabs/ScenarioEditorTab";
import { PersonaTab } from "./tabs/PersonaTab";
import { EvaluationTab } from "./tabs/EvaluationTab";
import { ExitConditionsTab } from "./tabs/ExitConditionsTab";

// Import shared types
import { 
  ScenarioData, 
  Persona, 
  PersonaTemplate, 
  EvaluationParameter, 
  EvaluationTemplate, 
  ExitCondition, 
  TabType 
} from "../types/scenario";

interface ScenarioDetailScreenProps {
  onBack: () => void;
  onAttachWorkflow?: (workflowId: string, workflowName: string) => void;
  scenarioData?: ScenarioData | null;
  attachedWorkflow?: { id: string; name: string } | null;
  onNavigateToWorkflow?: (workflowId: string, workflowName: string, roleplayName?: string) => void;
  initialPrompt?: string;
}

// Placeholder content component for incomplete prompts
function TabPlaceholder({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string; stroke?: number }>; title: string; description: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#8d8ba7]" stroke={1.5} />
      </div>
      <h3 className="text-lg font-medium text-[#3d3c52] mb-2">{title}</h3>
      <p className="text-sm text-[#8d8ba7] max-w-md">{description}</p>
    </div>
  );
}

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

export function ScenarioDetailScreen({ onBack, onAttachWorkflow, scenarioData, attachedWorkflow, onNavigateToWorkflow, initialPrompt }: ScenarioDetailScreenProps) {
  // Core UI state
  const [activeTab, setActiveTab] = useState<TabType>("scenario");
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // Editor reference for chat panel integration
  const editorRef = useRef<Editor | null>(null);
  
  // Analyze the initial prompt if provided
  const promptAnalysis = useMemo<PromptAnalysisResult | null>(() => {
    if (!initialPrompt) return null;
    return analyzePrompt(initialPrompt);
  }, [initialPrompt]);
  
  // Determine if we should show placeholder content (prompt is incomplete and no scenarioData)
  const shouldShowPlaceholder = !!(
    initialPrompt && 
    !scenarioData && 
    promptAnalysis && 
    (promptAnalysis.quality === "partial" || promptAnalysis.quality === "vague" || promptAnalysis.quality === "empty")
  );
  
  const getDefaultTitle = (data: ScenarioData | null | undefined): string => {
    if (shouldShowPlaceholder) return "New scenario (draft)";
    if (!data) return "Dealing with angry customer for refund scenario";
    return `${data.customerName} - ${data.emotion} customer scenario`;
  };

  const [scenarioTitle, setScenarioTitle] = useState(getDefaultTitle(scenarioData));
  
  // AI Change Preview State
  const [isPreviewingChanges, setIsPreviewingChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [proposedContent, setProposedContent] = useState<string>("");

  // Workflow modal state
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [workflowTab, setWorkflowTab] = useState<"draft" | "ready">("ready");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(attachedWorkflow?.id || "1");
  const [workflowSearchQuery, setWorkflowSearchQuery] = useState("");
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingWorkflowId, setPendingWorkflowId] = useState<string | null>(null);

  // ========== PERSONA STATE ==========
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
  ]);
  const [currentPersonaId, setCurrentPersonaId] = useState("1");
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
        additionalRemarks: "Wants a full refund for a product they bought. May escalate if not handled properly.",
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
        additionalRemarks: "First time using the product and needs help getting started.",
      },
    },
  ]);

  // ========== EVALUATION STATE ==========
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
  ]);
  const [evaluationTemplates, setEvaluationTemplates] = useState<EvaluationTemplate[]>([
    {
      id: "et1",
      name: "Customer support basics",
      description: "Essential evaluation criteria for customer support",
      parameters: [
        {
          title: "Empathy and Active Listening",
          criteria: [
            "0-2: Fails to acknowledge user feelings.",
            "3-4: Shows limited empathy.",
            "5-6: Generally empathetic.",
            "7-8: Demonstrates strong empathy.",
            "9-10: Exceptional empathy.",
          ],
          mappedCompetency: "Empathy",
        },
      ],
    },
  ]);

  // ========== EXIT CONDITIONS STATE ==========
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

  // AI Change Preview Handlers
  const handlePreviewChange = (original: string, proposed: string) => {
    setOriginalContent(editorRef.current?.getHTML() || "");
    setProposedContent(proposed);
    setIsPreviewingChanges(true);
  };

  const handleAcceptChange = (proposed: string) => {
    if (editorRef.current) {
      editorRef.current.commands.setContent(proposed);
    }
    setIsPreviewingChanges(false);
    setOriginalContent("");
    setProposedContent("");
  };

  const handleRejectChange = () => {
    setIsPreviewingChanges(false);
    setOriginalContent("");
    setProposedContent("");
  };

  const getCurrentEditorContent = (): string => {
    return editorRef.current?.getHTML() || "";
  };

  // Sync title with persona changes
  const currentPersona = personas.find(p => p.id === currentPersonaId) || personas[0];
  useEffect(() => {
    if (currentPersona && !shouldShowPlaceholder) {
      setScenarioTitle(`${currentPersona.name} - ${currentPersona.emotionalStates[0] || 'Customer'} scenario`);
    }
  }, [currentPersona?.name, currentPersona?.emotionalStates, shouldShowPlaceholder]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
      {/* AI Chat Panel - Fixed Right Sidebar */}
      {isChatSidebarOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-[380px] border-l border-[#eee] z-10">
          <ChatPanel 
            activeTab={activeTab}
            editorContent={getCurrentEditorContent()}
            initialPrompt={initialPrompt}
            promptAnalysis={promptAnalysis || undefined}
            onPreviewChange={handlePreviewChange}
            onAcceptChange={handleAcceptChange}
            onRejectChange={handleRejectChange}
            onClose={() => setIsChatSidebarOpen(false)}
          />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col bg-white min-h-0 overflow-hidden ${isChatSidebarOpen ? 'pr-[380px]' : ''}`}>
        {/* Header */}
        <div className="border-b border-[#eee] px-6 py-4">
          <div className="flex items-start justify-between">
            {/* Left Section - Title and Workflow Link */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={scenarioTitle}
                    onChange={(e) => setScenarioTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Escape") {
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

              {attachedWorkflow && (
                <button 
                  className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#8d8ba7] hover:text-[#6b6b80] transition-colors group"
                  onClick={() => onNavigateToWorkflow?.(attachedWorkflow.id, attachedWorkflow.name, scenarioTitle)}
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
              {!isChatSidebarOpen && (
                <button 
                  className="flex items-center gap-2 px-3 py-2 border border-[#e5e5ea] text-[#2b2b40] rounded-lg hover:bg-[#f5f5f7] hover:border-[#0975d7] transition-colors text-sm font-medium"
                  onClick={() => setIsChatSidebarOpen(true)}
                >
                  <IconSparkles className="w-4 h-4 text-[#0975d7]" stroke={2} />
                  AI assistant
                </button>
              )}
              <button 
                className="bg-[#d0450b] hover:bg-[#b83d0a] text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                onClick={() => setShowWorkflowModal(true)}
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
                Persona
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
            {/* Scenario Tab */}
            {activeTab === "scenario" && (
              <ScenarioEditorTab
                scenarioData={scenarioData || null}
                shouldShowPlaceholder={shouldShowPlaceholder}
                isPreviewingChanges={isPreviewingChanges}
                originalContent={originalContent}
                proposedContent={proposedContent}
                onAcceptChange={() => handleAcceptChange(proposedContent)}
                onRejectChange={handleRejectChange}
                onEditorReady={(editor) => { editorRef.current = editor; }}
              />
            )}

            {/* Persona Tab */}
            {activeTab === "persona" && (
              shouldShowPlaceholder ? (
                <TabPlaceholder 
                  icon={IconUser}
                  title="Customer persona not yet defined"
                  description="Use the AI assistant to describe your scenario. Once you provide more details, the customer persona will be generated automatically."
                />
              ) : (
                <PersonaTab
                  personas={personas}
                  currentPersonaId={currentPersonaId}
                  personaTemplates={personaTemplates}
                  onUpdatePersonas={setPersonas}
                  onUpdateCurrentPersonaId={setCurrentPersonaId}
                  onUpdateTemplates={setPersonaTemplates}
                />
              )
            )}

            {/* Evaluation Tab */}
            {activeTab === "evaluation" && (
              shouldShowPlaceholder ? (
                <TabPlaceholder 
                  icon={IconClipboardCheck}
                  title="Evaluation criteria not yet defined"
                  description="Use the AI assistant to describe your scenario. Evaluation criteria will be generated based on the training objectives you specify."
                />
              ) : (
                <EvaluationTab
                  parameters={evaluationParameters}
                  onUpdate={setEvaluationParameters}
                  templates={evaluationTemplates}
                  onUpdateTemplates={setEvaluationTemplates}
                />
              )
            )}

            {/* Exit Conditions Tab */}
            {activeTab === "exit" && (
              shouldShowPlaceholder ? (
                <TabPlaceholder 
                  icon={IconDoorExit}
                  title="Exit conditions not yet defined"
                  description="Use the AI assistant to describe your scenario. Exit conditions will be generated to define when the roleplay should conclude."
                />
              ) : (
                <ExitConditionsTab
                  exitConditions={exitConditions}
                  onUpdate={setExitConditions}
                />
              )
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[#8d8ba7]">Settings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workflow Selection Modal */}
      {showWorkflowModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee]">
              <h2 className="text-xl font-semibold text-[#2b2b40]">Select workflow</h2>
              <button
                onClick={() => setShowWorkflowModal(false)}
                className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
              >
                <IconX className="w-5 h-5 text-[#6b697b]" stroke={2} />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
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

              <div className="flex-1 overflow-y-auto">
                {availableWorkflows
                  .filter((w) => w.name.toLowerCase().includes(workflowSearchQuery.toLowerCase()))
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
                    const selectedWorkflow = availableWorkflows.find((w) => w.id === selectedWorkflowId);
                    if (selectedWorkflow) {
                      if (attachedWorkflow && attachedWorkflow.id !== selectedWorkflowId) {
                        setPendingWorkflowId(selectedWorkflowId);
                        setShowWarningDialog(true);
                        setShowWorkflowModal(false);
                      } else if (onAttachWorkflow) {
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
                  Updating the workflow will disrupt any ongoing training sessions, active learners, or scheduled activities associated with this roleplay.
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
                    const selectedWorkflow = availableWorkflows.find((w) => w.id === pendingWorkflowId);
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
