import imgImageUploadedComponent from "figma:asset/ba9e3c7c2bc1c79f0d15263b821b3207b6761146.png";

function Container5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[230px]" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.45)] top-[4px] tracking-[0.3px] uppercase whitespace-nowrap">Uploaded Image</p>
    </div>
  );
}

function ImageUploadedComponent() {
  return (
    <div className="h-[180px] relative shrink-0 w-full" data-name="Image (Uploaded component)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageUploadedComponent} />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.03)] h-[182px] left-0 rounded-[10px] top-[30px] w-[230px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <ImageUploadedComponent />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[15.391px] items-start left-0 top-[218px] w-[230px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15.4px] min-h-px min-w-px not-italic relative text-[11px] text-[rgba(255,255,255,0.38)]">Original Image</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.45)] top-[4px] tracking-[0.3px] uppercase whitespace-nowrap">Detected Object</p>
    </div>
  );
}

function Container10() {
  return <div className="absolute h-[160px] left-px opacity-4 top-px w-[228px]" data-name="Container" style={{ backgroundImage: "linear-gradient(35.0594deg, rgb(255, 255, 255) 25%, rgba(0, 0, 0, 0) 25%), linear-gradient(-35.0594deg, rgb(255, 255, 255) 25%, rgba(0, 0, 0, 0) 25%), linear-gradient(35.0594deg, rgba(0, 0, 0, 0) 75%, rgb(255, 255, 255) 75%), linear-gradient(-35.0594deg, rgba(0, 0, 0, 0) 75%, rgb(255, 255, 255) 75%)" }} />;
}

function ImageDetectedComponent() {
  return (
    <div className="absolute h-[160px] left-px top-px w-[228px]" data-name="Image (Detected component)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageUploadedComponent} />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[162px] relative rounded-[10px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(144.841deg, rgba(24, 24, 28, 0.95) 0%, rgba(30, 30, 36, 0.95) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container10 />
        <ImageDetectedComponent />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(74,222,128,0.15)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex h-[15.391px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[15.4px] min-h-px min-w-px not-italic relative text-[11px] text-[rgba(74,222,128,0.55)]">Detected Component</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[213.391px] items-start left-0 top-[253.39px] w-[230px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Text1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[466.781px] relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
      <Text />
      <Container7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[479px] items-start left-0 overflow-clip pt-[14px] px-[14px] top-[50px] w-[258px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[4px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[159.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.82)] top-0 tracking-[-0.18px] whitespace-nowrap">Upload Component Image</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-[18px] top-[14px] w-[222px]" data-name="Container">
      <Button />
      <Text2 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[rgba(255,255,255,0.07)] h-px left-0 top-[49px] w-[258px]" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute h-[50px] left-0 top-0 w-[258px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[529_0_0] min-h-px min-w-px relative w-[258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <Container11 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(74,222,128,0.12)] h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(74,222,128,0.3)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_2px_10px_0px_rgba(74,222,128,0.1)]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[113.16px] not-italic text-[13px] text-[rgba(74,222,128,0.95)] text-center top-[11.25px] tracking-[-0.1px] whitespace-nowrap">Add Selected Item</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[71px] relative shrink-0 w-[258px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.07)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[13px] px-[16px] relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[656px] relative shrink-0 w-[258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Container2 />
        <Container14 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0.04)] relative rounded-[16px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}