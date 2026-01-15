import svgPaths from "./svg-9nz3qat7vm";
import clsx from "clsx";
import imgImage7 from "@/assets/9fd108fffcc9a09175ecdd31b797649bb5abc594.png";
import imgAvatar from "@/assets/3c37e63c6742aa8bdee80dfefd60ca99840641a4.png";

function Wrapper9({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start p-[12px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper8({ children }: React.PropsWithChildren<{}>) {
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

function Wrapper7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper6Props = {
  additionalClassNames?: string;
};

function Wrapper6({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper6Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border-[#0975d7] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#eee] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-center pl-0 pr-[12px] py-0 relative w-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-[#f5f5f5] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function MainNavItem7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <Wrapper2>{children}</Wrapper2>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper3>
      <div className="content-stretch flex items-center p-[12px] relative w-full">{children}</div>
    </Wrapper3>
  );
}
type HelperProps = {
  text: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
};

function Helper({ text, text1, text2, text3, text4 }: HelperProps) {
  return (
    <ul style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }} className="block font-['Noto_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap">
      <li className="mb-0 ms-[21px]">
        <span className="leading-[1.4]">{text}</span>
      </li>
      <li className="mb-0 ms-[21px]">
        <span className="leading-[1.4]">{text1}</span>
      </li>
      <li className="mb-0 ms-[21px]">
        <span className="leading-[1.4]">{text2}</span>
      </li>
      <li className="mb-0 ms-[21px]">
        <span className="leading-[1.4]">{text3}</span>
      </li>
      <li className="ms-[21px]">
        <span className="leading-[1.4]">{text4}</span>
      </li>
    </ul>
  );
}

function Edit1() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="edit">
          <path d={svgPaths.p3e7be100} id="Vector" stroke="var(--stroke-0, #1F1F32)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="bg-[#c5c5c5] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap">{text}</p>
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
    <Wrapper4 additionalClassNames="bg-white">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0975d7] text-[14px] text-center text-nowrap">{text}</p>
    </Wrapper4>
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
    <Wrapper5>
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
    </Wrapper5>
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
    <Wrapper6>
      <div className="bg-white h-px opacity-[0.16] shrink-0 w-full" data-name="Divider" />
    </Wrapper6>
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
    <Wrapper6 additionalClassNames="bg-[#1f1f32]">
      <SpecialNavItem />
    </Wrapper6>
  );
}

function LayoutGrid() {
  return (
    <Wrapper7>
      <g id="layout-grid">
        <g id="Vector">
          <path d={svgPaths.p3394b000} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1aa66300} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pf4da270} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32cf9c80} stroke="var(--stroke-0, #F58857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper7>
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
      <Wrapper2>
        <IconContainer />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#fff8f5] text-[14px] text-nowrap">Workflows</p>
      </Wrapper2>
      <div aria-hidden="true" className="absolute border border-[#525066] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FileAnalytics() {
  return (
    <Wrapper7>
      <g id="file-analytics">
        <path d={svgPaths.p3e0b45c0} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
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
    <Wrapper7>
      <g id="settings">
        <g id="Vector">
          <path d={svgPaths.p3dc54d80} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3b27f100} stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper7>
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
    <Wrapper7>
      <g id="bell">
        <path d={svgPaths.p3eee2580} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
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
    <Wrapper7>
      <g id="book">
        <path d={svgPaths.p1ee79000} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
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
    <Wrapper7>
      <g id="message-circle-2">
        <path d={svgPaths.p3cd16700} id="Vector" stroke="var(--stroke-0, #DFDDE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper7>
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
    <Wrapper5>
      <g id="chevron-left">
        <path d="M12.5 5L7.5 10L12.5 15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper5>
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
    <Wrapper6 additionalClassNames="bg-[#1f1f32]">
      <MainNavItem6 />
    </Wrapper6>
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
    <Wrapper5>
      <g id="edit">
        <path d={svgPaths.p2e87cf72} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper5>
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
    <Wrapper5>
      <g id="eye">
        <g id="Vector">
          <path d={svgPaths.p25499600} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d18d480} stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </Wrapper5>
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
    <Wrapper4 additionalClassNames="bg-[#d7effe]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#033d84] text-[14px] text-center text-nowrap">Voice</p>
    </Wrapper4>
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
    <Wrapper5>
      <g id="arrow-right">
        <path d={svgPaths.p14fe6780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper5>
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
    <Wrapper3 additionalClassNames="bg-[#f0f9ff] h-[44px]">
      <div className="content-stretch flex gap-[10px] items-center p-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap">Evaluation</p>
        <div className="absolute bg-[#0975d7] h-[43px] left-0 rounded-[5px] top-0 w-[3px]" />
      </div>
    </Wrapper3>
  );
}

