import svgPaths from "./svg-2wqq7nuxvx";
import imgImageModern from "figma:asset/6fdffe93d7829fdab4c7121fa6912bcc0f27dee5.png";
import imgImageScandinavian from "figma:asset/a1f40f026fde7ada0a5d6754c7864dbff4c45b86.png";
import imgImageLuxury from "figma:asset/23b6757b5b634e6a1aa4acacfc4d02780c360c43.png";
import imgImageIndustrialLoft from "figma:asset/618532f3ce9ea9af787497951d558cca41d9f6a3.png";

function Container1() {
  return (
    <div className="h-[55px] relative shrink-0 w-[258px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.07)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[18px] not-italic text-[13px] text-[rgba(255,255,255,0.82)] top-[18px] tracking-[-0.18px] whitespace-nowrap">History</p>
      </div>
    </div>
  );
}

function ImageModern() {
  return (
    <div className="absolute h-[120px] left-0 top-0 w-[232px]" data-name="Image (Modern)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageModern} />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-gradient-to-t from-[rgba(8,8,10,0.7)] h-[50px] left-0 to-[rgba(0,0,0,0)] top-[70px] w-[232px]" data-name="Container" />;
}

function Container3() {
  return (
    <div className="h-[120px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageModern />
      <Container4 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[44.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.82)] top-0 whitespace-nowrap">Modern</p>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="bg-[#60b8cc] rounded-[3.5px] shrink-0 size-[7px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.5)] top-0 whitespace-nowrap">Ocean Breeze</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] h-[21px] relative rounded-[20px] shrink-0 w-[93.109px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-px relative size-full">
        <Container8 />
        <Text1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container7 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_337_332)" id="Icon">
          <path d={svgPaths.p3cf7650} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
          <path d="M5 2.5V5L6.66667 5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_337_332">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[42.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.28)] top-0 whitespace-nowrap">Just now</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[4px] h-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Text2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[5px] items-start pt-[8px] px-[10px] relative size-full">
        <Container6 />
        <Container9 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] h-[181px] relative rounded-[12px] shrink-0 w-[234px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container3 />
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.07)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ImageScandinavian() {
  return (
    <div className="absolute h-[120px] left-0 top-0 w-[232px]" data-name="Image (Scandinavian)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageScandinavian} />
    </div>
  );
}

function Container11() {
  return <div className="absolute bg-gradient-to-t from-[rgba(8,8,10,0.7)] h-[50px] left-0 to-[rgba(0,0,0,0)] top-[70px] w-[232px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="h-[120px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageScandinavian />
      <Container11 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[77.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.82)] top-0 whitespace-nowrap">Scandinavian</p>
      </div>
    </div>
  );
}

function Container15() {
  return <div className="bg-[#848282] rounded-[3.5px] shrink-0 size-[7px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.5)] top-0 whitespace-nowrap">Monochrome</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] h-[21px] relative rounded-[20px] shrink-0 w-[89.203px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-px relative size-full">
        <Container15 />
        <Text4 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Container14 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_337_332)" id="Icon">
          <path d={svgPaths.p3cf7650} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
          <path d="M5 2.5V5L6.66667 5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_337_332">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[50.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.28)] top-0 whitespace-nowrap">12 min ago</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[4px] h-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Text5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[5px] items-start pt-[8px] px-[10px] relative size-full">
        <Container13 />
        <Container16 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] h-[181px] relative rounded-[12px] shrink-0 w-[234px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container10 />
        <Container12 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.07)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ImageLuxury() {
  return (
    <div className="absolute h-[120px] left-0 top-0 w-[232px]" data-name="Image (Luxury)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageLuxury} />
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-gradient-to-t from-[rgba(8,8,10,0.7)] h-[50px] left-0 to-[rgba(0,0,0,0)] top-[70px] w-[232px]" data-name="Container" />;
}

function Container17() {
  return (
    <div className="h-[120px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageLuxury />
      <Container18 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[40.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.82)] top-0 whitespace-nowrap">Luxury</p>
      </div>
    </div>
  );
}

function Container22() {
  return <div className="bg-[#c05828] rounded-[3.5px] shrink-0 size-[7px]" data-name="Container" />;
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.5)] top-0 whitespace-nowrap">Sunset Warmth</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] h-[21px] relative rounded-[20px] shrink-0 w-[99.234px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-px relative size-full">
        <Container22 />
        <Text7 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Container21 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_337_332)" id="Icon">
          <path d={svgPaths.p3cf7650} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
          <path d="M5 2.5V5L6.66667 5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_337_332">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[37.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.28)] top-0 whitespace-nowrap">1 hr ago</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[4px] h-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Text8 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[5px] items-start pt-[8px] px-[10px] relative size-full">
        <Container20 />
        <Container23 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] h-[181px] relative rounded-[12px] shrink-0 w-[234px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container17 />
        <Container19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.07)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ImageIndustrialLoft() {
  return (
    <div className="absolute h-[120px] left-0 top-0 w-[232px]" data-name="Image (Industrial Loft)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageIndustrialLoft} />
    </div>
  );
}

function Container25() {
  return <div className="absolute bg-gradient-to-t from-[rgba(8,8,10,0.7)] h-[50px] left-0 to-[rgba(0,0,0,0)] top-[70px] w-[232px]" data-name="Container" />;
}

function Container24() {
  return (
    <div className="h-[120px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageIndustrialLoft />
      <Container25 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[80.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.82)] top-0 whitespace-nowrap">Industrial Loft</p>
      </div>
    </div>
  );
}

function Container29() {
  return <div className="bg-[#968070] rounded-[3.5px] shrink-0 size-[7px]" data-name="Container" />;
}

function Text10() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.5)] top-0 whitespace-nowrap">Earth Tones</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(255,255,255,0.07)] h-[21px] relative rounded-[20px] shrink-0 w-[83.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-px relative size-full">
        <Container29 />
        <Text10 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Container28 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_337_332)" id="Icon">
          <path d={svgPaths.p3cf7650} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
          <path d="M5 2.5V5L6.66667 5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.28" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_337_332">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[15px] relative shrink-0 w-[39.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.28)] top-0 whitespace-nowrap">3 hr ago</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[4px] h-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Text11 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[5px] items-start pt-[8px] px-[10px] relative size-full">
        <Container27 />
        <Container30 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] h-[181px] relative rounded-[12px] shrink-0 w-[234px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container24 />
        <Container26 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.07)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[258px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start pl-[12px] pt-[12px] relative size-full">
          <Button />
          <Button1 />
          <Button2 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0.04)] relative rounded-[16px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}