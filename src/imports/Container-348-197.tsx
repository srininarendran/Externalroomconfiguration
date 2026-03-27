function Text() {
  return <div className="absolute bg-[rgba(255,255,255,0.82)] h-[2px] left-0 rounded-[2px] top-[24.5px] w-[48.563px]" data-name="Text" />;
}

function Button() {
  return (
    <div className="absolute h-[26.5px] left-[16px] top-[14px] w-[48.563px]" data-name="Button">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[4px] not-italic text-[11px] text-[rgba(255,255,255,0.88)] top-0 tracking-[0.45px] uppercase whitespace-nowrap">Color</p>
      <Text />
    </div>
  );
}

function Text1() {
  return <div className="absolute h-[2px] left-0 rounded-[2px] top-[24.5px] w-[112.984px]" data-name="Text" />;
}

function Button1() {
  return (
    <div className="absolute h-[26.5px] left-[129.02px] top-[14px] w-[112.984px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[4px] not-italic text-[11px] text-[rgba(255,255,255,0.36)] top-0 tracking-[0.45px] uppercase whitespace-nowrap">Style Selection</p>
      <Text1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40.5px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container3() {
  return <div className="bg-[rgba(255,255,255,0.07)] h-px shrink-0 w-full" data-name="Container" />;
}

function Container1() {
  return (
    <div className="h-[41.5px] relative shrink-0 w-[258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Container6() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(192, 132, 216) 0%, rgb(107, 184, 212) 50%, rgb(242, 201, 110) 100%)" }} />;
}

function Text2() {
  return (
    <div className="h-[13px] relative shrink-0 w-[57.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Surprise Me</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Button">
      <Container6 />
      <Text2 />
    </div>
  );
}

function Container7() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(140, 140, 140) 50%, rgb(245, 240, 235) 100%)" }} />;
}

function Text3() {
  return (
    <div className="h-[13px] relative shrink-0 w-[68.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">High-Contrast</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Button">
      <Container7 />
      <Text3 />
    </div>
  );
}

function Container8() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(44, 74, 48) 0%, rgb(122, 158, 106) 50%, rgb(217, 203, 170) 100%)" }} />;
}

function Text4() {
  return (
    <div className="h-[13px] relative shrink-0 w-[30.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Forest</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Button">
      <Container8 />
      <Text4 />
    </div>
  );
}

function Container9() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(27, 94, 130) 0%, rgb(96, 184, 204) 50%, rgb(214, 238, 245) 100%)" }} />;
}

function Text5() {
  return (
    <div className="h-[13px] relative shrink-0 w-[67.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Ocean Breeze</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Button">
      <Container9 />
      <Text5 />
    </div>
  );
}

function Container10() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(192, 88, 40) 0%, rgb(232, 154, 74) 50%, rgb(245, 217, 192) 100%)" }} />;
}

function Text6() {
  return (
    <div className="h-[13px] relative shrink-0 w-[73.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Sunset Warmth</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Button">
      <Container10 />
      <Text6 />
    </div>
  );
}

function Container11() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(107, 66, 38) 0%, rgb(160, 120, 90) 50%, rgb(212, 191, 160) 100%)" }} />;
}

function Text7() {
  return (
    <div className="h-[13px] relative shrink-0 w-[57.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Earth Tones</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Button">
      <Container11 />
      <Text7 />
    </div>
  );
}

function Container12() {
  return <div className="flex-[1_0_0] min-h-px min-w-px rounded-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)] w-[110px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(184, 169, 217) 0%, rgb(244, 194, 204) 50%, rgb(184, 222, 202) 100%)" }} />;
}

function Text8() {
  return (
    <div className="h-[13px] relative shrink-0 w-[69.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.46)] text-center tracking-[0.1px] whitespace-nowrap">Pastel Dreams</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-center justify-self-stretch relative row-4 self-stretch shrink-0" data-name="Button">
      <Container12 />
      <Text8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(4,minmax(0,1fr))] h-[550px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[258px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] px-[14px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] content-stretch flex h-[44px] items-center justify-center p-px relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.78)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_0px_18px_0px_rgba(255,255,255,0.28)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.94)] tracking-[-0.1px] whitespace-nowrap">Finalize the Image</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[79px] relative shrink-0 w-[258px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.07)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[18px] relative size-full">
        <Button9 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0.04)] relative rounded-[16px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container4 />
        <Container13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}