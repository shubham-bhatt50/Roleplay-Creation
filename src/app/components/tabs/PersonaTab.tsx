import { useState } from "react";
import { 
  IconUser, 
  IconUsers,
  IconChevronDown, 
  IconPhoto,
  IconMoodAngry,
  IconMoodSad,
  IconMoodHappy,
  IconMoodNeutral,
  IconFlame,
  IconAlertCircle,
  IconClock,
  IconDeviceFloppy,
  IconDownload,
  IconUserPlus,
  IconArrowRight,
  IconArrowLeft,
  IconX
} from "@tabler/icons-react";
import { 
  Persona, 
  PersonaTemplate, 
  EMOTIONAL_STATE_OPTIONS, 
  BEHAVIORAL_TRAIT_OPTIONS 
} from "../../types/scenario";

interface PersonaTabProps {
  personas: Persona[];
  currentPersonaId: string;
  personaTemplates: PersonaTemplate[];
  onUpdatePersonas: (personas: Persona[]) => void;
  onUpdateCurrentPersonaId: (id: string) => void;
  onUpdateTemplates: (templates: PersonaTemplate[]) => void;
}

// Helper functions for tag icons and colors
const getEmotionalIcon = (state: string) => {
  const lower = state.toLowerCase();
  if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("irritated")) {
    return IconMoodAngry;
  }
  if (lower.includes("sad") || lower.includes("upset") || lower.includes("disappointed")) {
    return IconMoodSad;
  }
  if (lower.includes("happy") || lower.includes("joyful") || lower.includes("pleased")) {
    return IconMoodHappy;
  }
  if (lower.includes("neutral") || lower.includes("calm")) {
    return IconMoodNeutral;
  }
  return IconMoodNeutral;
};

const getEmotionalColor = (state: string) => {
  const lower = state.toLowerCase();
  if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("irritated")) {
    return { bg: "#fee2e2", text: "#991b1b", icon: "#dc2626" };
  }
  if (lower.includes("sad") || lower.includes("upset") || lower.includes("disappointed")) {
    return { bg: "#dbeafe", text: "#1e40af", icon: "#3b82f6" };
  }
  if (lower.includes("happy") || lower.includes("joyful") || lower.includes("pleased")) {
    return { bg: "#dcfce7", text: "#166534", icon: "#22c55e" };
  }
  if (lower.includes("neutral") || lower.includes("calm")) {
    return { bg: "#f3f4f6", text: "#374151", icon: "#6b7280" };
  }
  return { bg: "#fef3c7", text: "#92400e", icon: "#f59e0b" };
};

const getBehavioralIcon = (trait: string) => {
  const lower = trait.toLowerCase();
  if (lower.includes("short") || lower.includes("temper") || lower.includes("impatient")) {
    return IconFlame;
  }
  if (lower.includes("angry") || lower.includes("aggressive")) {
    return IconMoodAngry;
  }
  if (lower.includes("alert") || lower.includes("cautious")) {
    return IconAlertCircle;
  }
  if (lower.includes("time") || lower.includes("urgent") || lower.includes("rushed")) {
    return IconClock;
  }
  return IconUser;
};

const getBehavioralColor = (trait: string) => {
  const lower = trait.toLowerCase();
  if (lower.includes("short") || lower.includes("temper") || lower.includes("impatient") || lower.includes("angry")) {
    return { bg: "#fee2e2", text: "#991b1b", icon: "#dc2626" };
  }
  if (lower.includes("alert") || lower.includes("cautious")) {
    return { bg: "#fef3c7", text: "#92400e", icon: "#f59e0b" };
  }
  if (lower.includes("time") || lower.includes("urgent") || lower.includes("rushed")) {
    return { bg: "#ddd6fe", text: "#6b21a8", icon: "#8b5cf6" };
  }
  return { bg: "#e0e7ff", text: "#3730a3", icon: "#6366f1" };
};

