import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dashboard } from "@/app/components/Dashboard";
import { ScenarioBuilder } from "@/app/components/ScenarioBuilder";
import { PromptScreen } from "@/app/components/PromptScreen";
import { ScenarioDetailScreen } from "@/app/components/ScenarioDetailScreen";
import { WorkflowDetailScreen } from "@/app/components/WorkflowDetailScreen";
import { Sidebar } from "@/app/components/Sidebar";
import { SettingsSidebar } from "@/app/components/SettingsSidebar";
import { Competencies } from "@/app/components/Competencies";

type Screen = "dashboard" | "roleplay" | "prompt" | "simulation" | "scenarioDetail" | "workflowDetail" | "competencies";

// Screen transition variants
const screenVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }
};


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
    // Simulate AI generation time
    setTimeout(() => {
      setCurrentScreen("scenarioDetail");
    }, 2000);
  };

  const handleAttachWorkflow = (workflowId: string, workflowName: string) => {
    setAttachedRoleplays((prev) => {
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
    setCurrentScreen("dashboard");
  };

  const handleNavigateToDetail = (roleplayId: string, workflow?: { id: string; name: string } | null) => {
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
    if (currentWorkflow) {
      setAttachedWorkflow({ id: currentWorkflow.id, name: currentWorkflow.name });
    }
    setCurrentScreen("scenarioDetail");
  };

  const handleCreateRoleplayFromWorkflow = (workflowId: string, workflowName: string) => {
    setAttachedWorkflow({ id: workflowId, name: workflowName });
    setCurrentScreen("roleplay");
  };

  const handleAttachRoleplayToWorkflow = (roleplayId: string, roleplayName: string) => {
    if (currentWorkflow) {
      setCurrentWorkflow({
        ...currentWorkflow,
        attachedRoleplay: { id: roleplayId, name: roleplayName }
      });
      setAttachedRoleplays((prev) => {
        if (prev.some((r) => r.workflowId === currentWorkflow.id)) {
          return prev.map((r) => 
            r.workflowId === currentWorkflow.id 
              ? { ...r, scenarioTitle: roleplayName }
              : r
          );
        }
        return [
          ...prev,
          {
            workflowId: currentWorkflow.id,
            workflowName: currentWorkflow.name,
            scenarioTitle: roleplayName,
          },
        ];
      });
    }
  };

  const handleNavigateToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigateToRoleplay = () => {
    setCurrentScreen("roleplay");
  };

  const handleNavigateToSimulation = () => {
    setCurrentScreen("simulation");
  };

  const handleNavigateToCompetencies = () => {
    setIsSettingsOpen(false);
    setCurrentScreen("competencies");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#fcfcfd] overflow-hidden">
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          onNavigateToDashboard={handleNavigateToDashboard} 
          onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
          isSettingsActive={isSettingsOpen || currentScreen === "competencies"}
          isWorkflowsActive={currentScreen === "dashboard" || currentScreen === "roleplay" || currentScreen === "prompt" || currentScreen === "scenarioDetail" || currentScreen === "workflowDetail"}
        />
        {isSettingsOpen && (
          <SettingsSidebar 
            onClose={() => setIsSettingsOpen(false)}
            onCompetenciesClick={handleNavigateToCompetencies}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <Dashboard
                onNavigateToRoleplay={handleNavigateToRoleplay}
                onNavigateToSimulation={handleNavigateToSimulation}
                onNavigateToWorkflow={handleNavigateToWorkflow}
                attachedRoleplays={attachedRoleplays}
              />
            </motion.div>
          )}
          {currentScreen === "roleplay" && (
            <motion.div
              key="roleplay"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ScenarioBuilder 
                onBack={handleNavigateToDashboard} 
                onSwitchToPrompt={() => setCurrentScreen("prompt")}
                onGenerateScenario={handleGenerateScenario}
                onNavigateToDetail={handleNavigateToDetail}
              />
            </motion.div>
          )}
          {currentScreen === "prompt" && (
            <motion.div
              key="prompt"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <PromptScreen 
                onBack={handleNavigateToDashboard}
                onSwitchToBuilder={() => setCurrentScreen("roleplay")}
                onGenerateScenario={handleGenerateScenario}
                onNavigateToDetail={handleNavigateToDetail}
              />
            </motion.div>
          )}
          {currentScreen === "scenarioDetail" && (
            <motion.div
              key="scenarioDetail"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ScenarioDetailScreen 
                onBack={handleNavigateToDashboard}
                onAttachWorkflow={handleAttachWorkflow}
                scenarioData={scenarioData}
                attachedWorkflow={attachedWorkflow}
                onNavigateToWorkflow={handleNavigateToWorkflow}
              />
            </motion.div>
          )}
          {currentScreen === "workflowDetail" && currentWorkflow && (
            <motion.div
              key="workflowDetail"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <WorkflowDetailScreen
                onBack={handleNavigateToDashboard}
                workflowId={currentWorkflow.id}
                workflowName={currentWorkflow.name}
                attachedRoleplay={currentWorkflow.attachedRoleplay}
                onNavigateToRoleplay={handleNavigateFromWorkflowToRoleplay}
                onCreateNewRoleplay={handleCreateRoleplayFromWorkflow}
                onAttachRoleplay={handleAttachRoleplayToWorkflow}
              />
            </motion.div>
          )}
          {currentScreen === "simulation" && (
            <motion.div
              key="simulation"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 bg-[#fcfcfd] flex items-center justify-center p-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#3d3c52] mb-4">Simulation builder</h2>
                <p className="text-[#6b697b] mb-6">This screen is coming soon...</p>
                <button
                  onClick={handleNavigateToDashboard}
                  className="bg-[#0975d7] text-white px-6 py-3 rounded hover:bg-[#0861b8] transition-colors"
                >
                  Back to dashboard
                </button>
              </div>
            </motion.div>
          )}
          {currentScreen === "competencies" && (
            <motion.div
              key="competencies"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <Competencies />
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}