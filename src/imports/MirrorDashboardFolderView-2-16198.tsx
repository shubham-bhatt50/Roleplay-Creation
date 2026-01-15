import svgPaths from "./svg-t7e50z2hox";
import clsx from "clsx";
import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";

function Wrapper7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9998 15.9998">
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

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
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
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border-[#0975d7] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#eee] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">{children}</div>
    </div>
  );
}

function MainNavItem7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper2>
      <div className="content-stretch flex items-center p-[12px] relative w-full">{children}</div>
    </Wrapper2>
  );
}

function IcChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ic_chevron-down">
          <path d={svgPaths.p2fb7a700} fill="var(--fill-0, #212529)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <Wrapper>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">{text}</p>
    </Wrapper>
  );
}
type OptionTextProps = {
  text: string;
};

function OptionText({ text }: OptionTextProps) {
  return (
    <Wrapper3 additionalClassNames="bg-white">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0975d7] text-[14px] text-center text-nowrap">{text}</p>
    </Wrapper3>
  );
}

function BottomBeaks() {
  return (
    <div className="h-[10px] relative shrink-0 w-full">
      <div className="absolute flex h-[8px] items-center justify-center left-[26px] top-[calc(50%-1px)] translate-y-[-50%] w-[14px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[8px] relative w-[14px]" data-name="beak - bottom - left">
            <div className="absolute inset-[6.48%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 7.48141">
                <path d={svgPaths.p26fa5700} fill="var(--fill-0, #3D3C52)" id="beak - bottom - left" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type TooltipBoxTextProps = {
  text: string;
};

function TooltipBoxText({ text }: TooltipBoxTextProps) {
  return (
    <div className="bg-[#3d3c52] content-stretch flex items-start px-[16px] py-[12px] relative rounded-[4px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">{text}</p>
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
    <Wrapper4>
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
    </Wrapper4>
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
    <Wrapper5>
      <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" data-name="Divider" />
    </Wrapper5>
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
    <Wrapper5 additionalClassNames="bg-[#1f1f32]">
      <SpecialNavItem />
    </Wrapper5>
  );
}

function LayoutGrid() {
  return (
    <Wrapper6>
      <g id="layout-grid">
        <g id="Vector">
          <path d={svgPaths.p1f86db00} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2ebc2900} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p648ce00} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p22b31e00} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper6>
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
      <Wrapper1>
        <IconContainer />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#fff8f5] text-[14px] text-nowrap">Workflows</p>
      </Wrapper1>
      <div aria-hidden="true" className="absolute border border-[#525066] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FileAnalytics() {
  return (
    <Wrapper6>
      <g id="file-analytics">
        <path d={svgPaths.p2d7d8e00} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper6>
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
    <Wrapper6>
      <g id="settings">
        <g id="Vector">
          <path d={svgPaths.p1a317300} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3cccb600} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper6>
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
    <Wrapper6>
      <g id="bell">
        <path d={svgPaths.p11ae3d80} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper6>
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
    <Wrapper6>
      <g id="book">
        <path d={svgPaths.p302d99a0} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper6>
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
    <Wrapper6>
      <g id="message-circle-2">
        <path d={svgPaths.p22293b00} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper6>
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
    <Wrapper4>
      <g id="chevron-left">
        <path d="M12.5 5L7.5 10L12.5 15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
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
    <Wrapper5 additionalClassNames="bg-[#1f1f32]">
      <MainNavItem6 />
    </Wrapper5>
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

function Edit() {
  return (
    <Wrapper4>
      <g id="edit">
        <path d={svgPaths.p2e87cf72} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0" data-name="Button">
      <Edit />
    </div>
  );
}

function Tooltip() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Tooltip">
      <TooltipBoxText text="Add to favorites" />
    </div>
  );
}

function BaseTooltip() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".base/Tooltip">
      <Tooltip />
      <BottomBeaks />
    </div>
  );
}

function Tooltip1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-10px] opacity-0 overflow-clip shadow-[0px_3px_8px_0px_rgba(0,0,0,0.14),0px_2px_6px_0px_rgba(0,0,0,0.18)] top-[-66px]" data-name="Tooltip">
      <BaseTooltip />
    </div>
  );
}

