import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "@/app/components/Dashboard";
import { ScenarioBuilder } from "@/app/components/ScenarioBuilder";
import { PromptScreen } from "@/app/components/PromptScreen";
import { ScenarioDetailScreen } from "@/app/components/ScenarioDetailScreen";
import { WorkflowDetailScreen } from "@/app/components/WorkflowDetailScreen";
import { Sidebar } from "@/app/components/Sidebar";
import { SettingsSidebar } from "@/app/components/SettingsSidebar";
import { Competencies } from "@/app/components/Competencies";

type Screen = "dashboard" | "roleplay" | "prompt" | "simulation" | "scenarioDetail" | "workflowDetail" | "competencies";

interface AttachedRoleplay {
  workflowId: string;
  workflowName: string;
  scenarioTitle: string;
}

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [attachedRoleplays, setAttachedRoleplays] = useState<AttachedRoleplay[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);
  const [attachedWorkflow, setAttachedWorkflow] = useState<{ id: string; name: string } | null>(null);
  const [currentWorkflow, setCurrentWorkflow] = useState<{ id: string; name: string; attachedRoleplay?: { id: string; name: string } } | null>(null);

  const handleGenerateScenario = (data: ScenarioData) => {
    setScenarioData(data);
    // Simulate loading time before navigating to the detail screen
    setTimeout(() => {
      setCurrentScreen("scenarioDetail");
    }, 2000); // 2 second delay
  };

  const handleAttachWorkflow = (workflowId: string, workflowName: string) => {
    // Add the roleplay attachment to state
    setAttachedRoleplays((prev) => {
      // Avoid duplicates
      if (prev.some((r) => r.workflowId === workflowId)) {
        return prev;
      }
      return [
        ...prev,
        {
          workflowId,
          workflowName,
          scenarioTitle: "Dealing with angry customer for refund scenario",
        },
      ];
    });
    // Navigate back to dashboard
    setCurrentScreen("dashboard");
  };

  const handleNavigateToDetail = (roleplayId: string, workflow?: { id: string; name: string } | null) => {
    // Create scenario data from roleplay ID (in a real app, you'd fetch this)
    // For now, we'll use default data
    const defaultScenarioData: ScenarioData = {
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
    };
    setScenarioData(defaultScenarioData);
    setAttachedWorkflow(workflow || null);
    setCurrentScreen("scenarioDetail");
  };

  const handleNavigateToWorkflow = (workflowId: string, workflowName: string, roleplayName?: string) => {
    setCurrentWorkflow({
      id: workflowId,
      name: workflowName,
      attachedRoleplay: roleplayName ? { id: "current", name: roleplayName } : undefined
    });
    setCurrentScreen("workflowDetail");
  };

  const handleNavigateFromWorkflowToRoleplay = (roleplayId: string) => {
    // Navigate back to the roleplay detail page
    // Use the current workflow as the attached workflow
    if (currentWorkflow) {
      setAttachedWorkflow({ id: currentWorkflow.id, name: currentWorkflow.name });
    }
    setCurrentScreen("scenarioDetail");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#fcfcfd] overflow-hidden">
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          onNavigateToDashboard={() => setCurrentScreen("dashboard")} 
          onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
          isSettingsActive={isSettingsOpen || currentScreen === "competencies"}
          isWorkflowsActive={currentScreen === "dashboard" || currentScreen === "roleplay" || currentScreen === "prompt" || currentScreen === "scenarioDetail"}
        />
        {isSettingsOpen && (
          <SettingsSidebar 
            onClose={() => setIsSettingsOpen(false)}
            onCompetenciesClick={() => {
              setIsSettingsOpen(false);
              setCurrentScreen("competencies");
            }}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === "dashboard" && (
            <Dashboard
              key="dashboard"
              onNavigateToRoleplay={() => setCurrentScreen("roleplay")}
              onNavigateToSimulation={() => setCurrentScreen("simulation")}
              attachedRoleplays={attachedRoleplays}
            />
          )}
          {currentScreen === "roleplay" && (
            <ScenarioBuilder 
              key="roleplay"
              onBack={() => setCurrentScreen("dashboard")} 
              onSwitchToPrompt={() => setCurrentScreen("prompt")}
              onGenerateScenario={handleGenerateScenario}
              onNavigateToDetail={handleNavigateToDetail}
            />
          )}
          {currentScreen === "prompt" && (
            <PromptScreen 
              key="prompt"
              onBack={() => setCurrentScreen("dashboard")}
              onSwitchToBuilder={() => setCurrentScreen("roleplay")}
              onGenerateScenario={handleGenerateScenario}
              onNavigateToDetail={handleNavigateToDetail}
            />
          )}
          {currentScreen === "scenarioDetail" && (
            <ScenarioDetailScreen 
              key="scenarioDetail"
              onBack={() => setCurrentScreen("dashboard")}
              onAttachWorkflow={handleAttachWorkflow}
              scenarioData={scenarioData}
              attachedWorkflow={attachedWorkflow}
              onNavigateToWorkflow={handleNavigateToWorkflow}
            />
          )}
          {currentScreen === "workflowDetail" && currentWorkflow && (
            <WorkflowDetailScreen
              key="workflowDetail"
              onBack={() => setCurrentScreen("dashboard")}
              workflowId={currentWorkflow.id}
              workflowName={currentWorkflow.name}
              attachedRoleplay={currentWorkflow.attachedRoleplay}
              onNavigateToRoleplay={handleNavigateFromWorkflowToRoleplay}
            />
          )}
          {currentScreen === "simulation" && (
            <div key="simulation" className="flex-1 bg-[#fcfcfd] flex items-center justify-center p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#3d3c52] mb-4">Simulation Builder</h2>
                <p className="text-[#6b697b] mb-6">This screen is coming soon...</p>
                <button
                  onClick={() => setCurrentScreen("dashboard")}
                  className="bg-[#0975d7] text-white px-6 py-3 rounded hover:bg-[#0861b8] transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
          {currentScreen === "competencies" && (
            <Competencies key="competencies" />
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}