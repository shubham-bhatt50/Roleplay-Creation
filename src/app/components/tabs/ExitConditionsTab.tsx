import { useState } from "react";
import { 
  IconPlus, 
  IconTrash, 
  IconCheck, 
  IconTimeDuration10, 
  IconUserUp, 
  IconPhoneOff, 
  IconPlayerStop,
  IconDoorExit 
} from "@tabler/icons-react";
import { ExitCondition } from "../../types/scenario";

interface ExitConditionsTabProps {
  exitConditions: ExitCondition[];
  onUpdate: (conditions: ExitCondition[]) => void;
}

// Automatically determine icon based on trigger text
const getIconForTrigger = (trigger: string): ExitCondition["icon"] => {
  const lower = trigger.toLowerCase();
  if (lower.includes("resolution") || lower.includes("resolve") || lower.includes("success")) {
    return "resolution";
  }
  if (lower.includes("time") || lower.includes("minute") || lower.includes("timeout")) {
    return "time";
  }
  if (lower.includes("escalate") || lower.includes("supervisor") || lower.includes("manager")) {
    return "escalate";
  }
  return "end";
};

const getExitConditionIcon = (trigger: string) => {
  const iconType = getIconForTrigger(trigger);
  switch (iconType) {
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

export function ExitConditionsTab({ exitConditions, onUpdate }: ExitConditionsTabProps) {
  const [editingExitCondition, setEditingExitCondition] = useState<{
    id: string;
    field: "trigger" | "action";
  } | null>(null);
  const [exitConditionEditValue, setExitConditionEditValue] = useState("");

  const addExitCondition = () => {
    const newId = String(Date.now());
    const newCondition: ExitCondition = {
      id: newId,
      trigger: "New condition",
      action: "End scenario",
      icon: "end",
    };
    onUpdate([...exitConditions, newCondition]);
  };

  const deleteExitCondition = (id: string) => {
    onUpdate(exitConditions.filter((c) => c.id !== id));
  };

  const updateExitCondition = (id: string, field: "trigger" | "action", value: string) => {
    onUpdate(
      exitConditions.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white">
      <div className="flex-1 min-h-0 overflow-y-auto py-6 px-6">
        {/* Action button inside content */}
        <div className="flex justify-end mb-4">
          <button
            onClick={addExitCondition}
            className="flex items-center gap-2 px-4 py-2 bg-[#0975d7] text-white rounded-lg hover:bg-[#0861b8] transition-colors text-sm font-medium"
          >
            <IconPlus className="w-4 h-4" stroke={2} />
            Add condition
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {exitConditions.map((condition, index) => {
            const Icon = getExitConditionIcon(condition.trigger);
            const isEditingTrigger = editingExitCondition?.id === condition.id && editingExitCondition?.field === "trigger";
            const isEditingAction = editingExitCondition?.id === condition.id && editingExitCondition?.field === "action";

            return (
              <div key={condition.id} className="group">
                {/* Condition row */}
                <div className="flex items-center gap-3 p-4 bg-[#fafafa] rounded-lg border border-[#e5e5ea] hover:border-[#d1d1d6] transition-colors">
                  {/* Number indicator */}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#e5e5ea] flex items-center justify-center">
                    <span className="text-xs font-medium text-[#6b697b]">{index + 1}</span>
                  </div>

                  {/* Icon - auto-assigned based on trigger text */}
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-[#e5e5ea] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#6b697b]" stroke={2} />
                  </div>

                  {/* Condition text */}
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-[#8d8ba7] uppercase tracking-wide shrink-0">If</span>
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
                        className="flex-1 min-w-0 px-2 py-1 text-sm text-[#2b2b40] bg-white border border-[#0975d7] rounded focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="text-sm text-[#2b2b40] cursor-pointer hover:text-[#0975d7] transition-colors truncate"
                        onClick={() => {
                          setEditingExitCondition({ id: condition.id, field: "trigger" });
                          setExitConditionEditValue(condition.trigger);
                        }}
                      >
                        {condition.trigger}
                      </span>
                    )}
                  </div>

                  {/* Arrow separator */}
                  <div className="shrink-0 text-[#c5c5c5]">→</div>

                  {/* Action text */}
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-[#8d8ba7] uppercase tracking-wide shrink-0">Then</span>
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
                        className="flex-1 min-w-0 px-2 py-1 text-sm text-[#2b2b40] bg-white border border-[#0975d7] rounded focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="text-sm text-[#6b697b] cursor-pointer hover:text-[#0975d7] transition-colors truncate"
                        onClick={() => {
                          setEditingExitCondition({ id: condition.id, field: "action" });
                          setExitConditionEditValue(condition.action);
                        }}
                      >
                        {condition.action}
                      </span>
                    )}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteExitCondition(condition.id)}
                    className="shrink-0 p-1.5 text-[#c5c5c5] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete condition"
                  >
                    <IconTrash className="w-4 h-4" stroke={2} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {exitConditions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                <IconDoorExit className="w-6 h-6 text-[#8d8ba7]" stroke={1.5} />
              </div>
              <p className="text-sm text-[#8d8ba7] mb-4">No exit conditions defined</p>
              <button
                onClick={addExitCondition}
                className="text-sm text-[#0975d7] hover:underline font-medium"
              >
                Add your first condition
              </button>
            </div>
          )}
        </div>

        {/* Helper text */}
        {exitConditions.length > 0 && (
          <p className="mt-6 text-center text-xs text-[#b5b5b5]">
            Click text to edit
          </p>
        )}
      </div>
    </div>
  );
}
