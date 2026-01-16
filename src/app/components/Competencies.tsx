import { useState } from "react";
import { IconPlus, IconPencil, IconTrash, IconAlertTriangle, IconBug, IconX } from "@tabler/icons-react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { CompetenciesEmpty } from "@/app/components/CompetenciesEmpty";
import { CompetenciesError } from "@/app/components/CompetenciesError";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";

interface Competency {
  id: string;
  name: string;
  description: string;
  mandatoryForAll?: boolean;
  usageCount?: {
    scenarios: number;
    workflows: number;
    assessments: number;
  };
}

// Mock function to get usage count - in real app, this would come from API
const getUsageCount = (competencyId: string): { scenarios: number; workflows: number; assessments: number } => {
  // Simulate usage data
  const mockData: Record<string, { scenarios: number; workflows: number; assessments: number }> = {
    "1": { scenarios: 5, workflows: 3, assessments: 12 },
    "2": { scenarios: 8, workflows: 2, assessments: 15 },
    "3": { scenarios: 3, workflows: 1, assessments: 7 },
    "4": { scenarios: 12, workflows: 20, assessments: 25 },
  };
  return mockData[competencyId] || { scenarios: 0, workflows: 0, assessments: 0 };
};

interface Workflow {
  id: string;
  name: string;
  stage: "draft" | "ready" | "production";
}

// Mock function to get workflows for a competency - in real app, this would come from API
const getWorkflowsForCompetency = (competencyId: string): Workflow[] => {
  const mockWorkflows: Record<string, Workflow[]> = {
    "1": [
      { id: "1", name: "New claim | Guidewire 2", stage: "ready" },
      { id: "2", name: "Refund request | Billing system", stage: "production" },
      { id: "3", name: "Customer complaint | Support portal", stage: "draft" },
    ],
    "2": [
      { id: "4", name: "System configuration | Admin panel", stage: "ready" },
      { id: "5", name: "Data migration | Database tools", stage: "production" },
    ],
    "3": [
      { id: "6", name: "Issue resolution | Ticketing system", stage: "ready" },
    ],
    "4": [
      { id: "7", name: "New claim | Guidewire 2", stage: "ready" },
      { id: "8", name: "New claim | Guidewire 3", stage: "production" },
      { id: "9", name: "Refund request | Billing system", stage: "production" },
      { id: "10", name: "Return label | Shipping portal", stage: "ready" },
      { id: "11", name: "Cancel order | Order system", stage: "draft" },
      { id: "12", name: "Change address | Order system", stage: "ready" },
      { id: "13", name: "Update payment | Billing system", stage: "production" },
      { id: "14", name: "Customer onboarding | CRM", stage: "ready" },
      { id: "15", name: "Account setup | User portal", stage: "production" },
      { id: "16", name: "Product configuration | Admin panel", stage: "draft" },
      { id: "17", name: "Order processing | E-commerce", stage: "ready" },
      { id: "18", name: "Payment processing | Gateway", stage: "production" },
      { id: "19", name: "Shipping management | Logistics", stage: "ready" },
      { id: "20", name: "Inventory update | Warehouse", stage: "draft" },
      { id: "21", name: "Customer support | Helpdesk", stage: "production" },
      { id: "22", name: "Report generation | Analytics", stage: "ready" },
      { id: "23", name: "Data export | System tools", stage: "production" },
      { id: "24", name: "User management | Admin", stage: "ready" },
      { id: "25", name: "Permission setup | Security", stage: "draft" },
      { id: "26", name: "Workflow automation | Process", stage: "production" },
    ],
  };
  return mockWorkflows[competencyId] || [];
};

const initialCompetencies: Competency[] = [
  {
    id: "1",
    name: "Empathy",
    description: "The ability to understand and share the feelings of customers, showing genuine care and concern for their situation.",
    mandatoryForAll: false,
  },
  {
    id: "2",
    name: "System know-how",
    description: "Proficiency in understanding and effectively using internal systems, tools, and processes to resolve customer issues.",
    mandatoryForAll: false,
  },
  {
    id: "3",
    name: "Resolution finding",
    description: "The skill to identify root causes, explore multiple solutions, and implement effective resolutions for customer problems.",
    mandatoryForAll: false,
  },
  {
    id: "4",
    name: "Process",
    description: "How well the person is able to perform tasks on Mirror, measuring proficiency in using the Mirror platform effectively.",
    mandatoryForAll: true,
  },
].map((c) => ({ ...c, usageCount: getUsageCount(c.id) }));

type DebugState = "normal" | "empty" | "addError" | "duplicateError" | "networkError" | "validationError";

