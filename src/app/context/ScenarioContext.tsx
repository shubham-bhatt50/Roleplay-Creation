import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { analyzePrompt, PromptAnalysisResult } from "../utils/promptAnalyzer";
import { ScenarioData, TabType } from "../types/scenario";

/**
 * ScenarioContext centralizes state for the scenario creation flow.
 * 
 * This context manages:
 * - scenarioData: Structured scenario info (from builder or extracted from prompt)
 * - initialPrompt: Raw prompt text (from prompt path)
 * - promptAnalysis: Analysis result determining if prompt is complete/partial/vague
 * - shouldShowPlaceholder: Derived flag for showing placeholder content
 * - activeTab: Current tab in the detail screen
 */

interface ScenarioContextValue {
  // Core data
  scenarioData: ScenarioData | null;
  initialPrompt: string;
  
  // Derived analysis
  promptAnalysis: PromptAnalysisResult | null;
  shouldShowPlaceholder: boolean;
  
  // Tab state
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Scenario title
  scenarioTitle: string;
  setScenarioTitle: (title: string) => void;
  
  // Helper to get default title
  getDefaultTitle: () => string;
}

const ScenarioContext = createContext<ScenarioContextValue | null>(null);

interface ScenarioProviderProps {
  children: ReactNode;
  scenarioData: ScenarioData | null;
  initialPrompt?: string;
}

export function ScenarioProvider({ 
  children, 
  scenarioData, 
  initialPrompt = "" 
}: ScenarioProviderProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scenario");
  
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
  
  const getDefaultTitle = (): string => {
    if (shouldShowPlaceholder) return "New scenario (draft)";
    if (!scenarioData) return "Dealing with angry customer for refund scenario";
    return `${scenarioData.customerName} - ${scenarioData.emotion} customer scenario`;
  };
  
  const [scenarioTitle, setScenarioTitle] = useState(getDefaultTitle());
  
  const value: ScenarioContextValue = {
    scenarioData,
    initialPrompt,
    promptAnalysis,
    shouldShowPlaceholder,
    activeTab,
    setActiveTab,
    scenarioTitle,
    setScenarioTitle,
    getDefaultTitle,
  };
  
  return (
    <ScenarioContext.Provider value={value}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenarioContext(): ScenarioContextValue {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenarioContext must be used within a ScenarioProvider");
  }
  return context;
}
