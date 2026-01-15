import svgPaths from "@/imports/svg-8ahjman2g3";
import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";
import { IconLayoutGrid, IconChartBar, IconChevronDown, IconSettings, IconBell, IconBook, IconMessage } from "@tabler/icons-react";

interface SidebarProps {
  onNavigateToDashboard?: () => void;
}

export function Sidebar({ onNavigateToDashboard }: SidebarProps) {
  return (
    <div className="bg-[#1f1f32] flex flex-col h-screen items-start px-0 py-[8px] shrink-0 w-[240px] overflow-y-auto">
      {/* Logo Section */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
            <div 
              className="basis-0 bg-[#1f1f32] content-stretch flex grow items-center justify-between min-h-px min-w-px relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#2a2a3f] transition-colors"
              onClick={onNavigateToDashboard}
            >
              <div className="content-stretch flex items-center relative shrink-0">
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[44px]">
                  <div className="relative shrink-0 size-[22px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                      <g>
                        <rect fill="#F55800" height="5.5" width="16.5" x="0" y="16.5" />
                        <rect fill="#F55800" height="5.5" transform="rotate(-90 0 22)" width="16.5" x="0" y="22" />
                        <path d={svgPaths.p1e734d80} fill="#C63D22" />
                        <rect fill="#FBA450" height="5.5" transform="rotate(-180 22 5.5)" width="16.5" x="22" y="5.5" />
                        <rect fill="#FBA450" height="5.5" transform="rotate(90 22 0)" width="16.5" x="22" y="0" />
                        <path d={svgPaths.p3d4d0800} fill="#FA8A1F" />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Mirror</p>
              </div>
              <div className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0">
                <IconLayoutGrid className="size-[20px] text-white" stroke={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" />
        </div>
      </div>

      {/* Account Switcher */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <div className="content-stretch flex items-center relative rounded-[8px] shrink-0 w-full">
            <div className="overflow-clip relative rounded-[8px] shrink-0 size-[44px]">
              <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[70%] left-0 max-w-none top-[16.55%] w-full" src={imgImage7} />
                </div>
              </div>
            </div>
            <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#ececf3] text-[14px]">JnJ Salesforce</p>
            <div className="overflow-clip relative shrink-0 size-[44px]">
              <div className="absolute left-1/2 size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <IconChevronDown className="size-[20px] text-[#ECECF3]" stroke={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">
          {/* Workflows - Active */}
          <div className="bg-[#3d3c52] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconLayoutGrid className="size-[24px] text-[#F58857]" stroke={2} />
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#fff8f5] text-[14px] text-nowrap">Workflows</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#525066] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>

          {/* Analytics */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconChartBar className="size-[24px] text-[#DFDDE7]" stroke={2} />
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Analytics</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconSettings className="size-[24px] text-[#DFDDE7]" stroke={2} />
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" />

      {/* Divider */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">
          {/* User */}
          <div className="content-stretch flex items-center relative rounded-[8px] shrink-0 w-full">
            <div className="overflow-clip relative shrink-0 size-[44px]">
              <div className="absolute left-1/2 pointer-events-none rounded-[16px] size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgAvatar} />
                <div aria-hidden="true" className="absolute border-2 border-[#872345] border-solid inset-0 rounded-[16px]" />
              </div>
            </div>
            <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#ececf3] text-[14px]">John Doe</p>
          </div>

          {/* Notifications */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconBell className="size-[24px] text-[#DFDDE7]" stroke={2} />
                  <div className="absolute left-[24px] size-[8px] top-[12px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" fill="#2E9EFA" r="4" />
                    </svg>
                  </div>
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Notifications</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconBook className="size-[24px] text-[#DFDDE7]" stroke={2} />
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Resources</p>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
                  <IconMessage className="size-[24px] text-[#DFDDE7]" stroke={2} />
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" />
        </div>
      </div>

      {/* Whatfix Logo */}
      <div className="bg-[#1f1f32] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
          <div className="content-stretch flex items-center justify-center overflow-clip pl-0 pr-[12px] py-0 relative shrink-0 w-[216px]">
            <div className="content-stretch flex items-center justify-center px-0 py-[10px] relative rounded-[8px] shrink-0">
              <div className="h-[24px] relative shrink-0 w-[84.923px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.9231 24">
                  <path d={svgPaths.pd482700} fill="#F05B22" />
                  <path d={svgPaths.pf911b40} fill="#F8A352" />
                  <path d={svgPaths.pd8fa900} fill="#C43F27" />
                  <path d={svgPaths.p1df9e300} fill="white" />
                  <path d={svgPaths.p1f8d54f0} fill="white" />
                  <path d={svgPaths.p5f73d00} fill="white" />
                  <path d={svgPaths.pbd1d800} fill="white" />
                  <path d={svgPaths.pcb8800} fill="white" />
                  <path d={svgPaths.p86d36f0} fill="white" />
                  <path d={svgPaths.pfa49600} fill="white" />
                  <path d={svgPaths.p32703c00} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