function IconButtonWithTooltip() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon button with tooltip">
      <Button1 />
      <Tooltip1 />
    </div>
  );
}

function Eye() {
  return (
    <Wrapper4>
      <g id="eye">
        <g id="Vector">
          <path d={svgPaths.p25499600} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d18d480} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper4>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0" data-name="Button">
      <Eye />
    </div>
  );
}

function Tooltip2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Tooltip">
      <TooltipBoxText text="Add to favorites" />
    </div>
  );
}

function BaseTooltip1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".base/Tooltip">
      <Tooltip2 />
      <BottomBeaks />
    </div>
  );
}

function Tooltip3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-10px] opacity-0 overflow-clip shadow-[0px_3px_8px_0px_rgba(0,0,0,0.14),0px_2px_6px_0px_rgba(0,0,0,0.18)] top-[-66px]" data-name="Tooltip">
      <BaseTooltip1 />
    </div>
  );
}

function IconButtonWithTooltip1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon button with tooltip">
      <Button2 />
      <Tooltip3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#1f1f32] text-[20px] text-nowrap">Dealing with angry customer for refund scenario</p>
      <IconButtonWithTooltip />
      <IconButtonWithTooltip1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame2 />
      <p className="font-['Inter:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#7b7891] text-[16px] text-nowrap">By Sarah Johnson</p>
    </div>
  );
}

function Option() {
  return (
    <Wrapper3 additionalClassNames="bg-[#d7effe]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#033d84] text-[14px] text-center text-nowrap">Voice</p>
    </Wrapper3>
  );
}

function ToggleButton() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Toggle Button">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit]">
        <Option />
        <OptionText text="Chat" />
        <OptionText text="Hybrid" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#0975d7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ArrowRight() {
  return (
    <Wrapper4>
      <g id="arrow-right">
        <path d={svgPaths.p14fe6780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper4>
  );
}

function Button3() {
  return (
    <div className="bg-[#c74900] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Attach to workflow</p>
      <ArrowRight />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame3 />
      <ToggleButton />
      <Button3 />
    </div>
  );
}

function Frame4() {
  return (
    <Wrapper>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#8c899f] text-[14px] text-center text-nowrap">Context</p>
    </Wrapper>
  );
}

function Frame5() {
  return (
    <Wrapper2 additionalClassNames="bg-[#f0f9ff] h-[44px]">
      <div className="content-stretch flex gap-[10px] items-center p-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap">Scenario</p>
        <div className="absolute bg-[#0975d7] h-[43px] left-0 rounded-[5px] top-0 w-[3px]" />
      </div>
    </Wrapper2>
  );
}

function ArrowLeft() {
  return (
    <Wrapper7>
      <g id="arrow-left">
        <path d={svgPaths.p1bdf2800} id="Vector" stroke="var(--stroke-0, #872345)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
  );
}

function OrnamentIcon() {
  return (
    <div className="bg-[#faf0f0] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[12px] shrink-0" data-name="Ornament icon">
      <ArrowLeft />
    </div>
  );
}

function ArrowRight1() {
  return (
    <Wrapper7>
      <g id="arrow-right">
        <path d={svgPaths.p9fc9100} id="Vector" stroke="var(--stroke-0, #872345)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
  );
}

function OrnamentIcon1() {
  return (
    <div className="bg-[#faf0f0] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[12px] shrink-0" data-name="Ornament icon">
      <ArrowRight1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-end justify-center min-h-px min-w-px px-0 py-[12px] relative shrink-0 w-full">
      <OrnamentIcon />
      <OrnamentIcon1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[768px] relative shrink-0 w-[163px]">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame4 />
        <Frame5 />
        <Text text="Customer persona" />
        <Text text="Evaluation" />
        <Text text="Exit conditions" />
        <Frame12 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start not-italic px-[12px] py-0 relative text-[#1f1f32] text-nowrap w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[20px]">Scenario</p>
        <p className="font-['Inter:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px]">Define the situation learners will practice</p>
      </div>
    </div>
  );
}

function IcUndo() {
  return (
    <Wrapper4>
      <g id="ic_undo">
        <path d={svgPaths.p2768e100} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcUndo />
    </div>
  );
}

function MenuBarButton() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase />
    </div>
  );
}

