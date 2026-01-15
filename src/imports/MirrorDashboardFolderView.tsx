import svgPaths from "./svg-twjw4wxfsk";
import clsx from "clsx";
import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";

function Indicator({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[4px] relative shrink-0 w-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function AccountSwitcherSection4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">{children}</div>
    </div>
  );
}

function RowItem3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function MainNavItem7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
type PaginationItemTextProps = {
  text: string;
};

function PaginationItemText({ text }: PaginationItemTextProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center w-[20px]">{text}</p>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_0px_0px_0px_#d7d6d1]" />
    </div>
  );
}

function Mirror() {
  return (
    <Wrapper1>
      <g id="Mirror">
        <g id="Vector">
          <path d={svgPaths.p1ec4ce80} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pb8c4e00} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper1>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="content-stretch flex items-start px-[4px] py-0 relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type TypeTextProps = {
  text: string;
};

function TypeText({ text }: TypeTextProps) {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[6px] py-0 relative rounded-[4px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}

function Folder() {
  return (
    <Wrapper1>
      <g id="folder">
        <path d={svgPaths.p3dbeaa80} id="Vector" stroke="var(--stroke-1, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper1>
  );
}
type ColumnHeaderItemTextProps = {
  text: string;
};

function ColumnHeaderItemText({ text }: ColumnHeaderItemTextProps) {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex gap-[4px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]">
      <div aria-hidden="true" className="absolute border-[#dfdde7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#2b2b40] text-[14px] text-center text-nowrap">{text}</p>
      <SortDescending />
    </div>
  );
}

function SortDescending() {
  return (
    <Wrapper2>
      <g id="sort-descending">
        <path d={svgPaths.p8c58a80} id="Vector" stroke="var(--stroke-0, #525066)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper2>
  );
}

function BaseCheckbox() {
  return (
    <Wrapper2>
      <g id=".base/Checkbox">
        <rect height="15" rx="3.5" stroke="var(--stroke-0, #8C899F)" width="15" x="0.5" y="0.5" />
      </g>
    </Wrapper2>
  );
}
type TabContentTextProps = {
  text: string;
};

function TabContentText({ text }: TabContentTextProps) {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[4px] py-[8px] relative rounded-[4px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#3d3c52] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative shrink-0 size-[22px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group 289343">
          <rect fill="var(--fill-0, #F55800)" height="5.5" id="Rectangle 14808" width="16.5" x="7.21238e-07" y="16.5" />
          <rect fill="var(--fill-0, #F55800)" height="5.5" id="Rectangle 14809" transform="rotate(-90 7.21238e-07 22)" width="16.5" x="7.21238e-07" y="22" />
          <path d={svgPaths.p1e734d80} fill="var(--fill-0, #C63D22)" id="Intersect" />
          <rect fill="var(--fill-0, #FBA450)" height="5.5" id="Rectangle 14810" transform="rotate(-180 22 5.5)" width="16.5" x="22" y="5.5" />
          <rect fill="var(--fill-0, #FBA450)" height="5.5" id="Rectangle 14811" transform="rotate(90 22 1.44248e-06)" width="16.5" x="22" y="1.44248e-06" />
          <path d={svgPaths.p3d4d0800} fill="var(--fill-0, #FA8A1F)" id="Intersect_2" />
        </g>
      </svg>
    </div>
  );
}

function WfLogomark() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[44px]" data-name="WF Logomark">
      <Group2 />
    </div>
  );
}

function LogoLabel() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Logo + Label">
      <WfLogomark />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Mirror</p>
    </div>
  );
}

function GridDots() {
  return (
    <Wrapper1>
      <g id="grid-dots">
        <g id="Vector">
          <path d={svgPaths.p1be4d080} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p11974af0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p325bd380} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2b624e00} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3986d480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1c492b80} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p133c1580} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pf002f00} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper1>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0" data-name="Button">
      <GridDots />
    </div>
  );
}

function WhatfixLogoProductSwitcher() {
  return (
    <div className="basis-0 bg-[#1f1f32] content-stretch flex grow items-center justify-between min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Whatfix Logo + Product Switcher">
      <LogoLabel />
      <Button />
    </div>
  );
}

function WhatfixLogoProductSwitcher1() {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full" data-name="Whatfix Logo + Product Switcher">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <WhatfixLogoProductSwitcher />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <Wrapper3>
      <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" data-name="Divider" />
    </Wrapper3>
  );
}

function DecoratorContainer() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[44px]" data-name="Decorator container">
      <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="image 7">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[70%] left-0 max-w-none top-[16.55%] w-full" src={imgImage7} />
        </div>
      </div>
    </div>
  );
}

