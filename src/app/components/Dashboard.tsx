import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";
import { IconPlus, IconSearch, IconAdjustmentsHorizontal, IconLayoutGrid, IconFolder, IconChartBar, IconUsers, IconArrowsSort, IconChevronLeft, IconChevronRight, IconPlayerPlay, IconRefresh } from "@tabler/icons-react";
import { useState } from "react";

interface AttachedRoleplay {
  workflowId: string;
  workflowName: string;
  scenarioTitle: string;
}

interface DashboardProps {
  onNavigateToRoleplay: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToWorkflow?: (workflowId: string, workflowName: string, roleplayName?: string) => void;
  attachedRoleplays?: AttachedRoleplay[];
}

export function Dashboard({ onNavigateToRoleplay, onNavigateToSimulation, onNavigateToWorkflow, attachedRoleplays = [] }: DashboardProps) {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  // Check if a workflow has an attached roleplay
  const hasRoleplay = (workflowName: string) => {
    return attachedRoleplays.some((r) => r.workflowName === workflowName);
  };

  // Get the roleplay title for a workflow
  const getRoleplayTitle = (workflowName: string) => {
    const roleplay = attachedRoleplays.find((r) => r.workflowName === workflowName);
    return roleplay?.scenarioTitle;
  };

  // Handle workflow row click
  const handleWorkflowClick = (workflowId: string, workflowName: string) => {
    const roleplayTitle = getRoleplayTitle(workflowName);
    onNavigateToWorkflow?.(workflowId, workflowName, roleplayTitle);
  };

  return (
    <div className="flex-1 bg-[#fcfcfd] flex flex-col overflow-hidden">
      <div className="flex flex-col gap-[16px] items-start p-[24px] flex-1 overflow-auto">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <h1 className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic text-[#3d3c52] text-[22px]">Workflows</h1>
          <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full">
            {/* Tabs */}
            <div className="flex gap-[16px]">
              <button className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px] hover:text-[#3d3c52]">Draft</button>
              <button className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#0975d7] text-[14px] relative">
                Ready
                <div className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#0975d7]" />
              </button>
              <button className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px] hover:text-[#3d3c52]">Production</button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-[12px] items-center">
              <div className="relative">
                <button 
                  className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
                  onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                >
                  <IconPlus className="size-[16px] text-white" stroke={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Create</p>
                </button>
                
                {/* Dropdown */}
                {showCreateDropdown && (
                  <div className="absolute right-0 top-[calc(100%+4px)] bg-white rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] py-[4px] min-w-[160px] z-50">
                    <button 
                      className="flex items-center gap-[8px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors"
                      onClick={() => {
                        setShowCreateDropdown(false);
                        onNavigateToRoleplay();
                      }}
                    >
                      <IconUsers className="size-[16px] text-[#3d3c52]" stroke={2} />
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[14px]">Roleplay</p>
                    </button>
                    <button 
                      className="flex items-center gap-[8px] px-[16px] py-[10px] w-full hover:bg-[#f5f5f5] transition-colors"
                      onClick={() => {
                        setShowCreateDropdown(false);
                        onNavigateToSimulation();
                      }}
                    >
                      <IconFolder className="size-[16px] text-[#3d3c52]" stroke={2} />
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#3d3c52] text-[14px]">Simulation</p>
                    </button>
                  </div>
                )}
              </div>
              
              <button className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors">
                <IconSearch className="size-[16px] text-[#3d3c52]" stroke={2} />
                <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px]">Search folder</p>
              </button>
              
              <button className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors">
                <IconAdjustmentsHorizontal className="size-[20px] text-[#3d3c52]" stroke={2} />
              </button>
              
              <button className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[4px] border border-[#d7d6d1] hover:bg-[#f5f5f5] transition-colors">
                <IconLayoutGrid className="size-[20px] text-[#3d3c52]" stroke={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ececf3]">
                <th className="text-left p-[16px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#3d3c52] text-[14px]">
                  <div className="flex items-center gap-[4px]">
                    Name
                    <IconArrowsSort className="size-[16px] text-[#6b697b]" stroke={1.5} />
                  </div>
                </th>
                <th className="text-left p-[16px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#3d3c52] text-[14px]">
                  <div className="flex items-center gap-[4px]">
                    Type
                    <IconArrowsSort className="size-[16px] text-[#6b697b]" stroke={1.5} />
                  </div>
                </th>
                <th className="text-left p-[16px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#3d3c52] text-[14px]">
                  <div className="flex items-center gap-[4px]">
                    Created by
                    <IconArrowsSort className="size-[16px] text-[#6b697b]" stroke={1.5} />
                  </div>
                </th>
                <th className="text-left p-[16px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#3d3c52] text-[14px]">
                  <div className="flex items-center gap-[4px]">
                    Last updated on
                    <IconArrowsSort className="size-[16px] text-[#6b697b]" stroke={1.5} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "1", name: "H2 2025 Learning", count: "7", type: "Simulation", creator: "Mark S", updated: "Simulation", isWorkflow: false },
                { id: "2", name: "Guidewire environment 2", count: "5", type: "Simulation", creator: "Ann Perkins", updated: "Simulation", isWorkflow: false },
                { id: "3", name: "Guidewire workflow list archive 2", count: "9", type: "Simulation", creator: "Ann Perkins", updated: "Simulation", isWorkflow: false },
                { id: "4", name: "New claim | Guidewire 2", count: "5", type: "Workflow", creator: "Juliette Nichols", updated: "Simulation", isWorkflow: true },
              ].map((row, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-[#ececf3] hover:bg-[#f9f9f9] ${row.isWorkflow ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (row.isWorkflow) {
                      handleWorkflowClick(row.id, row.name);
                    }
                  }}
                >
                  <td className="p-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <input 
                        type="checkbox" 
                        className="size-[16px] rounded border-[#d7d6d1]" 
                        onClick={(e) => e.stopPropagation()}
                      />
                      {row.isWorkflow ? (
                        <div className="flex items-center justify-center size-[16px]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b697b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                          </svg>
                        </div>
                      ) : (
                        <IconFolder className="size-[16px] text-[#6b697b]" stroke={2} />
                      )}
                      <span className={`font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] ${row.isWorkflow ? 'hover:text-[#0975d7] hover:underline' : ''}`}>{row.name}</span>
                      <span className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#6b697b] text-[14px]">{row.count}</span>
                      {hasRoleplay(row.name) && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-xs font-medium">
                          <IconRefresh className="size-3" stroke={2} />
                          Roleplay enabled
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-[16px]">
                    <span className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">{row.type}</span>
                  </td>
                  <td className="p-[16px]">
                    <span className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">{row.creator}</span>
                  </td>
                  <td className="p-[16px]">
                    <span className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px]">{row.updated}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] text-[#6b697b] text-[14px]">Rows 1-15 of 120</p>
          <div className="flex items-center gap-[8px]">
            <button className="p-[8px] hover:bg-[#f5f5f5] rounded">
              <IconChevronLeft className="size-[16px] text-[#3d3c52]" stroke={2} />
            </button>
            <button className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] hover:bg-[#f5f5f5] rounded">1</button>
            <button className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-semibold leading-[20px] text-white text-[14px] bg-[#0975d7] rounded">2</button>
            <button className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] hover:bg-[#f5f5f5] rounded">3</button>
            <span className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] leading-[20px] text-[#6b697b] text-[14px]">...</span>
            <button className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] leading-[20px] text-[#3d3c52] text-[14px] hover:bg-[#f5f5f5] rounded">21</button>
            <button className="p-[8px] hover:bg-[#f5f5f5] rounded">
              <IconChevronRight className="size-[16px] text-[#3d3c52]" stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}