function IcRedo() {
  return (
    <Wrapper4>
      <g id="ic_redo">
        <path d={svgPaths.p3d451100} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase1() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcRedo />
    </div>
  );
}

function MenuBarButton1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase1 />
    </div>
  );
}

function ButtonGroupHistory() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="button-group-history">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButton />
      <MenuBarButton1 />
    </div>
  );
}

function MenuBarButtonBase2() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center pl-[8px] pr-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#212529] text-[14px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        Normal text
      </p>
      <IcChevronDown />
    </div>
  );
}

function MenuBarTextStyleDropdown() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__text-style-dropdown">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButtonBase2 />
    </div>
  );
}

function IcTextAlignLeft() {
  return (
    <Wrapper4>
      <g id="ic_text-align-left">
        <path d={svgPaths.p2a130bf2} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase3() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center pl-[8px] pr-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextAlignLeft />
      <IcChevronDown />
    </div>
  );
}

function MenuBarTextAlignDropdown() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__text-align-dropdown">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButtonBase3 />
    </div>
  );
}

function ColorPickerListItem() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="color-picker__list-item">
      <div className="absolute bg-[#212529] inset-0 rounded-[4px]" data-name="context-menu / color-picker-chip - fill" />
      <div className="absolute border border-[#212529] border-solid inset-0 mix-blend-multiply opacity-70 rounded-[4px]" data-name="context-menu / color-picker-chip - border" />
    </div>
  );
}

function MenuBarButtonBase4() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center pl-[8px] pr-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <ColorPickerListItem />
      <IcChevronDown />
    </div>
  );
}

function MenuBarColorPickerDropdown() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__color-picker-dropdown">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButtonBase4 />
    </div>
  );
}

function IcTextBold() {
  return (
    <Wrapper4>
      <g id="ic_text-bold">
        <path d={svgPaths.pef1c480} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase5() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextBold />
    </div>
  );
}

function MenuBarButton2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase5 />
    </div>
  );
}

function IcTextItalic() {
  return (
    <Wrapper4>
      <g id="ic_text-italic">
        <path d={svgPaths.p54b4180} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase6() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextItalic />
    </div>
  );
}

function MenuBarButton3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase6 />
    </div>
  );
}

function IcTextUnderline() {
  return (
    <Wrapper4>
      <g id="ic_text-underline">
        <path d={svgPaths.p18aa3140} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase7() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextUnderline />
    </div>
  );
}

function MenuBarButton4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase7 />
    </div>
  );
}

function IcTextStrikethrough() {
  return (
    <Wrapper4>
      <g id="ic_text-strikethrough">
        <path d={svgPaths.p2d889e80} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase8() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextStrikethrough />
    </div>
  );
}

function MenuBarButton5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase8 />
    </div>
  );
}

function IcInlineCode() {
  return (
    <Wrapper4>
      <g id="ic_inline-code">
        <path d={svgPaths.p235f2800} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase9() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcInlineCode />
    </div>
  );
}

function MenuBarButton6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase9 />
    </div>
  );
}

function IcTextClearFormat() {
  return (
    <Wrapper4>
      <g id="ic_text-clear-format">
        <path d={svgPaths.p1aa382f0} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase10() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcTextClearFormat />
    </div>
  );
}

function MenuBarButton7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase10 />
    </div>
  );
}

function Format() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="format">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButton2 />
      <MenuBarButton3 />
      <MenuBarButton4 />
      <MenuBarButton5 />
      <MenuBarButton6 />
      <MenuBarButton7 />
    </div>
  );
}

function IcListBulleted() {
  return (
    <Wrapper4>
      <g id="ic_list-bulleted">
        <g id="Vector">
          <path d={svgPaths.p25a87780} fill="var(--fill-0, #212529)" />
          <path d={svgPaths.p34f83c00} fill="var(--fill-0, #212529)" />
          <path d={svgPaths.p4c11ff0} fill="var(--fill-0, #212529)" />
        </g>
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase11() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcListBulleted />
    </div>
  );
}

function MenuBarButton8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase11 />
    </div>
  );
}

function IcListNumbered() {
  return (
    <Wrapper4>
      <g id="ic_list-numbered">
        <path d={svgPaths.pbc47300} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase12() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcListNumbered />
    </div>
  );
}