function Selector() {
  return (
    <div className="absolute left-1/2 size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="selector">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="selector">
          <path d={svgPaths.p90a7a40} id="Vector" stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrailingIconContainer() {
  return (
    <div className="overflow-clip relative shrink-0 size-[44px]" data-name="Trailing icon container">
      <Selector />
    </div>
  );
}

function SpecialNavItem() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0 w-full" data-name="Special Nav item">
      <DecoratorContainer />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#ececf3] text-[14px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">JnJ Salesforce</p>
      <TrailingIconContainer />
    </div>
  );
}

function AccountSwitcherSection() {
  return (
    <Wrapper3 additionalClassNames="bg-[#1f1f32]">
      <SpecialNavItem />
    </Wrapper3>
  );
}

function LayoutGrid() {
  return (
    <Wrapper4>
      <g id="layout-grid">
        <g id="Vector">
          <path d={svgPaths.p3394b000} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1aa66300} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pf4da270} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32cf9c80} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper4>
  );
}

function IconContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <LayoutGrid />
    </div>
  );
}

function MainNavItem() {
  return (
    <div className="bg-[#3d3c52] relative rounded-[8px] shrink-0 w-full" data-name="Main nav item">
      <Wrapper>
        <IconContainer />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#fff8f5] text-[14px] text-nowrap">Workflows</p>
      </Wrapper>
      <div aria-hidden="true" className="absolute border border-[#525066] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FileAnalytics() {
  return (
    <Wrapper4>
      <g id="file-analytics">
        <path d={svgPaths.p3e0b45c0} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function IconContainer1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <FileAnalytics />
    </div>
  );
}

function MainNavItem1() {
  return (
    <MainNavItem7>
      <IconContainer1 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Analytics</p>
    </MainNavItem7>
  );
}

function Settings() {
  return (
    <Wrapper4>
      <g id="settings">
        <g id="Vector">
          <path d={svgPaths.p3dc54d80} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3b27f100} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper4>
  );
}

function IconContainer2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <Settings />
    </div>
  );
}

function MainNavItem2() {
  return (
    <MainNavItem7>
      <IconContainer2 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Settings</p>
    </MainNavItem7>
  );
}

function AccountSwitcherSection1() {
  return (
    <AccountSwitcherSection4>
      <MainNavItem />
      <MainNavItem1 />
      <MainNavItem2 />
    </AccountSwitcherSection4>
  );
}

function Spacer() {
  return <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" data-name="Spacer" />;
}

function Avatar() {
  return (
    <div className="absolute left-1/2 pointer-events-none rounded-[16px] size-[32px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute border-2 border-[#872345] border-solid inset-0 rounded-[16px]" />
    </div>
  );
}

function DecoratorContainer1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[44px]" data-name="Decorator container">
      <Avatar />
    </div>
  );
}

function SpecialNavItem1() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0 w-full" data-name="Special Nav item">
      <DecoratorContainer1 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#ececf3] text-[14px]">John Doe</p>
    </div>
  );
}

