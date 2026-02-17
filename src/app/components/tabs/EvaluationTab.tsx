import { useState, useEffect } from "react";
import { 
  IconPlus, 
  IconTrash, 
  IconCheck, 
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconDownload,
  IconArrowRight,
  IconArrowLeft,
  IconClipboardCheck
} from "@tabler/icons-react";
import { EvaluationParameter, EvaluationTemplate, AVAILABLE_COMPETENCIES } from "../../types/scenario";

interface EvaluationTabProps {
  parameters: EvaluationParameter[];
  onUpdate: (parameters: EvaluationParameter[]) => void;
  templates: EvaluationTemplate[];
  onUpdateTemplates: (templates: EvaluationTemplate[]) => void;
}

export function EvaluationTab({ 
  parameters, 
  onUpdate, 
  templates, 
  onUpdateTemplates 
}: EvaluationTabProps) {
  const [editingEvaluation, setEditingEvaluation] = useState<{
    type: "title" | "criteria" | "competency";
    parameterId: string;
    criteriaIndex?: number;
  } | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [openCompetencyDropdown, setOpenCompetencyDropdown] = useState<string | null>(null);
  const [collapsedEvalParams, setCollapsedEvalParams] = useState<string[]>([]);
  
  // Template menu state
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [menuView, setMenuView] = useState<"main" | "load" | "save">("main");
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  
  // Change tracking
  const [savedParameters, setSavedParameters] = useState<EvaluationParameter[]>(parameters);
  const [isSaving, setIsSaving] = useState(false);
  
  const hasChanges = JSON.stringify(parameters) !== JSON.stringify(savedParameters);
  
  const saveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSavedParameters([...parameters]);
      setIsSaving(false);
    }, 500);
  };
  
  const discardChanges = () => {
    onUpdate([...savedParameters]);
  };
  
  const loadFromTemplate = (template: EvaluationTemplate) => {
    const newParameters: EvaluationParameter[] = template.parameters.map((param, index) => ({
      id: String(Date.now() + index),
      ...param,
    }));
    onUpdate([...newParameters, ...parameters]);
    setShowTemplateMenu(false);
    setMenuView("main");
  };
  
  const saveAsTemplate = () => {
    if (!newTemplateName.trim()) return;
    
    const newTemplate: EvaluationTemplate = {
      id: String(Date.now()),
      name: newTemplateName.trim(),
      description: newTemplateDescription.trim() || `Template with ${parameters.length} parameters`,
      parameters: parameters.map(({ title, criteria, mappedCompetency }) => ({
        title,
        criteria,
        mappedCompetency,
      })),
    };
    onUpdateTemplates([...templates, newTemplate]);
    setNewTemplateName("");
    setNewTemplateDescription("");
    setShowTemplateMenu(false);
    setMenuView("main");
  };
  
  const addParameter = () => {
    const newId = String(parameters.length + 1);
    const newParameter: EvaluationParameter = {
      id: newId,
      title: "New evaluation parameter",
      criteria: [
        "0-2: [Enter description]",
        "3-4: [Enter description]",
        "5-6: [Enter description]",
        "7-8: [Enter description]",
        "9-10: [Enter description]",
      ],
      mappedCompetency: "Empathy",
    };
    onUpdate([newParameter, ...parameters]);
  };
  
  const deleteParameter = (id: string) => {
    onUpdate(parameters.filter(p => p.id !== id));
  };
  
  const toggleCollapse = (id: string) => {
    setCollapsedEvalParams(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };
  
  // Handle clicking outside competency dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Evaluation Parameters */}
      <div className="flex-1 overflow-y-auto">
        {/* Action buttons row - inside scrollable content */}
        <div className="px-6 py-4 flex items-center justify-end gap-2">
          {/* Show either save controls OR normal controls, not both */}
          {hasChanges ? (
            <div className="flex items-center gap-2">
              <button
                onClick={discardChanges}
                className="px-3 py-2 text-sm text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg transition-colors"
              >
                Discard
              </button>
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors text-sm font-medium disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <IconCheck className="w-4 h-4" stroke={2} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              {/* Template Menu */}
              <div className="relative" data-evaluation-template-menu>
                <button
                  onClick={() => {
                    setShowTemplateMenu(!showTemplateMenu);
                    setMenuView("main");
                  }}
                  className="flex items-center gap-2 px-3 py-2 border border-[#d7d6d1] text-[#525066] rounded-lg hover:bg-[#f5f5f5] transition-colors text-sm font-medium"
                >
                  <IconDeviceFloppy className="w-4 h-4" stroke={2} />
                  Templates
                  <IconChevronDown className={`w-3 h-3 transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} stroke={2} />
                </button>
                {showTemplateMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => {
                        setShowTemplateMenu(false);
                        setMenuView("main");
                      }}
                    />
                    <div className="absolute right-0 top-[calc(100%+4px)] bg-white rounded-xl shadow-xl border border-[#e4e4e7] w-80 z-50 overflow-hidden">
                      {menuView === "main" && (
                        <div className="py-2">
                          <button
                            onClick={() => setMenuView("load")}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#f0fff4] flex items-center justify-center">
                              <IconDownload className="w-4 h-4 text-[#10b981]" stroke={2} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[#2b2b40]">Load template</p>
                              <p className="text-xs text-[#8d8ba7]">Use a saved template</p>
                            </div>
                            <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                          </button>
                          <button
                            onClick={() => {
                              setMenuView("save");
                              setNewTemplateName("");
                              setNewTemplateDescription("");
                            }}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                              <IconDeviceFloppy className="w-4 h-4 text-[#d97706]" stroke={2} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[#2b2b40]">Save as template</p>
                              <p className="text-xs text-[#8d8ba7]">Save current parameters</p>
                            </div>
                            <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                          </button>
                        </div>
                      )}
                      {menuView === "load" && (
                        <div>
                          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e4e4e7]">
                            <button
                              onClick={() => setMenuView("main")}
                              className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
                            >
                              <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                            </button>
                            <span className="text-sm font-medium text-[#2b2b40]">Load template</span>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto">
                            {templates.map((template) => (
                              <button
                                key={template.id}
                                onClick={() => loadFromTemplate(template)}
                                className="w-full text-left px-4 py-3 hover:bg-[#f5f7fa] transition-colors border-b border-[#f0f0f0] last:border-0"
                              >
                                <p className="text-sm font-medium text-[#2b2b40]">{template.name}</p>
                                <p className="text-xs text-[#8d8ba7]">{template.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {menuView === "save" && (
                        <div>
                          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e4e4e7]">
                            <button
                              onClick={() => setMenuView("main")}
                              className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
                            >
                              <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                            </button>
                            <span className="text-sm font-medium text-[#2b2b40]">Save as template</span>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <label className="text-xs font-medium text-[#6b697b] mb-1 block">Template name</label>
                              <input
                                type="text"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                                placeholder="Enter template name"
                                className="w-full px-3 py-2 text-sm border border-[#e4e4e7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#6b697b] mb-1 block">Description (optional)</label>
                              <input
                                type="text"
                                value={newTemplateDescription}
                                onChange={(e) => setNewTemplateDescription(e.target.value)}
                                placeholder="Brief description"
                                className="w-full px-3 py-2 text-sm border border-[#e4e4e7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                              />
                            </div>
                            <button
                              onClick={saveAsTemplate}
                              disabled={!newTemplateName.trim()}
                              className="w-full py-2 text-sm font-medium text-white bg-[#0975d7] rounded-lg hover:bg-[#0861b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Save template
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Add button */}
              <button
                onClick={addParameter}
                className="flex items-center gap-2 px-4 py-2 bg-[#0975d7] text-white rounded-lg hover:bg-[#0861b8] transition-colors text-sm font-medium"
              >
                <IconPlus className="w-4 h-4" stroke={2} />
                Add evaluation parameter
              </button>
            </>
          )}
        </div>

        {parameters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center mb-3">
              <IconClipboardCheck className="w-6 h-6 text-[#9ca3af]" stroke={1.5} />
            </div>
            <h3 className="text-sm font-medium text-[#374151] mb-1">No evaluation parameters</h3>
            <p className="text-xs text-[#9ca3af] max-w-xs">Add parameters to define assessment criteria</p>
          </div>
        ) : (
          parameters.map((parameter) => {
            const scoreRanges = ["0-2", "3-4", "5-6", "7-8", "9-10"];
            const isCollapsed = collapsedEvalParams.includes(parameter.id);
            
            return (
              <div 
                key={parameter.id} 
                className="border-b border-[#e5e7eb]"
              >
                {/* Header Row */}
                <div className="px-6 py-4 flex items-center gap-4">
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    {editingEvaluation?.type === "title" && editingEvaluation.parameterId === parameter.id ? (
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={() => {
                          if (editingValue.trim()) {
                            onUpdate(
                              parameters.map((p) =>
                                p.id === parameter.id ? { ...p, title: editingValue.trim() } : p
                              )
                            );
                          }
                          setEditingEvaluation(null);
                          setEditingValue("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && editingValue.trim()) {
                            onUpdate(
                              parameters.map((p) =>
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
                        className="w-full text-base font-semibold text-[#1f2937] bg-white border border-[#0975d7] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20"
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="text-base font-semibold text-[#1f2937] cursor-pointer hover:text-[#0975d7] transition-colors"
                        onClick={() => {
                          setEditingEvaluation({ type: "title", parameterId: parameter.id });
                          setEditingValue(parameter.title);
                        }}
                      >
                        {parameter.title}
                      </h3>
                    )}
                  </div>
                  
                  {/* Competency Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6b7280]">Mapped competency</span>
                    <div className="relative" data-competency-dropdown>
                      <button
                        onClick={() => setOpenCompetencyDropdown(openCompetencyDropdown === parameter.id ? null : parameter.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] text-[#15803d] rounded-lg text-sm font-medium hover:bg-[#dcfce7] transition-colors"
                      >
                        {parameter.mappedCompetency}
                        <IconChevronDown className={`w-3.5 h-3.5 transition-transform ${openCompetencyDropdown === parameter.id ? 'rotate-180' : ''}`} stroke={2} />
                      </button>
                      {openCompetencyDropdown === parameter.id && (
                        <div className="absolute right-0 top-[calc(100%+4px)] bg-white rounded-lg shadow-xl border border-[#e5e7eb] w-48 z-50 py-1 max-h-[200px] overflow-y-auto">
                          {AVAILABLE_COMPETENCIES.map((comp) => (
                            <button
                              key={comp}
                              onClick={() => {
                                onUpdate(
                                  parameters.map((p) =>
                                    p.id === parameter.id ? { ...p, mappedCompetency: comp } : p
                                  )
                                );
                                setOpenCompetencyDropdown(null);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f5f5f5] transition-colors ${
                                parameter.mappedCompetency === comp ? 'bg-[#f0fdf4] text-[#15803d] font-medium' : 'text-[#374151]'
                              }`}
                            >
                              {comp}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Collapse/Expand button */}
                  <button
                    onClick={() => toggleCollapse(parameter.id)}
                    className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded transition-colors"
                  >
                    {isCollapsed ? (
                      <IconChevronDown className="w-4 h-4" stroke={2} />
                    ) : (
                      <IconChevronUp className="w-4 h-4" stroke={2} />
                    )}
                  </button>
                  
                  {/* Delete button */}
                  <button
                    onClick={() => deleteParameter(parameter.id)}
                    className="p-1.5 text-[#9ca3af] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors"
                  >
                    <IconTrash className="w-4 h-4" stroke={2} />
                  </button>
                </div>
                
                {/* Criteria rows - collapsible */}
                {!isCollapsed && (
                  <div className="px-6 pb-4">
                    {parameter.criteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-start gap-3 py-2">
                        <span className="text-sm font-medium text-[#9ca3af] w-8 shrink-0 pt-0.5">
                          {scoreRanges[idx]}
                        </span>
                        {editingEvaluation?.type === "criteria" && 
                         editingEvaluation.parameterId === parameter.id && 
                         editingEvaluation.criteriaIndex === idx ? (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={() => {
                              if (editingValue.trim()) {
                                const newCriteria = [...parameter.criteria];
                                newCriteria[idx] = editingValue.trim();
                                onUpdate(
                                  parameters.map((p) =>
                                    p.id === parameter.id ? { ...p, criteria: newCriteria } : p
                                  )
                                );
                              }
                              setEditingEvaluation(null);
                              setEditingValue("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && editingValue.trim()) {
                                const newCriteria = [...parameter.criteria];
                                newCriteria[idx] = editingValue.trim();
                                onUpdate(
                                  parameters.map((p) =>
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
                            className="flex-1 text-sm text-[#374151] bg-white border border-[#0975d7] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20"
                            autoFocus
                          />
                        ) : (
                          <p 
                            className="flex-1 text-sm text-[#374151] cursor-pointer hover:text-[#0975d7] transition-colors"
                            onClick={() => {
                              setEditingEvaluation({ type: "criteria", parameterId: parameter.id, criteriaIndex: idx });
                              // Extract just the description part (after the score range)
                              const parts = criterion.split(": ");
                              setEditingValue(parts.length > 1 ? parts.slice(1).join(": ") : criterion);
                            }}
                          >
                            {criterion.replace(/^\d+-\d+:\s*/, '')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
