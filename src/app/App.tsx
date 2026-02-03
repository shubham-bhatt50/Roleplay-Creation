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

// Loading overlay component
function LoadingOverlay({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 border-3 border-[#e5e5ea] rounded-full" />
          <div className="absolute inset-0 w-10 h-10 border-3 border-transparent border-t-[#0975d7] rounded-full animate-spin" />
        </div>
        <p className="text-sm text-[#6b697b] font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Helper to navigate with loading state
  const navigateWithLoading = (screen: Screen, message: string, delay: number = 600) => {
    setLoadingMessage(message);
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsLoading(false);
    }, delay);
  };

  const handleGenerateScenario = (data: ScenarioData) => {
    setScenarioData(data);
    setLoadingMessage("Generating scenario...");
    setIsLoading(true);
    // Simulate AI generation time
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("scenarioDetail");
    }, 2500);
  };

  const handleAttachWorkflow = (workflowId: string, workflowName: string) => {
    setLoadingMessage("Attaching workflow...");
    setIsLoading(true);
    
    setTimeout(() => {
      // Add the roleplay attachment to state
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
      setIsLoading(false);
      setCurrentScreen("dashboard");
    }, 800);
  };

  const handleNavigateToDetail = (roleplayId: string, workflow?: { id: string; name: string } | null) => {
    setLoadingMessage("Loading roleplay...");
    setIsLoading(true);
    
    setTimeout(() => {
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
      setIsLoading(false);
      setCurrentScreen("scenarioDetail");
    }, 700);
  };

  const handleNavigateToWorkflow = (workflowId: string, workflowName: string, roleplayName?: string) => {
    setLoadingMessage("Loading workflow...");
    setIsLoading(true);
    
    setTimeout(() => {
      setCurrentWorkflow({
        id: workflowId,
        name: workflowName,
        attachedRoleplay: roleplayName ? { id: "current", name: roleplayName } : undefined
      });
      setIsLoading(false);
      setCurrentScreen("workflowDetail");
    }, 600);
  };

  const handleNavigateFromWorkflowToRoleplay = (roleplayId: string) => {
    setLoadingMessage("Loading roleplay...");
    setIsLoading(true);
    
    setTimeout(() => {
      if (currentWorkflow) {
        setAttachedWorkflow({ id: currentWorkflow.id, name: currentWorkflow.name });
      }
      setIsLoading(false);
      setCurrentScreen("scenarioDetail");
    }, 600);
  };

  const handleCreateRoleplayFromWorkflow = (workflowId: string, workflowName: string) => {
    setAttachedWorkflow({ id: workflowId, name: workflowName });
    navigateWithLoading("roleplay", "Opening builder...", 400);
  };

  const handleAttachRoleplayToWorkflow = (roleplayId: string, roleplayName: string) => {
    setLoadingMessage("Attaching roleplay...");
    setIsLoading(true);
    
    setTimeout(() => {
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
      setIsLoading(false);
    }, 600);
  };

  const handleNavigateToDashboard = () => {
    navigateWithLoading("dashboard", "Loading workflows...", 400);
  };

  const handleNavigateToRoleplay = () => {
    navigateWithLoading("roleplay", "Opening builder...", 300);
  };

  const handleNavigateToSimulation = () => {
    navigateWithLoading("simulation", "Loading simulation...", 400);
  };

  const handleNavigateToCompetencies = () => {
    setIsSettingsOpen(false);
    navigateWithLoading("competencies", "Loading competencies...", 500);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#fcfcfd] overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && <LoadingOverlay message={loadingMessage} />}
      </AnimatePresence>

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