function Bell() {
  return (
    <Wrapper4>
      <g id="bell">
        <path d={svgPaths.p3eee2580} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function Badge() {
  return (
    <div className="absolute left-[24px] size-[8px] top-[12px]" data-name="Badge">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Badge">
          <circle cx="4" cy="4" fill="var(--fill-0, #2E9EFA)" id="Notification badge" r="4" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <Bell />
      <Badge />
    </div>
  );
}

function MainNavItem3() {
  return (
    <MainNavItem7>
      <IconContainer3 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Notifications</p>
    </MainNavItem7>
  );
}

function Book() {
  return (
    <Wrapper4>
      <g id="book">
        <path d={svgPaths.p1ee79000} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function IconContainer4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <Book />
    </div>
  );
}

function MainNavItem4() {
  return (
    <MainNavItem7>
      <IconContainer4 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Resources</p>
    </MainNavItem7>
  );
}

function MessageCircle() {
  return (
    <Wrapper4>
      <g id="message-circle-2">
        <path d={svgPaths.p3cd16700} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function IconContainer5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <MessageCircle />
    </div>
  );
}

function MainNavItem5() {
  return (
    <MainNavItem7>
      <IconContainer5 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#ececf3] text-[14px] text-nowrap">Chat</p>
    </MainNavItem7>
  );
}

function AccountSwitcherSection2() {
  return (
    <AccountSwitcherSection4>
      <SpecialNavItem1 />
      <MainNavItem3 />
      <MainNavItem4 />
      <MainNavItem5 />
    </AccountSwitcherSection4>
  );
}

function ChevronLeft() {
  return (
    <Wrapper1>
      <g id="chevron-left">
        <path d="M12.5 5L7.5 10L12.5 15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper1>
  );
}

function CollapseSwitch() {
  return (
    <div className="absolute bg-[#1f1f32] content-stretch flex items-start left-[228px] p-[2px] rounded-[12px] top-[64px]" data-name="Collapse switch">
      <div aria-hidden="true" className="absolute border border-[#3d3c52] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.14),0px_2px_6px_0px_rgba(0,0,0,0.18)]" />
      <ChevronLeft />
    </div>
  );
}

function WhatfixLogoColor92X26Pixel() {
  return (
    <div className="h-[24px] relative shrink-0 w-[84.923px]" data-name="Whatfix_Logo_Color_92x26pixel 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.9231 24">
        <g id="Whatfix_Logo_Color_92x26pixel 1">
          <path d={svgPaths.pd482700} fill="var(--fill-0, #F05B22)" id="Vector" />
          <path d={svgPaths.pf911b40} fill="var(--fill-0, #F8A352)" id="Vector_2" />
          <path d={svgPaths.pd8fa900} fill="var(--fill-0, #C43F27)" id="Vector_3" />
          <path d={svgPaths.p1df9e300} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p1f8d54f0} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p5f73d00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.pbd1d800} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.pcb8800} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p86d36f0} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.pfa49600} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p32703c00} fill="var(--fill-0, white)" id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer6() {
  return (
    <div className="content-stretch flex items-center justify-center px-0 py-[10px] relative rounded-[8px] shrink-0" data-name="Icon container">
      <WhatfixLogoColor92X26Pixel />
    </div>
  );
}

function MainNavItem6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pl-0 pr-[12px] py-0 relative shrink-0 w-[216px]" data-name="Main nav item">
      <IconContainer6 />
    </div>
  );
}

function AccountSwitcherSection3() {
  return (
    <Wrapper3 additionalClassNames="bg-[#1f1f32]">
      <MainNavItem6 />
    </Wrapper3>
  );
}

function MainNav() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex flex-col h-[900px] items-start px-0 py-[8px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 z-[2]" data-name="Main nav">
      <WhatfixLogoProductSwitcher1 />
      <Divider />
      <AccountSwitcherSection />
      <AccountSwitcherSection1 />
      <Spacer />
      <Divider />
      <AccountSwitcherSection2 />
      <CollapseSwitch />
      <Divider />
      <AccountSwitcherSection3 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[#3d3c52] text-[22px] text-nowrap">Workflows</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[602px] items-start relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Tab">
      <TabContentText text="Draft" />
      <Indicator>
        <path d={svgPaths.pbed0600} fill="var(--fill-0, #6B697B)" id="Indicator" opacity="0" />
      </Indicator>
    </div>
  );
}

function TabContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[4px] py-[8px] relative rounded-[4px] shrink-0" data-name="Tab Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0975d7] text-[16px] text-nowrap">Ready</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Tab">
      <TabContent />
      <div className="h-[4px] relative shrink-0 w-full" data-name="Indicator">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 4">
          <path d={svgPaths.p27275700} fill="var(--fill-0, #0975D7)" id="Indicator" />
        </svg>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Tab">
      <TabContentText text="Production" />
      <Indicator>
        <path d={svgPaths.p32d76c00} fill="var(--fill-0, #6B697B)" id="Indicator" opacity="0" />
      </Indicator>
    </div>
  );
}

function TabGroup() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tab group">
      <Tab />
      <Tab1 />
      <Tab2 />
    </div>
  );
}

function Plus() {
  return (
    <Wrapper1>
      <g id="plus">
        <path d={svgPaths.p17eb400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper1>
  );
}

function Button1() {
  return (
    <div className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <Plus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Create</p>
    </div>
  );
}

function Ic20Search() {
  return (
    <Wrapper1>
      <g id="ic20-search">
        <path clipRule="evenodd" d={svgPaths.p1496de80} fill="var(--fill-0, #7B7891)" fillRule="evenodd" id="Icon" />
      </g>
    </Wrapper1>
  );
}

function SearchBarRegular() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[44px] ml-0 mt-0 relative rounded-[4px] w-[300px]" data-name="Search bar / Regular">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip pl-[12px] pr-[10px] py-[12px] relative rounded-[inherit] size-full">
        <Ic20Search />
        <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#525066] text-[14px]">Search folder</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <SearchBarRegular />
    </div>
  );
}

