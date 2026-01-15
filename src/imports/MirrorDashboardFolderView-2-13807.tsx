import svgPaths from "./svg-2jzon0xjo6";
import clsx from "clsx";
import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";

function AccountSwitcherSection4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">{children}</div>
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

function MainNavItem7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

function Group() {
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
      <Group />
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
    <Wrapper2>
      <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" data-name="Divider" />
    </Wrapper2>
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
    <Wrapper2 additionalClassNames="bg-[#1f1f32]">
      <SpecialNavItem />
    </Wrapper2>
  );
}

function LayoutGrid() {
  return (
    <Wrapper3>
      <g id="layout-grid">
        <g id="Vector">
          <path d={svgPaths.p3394b000} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1aa66300} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pf4da270} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32cf9c80} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper3>
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
    <Wrapper3>
      <g id="file-analytics">
        <path d={svgPaths.p3e0b45c0} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper3>
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
    <Wrapper3>
      <g id="settings">
        <g id="Vector">
          <path d={svgPaths.p3dc54d80} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3b27f100} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper3>
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
    <Wrapper3>
      <g id="bell">
        <path d={svgPaths.p3eee2580} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper3>
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
    <Wrapper3>
      <g id="book">
        <path d={svgPaths.p1ee79000} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper3>
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
    <Wrapper3>
      <g id="message-circle-2">
        <path d={svgPaths.p3cd16700} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper3>
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
    <Wrapper2 additionalClassNames="bg-[#1f1f32]">
      <MainNavItem6 />
    </Wrapper2>
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

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[#3d3c52] text-[22px] text-nowrap">Roleplay</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex gap-[602px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0975d7] text-[16px] text-nowrap">All existing roleplays</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex gap-[602px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame9 />
    </div>
  );
}

function Frame5() {
  return <div className="[grid-area:1_/_1] bg-[rgba(239,95,0,0.02)] ml-0 mt-0 rounded-[80px] size-[60px]" />;
}

function Ai() {
  return (
    <div className="[grid-area:1_/_1] ml-[8px] mt-[12px] relative size-[40px]" data-name="ai">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="ai">
          <path d={svgPaths.p2b4b1e00} fill="var(--fill-0, #EF5F00)" id="Vector" stroke="var(--stroke-0, #E45913)" strokeWidth="3.71429" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame5 />
      <Ai />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center leading-[0] relative shrink-0 w-[466px]">
      <Group1 />
      <div className="flex flex-col font-['Inter:Semibold',sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#3d3c52] text-[35px] tracking-[0.0009px] w-[min-content]">
        <p className="leading-[1.25]">Tell a scenario</p>
      </div>
    </div>
  );
}

function InputTextContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input text container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#8c899f] text-[14px]">For eg. Make learners learn about how to handle an angry customer who is not able to return a product item</p>
        </div>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <Wrapper1>
      <g id="plus">
        <path d={svgPaths.p17eb400} id="Vector" stroke="var(--stroke-0, #8C899F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </g>
    </Wrapper1>
  );
}

function Attach() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="Attach">
      <Plus />
    </div>
  );
}

function QuickActionsContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Quick actions container">
      <Attach />
    </div>
  );
}

function AdjustmentsHorizontal() {
  return (
    <Wrapper1>
      <g id="adjustments-horizontal">
        <path d={svgPaths.p3d4d5980} id="Vector" stroke="var(--stroke-0, #8C899F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </g>
    </Wrapper1>
  );
}

function Attach1() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="Attach">
      <AdjustmentsHorizontal />
    </div>
  );
}

function QuickActionsContainer1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Quick actions container">
      <Attach1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[180px]">
      <QuickActionsContainer />
      <QuickActionsContainer1 />
    </div>
  );
}

function Microphone() {
  return (
    <Wrapper1>
      <g id="microphone">
        <path d={svgPaths.p15667040} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </g>
    </Wrapper1>
  );
}

function Attach2() {
  return (
    <div className="bg-[#f6f6f9] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="Attach">
      <Microphone />
    </div>
  );
}

function ArrowUp() {
  return (
    <Wrapper1>
      <g id="arrow-up">
        <path d={svgPaths.p1a949cc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </g>
    </Wrapper1>
  );
}

function Attach3() {
  return (
    <div className="bg-[#8c899f] content-stretch flex items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="Attach">
      <ArrowUp />
    </div>
  );
}

function RightQuickActionsContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="right Quick actions container">
      <Attach2 />
      <Attach3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame4 />
      <RightQuickActionsContainer />
    </div>
  );
}

function PromptInputBox() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Prompt Input box">
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_12px_12px_0px_rgba(0,0,0,0.04)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <InputTextContainer />
        <Frame />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <PromptInputBox />
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start justify-center min-h-px min-w-px relative shrink-0 w-[590px]">
      <Frame7 />
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#ececf3] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame10 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0975d7] text-[16px] w-[590px]">
        <p className="leading-[24px]">Want to try via our scenario builder, click here →</p>
      </div>
    </div>
  );
}

function Canvas() {
  return (
    <div className="basis-0 bg-[#fcfcfd] grow h-full min-h-px min-w-px relative shrink-0 z-[1]" data-name="canvas">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <Frame11 />
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