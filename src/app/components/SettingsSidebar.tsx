import { IconUsers, IconKey, IconChartBar } from "@tabler/icons-react";

interface SettingsSidebarProps {
  onClose?: () => void;
  onCompetenciesClick?: () => void;
}

export function SettingsSidebar({ onClose, onCompetenciesClick }: SettingsSidebarProps) {
  return (
    <div className="absolute left-[240px] top-0 bg-white flex flex-col h-full items-start px-0 py-[16px] shrink-0 w-[240px] overflow-y-auto border-r border-[#eee] z-40 shadow-lg">
      {/* Header */}
      <div className="bg-white relative shrink-0 w-full px-[16px] mb-[8px]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-[#1f1f32]">
            Settings
          </h2>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white relative shrink-0 w-full px-[16px]">
        <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
          {/* Team Section */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-start relative w-full">
              <div className="flex flex-row items-center justify-between w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                <div className="flex items-center gap-[8px]">
                  <IconUsers className="size-[16px] text-[#6b697b]" stroke={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[#1f1f32]">
                    Team
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-full pl-[28px] pt-[4px]">
                <div className="w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[#6b697b]">
                    Teammates
                  </p>
                </div>
                <div className="w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[#6b697b]">
                    Team audit logs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Section */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-start relative w-full">
              <div className="flex flex-row items-center justify-between w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                <div className="flex items-center gap-[8px]">
                  <IconKey className="size-[16px] text-[#6b697b]" stroke={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[#1f1f32]">
                    Setup
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-full pl-[28px] pt-[4px]">
                <div className="w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[#6b697b]">
                    API token
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-start relative w-full">
              <div className="flex flex-row items-center justify-between w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors">
                <div className="flex items-center gap-[8px]">
                  <IconChartBar className="size-[16px] text-[#6b697b]" stroke={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[#1f1f32]">
                    Analytics
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-full pl-[28px] pt-[4px]">
                <div 
                  className="w-full py-[8px] px-[12px] cursor-pointer hover:bg-[#f5f5f5] rounded-[8px] transition-colors"
                  onClick={onCompetenciesClick}
                >
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[#6b697b]">
                    Competencies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