function AdjustmentsHorizontal() {
  return (
    <Wrapper1>
      <g id="adjustments-horizontal">
        <path d={svgPaths.p3d4d5980} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper1>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit]">
        <AdjustmentsHorizontal />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">Filter</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Group1 />
      <Button2 />
    </div>
  );
}

function Divider1() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-start relative shrink-0 w-px" data-name="Divider">
      <div className="basis-0 bg-[#f2f2f8] grow min-h-px min-w-px shrink-0 w-full" data-name="Divider" />
    </div>
  );
}

function LayoutColumns() {
  return (
    <Wrapper1>
      <g id="layout-columns">
        <path d={svgPaths.p31834880} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper1>
  );
}

function BaseButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[12px] relative shrink-0" data-name=".base/Buttons">
      <LayoutColumns />
    </div>
  );
}

function LegendButton() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="LegendButton">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit]">
        <BaseButtons />
      </div>
      <div aria-hidden="true" className="absolute border border-[#8c899f] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Divider1 />
      <LegendButton />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Button1 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center pb-[4px] pt-0 px-0 relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TabGroup />
      <Frame />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function SelectorColumn() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex h-[48px] items-center p-[16px] relative shrink-0" data-name="selector-column">
      <div aria-hidden="true" className="absolute border-[#dfdde7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox />
    </div>
  );
}

function ColumnHeaderItem() {
  return (
    <div className="basis-0 bg-[#f6f6f9] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name=".column-header-item">
      <div aria-hidden="true" className="absolute border-[#dfdde7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#2b2b40] text-[14px] text-center text-nowrap">Name</p>
          <SortDescending />
        </div>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-header">
      <SelectorColumn />
      <ColumnHeaderItem />
      <ColumnHeaderItemText text="Type" />
      <ColumnHeaderItemText text="Created by" />
      <ColumnHeaderItemText text="Last updated on" />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function TypeColumn() {
  return (
    <div className="content-stretch flex items-center p-[16px] relative shrink-0 size-[48px]" data-name="Type column">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox1 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center p-[4px] relative rounded-[32px] shrink-0" data-name="Badge">
      <Text text="7" />
    </div>
  );
}

function Left() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <Folder />
      <TypeText text="H2 2025 Learning" />
      <Badge1 />
    </div>
  );
}

function RowItem() {
  return (
    <RowItem3>
      <Left />
    </RowItem3>
  );
}

function Left1() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Simulation" />
    </div>
  );
}

function RowItem1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left1 />
    </div>
  );
}

function Left2() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Mark S" />
    </div>
  );
}

function RowItem2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left2 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-row">
      <TypeColumn />
      <RowItem />
      <RowItem1 />
      <RowItem2 />
      <RowItem1 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function TypeColumn1() {
  return (
    <div className="content-stretch flex items-center p-[16px] relative shrink-0 size-[48px]" data-name="Type column">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox2 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center p-[4px] relative rounded-[32px] shrink-0" data-name="Badge">
      <Text text="5" />
    </div>
  );
}

function Left3() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <Folder />
      <TypeText text="Guidewire environment 2" />
      <Badge2 />
    </div>
  );
}

function RowItem4() {
  return (
    <RowItem3>
      <Left3 />
    </RowItem3>
  );
}

function Left4() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Simulation" />
    </div>
  );
}

function RowItem5() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left4 />
    </div>
  );
}

function Left5() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Ann Perkins" />
    </div>
  );
}

function RowItem6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left5 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-row">
      <TypeColumn1 />
      <RowItem4 />
      <RowItem5 />
      <RowItem6 />
      <RowItem5 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function TypeColumn2() {
  return (
    <div className="content-stretch flex items-center p-[16px] relative shrink-0 size-[48px]" data-name="Type column">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox3 />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center p-[4px] relative rounded-[32px] shrink-0" data-name="Badge">
      <Text text="9" />
    </div>
  );
}

function Left6() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <Folder />
      <TypeText text="Guidewire workflow list archive 2" />
      <Badge3 />
    </div>
  );
}

function RowItem7() {
  return (
    <RowItem3>
      <Left6 />
    </RowItem3>
  );
}

function Left7() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Simulation" />
    </div>
  );
}

function RowItem8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left7 />
    </div>
  );
}

function Left8() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Ann Perkins" />
    </div>
  );
}

function RowItem9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left8 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-row">
      <TypeColumn2 />
      <RowItem7 />
      <RowItem8 />
      <RowItem9 />
      <RowItem8 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function TypeColumn3() {
  return (
    <div className="content-stretch flex items-center p-[16px] relative shrink-0 size-[48px]" data-name="Type column">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox4 />
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center p-[4px] relative rounded-[32px] shrink-0" data-name="Badge">
      <Text text="5" />
    </div>
  );
}