export function Competencies() {
  const [competencies, setCompetencies] = useState<Competency[]>(initialCompetencies);
  const [debugState, setDebugState] = useState<DebugState>("normal");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateConfirmDialogOpen, setIsUpdateConfirmDialogOpen] = useState(false);
  const [isWorkflowsModalOpen, setIsWorkflowsModalOpen] = useState(false);
  const [viewingWorkflowsFor, setViewingWorkflowsFor] = useState<Competency | null>(null);
  const [workflowTab, setWorkflowTab] = useState<"draft" | "ready" | "production">("ready");
  const [editingCompetency, setEditingCompetency] = useState<Competency | null>(null);
  const [deletingCompetency, setDeletingCompetency] = useState<Competency | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [pendingUpdate, setPendingUpdate] = useState<{ competency: Competency; newData: { name: string; description: string } } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAdd = () => {
    setFormData({ name: "", description: "" });
    setErrorMessage("");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (competency: Competency) => {
    setEditingCompetency(competency);
    setFormData({ name: competency.name, description: competency.description });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (competency: Competency) => {
    setDeletingCompetency(competency);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      if (debugState === "validationError") {
        setErrorMessage("Name and description are required fields.");
        return;
      }
      return;
    }

    // Simulate different error states
    if (debugState === "addError") {
      setErrorMessage("Failed to add competency. Please try again.");
      return;
    }

    if (debugState === "duplicateError") {
      const isDuplicate = competencies.some(
        (c) => c.name.toLowerCase() === formData.name.trim().toLowerCase()
      );
      if (isDuplicate) {
        setErrorMessage(`A competency with the name "${formData.name.trim()}" already exists.`);
        return;
      }
    }

    if (debugState === "networkError") {
      setErrorMessage("Network error. Please check your connection and try again.");
      return;
    }

    const newCompetency: Competency = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      mandatoryForAll: false,
      usageCount: { scenarios: 0, workflows: 0, assessments: 0 },
    };
    setCompetencies([...competencies, newCompetency]);
    setIsAddDialogOpen(false);
    setFormData({ name: "", description: "" });
    setErrorMessage("");
  };

  const handleDebugStateChange = (state: DebugState) => {
    setDebugState(state);
    setErrorMessage("");
    if (state === "empty") {
      setCompetencies([]);
    } else if (state === "normal") {
      setCompetencies(initialCompetencies);
    }
  };

  const displayCompetencies = debugState === "empty" ? [] : competencies;

  const handleToggleMandatory = (competencyId: string) => {
    setCompetencies(
      competencies.map((c) =>
        c.id === competencyId ? { ...c, mandatoryForAll: !c.mandatoryForAll } : c
      )
    );
  };

  const handleViewWorkflows = (competency: Competency) => {
    setViewingWorkflowsFor(competency);
    setWorkflowTab("ready");
    setIsWorkflowsModalOpen(true);
  };

  const getWorkflowsByStage = (competencyId: string, stage: "draft" | "ready" | "production") => {
    return getWorkflowsForCompetency(competencyId).filter((w) => w.stage === stage);
  };

  const getWorkflowCountsByStage = (competencyId: string) => {
    const workflows = getWorkflowsForCompetency(competencyId);
    return {
      draft: workflows.filter((w) => w.stage === "draft").length,
      ready: workflows.filter((w) => w.stage === "ready").length,
      production: workflows.filter((w) => w.stage === "production").length,
    };
  };

  const handleSaveEdit = () => {
    if (!editingCompetency || !formData.name.trim() || !formData.description.trim()) {
      return;
    }

    // Check if name or description changed
    const hasChanges =
      formData.name.trim() !== editingCompetency.name ||
      formData.description.trim() !== editingCompetency.description;

    if (hasChanges && editingCompetency.usageCount && 
        editingCompetency.usageCount.workflows > 0) {
      // Show confirmation dialog
      setPendingUpdate({
        competency: editingCompetency,
        newData: { name: formData.name.trim(), description: formData.description.trim() },
      });
      setIsEditDialogOpen(false);
      setIsUpdateConfirmDialogOpen(true);
    } else {
      // No usage or no changes, update directly
      performUpdate(editingCompetency.id, formData.name.trim(), formData.description.trim());
    }
  };

  const performUpdate = (id: string, name: string, description: string) => {
    setCompetencies(
      competencies.map((c) =>
        c.id === id ? { ...c, name, description } : c
      )
    );
    setIsEditDialogOpen(false);
    setIsUpdateConfirmDialogOpen(false);
    setEditingCompetency(null);
    setPendingUpdate(null);
    setFormData({ name: "", description: "" });
  };

  const handleConfirmUpdate = () => {
    if (pendingUpdate) {
      performUpdate(
        pendingUpdate.competency.id,
        pendingUpdate.newData.name,
        pendingUpdate.newData.description
      );
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingCompetency) return;

    if (displayCompetencies.length <= 3) {
      alert("Cannot delete. Minimum 3 competencies are required.");
      setIsDeleteDialogOpen(false);
      setDeletingCompetency(null);
      return;
    }

    setCompetencies(competencies.filter((c) => c.id !== deletingCompetency.id));
    setIsDeleteDialogOpen(false);
    setDeletingCompetency(null);
  };

  const getWorkflowCount = (competency: Competency) => {
    return competency.usageCount?.workflows || 0;
  };

  // Render different states
  if (debugState === "empty") {
    return (
      <>
        <CompetenciesEmpty onAdd={handleAdd} />
        {/* Floating Debug Button */}
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#0975d7] hover:bg-[#0861b8] rounded-full p-[16px] shadow-lg transition-colors flex items-center justify-center">
                <IconBug className="size-[24px] text-white" stroke={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] bg-white border border-[#ececf3] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] p-[4px]">
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("normal")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "normal" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Normal state</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("empty")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "empty" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Empty page</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("addError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "addError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Error in adding</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("duplicateError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "duplicateError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Duplicate competency</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("networkError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "networkError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Network error</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("validationError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "validationError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Validation error</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  if (debugState === "addError" || debugState === "duplicateError" || debugState === "networkError" || debugState === "validationError") {
    return (
      <>
        <CompetenciesError errorType={debugState} />
        {/* Floating Debug Button */}
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#0975d7] hover:bg-[#0861b8] rounded-full p-[16px] shadow-lg transition-colors flex items-center justify-center">
                <IconBug className="size-[24px] text-white" stroke={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] bg-white border border-[#ececf3] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] p-[4px]">
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("normal")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "normal" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Normal state</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("empty")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "empty" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Empty page</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("addError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "addError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Error in adding</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("duplicateError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "duplicateError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Duplicate competency</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("networkError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "networkError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Network error</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDebugStateChange("validationError")}
                className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                  debugState === "validationError" ? "bg-[#f0f0f0]" : ""
                }`}
              >
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Validation error</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 bg-[#fcfcfd] flex flex-col overflow-hidden">
      <div className="flex flex-col gap-[16px] items-start p-[24px] flex-1 overflow-auto">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic text-[#3d3c52] text-[22px]">Competencies</h1>
            <button
              onClick={handleAdd}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
            >
              <IconPlus className="size-[16px] text-white" stroke={2} />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Add competency</p>
            </button>
          </div>
          {/* Divider */}
          <div className="bg-[#ececf3] h-px shrink-0 w-full" />
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
          {displayCompetencies.map((competency) => {
            const workflowCount = getWorkflowCount(competency);
            return (
              <div
                key={competency.id}
                className="bg-white border border-[#ececf3] rounded-[8px] flex flex-col overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="px-[16px] pt-[16px] pb-[12px] flex-1">
                  <div className="flex items-start justify-between mb-[8px]">
                    <div className="flex-1">
                      <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#3d3c52] text-[16px] mb-[4px]">
                        {competency.name}
                      </h3>
                      {workflowCount > 0 && (
                        <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">
                          Mapped in{" "}
                          <button
                            onClick={() => handleViewWorkflows(competency)}
                            className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px] underline decoration-dashed underline-offset-2 hover:text-[#0975d7] transition-colors cursor-pointer"
                          >
                            {workflowCount} workflow{workflowCount !== 1 ? "s" : ""}
                          </button>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-[4px] ml-[8px]">
                      <button
                        onClick={() => handleEdit(competency)}
                        className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
                      >
                        <IconPencil className="size-[16px] text-[#6b697b]" stroke={2} />
                      </button>
                      <button
                        onClick={() => handleDelete(competency)}
                        disabled={displayCompetencies.length <= 3}
                        className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] hover:bg-[#f5f5f5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <IconTrash className="size-[16px] text-[#6b697b]" stroke={2} />
                      </button>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">
                    {competency.description}
                  </p>
                </div>
                {/* Mandatory for all toggle - always at bottom */}
                <div className="mt-auto">
                  <div className="bg-[#ececf3] h-px w-full" />
                  <div className="flex items-center justify-between px-[16px] py-[12px]">
                    <label className={`font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px] ${competency.name === "Process" ? 'cursor-default' : 'cursor-pointer'}`}>
                      Mandatory for all
                    </label>
                    <Switch
                      checked={competency.mandatoryForAll || false}
                      onCheckedChange={() => handleToggleMandatory(competency.id)}
                      disabled={competency.name === "Process"}
                      className="data-[state=checked]:bg-[#0975d7]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayCompetencies.length === 0 && (
          <div className="w-full text-center py-[48px]">
            <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">
              No competencies added yet. Add your first competency to get started.
            </p>
          </div>
        )}
      </div>

      {/* Floating Debug Button */}
      <div className="fixed bottom-[24px] right-[24px] z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-[#0975d7] hover:bg-[#0861b8] rounded-full p-[16px] shadow-lg transition-colors flex items-center justify-center">
              <IconBug className="size-[24px] text-white" stroke={2} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px] bg-white border border-[#ececf3] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] p-[4px]">
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("normal")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "normal" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Normal state</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("empty")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "empty" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Empty page</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("addError")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "addError" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Error in adding</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("duplicateError")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "duplicateError" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Duplicate competency</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("networkError")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "networkError" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Network error</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDebugStateChange("validationError")}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                debugState === "validationError" ? "bg-[#f0f0f0]" : ""
              }`}
            >
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">Validation error</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) {
          setErrorMessage("");
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">Add competency</DialogTitle>
            <DialogDescription className="font-['Inter:Regular',sans-serif] text-[#6b697b]">
              Create a new competency that will be used to evaluate learners across the organization.
            </DialogDescription>
          </DialogHeader>
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-[8px] p-[12px] flex items-start gap-[8px]">
              <IconAlertTriangle className="size-[20px] text-red-600 shrink-0 mt-[2px]" stroke={2} />
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-red-800 text-[14px] flex-1">
                {errorMessage}
              </p>
              <button
                onClick={() => setErrorMessage("")}
                className="shrink-0 p-[4px] hover:bg-red-100 rounded-[4px] transition-colors"
              >
                <IconX className="size-[16px] text-red-600" stroke={2} />
              </button>
            </div>
          )}
          <div className="flex flex-col gap-[16px] py-[16px]">
            <div className="flex flex-col gap-[8px]">
              <Label htmlFor="name" className="font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Empathy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="font-['Inter:Regular',sans-serif] text-[#3d3c52] text-[14px]"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label htmlFor="description" className="font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this competency measures..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="font-['Inter:Regular',sans-serif] text-[#3d3c52] text-[14px]"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsAddDialogOpen(false)}
              className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[14px]">Cancel</p>
            </button>
            <button
              onClick={handleSaveAdd}
              disabled={!formData.name.trim() || !formData.description.trim()}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Add competency</p>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">Edit competency</DialogTitle>
            <DialogDescription className="font-['Inter:Regular',sans-serif] text-[#6b697b]">
              Update the competency details. Changes will affect all places where this competency is used.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-[16px] py-[16px]">
            <div className="flex flex-col gap-[8px]">
              <Label htmlFor="edit-name" className="font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g., Empathy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="font-['Inter:Regular',sans-serif] text-[#3d3c52] text-[14px]"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label htmlFor="edit-description" className="font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Describe what this competency measures..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="font-['Inter:Regular',sans-serif] text-[#3d3c52] text-[14px]"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsEditDialogOpen(false)}
              className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[14px]">Cancel</p>
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={!formData.name.trim() || !formData.description.trim()}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Save changes</p>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Confirmation Dialog */}
      <AlertDialog open={isUpdateConfirmDialogOpen} onOpenChange={setIsUpdateConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <IconAlertTriangle className="size-5 text-amber-500" />
              <AlertDialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">Confirm update</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2 font-['Inter:Regular',sans-serif] text-[#6b697b] text-[14px]">
              {pendingUpdate && (
                <>
                  <p className="mb-4">
                    This competency is currently being used in multiple places. Updating it will have consequences:
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-[16px] flex flex-col gap-[8px]">
                    {pendingUpdate.competency.usageCount?.workflows > 0 && (
                      <p className="font-['Inter:Regular',sans-serif] text-[14px] text-amber-800">
                        • {pendingUpdate.competency.usageCount.workflows} workflow
                        {pendingUpdate.competency.usageCount.workflows !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  <p className="mt-4 font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52]">Are you sure you want to proceed?</p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmUpdate}
              className="bg-amber-600 hover:bg-amber-700 content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white"
            >
              Yes, update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <IconAlertTriangle className="size-5 text-red-500" />
              <AlertDialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">Confirm deletion</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2 font-['Inter:Regular',sans-serif] text-[#6b697b] text-[14px]">
              {deletingCompetency && (
                <>
                  <p className="mb-4">
                    Are you sure you want to delete <strong className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">"{deletingCompetency.name}"</strong>? This action cannot be undone and will have consequences:
                  </p>
                  {(deletingCompetency.usageCount?.workflows || 0) > 0 ? (
                    <div className="bg-red-50 border border-red-200 rounded-[8px] p-[16px] flex flex-col gap-[8px]">
                      {deletingCompetency.usageCount?.workflows > 0 && (
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-red-800">
                          • {deletingCompetency.usageCount.workflows} workflow
                          {deletingCompetency.usageCount.workflows !== 1 ? "s" : ""} will be affected
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b697b]">This competency is not currently in use.</p>
                  )}
                  <p className="mt-4 font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52]">Proceed with deletion?</p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[#3d3c52] text-[14px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Workflows Modal */}
      <Dialog open={isWorkflowsModalOpen} onOpenChange={(open) => {
        setIsWorkflowsModalOpen(open);
        if (!open) {
          setWorkflowTab("ready");
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3d3c52]">
              Workflows mapped to {viewingWorkflowsFor?.name}
            </DialogTitle>
            <DialogDescription className="font-['Inter:Regular',sans-serif] text-[#6b697b]">
              {viewingWorkflowsFor && getWorkflowCount(viewingWorkflowsFor) > 0
                ? `This competency is mapped to ${getWorkflowCount(viewingWorkflowsFor)} workflow${getWorkflowCount(viewingWorkflowsFor) !== 1 ? "s" : ""}.`
                : "No workflows mapped to this competency."}
            </DialogDescription>
          </DialogHeader>
          
          {/* Tabs */}
          {viewingWorkflowsFor && getWorkflowCount(viewingWorkflowsFor) > 0 && (
            <div className="flex gap-[16px] border-b border-[#ececf3] -mx-6 px-6">
              <button
                onClick={() => setWorkflowTab("draft")}
                className={`font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px] pb-[12px] relative ${
                  workflowTab === "draft"
                    ? "font-semibold text-[#0975d7]"
                    : "text-[#6b697b] hover:text-[#3d3c52]"
                }`}
              >
                Draft
                {viewingWorkflowsFor && (
                  <span className="ml-[8px] font-['Inter:Regular',sans-serif] text-[12px]">
                    ({getWorkflowCountsByStage(viewingWorkflowsFor.id).draft})
                  </span>
                )}
                {workflowTab === "draft" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setWorkflowTab("ready")}
                className={`font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px] pb-[12px] relative ${
                  workflowTab === "ready"
                    ? "font-semibold text-[#0975d7]"
                    : "text-[#6b697b] hover:text-[#3d3c52]"
                }`}
              >
                Ready
                {viewingWorkflowsFor && (
                  <span className="ml-[8px] font-['Inter:Regular',sans-serif] text-[12px]">
                    ({getWorkflowCountsByStage(viewingWorkflowsFor.id).ready})
                  </span>
                )}
                {workflowTab === "ready" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
              <button
                onClick={() => setWorkflowTab("production")}
                className={`font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px] pb-[12px] relative ${
                  workflowTab === "production"
                    ? "font-semibold text-[#0975d7]"
                    : "text-[#6b697b] hover:text-[#3d3c52]"
                }`}
              >
                Production
                {viewingWorkflowsFor && (
                  <span className="ml-[8px] font-['Inter:Regular',sans-serif] text-[12px]">
                    ({getWorkflowCountsByStage(viewingWorkflowsFor.id).production})
                  </span>
                )}
                {workflowTab === "production" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0975d7]" />
                )}
              </button>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto">
            {viewingWorkflowsFor && getWorkflowsForCompetency(viewingWorkflowsFor.id).length > 0 ? (
              (() => {
                const filteredWorkflows = getWorkflowsByStage(viewingWorkflowsFor.id, workflowTab);
                return filteredWorkflows.length > 0 ? (
                  <div className="flex flex-col">
                    {filteredWorkflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className="px-[16px] py-[12px] border-b border-[#ececf3] last:border-b-0 hover:bg-[#f9f9f9] transition-colors"
                      >
                        <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#3d3c52] text-[14px]">
                          {workflow.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-[16px] py-[24px] text-center">
                    <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">
                      No {workflowTab} workflows mapped to this competency.
                    </p>
                  </div>
                );
              })()
            ) : (
              <div className="px-[16px] py-[24px] text-center">
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">
                  No workflows mapped to this competency.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsWorkflowsModalOpen(false)}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Close</p>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
