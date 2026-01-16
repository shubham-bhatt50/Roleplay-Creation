import { IconAlertCircle, IconRefresh, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

type ErrorType = "addError" | "duplicateError" | "networkError" | "validationError";

interface CompetenciesErrorProps {
  errorType: ErrorType;
}

export function CompetenciesError({ errorType }: CompetenciesErrorProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const getErrorConfig = () => {
    switch (errorType) {
      case "addError":
        return {
          title: "Unable to add competency",
          description: "We encountered an issue while trying to add your competency. This could be due to a server error or temporary service interruption.",
          message: "Failed to add competency. Please try again.",
          action: "Retry adding competency",
        };
      case "duplicateError":
        return {
          title: "Duplicate competency name",
          description: "A competency with this name already exists. Please choose a different name to avoid confusion in your assessments.",
          message: "A competency with this name already exists. Please use a different name.",
          action: "Try a different name",
        };
      case "networkError":
        return {
          title: "Connection error",
          description: "We couldn't connect to our servers. Please check your internet connection and try again.",
          message: "Network error. Please check your connection and try again.",
          action: "Retry connection",
        };
      case "validationError":
        return {
          title: "Invalid input",
          description: "Please ensure all required fields are filled correctly. Name and description are required.",
          message: "Name and description are required fields.",
          action: "Fix validation errors",
        };
      default:
        return {
          title: "An error occurred",
          description: "Something went wrong. Please try again.",
          message: "An error occurred. Please try again.",
          action: "Try again",
        };
    }
  };

  const config = getErrorConfig();

  const handleSaveAdd = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      setErrorMessage(config.message);
      return;
    }
    // Simulate error
    setErrorMessage(config.message);
  };

  return (
    <div className="flex-1 bg-[#fcfcfd] flex flex-col overflow-hidden">
      <div className="flex flex-col gap-[16px] items-start p-[24px] flex-1 overflow-auto">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic text-[#3d3c52] text-[22px]">Competencies</h1>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
            >
              <IconPlus className="size-[16px] text-white" stroke={2} />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Add competency</p>
            </button>
          </div>
          {/* Divider */}
          <div className="bg-[#ececf3] h-px shrink-0 w-full" />
        </div>

        {/* Error State */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="flex flex-col items-center gap-[24px] max-w-[480px] text-center px-[24px]">
            <div className="bg-red-50 rounded-full p-[24px] border border-red-100">
              <IconAlertCircle className="size-[48px] text-red-600" stroke={2} />
            </div>
            <div className="flex flex-col gap-[12px]">
              <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic text-[#3d3c52] text-[20px]">
                {config.title}
              </h2>
              <p className="font-['Inter:Regular',sans-serif] leading-[24px] not-italic text-[#6b697b] text-[16px]">
                {config.description}
              </p>
            </div>
            <div className="flex flex-col gap-[12px] w-full mt-[8px]">
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
              >
                <IconRefresh className="size-[20px] text-white" stroke={2} />
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[16px] text-center text-nowrap text-white">
                  {config.action}
                </p>
              </button>
              {errorType === "networkError" && (
                <button className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[16px]">
                    Check connection settings
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Dialog with Error */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) {
          setErrorMessage("");
          setFormData({ name: "", description: "" });
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
              <IconAlertCircle className="size-[20px] text-red-600 shrink-0 mt-[2px]" stroke={2} />
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-red-800 text-[14px] flex-1">
                {errorMessage}
              </p>
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
              onClick={() => {
                setIsAddDialogOpen(false);
                setErrorMessage("");
                setFormData({ name: "", description: "" });
              }}
              className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[14px]">Cancel</p>
            </button>
            <button
              onClick={handleSaveAdd}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Add competency</p>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