function Left9() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <Mirror />
      <TypeText text="New claim | Guidewire 2" />
      <Badge4 />
    </div>
  );
}

function RowItem10() {
  return (
    <RowItem3>
      <Left9 />
    </RowItem3>
  );
}

function Left10() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Workflow" />
    </div>
  );
}

function RowItem11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left10 />
    </div>
  );
}

function Left11() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Juliette Nichols" />
    </div>
  );
}

function RowItem12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left11 />
    </div>
  );
}

function Left12() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Simulation" />
    </div>
  );
}

function RowItem13() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left12 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-row">
      <TypeColumn3 />
      <RowItem10 />
      <RowItem11 />
      <RowItem12 />
      <RowItem13 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Checkbox">
      <BaseCheckbox />
    </div>
  );
}

function TypeColumn4() {
  return (
    <div className="content-stretch flex items-center p-[16px] relative shrink-0 size-[48px]" data-name="Type column">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Checkbox5 />
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center p-[4px] relative rounded-[32px] shrink-0" data-name="Badge">
      <Text text="10" />
    </div>
  );
}

function Left13() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <Mirror />
      <TypeText text="New claim | Guidewire 2" />
      <Badge5 />
    </div>
  );
}

function RowItem14() {
  return (
    <RowItem3>
      <Left13 />
    </RowItem3>
  );
}

function Left14() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Workflow" />
    </div>
  );
}

function RowItem15() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left14 />
    </div>
  );
}

function Left15() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Boyd Stevens" />
    </div>
  );
}

function RowItem16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left15 />
    </div>
  );
}

function Left16() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="left">
      <TypeText text="Simulation" />
    </div>
  );
}

function RowItem17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center p-[16px] relative shrink-0 w-[160px]" data-name=".row-item">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Left16 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="table-row">
      <TypeColumn4 />
      <RowItem14 />
      <RowItem15 />
      <RowItem16 />
      <RowItem17 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-[#fcfcfd] h-[690px] relative rounded-[4px] shrink-0 w-[1152px]" data-name="table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TableHeader />
        <TableRow />
        <TableRow1 />
        <TableRow2 />
        <TableRow3 />
        <TableRow4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function PaginationItem() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center p-[8px] relative shrink-0 w-[118px]" data-name="Pagination item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3d3c52] text-[0px] w-[119px]">
        <p className="leading-[20px] text-[14px]">
          <span className="font-['Inter:Regular',sans-serif] not-italic text-[#2b2b40]">{`Rows `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic text-[#2b2b40]">1-15</span>
          <span>{` of `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic text-[#2b2b40]">{`120 `}</span>
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[127px]">
      <PaginationItem />
    </div>
  );
}

function ChevronLeft1() {
  return (
    <Wrapper2>
      <g id="chevron-left">
        <path d="M12.5 5L7.5 10L12.5 15" id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </g>
    </Wrapper2>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <ChevronLeft1 />
    </div>
  );
}

function PaginationItem1() {
  return (
    <div className="bg-[#2775c4] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Pagination item">
      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white w-[20px]">2</p>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_0px_0px_0px_#d7d6d1]" />
    </div>
  );
}

function PaginationItem2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Pagination item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center w-[20px]">
        <p className="leading-[20px]">21</p>
      </div>
    </div>
  );
}

function Paginations() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative rounded-[4px]" data-name="Paginations">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit]">
        <PaginationItemText text="1" />
        <PaginationItem1 />
        <PaginationItemText text="3" />
        <PaginationItemText text="..." />
        <PaginationItem2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Paginations />
    </div>
  );
}

function ChevronRight() {
  return (
    <Wrapper2>
      <g id="chevron-right">
        <path d="M7.5 5L12.5 10L7.5 15" id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </g>
    </Wrapper2>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <ChevronRight />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <Button3 />
      <Group />
      <Button4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[496px] top-0">
      <Frame1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Canvas() {
  return (
    <div className="basis-0 bg-[#fcfcfd] grow h-full min-h-px min-w-px relative shrink-0 z-[1]" data-name="canvas">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <Frame10 />
        <Frame2 />
        <Table />
        <Frame8 />
      </div>
    </div>
  );
}

export default function MirrorDashboardFolderView() {
  return (
    <div className="content-stretch flex isolate items-center overflow-clip relative rounded-[12px] size-full" data-name="Mirror-dashboard-folder-view">
      <MainNav />
      <Canvas />
    </div>
  );
}