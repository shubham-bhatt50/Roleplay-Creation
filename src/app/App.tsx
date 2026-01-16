import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "@/app/components/Dashboard";
import { ScenarioBuilder } from "@/app/components/ScenarioBuilder";
import { PromptScreen } from "@/app/components/PromptScreen";
import { ScenarioDetailScreen } from "@/app/components/ScenarioDetailScreen";
import { Sidebar } from "@/app/components/Sidebar";
import { SettingsSidebar } from "@/app/components/SettingsSidebar";
import { Competencies } from "@/app/components/Competencies";

type Screen = "dashboard" | "roleplay" | "prompt" | "simulation" | "scenarioDetail" | "competencies";

interface AttachedRoleplay {
  workflowId: string;
  workflowName: string;
  scenarioTitle: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [attachedRoleplays, setAttachedRoleplays] = useState<AttachedRoleplay[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerateScenario = () => {
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

  return (
    <div className="h-screen w-screen flex flex-col bg-[#fcfcfd] overflow-hidden">
      {/* Preliminary Exploration Banner */}
      <div className="w-full bg-yellow-400 text-[#3d3c52] py-2 px-4 text-center text-sm font-medium shrink-0 z-50">
        This is a preliminary exploration, not to be considered final.
      </div>
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
            />
          )}
          {currentScreen === "prompt" && (
            <PromptScreen 
              key="prompt"
              onBack={() => setCurrentScreen("dashboard")}
              onSwitchToBuilder={() => setCurrentScreen("roleplay")}
              onGenerateScenario={handleGenerateScenario}
            />
          )}
          {currentScreen === "scenarioDetail" && (
            <ScenarioDetailScreen 
              key="scenarioDetail"
              onBack={() => setCurrentScreen("dashboard")}
              onAttachWorkflow={handleAttachWorkflow}
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