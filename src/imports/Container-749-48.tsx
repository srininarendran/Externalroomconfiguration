import svgPaths from "./svg-wkbd9xqd9r";
import imgImageSelectedObjectPreview from "figma:asset/1ef6a1749b58f7f742822130f665a52014803544.png";

function Paragraph() {
  return (
    <div className="absolute h-[38.375px] left-0 top-0 w-[236px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.2px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.5)] top-0 w-[230px]">Choose how you want to define the area for erasing an existing component.</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[15px] left-0 top-0 w-[236px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.38)] top-0 tracking-[0.6px] uppercase whitespace-nowrap">Selected Object Preview</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[16.5px] left-0 top-[183px] w-[236px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.38)] top-0 whitespace-nowrap">Detected Object</p>
    </div>
  );
}

function ImageSelectedObjectPreview() {
  return (
    <div className="absolute h-[266.4px] left-[-94.4px] top-[-59.2px] w-[424.8px]" data-name="Image (Selected object preview)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageSelectedObjectPreview} />
    </div>
  );
}

function Container5() {
  return <div className="absolute border border-[rgba(239,68,68,0.25)] border-solid h-[148px] left-0 rounded-[12px] top-0 w-[236px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.03)] h-[148px] left-0 overflow-clip rounded-[12px] top-[27px] w-[236px]" data-name="Container">
      <ImageSelectedObjectPreview />
      <Container5 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.08),inset_0px_2px_8px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[259.5px] left-0 top-[351.5px] w-[236px]" data-name="Container">
      <Text />
      <Text1 />
      <Container4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p34cb3f80} id="Vector" stroke="var(--stroke-0, #4ADE80)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.2" />
          <path d={svgPaths.p3e575200} id="Vector_2" stroke="var(--stroke-0, #4ADE80)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.2" />
          <path d={svgPaths.p1349b6a0} id="Vector_3" stroke="var(--stroke-0, #4ADE80)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.2" />
          <path d={svgPaths.pd690e80} id="Vector_4" stroke="var(--stroke-0, #4ADE80)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(74,222,128,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[11px] relative size-full">
        <Icon />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(74,222,128,0.25)]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[18.891px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[18.9px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(74,222,128,0.95)]">Capture Area</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[92.969px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.6px] left-0 not-italic text-[12px] text-[rgba(74,222,128,0.55)] top-[-1px] w-[149px]">Grab a screenshot or crop a part of the image to define where the existing component should be erased.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[150_0_0] h-[115.859px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.06)] content-stretch flex gap-[14px] h-[143.859px] items-start left-0 pt-[14px] px-[16px] rounded-[12px] shadow-[0px_0px_0px_0px_rgba(74,222,128,0.35),0px_0px_16px_0px_rgba(74,222,128,0.08)] top-[50.38px] w-[236px]" data-name="Button">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2535ca80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.2" />
          <path d={svgPaths.pf238580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.2" />
          <path d={svgPaths.p27453880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.2" />
          <path d={svgPaths.p9e34f00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[11px] relative size-full">
        <Icon1 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,0.04)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[18.891px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[18.9px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(255,255,255,0.3)]">Grid Selection</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[74.375px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.6px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.22)] top-[-1px] w-[133px]">Choose an area using a grid-based selection overlay to select the component to erase.</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[150_0_0] h-[97.266px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.02)] content-stretch flex gap-[14px] h-[125.266px] items-start left-0 opacity-45 pt-[14px] px-[16px] rounded-[12px] shadow-[0px_0px_0px_0px_rgba(255,255,255,0.04)] top-[206.23px] w-[236px]" data-name="Button">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[523px] relative shrink-0 w-[236px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Paragraph />
        <Container3 />
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[602px] items-start left-0 overflow-clip pl-[12px] pt-[12px] top-[55px] w-[260px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[17.75px] w-[109.531px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.82)] top-0 tracking-[-0.18px] whitespace-nowrap">Erase Component</p>
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-[rgba(255,255,255,0.07)] h-px left-0 top-[54px] w-[260px]" data-name="Container" />;
}

function Container14() {
  return (
    <div className="absolute h-[55px] left-0 top-0 w-[260px]" data-name="Container">
      <Text2 />
      <Container15 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(239,68,68,0.12)] h-[40px] relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.08)] shrink-0 w-[236px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[118.13px] not-italic text-[13px] text-[rgba(239,68,68,0.95)] text-center top-[10.25px] tracking-[-0.1px] whitespace-nowrap">Erase Component</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(239,68,68,0.3)]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[67px] items-start left-0 pt-[13px] px-[14px] top-[590px] w-[260px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.07)] border-solid border-t inset-0 pointer-events-none" />
      <Button2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0.04)] overflow-clip relative rounded-[16px] size-full" data-name="Container">
      <Container1 />
      <Container14 />
      <Container16 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.08)]" />
    </div>
  );
}