function MenuBarButton9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase12 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="list">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButton8 />
      <MenuBarButton9 />
    </div>
  );
}

function IcLink() {
  return (
    <Wrapper4>
      <g id="ic_link">
        <g id="Vector">
          <path d={svgPaths.p2fda4c00} fill="var(--fill-0, #212529)" />
          <path d={svgPaths.p3a9d0f0} fill="var(--fill-0, #212529)" />
        </g>
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase13() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcLink />
    </div>
  );
}

function MenuBarButton10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase13 />
    </div>
  );
}

function IcImage() {
  return (
    <Wrapper4>
      <g id="ic_image">
        <g id="Vector">
          <path d={svgPaths.p1d614280} fill="var(--fill-0, #212529)" />
          <path d={svgPaths.p4360c80} fill="var(--fill-0, #212529)" />
        </g>
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase14() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcImage />
    </div>
  );
}

function MenuBarButton11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase14 />
    </div>
  );
}

function IcCode() {
  return (
    <Wrapper4>
      <g id="ic_code">
        <path d={svgPaths.p1bd5ca80} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase15() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcCode />
    </div>
  );
}

function MenuBarButton12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase15 />
    </div>
  );
}

function IcQuotes() {
  return (
    <Wrapper4>
      <g id="ic_quotes">
        <path d={svgPaths.p32d1ea40} fill="var(--fill-0, #212529)" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function MenuBarButtonBase16() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcQuotes />
    </div>
  );
}

function MenuBarButton13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase16 />
    </div>
  );
}

function IcHorizontalRule() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="ic_horizontal-rule">
      <div className="absolute bg-[#212529] inset-[46.88%_12.5%]" />
    </div>
  );
}

function MenuBarButtonBase17() {
  return (
    <div className="content-stretch flex gap-[2px] h-[28px] items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="menu-bar__button--base">
      <IcHorizontalRule />
    </div>
  );
}

function MenuBarButton14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="menu-bar__button">
      <MenuBarButtonBase17 />
    </div>
  );
}

function Etc() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="etc">
      <div aria-hidden="true" className="absolute border-0 border-[#e9ecef] border-solid inset-0 pointer-events-none" />
      <MenuBarButton10 />
      <MenuBarButton11 />
      <MenuBarButton12 />
      <MenuBarButton13 />
      <MenuBarButton14 />
    </div>
  );
}

function MenuBar() {
  return (
    <div className="relative shrink-0 w-full" data-name="menu-bar">
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <ButtonGroupHistory />
        <MenuBarTextStyleDropdown />
        <MenuBarTextAlignDropdown />
        <MenuBarColorPickerDropdown />
        <Format />
        <List />
        <Etc />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center pb-0 pt-[16px] px-0 relative shrink-0 w-full">
      <Frame6 />
      <MenuBar />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Noto_Sans:Regular',sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[0px] text-black" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] mb-0 not-italic text-[16px]">Learner Brief</p>
            <p className="leading-[1.4] mb-0 text-[14px]">You are a Customer Support Executive handling incoming support requests. A customer is reaching out regarding a refund for a product they purchased.</p>
            <p className="leading-[1.4] mb-0 text-[14px]">&nbsp;</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] mb-0 not-italic text-[16px]">Scenario</p>
            <p className="leading-[1.4] mb-0 text-[14px]">A customer named Alex is contacting support to request a full refund for a product they recently bought. Alex is frustrated and expects a quick resolution. Your job is to handle this conversation professionally while following company policy.</p>
            <p className="leading-[1.4] mb-0 text-[14px]">&nbsp;</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] mb-0 not-italic text-[16px]">Learning objective</p>
            <p className="leading-[1.4] text-[14px]">The learner should de-escalate the situation—calm the customer down, acknowledge their concerns, and guide the conversation toward a resolution while maintaining professionalism.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame8 />
      <Frame10 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame11 />
      <Frame9 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[768px] relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ececf3] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Canvas() {
  return (
    <div className="basis-0 bg-[#fcfcfd] grow min-h-px min-w-px relative shrink-0 z-[1]" data-name="canvas">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
        <Frame1 />
        <Frame />
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