function ArrowLeft() {
  return (
    <Wrapper8>
      <g clipPath="url(#clip0_3_14035)" id="arrow-left">
        <path d={svgPaths.p11d43c96} id="Vector" stroke="var(--stroke-0, #872345)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_3_14035">
          <rect fill="white" height="15.9998" width="15.9998" />
        </clipPath>
      </defs>
    </Wrapper8>
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
    <Wrapper8>
      <g clipPath="url(#clip0_3_14032)" id="arrow-right">
        <path d={svgPaths.p14fe6780} id="Vector" stroke="var(--stroke-0, #872345)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_3_14032">
          <rect fill="white" height="15.9998" width="15.9998" />
        </clipPath>
      </defs>
    </Wrapper8>
  );
}

function OrnamentIcon1() {
  return (
    <div className="bg-[#faf0f0] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[12px] shrink-0" data-name="Ornament icon">
      <ArrowRight1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-end justify-center min-h-px min-w-px px-0 py-[12px] relative shrink-0 w-full">
      <OrnamentIcon />
      <OrnamentIcon1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[768px] relative shrink-0 w-[163px]">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame4 />
        <Text text="Scenario" />
        <Text text="Customer persona" />
        <Frame5 />
        <Text text="Exit conditions" />
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start not-italic px-[12px] py-0 relative text-[#1f1f32] text-nowrap w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[20px]">Evaluation</p>
        <p className="font-['Inter:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px]">Select competencies to assess</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-0 pt-[16px] px-0 relative shrink-0 w-full">
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        Mapped competency
      </p>
      <Text1 text="Empathy" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame13 />
      <Edit1 />
    </div>
  );
}

function Frame12() {
  return (
    <Wrapper1>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#2b2b40] text-[16px] text-nowrap">Empathy and Active Listening</p>
      <Helper text="0–2: Fails to acknowledge user feelings, interrupts frequently, and dismisses concerns." text1="3–4: Shows limited empathy; listens but lacks understanding; responses often miss the mark." text2="5–6: Generally empathetic, listens actively; addresses some concerns but could improve." text3="7–8: Demonstrates strong empathy, listens attentively; addresses user’s feelings effectively." text4="9–10: Exceptional empathy, fully engaged listening; validates feelings and addresses all concerns thoroughly." />
      <Frame17 />
    </Wrapper1>
  );
}

function Frame19() {
  return (
    <Wrapper9>
      <Frame12 />
    </Wrapper9>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        Mapped competency
      </p>
      <Text1 text="Resolution" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame20 />
      <Edit1 />
    </div>
  );
}

function Frame22() {
  return (
    <Wrapper1>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#2b2b40] text-[16px] text-nowrap">Problem-Solving and Resolution Skills</p>
      <ul className="block font-['Noto_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        <li className="mb-0 ms-[21px]">
          <span className="leading-[1.4]">{`0–2: Offers no relevant solutions; escalates without assessing user's needs.`}</span>
        </li>
        <li className="mb-0 ms-[21px]">
          <span className="leading-[1.4]">3–4: Suggests limited solutions that may not address the core issue; slow to act.</span>
        </li>
        <li className="mb-0 ms-[21px]">
          <span className="leading-[1.4]">5–6: Provides reasonable solutions with some effectiveness; may require guidance.</span>
        </li>
        <li className="mb-0 ms-[21px]">
          <span className="leading-[1.4]">7–8: Efficiently identifies issues and suggests effective solutions; user feels supported.</span>
        </li>
        <li className="ms-[21px]">
          <span className="leading-[1.4]">9–10: Proactively resolves issues with innovative solutions; user feels fully satisfied and valued.</span>
        </li>
      </ul>
      <Frame21 />
    </Wrapper1>
  );
}

function Frame14() {
  return (
    <Wrapper9>
      <Frame22 />
    </Wrapper9>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#2b2b40] text-[14px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        Mapped competency
      </p>
      <Text1 text="Knowledge" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame23 />
      <Edit1 />
    </div>
  );
}

function Frame25() {
  return (
    <Wrapper1>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#2b2b40] text-[16px] text-nowrap">Product Knowledge and Expertise</p>
      <Helper text="0–2: Lacks basic knowledge of the product; unable to answer user inquiries." text1="3–4: Has some product knowledge but misses key features; provides vague information." text2="5–6: Understands most product features; can answer standard questions with some detail." text3="7–8: Well-versed in product details; answers questions clearly and accurately." text4="9–10: Comprehensive knowledge of the product; provides insightful information and anticipates further queries." />
      <Frame24 />
    </Wrapper1>
  );
}

function Frame15() {
  return (
    <Wrapper9>
      <Frame25 />
    </Wrapper9>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame9 />
      <Frame18 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame10 />
      <Frame11 />
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