export function PersonaTab({
  personas,
  currentPersonaId,
  personaTemplates,
  onUpdatePersonas,
  onUpdateCurrentPersonaId,
  onUpdateTemplates,
}: PersonaTabProps) {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [personaMenuView, setPersonaMenuView] = useState<"main" | "switch" | "load" | "save">("main");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showEmotionalDropdown, setShowEmotionalDropdown] = useState(false);
  const [showBehavioralDropdown, setShowBehavioralDropdown] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");

  const currentPersona = personas.find(p => p.id === currentPersonaId) || personas[0];

  const updateCurrentPersona = (updates: Partial<Persona>) => {
    onUpdatePersonas(personas.map(p => 
      p.id === currentPersonaId ? { ...p, ...updates } : p
    ));
  };

  const loadFromTemplate = (template: PersonaTemplate) => {
    const newId = String(Date.now());
    const newPersona: Persona = {
      id: newId,
      ...template.persona,
    };
    onUpdatePersonas([...personas, newPersona]);
    onUpdateCurrentPersonaId(newId);
    setShowPersonaMenu(false);
  };

  const saveAsTemplate = () => {
    if (!newTemplateName.trim()) return;
    
    const newTemplate: PersonaTemplate = {
      id: String(Date.now()),
      name: newTemplateName.trim(),
      description: newTemplateDescription.trim() || `Template based on ${currentPersona.name}`,
      persona: {
        name: currentPersona.name,
        gender: currentPersona.gender,
        age: currentPersona.age,
        location: currentPersona.location,
        avatar: null,
        emotionalStates: currentPersona.emotionalStates,
        behavioralTraits: currentPersona.behavioralTraits,
        additionalRemarks: currentPersona.additionalRemarks,
      },
    };
    onUpdateTemplates([...personaTemplates, newTemplate]);
    setNewTemplateName("");
    setNewTemplateDescription("");
    setShowPersonaMenu(false);
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateCurrentPersona({ avatar: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Persona Card */}
      <div className="bg-gradient-to-br from-[#fafbfc] to-white border-b border-[#eee] py-6">
        <div className="px-6">
          {/* Action buttons row */}
          <div className="flex justify-end mb-4">
            {/* Combined Persona Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPersonaMenu(!showPersonaMenu);
                  setPersonaMenuView("main");
                }}
                className="flex items-center gap-2 px-3 py-2 border border-[#ececf3] rounded-lg hover:border-[#0975d7] hover:bg-[#f8fafc] transition-colors bg-white"
              >
                <IconUser className="w-4 h-4 text-[#0975d7]" stroke={2} />
                <span className="text-sm font-medium text-[#2b2b40]">Manage persona</span>
                <IconChevronDown className={`w-4 h-4 text-[#8d8ba7] transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} stroke={2} />
              </button>
              {showPersonaMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => {
                      setShowPersonaMenu(false);
                      setPersonaMenuView("main");
                    }}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-[#ececf3] rounded-xl shadow-xl z-20 overflow-hidden">
                    {personaMenuView === "main" && (
                      <div className="py-2">
                        <button
                          onClick={() => setPersonaMenuView("switch")}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#f0f4ff] flex items-center justify-center">
                            <IconUsers className="w-4 h-4 text-[#0975d7]" stroke={2} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#2b2b40]">Switch persona</p>
                            <p className="text-xs text-[#8d8ba7]">Change to another persona</p>
                          </div>
                          <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                        </button>
                        <button
                          onClick={() => setPersonaMenuView("load")}
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
                            setPersonaMenuView("save");
                            setNewTemplateName(currentPersona.name + " template");
                            setNewTemplateDescription("");
                          }}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                            <IconDeviceFloppy className="w-4 h-4 text-[#d97706]" stroke={2} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#2b2b40]">Save as template</p>
                            <p className="text-xs text-[#8d8ba7]">Save current persona</p>
                          </div>
                          <IconArrowRight className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                        </button>
                        <div className="border-t border-[#ececf3] mt-2 pt-2">
                          <button
                            onClick={() => {
                              const newId = String(Date.now());
                              const newPersona: Persona = {
                                id: newId,
                                name: "New Persona",
                                gender: "Not specified",
                                age: 30,
                                location: "Unknown",
                                avatar: null,
                                emotionalStates: [],
                                behavioralTraits: [],
                                additionalRemarks: "",
                              };
                              onUpdatePersonas([...personas, newPersona]);
                              onUpdateCurrentPersonaId(newId);
                              setShowPersonaMenu(false);
                            }}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#f0f0f5] flex items-center justify-center">
                              <IconUserPlus className="w-4 h-4 text-[#6b697b]" stroke={2} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[#2b2b40]">Create new persona</p>
                              <p className="text-xs text-[#8d8ba7]">Start from scratch</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                    {personaMenuView === "switch" && (
                      <div>
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ececf3]">
                          <button
                            onClick={() => setPersonaMenuView("main")}
                            className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
                          >
                            <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                          </button>
                          <span className="text-sm font-medium text-[#2b2b40]">Switch persona</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {personas.map((persona) => (
                            <button
                              key={persona.id}
                              onClick={() => {
                                onUpdateCurrentPersonaId(persona.id);
                                setShowPersonaMenu(false);
                                setPersonaMenuView("main");
                              }}
                              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#f5f7fa] transition-colors ${
                                currentPersonaId === persona.id ? 'bg-[#f0f4ff]' : ''
                              }`}
                            >
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                {persona.avatar ? (
                                  <img src={persona.avatar} alt={persona.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-sm font-bold text-white">
                                    {persona.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#2b2b40] truncate">{persona.name}</p>
                                <p className="text-xs text-[#8d8ba7] truncate">
                                  {persona.emotionalStates.slice(0, 2).join(", ") || "No emotions set"}
                                </p>
                              </div>
                              {currentPersonaId === persona.id && (
                                <div className="w-2 h-2 rounded-full bg-[#0975d7]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {personaMenuView === "load" && (
                      <div>
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ececf3]">
                          <button
                            onClick={() => setPersonaMenuView("main")}
                            className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
                          >
                            <IconArrowLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
                          </button>
                          <span className="text-sm font-medium text-[#2b2b40]">Load template</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {personaTemplates.map((template) => (
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
                    {personaMenuView === "save" && (
                      <div>
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ececf3]">
                          <button
                            onClick={() => setPersonaMenuView("main")}
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
                              className="w-full px-3 py-2 text-sm border border-[#ececf3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#6b697b] mb-1 block">Description (optional)</label>
                            <input
                              type="text"
                              value={newTemplateDescription}
                              onChange={(e) => setNewTemplateDescription(e.target.value)}
                              placeholder="Brief description"
                              className="w-full px-3 py-2 text-sm border border-[#ececf3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7]"
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
          </div>

          {/* Top Row: Avatar + Name/Demographics */}
          <div className="flex items-center gap-5 mb-5">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative group">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md ring-2 ring-white bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                  {currentPersona.avatar ? (
                    <img
                      src={currentPersona.avatar}
                      alt={currentPersona.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center top' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {currentPersona.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAvatarUpload}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#e5e5ea] hover:bg-[#f5f5f7]"
                  title="Change avatar"
                >
                  <IconPhoto className="w-3.5 h-3.5 text-[#6b697b]" stroke={2} />
                </button>
              </div>
            </div>

            {/* Name and Demographics */}
            <div className="flex-1 min-w-0">
              {editingField === "name" ? (
                <input
                  type="text"
                  value={currentPersona.name}
                  onChange={(e) => updateCurrentPersona({ name: e.target.value })}
                  onBlur={() => setEditingField(null)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                  className="text-xl font-bold text-[#2b2b40] border-b border-[#0975d7] focus:outline-none bg-transparent w-full"
                  autoFocus
                />
              ) : (
                <h2 
                  className="text-xl font-bold text-[#2b2b40] cursor-pointer hover:text-[#0975d7] transition-colors"
                  onClick={() => setEditingField("name")}
                >
                  {currentPersona.name}
                </h2>
              )}
              <div className="flex items-center gap-3 mt-1.5 text-sm text-[#6b697b]">
                <span>{currentPersona.gender}</span>
                <span>•</span>
                <span>{currentPersona.age} years old</span>
                <span>•</span>
                <span>{currentPersona.location}</span>
              </div>
            </div>
          </div>

          {/* Emotional States */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[#2b2b40]">Emotional states</label>
              <div className="relative">
                <button
                  onClick={() => setShowEmotionalDropdown(!showEmotionalDropdown)}
                  className="text-xs text-[#0975d7] hover:underline"
                >
                  + Add
                </button>
                {showEmotionalDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowEmotionalDropdown(false)} />
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-[#ececf3] rounded-lg shadow-xl z-20 py-1 max-h-[200px] overflow-y-auto">
                      {EMOTIONAL_STATE_OPTIONS.filter(opt => !currentPersona.emotionalStates.includes(opt)).map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            updateCurrentPersona({ emotionalStates: [...currentPersona.emotionalStates, option] });
                            setShowEmotionalDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f5f5] transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentPersona.emotionalStates.map((state, idx) => {
                const Icon = getEmotionalIcon(state);
                const colors = getEmotionalColor(state);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: colors.icon }} stroke={2} />
                    {state}
                    <button
                      onClick={() => updateCurrentPersona({ 
                        emotionalStates: currentPersona.emotionalStates.filter((_, i) => i !== idx) 
                      })}
                      className="ml-1 hover:opacity-70"
                    >
                      <IconX className="w-3 h-3" stroke={2} />
                    </button>
                  </span>
                );
              })}
              {currentPersona.emotionalStates.length === 0 && (
                <span className="text-sm text-[#8d8ba7] italic">No emotional states set</span>
              )}
            </div>
          </div>

          {/* Behavioral Traits */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[#2b2b40]">Behavioral traits</label>
              <div className="relative">
                <button
                  onClick={() => setShowBehavioralDropdown(!showBehavioralDropdown)}
                  className="text-xs text-[#0975d7] hover:underline"
                >
                  + Add
                </button>
                {showBehavioralDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowBehavioralDropdown(false)} />
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-[#ececf3] rounded-lg shadow-xl z-20 py-1 max-h-[200px] overflow-y-auto">
                      {BEHAVIORAL_TRAIT_OPTIONS.filter(opt => !currentPersona.behavioralTraits.includes(opt)).map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            updateCurrentPersona({ behavioralTraits: [...currentPersona.behavioralTraits, option] });
                            setShowBehavioralDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f5f5] transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentPersona.behavioralTraits.map((trait, idx) => {
                const Icon = getBehavioralIcon(trait);
                const colors = getBehavioralColor(trait);
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: colors.icon }} stroke={2} />
                    {trait}
                    <button
                      onClick={() => updateCurrentPersona({ 
                        behavioralTraits: currentPersona.behavioralTraits.filter((_, i) => i !== idx) 
                      })}
                      className="ml-1 hover:opacity-70"
                    >
                      <IconX className="w-3 h-3" stroke={2} />
                    </button>
                  </span>
                );
              })}
              {currentPersona.behavioralTraits.length === 0 && (
                <span className="text-sm text-[#8d8ba7] italic">No behavioral traits set</span>
              )}
            </div>
          </div>

          {/* Additional Remarks */}
          <div>
            <label className="text-sm font-medium text-[#2b2b40] mb-2 block">Additional remarks</label>
            {editingField === "remarks" ? (
              <textarea
                value={currentPersona.additionalRemarks}
                onChange={(e) => updateCurrentPersona({ additionalRemarks: e.target.value })}
                onBlur={() => setEditingField(null)}
                className="w-full px-3 py-2 text-sm border border-[#ececf3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0975d7]/20 focus:border-[#0975d7] resize-none"
                rows={3}
                autoFocus
              />
            ) : (
              <p 
                className="text-sm text-[#6b697b] cursor-pointer hover:text-[#2b2b40] transition-colors"
                onClick={() => setEditingField("remarks")}
              >
                {currentPersona.additionalRemarks || "Click to add remarks..."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
