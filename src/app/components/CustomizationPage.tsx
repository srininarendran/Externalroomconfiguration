import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SquareDashedMousePointer, Plus, RefreshCw, Eraser, ChevronLeft, ChevronRight, BrickWall, DoorOpen, AppWindow, Fence, Lamp, TreePine, Grid2x2, Columns3, Scan, LayoutGrid, Search } from 'lucide-react';
import svgPaths from '../../imports/svg-jdrmn7b9u7';
import svgPathsClock from '../../imports/svg-2wqq7nuxvx';
import imgImageModern from "figma:asset/6fdffe93d7829fdab4c7121fa6912bcc0f27dee5.png";
import imgImageScandinavian from "figma:asset/a1f40f026fde7ada0a5d6754c7864dbff4c45b86.png";
import imgImageLuxury from "figma:asset/23b6757b5b634e6a1aa4acacfc4d02780c360c43.png";
import imgImageIndustrialLoft from "figma:asset/618532f3ce9ea9af787497951d558cca41d9f6a3.png";
import imgImageModernLinenSofa from "figma:asset/ce5d9129814ff0cc03a35253c94126e65f960584.png";
import imgImageLeatherSectional from "figma:asset/093bfa5680633c6b2d0c496b3ddb3b635d950f78.png";
import imgImageVelvetAccentChair from "figma:asset/cec9867e393bd2cec145ffc9b2d143509ba04119.png";
import imgImageMinimalistLoveseat from "figma:asset/34e2eaf14dc201c7013228767d14682c9f587975.png";
import imgImageMidCenturyCouch from "figma:asset/50e7297ea4fb84996f33cac1de8b61104c66f5d1.png";
import imgImageScandinavianDaybed from "figma:asset/b556f352a552756d886f8fdebcfd45c2d855458b.png";

/* ── Mock data ──────────────────────────────────────────────────────── */

const HISTORY_ITEMS = [
  {
    id: '1',
    style: 'Modern',
    palette: 'Ocean Breeze',
    paletteColor: '#60b8cc',
    time: 'Just now',
    img: imgImageModern,
    version: 'V3',
  },
  {
    id: '2',
    style: 'Scandinavian',
    palette: 'Monochrome',
    paletteColor: '#848282',
    time: '12 min ago',
    img: imgImageScandinavian,
    version: 'V2',
  },
  {
    id: '3',
    style: 'Luxury',
    palette: 'Sunset Warmth',
    paletteColor: '#c05828',
    time: '1 hr ago',
    img: imgImageLuxury,
    version: 'V1',
  },
  {
    id: '4',
    style: 'Industrial Loft',
    palette: 'Earth Tones',
    paletteColor: '#968070',
    time: '3 hr ago',
    img: imgImageIndustrialLoft,
    version: 'V1',
  },
];

const PREVIEW_IMG =
  'https://images.unsplash.com/photo-1585082645979-47c2d05bd159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const ORIGINAL_IMG =
  'https://images.unsplash.com/photo-1664995156397-99bd42f5a8ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvciUyMGJhcmUlMjB3YWxsc3xlbnwxfHx8fDE3NzMzMTI5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ── Library catalog data ──────────────────────────────────────────── */

const LIBRARY_FILTERS = ['Sofas', 'Chairs', 'Tables', 'Decor', 'Lighting'] as const;

const SOFA_ITEMS = [
  { id: 's1', name: 'Modern Linen Sofa',       img: imgImageModernLinenSofa },
  { id: 's2', name: 'Leather Sectional',        img: imgImageLeatherSectional },
  { id: 's3', name: 'Velvet Accent Chair',      img: imgImageVelvetAccentChair },
  { id: 's4', name: 'Minimalist Loveseat',      img: imgImageMinimalistLoveseat },
  { id: 's5', name: 'Mid-Century Couch',        img: imgImageMidCenturyCouch },
  { id: 's6', name: 'Scandinavian Daybed',      img: imgImageScandinavianDaybed },
];

/* ── Categories data ───────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'facade',     label: 'Facade',               icon: BrickWall },
  { id: 'windows',    label: 'Windows',              icon: AppWindow },
  { id: 'entrance',   label: 'Entrance',             icon: DoorOpen },
  { id: 'balcony',    label: 'Balcony',              icon: Fence },
  { id: 'lighting',   label: 'Lighting',             icon: Lamp },
  { id: 'landscape',  label: 'Landscape',            icon: TreePine },
  { id: 'flooring',   label: 'Flooring',             icon: Grid2x2 },
  { id: 'archdetail', label: 'Architectural Details', icon: Columns3 },
];

/* ── Materials data ────────────────────────────────────────────────── */

interface ColorOption { id: string; name: string; hex: string }
interface Material { id: string; name: string; finish: string; desc: string; img: string; colors: ColorOption[] }

const MATERIALS: Material[] = [
  { id: 'matte-paint',    name: 'Matte Paint',    finish: 'Smooth, Modern',     desc: 'Smooth matte finish suited for clean modern exterior surfaces.',            img: 'https://images.unsplash.com/photo-1603759641536-f584639f226d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'beige', name:'Beige', hex:'#D2B48C' },{ id:'grey', name:'Grey', hex:'#9E9E9E' },{ id:'white', name:'White', hex:'#F5F5F5' }] },
  { id: 'textured-paint', name: 'Textured Paint', finish: 'Gritty, Warm',       desc: 'Gritty sand-textured paint adding depth and warmth to walls.',               img: 'https://images.unsplash.com/photo-1602368135950-85f7e98d3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'sand', name:'Sand', hex:'#C2B280' }] },
  { id: 'stone-cladding', name: 'Stone Cladding', finish: 'Natural, Rugged',    desc: 'Natural stone cladding for a rugged yet refined facade appearance.',         img: 'https://images.unsplash.com/photo-1771847572593-1bf9c0beb822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'grey', name:'Grey', hex:'#8E8E8E' },{ id:'brown', name:'Brown', hex:'#786D5F' }] },
  { id: 'brick-finish',   name: 'Brick Finish',   finish: 'Classic, Warm',      desc: 'Classic brick finish with rich warm undertones for traditional exteriors.',   img: 'https://images.unsplash.com/photo-1629608444154-6d052691632f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'terracotta', name:'Terracotta', hex:'#E2725B' }] },
  { id: 'wood-panels',    name: 'Wood Panels',    finish: 'Natural, Warm',      desc: 'Deep wood panels bringing natural warmth to exterior walls.',                img: 'https://images.unsplash.com/photo-1591195219721-1b98cb40f7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'walnut', name:'Walnut', hex:'#5B3A29' }] },
  { id: 'concrete',       name: 'Concrete',       finish: 'Industrial, Raw',    desc: 'Raw industrial concrete surface with subtle texture variation.',             img: 'https://images.unsplash.com/photo-1653409794044-dfc34d6af7a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'cement', name:'Cement', hex:'#A5A5A5' }] },
  { id: 'marble',         name: 'Marble',         finish: 'Luxurious, Elegant', desc: 'Luxurious marble with elegant veining for premium facade surfaces.',         img: 'https://images.unsplash.com/photo-1518892974594-4adbf359419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'white', name:'White', hex:'#F0EDE5' }] },
  { id: 'dual-tone',      name: 'Dual Tone',      finish: 'Contrast, Dynamic',  desc: 'Two-tone combination for dynamic facade contrast and visual depth.',         img: 'https://images.unsplash.com/photo-1598441473979-182d94b87ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'beige-grey', name:'Beige Grey', hex:'#B8AFA3' }] },
  { id: 'pastel',         name: 'Pastel',         finish: 'Soft, Airy',         desc: 'Soft pastel coating ideal for coastal and fresh exterior aesthetics.',        img: 'https://images.unsplash.com/photo-1758932713066-7f7182216be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'blue', name:'Blue', hex:'#87CEEB' },{ id:'green', name:'Green', hex:'#98D4A2' }] },
  { id: 'geometric',      name: 'Geometric',      finish: 'Sculptural, Modern', desc: 'Geometric patterned facade adding sculptural dimension to exteriors.',       img: 'https://images.unsplash.com/photo-1759723247029-61364ce91658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'white', name:'White', hex:'#F2F0E6' }] },
  { id: 'vertical-slats', name: 'Vertical Slats', finish: 'Linear, Rhythmic',   desc: 'Vertical wood slats creating rhythm and privacy on exterior walls.',         img: 'https://images.unsplash.com/photo-1762758731376-2610b61a6104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', colors: [{ id:'brown', name:'Brown', hex:'#7B5B3A' }] },
];

/* ── Shared glass style helpers ─────────────────────────────────────── */

const glassPane: React.CSSProperties = {
  background:           'rgba(255,255,255,0.04)',
  borderWidth:          0,
  borderRadius:         '16px',
  boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.08)',
  backdropFilter:       'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
};

const interFont = (size: number, weight: number, alpha: number): React.CSSProperties => ({
  fontFamily: "'Inter', sans-serif",
  fontSize:   `${size}px`,
  fontWeight:  weight,
  color:       `rgba(255,255,255,${alpha})`,
});

/* ── Toolbar button helper ─────────────────────────────────────────── */

function ToolbarBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '5px',
        padding:       '5px 10px',
        borderWidth:   0,
        borderRadius:  '7px',
        background:    'transparent',
        cursor:        'pointer',
        whiteSpace:    'nowrap',
        fontFamily:    "'Inter', sans-serif",
        fontSize:      '12px',
        fontWeight:    500,
        color:         'rgba(255,255,255,0.52)',
        transition:    'background 150ms ease, color 150ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.color      = 'rgba(255,255,255,0.82)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color      = 'rgba(255,255,255,0.52)';
      }}
    >
      {children}
    </button>
  );
}

/* ── SVG icon wrapper (13×13 stroked path) ─────────────────────────── */

function ToolbarIcon({ paths }: { paths: string[] }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.08333"
        />
      ))}
    </svg>
  );
}

/* ── Redo icon (inline, no imported path) ──────────────────────────── */

function RedoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M10.2917 5.41667H4.33333C3.0447 5.41667 2 6.46137 2 7.75C2 9.03863 3.0447 10.0833 4.33333 10.0833H6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.08333"
      />
      <path
        d="M8.125 7.58333L10.2917 5.41667L8.125 3.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.08333"
      />
    </svg>
  );
}

/* ── Visualise icon (eye) ──────────────────────────────────────────── */

function VisualiseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1.625 6.5C1.625 6.5 3.25 2.70833 6.5 2.70833C9.75 2.70833 11.375 6.5 11.375 6.5C11.375 6.5 9.75 10.2917 6.5 10.2917C3.25 10.2917 1.625 6.5 1.625 6.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.08333"
      />
      <circle
        cx="6.5"
        cy="6.5"
        r="1.625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.08333"
      />
    </svg>
  );
}

/* ── Floating Navigation Button ────────────────────────────────────── */

function FloatingNavBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '10px',
        padding:        '10px 14px',
        borderWidth:    0,
        borderRadius:   '12px',
        background:     active ? 'rgba(255,255,255,0.14)' : 'transparent',
        cursor:         'pointer',
        fontFamily:     "'Inter', sans-serif",
        fontSize:       '11px',
        fontWeight:     500,
        color:          active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.90)',
        transition:     'background 220ms ease-out, color 220ms ease-out, transform 160ms ease-out',
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
        e.currentTarget.style.color      = 'rgba(255,255,255,1)';
        e.currentTarget.style.transform  = 'scale(1.08)';
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color      = active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.90)';
        e.currentTarget.style.transform  = 'scale(1)';
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', strokeWidth: '1.8px' }}>
        {icon}
      </span>
      <span style={{ lineHeight: '1', letterSpacing: '0.02em', color: active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)' }}>{label}</span>
    </button>
  );
}

/* ── Component ──────────────────────────────────────────────────────── */

interface CustomizationPageProps {
  previewImageUrl?: string | null;
  selectedStyle: string;
  selectedSwatch: string;
  onVisualize?: () => void;
}

export function CustomizationPage({
  previewImageUrl,
  selectedStyle,
  selectedSwatch,
  onVisualize,
}: CustomizationPageProps) {
  const [selectedHistory, setSelectedHistory] = useState('1');

  /* Simple redo stack — stores the previous image URL */
  const [imageStack, setImageStack] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(previewImageUrl || PREVIEW_IMG);

  /* ── Edit mode state ── */
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [replaceMode, setReplaceMode] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [replacedGlowId, setReplacedGlowId] = useState<string | null>(null);
  const replacedGlowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedAddOption, setSelectedAddOption] = useState<string | null>(null);
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [leftTab, setLeftTab] = useState<'categories' | 'history'>('categories');
  const [selectedCategory, setSelectedCategory] = useState('facade');
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  /* ── Library catalog state ── */
  const [addSubView, setAddSubView] = useState<'options' | 'library' | 'upload' | 'generate'>('options');
  const [libraryFilter, setLibraryFilter] = useState<string>('Sofas');
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedSofaId, setSelectedSofaId] = useState<string | null>(null);
  const [hoveredSofaId, setHoveredSofaId] = useState<string | null>(null);
  const [hoveredSofaPos, setHoveredSofaPos] = useState<{ x: number; y: number } | null>(null);
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [showUploadPlacementModal, setShowUploadPlacementModal] = useState(false);
  const [placedSofas, setPlacedSofas] = useState<Array<{ id: string; sofaId: string; img: string; name: string }>>([]);
  const [uploadStep, setUploadStep] = useState<'idle' | 'processing' | 'detected'>('idle');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const libraryWrapperRef = useRef<HTMLDivElement>(null);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scanTimer2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Generate with Text Prompt state ── */
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [generateState, setGenerateState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [showGeneratePlacementModal, setShowGeneratePlacementModal] = useState(false);
  const generateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Hover preview state ── */
  const [hoveredMaterial, setHoveredMaterial] = useState<string | null>(null);
  const [hoverClientY, setHoverClientY] = useState(0);
  const materialsListRef = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  /* ── Color selection state (per-material) ── */
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MATERIALS.forEach(m => { if (m.colors.length > 0) init[m.id] = m.colors[0].id; });
    return init;
  });

  /* ── Comparison slider state ── */
  const [sliderPos, setSliderPos] = useState(50); // percentage 0–100
  const [dragDir, setDragDir] = useState<'left' | 'right' | 'idle'>('idle');
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Helper: are we in any "component flow" mode (add, replace, or erase)? */
  const componentFlowActive = addMode || replaceMode || eraseMode;
  const flowMode: 'add' | 'replace' | 'erase' | null = addMode ? 'add' : replaceMode ? 'replace' : eraseMode ? 'erase' : null;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // determine drag direction
    const dx = e.clientX - lastX.current;
    if (dx < -1) setDragDir('left');
    else if (dx > 1) setDragDir('right');
    lastX.current = e.clientX;

    setSliderPos(pct);

    // reset idle timer
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setDragDir('idle'), 600);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setDragDir('idle'), 600);
  }, []);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (scanTimer2Ref.current) clearTimeout(scanTimer2Ref.current);
      if (generateTimerRef.current) clearTimeout(generateTimerRef.current);
      if (replacedGlowTimerRef.current) clearTimeout(replacedGlowTimerRef.current);
    };
  }, []);

  // Revoke blob URL on unmount to prevent memory leak
  useEffect(() => {
    return () => { if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl); };
  }, [uploadedImageUrl]);

  const handleRedo = () => {
    if (imageStack.length > 0) {
      const prev = imageStack[imageStack.length - 1];
      setImageStack(s => s.slice(0, -1));
      setCurrentImage(prev);
    }
  };

  /* ── Shared helper: reset the component flow panel state ── */
  const resetFlowState = () => {
    setShowPlacementModal(false);
    setShowUploadPlacementModal(false);
    setShowGeneratePlacementModal(false);
    setSelectedSofaId(null);
    setSelectionConfirmed(false);
    setSelectedAddOption(null);
    setAddSubView('options');
    setAddMode(false);
    setReplaceMode(false);
    setEraseMode(false);
    setShowEraseModal(false);
    setEditMode(false);
    setLibrarySearch('');
    setUploadStep('idle');
    setUploadedImageUrl(null);
    uploadedImages.forEach(u => URL.revokeObjectURL(u));
    setUploadedImages([]);
    setGeneratePrompt('');
    setGenerateState('idle');
    setGeneratedImageUrl(null);
  };

  /* ── Helper: trigger replacement glow on the replaced item ── */
  const triggerReplacedGlow = (itemId: string) => {
    setReplacedGlowId(itemId);
    if (replacedGlowTimerRef.current) clearTimeout(replacedGlowTimerRef.current);
    replacedGlowTimerRef.current = setTimeout(() => setReplacedGlowId(null), 1000);
  };

  /* ── Toolbar actions ── */
  const TOOLBAR_ACTIONS = [
    { label: 'Regenerate', icon: <ToolbarIcon paths={[svgPaths.p3ae100, svgPaths.pb791e00, svgPaths.p32f90200, svgPaths.p12626e40]} />, onClick: () => { setImageStack(s => [...s, currentImage]); /* mock: keep same image */ } },
    { label: 'Share',      icon: <ToolbarIcon paths={[svgPaths.p31a9a700, svgPaths.p7bf1600, svgPaths.p34ce3f00, svgPaths.pa8abbc0, svgPaths.p23e65300]} /> },
    { label: 'Like',       icon: <ToolbarIcon paths={[svgPaths.p3179bd80]} /> },
    { label: 'Download',   icon: <ToolbarIcon paths={[svgPaths.p2b89e180, svgPaths.pbaa8720, 'M6.5 8.125V1.625']} /> },
    { label: 'Redo',       icon: <RedoIcon />,       onClick: handleRedo },
    { label: 'Visualise',  icon: <VisualiseIcon />,  onClick: onVisualize },
  ];

  return (
    <div
      style={{
        position:      'absolute',
        top:           '78px',
        left:          '112px',
        right:         '0',
        height:        '657px',
        zIndex:        1,
        display:       'flex',
        gap:           '24px',
        padding:       '0 24px 0 0',
      }}
    >

      {/* ═══════════════  COLUMN 1 — History  ═══════════════════════════ */}
      <div
        style={{
          width:          '260px',
          flexShrink:     0,
          marginLeft:     '24px',
          ...glassPane,
          overflow:       'hidden',
          display:        'flex',
          flexDirection:  'column',
          padding:        '0',
        }}
      >
        {/* ── Header — tabs when edit mode, simple title otherwise ── */}
        <div
          style={{
            height:        '55px',
            flexShrink:    0,
            position:      'relative',
            display:       'flex',
            alignItems:    'center',
            padding:       '0 18px',
          }}
        >
          {componentFlowActive ? (
            <span
              style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '13px',
                fontWeight:    600,
                lineHeight:    '19.5px',
                color:         'rgba(255,255,255,0.82)',
                letterSpacing: '-0.18px',
              }}
            >
              {eraseMode ? 'Erase Component' : replaceMode ? 'Replace Component' : 'Add Component'}
            </span>
          ) : editMode ? (
            /* Tab selector */
            <div style={{ display: 'flex', gap: '0', width: '100%' }}>
              {(['categories', 'history'] as const).map(tab => {
                const isActive = leftTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setLeftTab(tab)}
                    style={{
                      flex:           1,
                      background:     'none',
                      borderWidth:    0,
                      cursor:         'pointer',
                      padding:        '0 0 12px',
                      fontFamily:     "'Inter', sans-serif",
                      fontSize:       '13px',
                      fontWeight:     600,
                      color:          isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                      letterSpacing:  '-0.18px',
                      position:       'relative',
                      transition:     'color 220ms ease-out',
                      textTransform:  'capitalize',
                      display:        'flex',
                      alignItems:     'flex-end',
                      justifyContent: 'center',
                      height:         '100%',
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {/* Active underline indicator */}
                    <div
                      style={{
                        position:    'absolute',
                        bottom:      0,
                        left:        '20%',
                        right:       '20%',
                        height:      '2px',
                        borderRadius:'1px',
                        background:  isActive ? 'rgba(255,255,255,0.80)' : 'transparent',
                        transition:  'background 220ms ease-out',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <span
              style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '13px',
                fontWeight:    600,
                lineHeight:    '19.5px',
                color:         'rgba(255,255,255,0.82)',
                letterSpacing: '-0.18px',
              }}
            >
              History
            </span>
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* ── Panel content ── */}
        <div
          style={{
            flex:           1,
            overflowY:      'auto',
            display:        'flex',
            flexDirection:  'column',
            gap:            '10px',
            padding:        '12px 12px 24px 12px',
          }}
        >
          {componentFlowActive ? (
            /* ── Add/Replace Component panel ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'matExpandIn 180ms ease-out both' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   '12px',
                fontWeight:  400,
                color:       'rgba(255,255,255,0.50)',
                lineHeight:  '1.6',
                margin:      0,
              }}>
                {eraseMode
                  ? 'Choose how you want to define the area for erasing an existing component.'
                  : replaceMode
                  ? 'Choose how you want to define the area for replacing an existing component.'
                  : 'Choose how you want to define the area for adding a new component.'}
              </p>
              {([
                {
                  id:    'capture',
                  title: 'Capture Area',
                  desc:  eraseMode
                    ? 'Grab a screenshot or crop a part of the image to define where the existing component should be erased.'
                    : replaceMode
                    ? 'Grab a screenshot or crop a part of the image to define where the existing component should be replaced.'
                    : 'Grab a screenshot or crop a part of the image to define where the new component should be added.',
                  Icon:  Scan,
                },
                {
                  id:    'grid',
                  title: 'Grid Selection',
                  desc:  eraseMode
                    ? 'Choose an area using a grid-based selection overlay to select the component to erase.'
                    : replaceMode
                    ? 'Choose an area using a grid-based selection overlay to select the component to replace.'
                    : 'Choose an area using a grid-based selection overlay to place a new component more precisely.',
                  Icon:  LayoutGrid,
                },
              ] as const).map(opt => {
                const isSelected = selectedAddOption === opt.id;
                const isConfirmedCapture = selectionConfirmed && opt.id === 'capture';
                const isDisabledGrid     = selectionConfirmed && opt.id === 'grid';
                const greenAccent = 'rgba(74,222,128,';
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (selectionConfirmed) return;
                      setSelectedAddOption(prev => prev === opt.id ? null : opt.id);
                    }}
                    style={{
                      display:        'flex',
                      alignItems:     'flex-start',
                      gap:            '14px',
                      padding:        '14px 16px',
                      borderWidth:    0,
                      borderRadius:   '12px',
                      background:     isConfirmedCapture ? 'rgba(74,222,128,0.06)'
                                    : isDisabledGrid     ? 'rgba(255,255,255,0.015)'
                                    : isSelected         ? 'rgba(255,255,255,0.08)'
                                    :                      'rgba(255,255,255,0.03)',
                      cursor:         isDisabledGrid ? 'default' : isConfirmedCapture ? 'default' : 'pointer',
                      textAlign:      'left' as const,
                      width:          '100%',
                      position:       'relative' as const,
                      transition:     'background 140ms ease-out, box-shadow 140ms ease-out, opacity 140ms ease-out',
                      boxShadow:      isConfirmedCapture ? `0 0 0 1px ${greenAccent}0.35), 0 0 16px ${greenAccent}0.08)`
                                    : isDisabledGrid     ? 'none'
                                    : isSelected         ? '0 0 0 1px rgba(255,255,255,0.20), 0 0 12px rgba(255,255,255,0.04)'
                                    :                      '0 0 0 1px rgba(255,255,255,0.08)',
                      opacity:        isDisabledGrid ? 0.45 : 1,
                    }}
                    onMouseEnter={e => {
                      if (selectionConfirmed) return;
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.boxShadow  = '0 0 0 1px rgba(255,255,255,0.14), 0 0 8px rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectionConfirmed) return;
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.boxShadow  = '0 0 0 1px rgba(255,255,255,0.08)';
                      }
                    }}
                  >
                    {/* Icon container */}
                    <div style={{
                      width:          '40px',
                      height:         '40px',
                      borderRadius:   '10px',
                      background:     isConfirmedCapture ? 'rgba(74,222,128,0.10)'
                                    : isDisabledGrid     ? 'rgba(255,255,255,0.02)'
                                    : isSelected         ? 'rgba(255,255,255,0.10)'
                                    :                      'rgba(255,255,255,0.04)',
                      borderWidth:    0,
                      boxShadow:      isConfirmedCapture ? 'inset 0 0 0 1px rgba(74,222,128,0.25)'
                                    : isDisabledGrid     ? 'inset 0 0 0 1px rgba(255,255,255,0.04)'
                                    : isSelected         ? 'inset 0 0 0 1px rgba(255,255,255,0.18)'
                                    :                      'inset 0 0 0 1px rgba(255,255,255,0.06)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                      transition:     'all 140ms ease-out',
                    }}>
                      <opt.Icon size={18} strokeWidth={1.6} style={{
                        color:      isConfirmedCapture ? 'rgba(74,222,128,0.90)'
                                  : isDisabledGrid     ? 'rgba(255,255,255,0.25)'
                                  : isSelected         ? 'rgba(255,255,255,0.90)'
                                  :                      'rgba(255,255,255,0.45)',
                        transition: 'color 140ms ease-out',
                      }} />
                    </div>
                    {/* Text block */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize:   '14px',
                        fontWeight:  500,
                        color:       isConfirmedCapture ? 'rgba(74,222,128,0.95)'
                                   : isDisabledGrid     ? 'rgba(255,255,255,0.30)'
                                   : isSelected         ? 'rgba(255,255,255,0.95)'
                                   :                      'rgba(255,255,255,0.82)',
                        lineHeight:  '1.35',
                        marginBottom:'4px',
                        transition:  'color 140ms ease-out',
                      }}>
                        {opt.title}
                      </div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize:   '12px',
                        fontWeight:  400,
                        color:       isConfirmedCapture ? 'rgba(74,222,128,0.55)'
                                   : isDisabledGrid     ? 'rgba(255,255,255,0.22)'
                                   :                      'rgba(255,255,255,0.50)',
                        lineHeight:  '1.55',
                        transition:  'color 140ms ease-out',
                      }}>
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* ── Selected Object Preview (Replace/Erase flow, after confirmation) ── */}
              {(replaceMode || eraseMode) && selectionConfirmed && (
                <div
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '0',
                    marginTop:     '8px',
                    animation:     'matExpandIn 180ms ease-out both',
                  }}
                >
                  {/* Section title */}
                  <span
                    style={{
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      '10px',
                      fontWeight:    600,
                      color:         'rgba(255,255,255,0.38)',
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase' as const,
                      marginBottom:  '12px',
                    }}
                  >
                    Selected Object Preview
                  </span>

                  {/* Preview card */}
                  <div
                    style={{
                      width:          '100%',
                      height:         '148px',
                      borderRadius:   '12px',
                      overflow:       'hidden',
                      position:       'relative',
                      background:     'rgba(255,255,255,0.03)',
                      borderWidth:    0,
                      boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <img
                      src={currentImage}
                      alt="Selected object preview"
                      draggable={false}
                      style={{
                        position:   'absolute',
                        top:        '50%',
                        left:       '50%',
                        transform:  'translate(-50%, -50%) scale(1.8)',
                        width:      '100%',
                        height:     '100%',
                        objectFit:  'cover',
                        display:    'block',
                        filter:     'brightness(0.95)',
                      }}
                    />
                    {/* Subtle accent border overlay */}
                    <div
                      style={{
                        position:     'absolute',
                        inset:        0,
                        borderRadius: '12px',
                        borderWidth:  0,
                        boxShadow:    `inset 0 0 0 1px ${eraseMode ? 'rgba(239,68,68,0.25)' : 'rgba(251,191,36,0.25)'}`,
                        pointerEvents:'none',
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      '11px',
                      fontWeight:    400,
                      color:         'rgba(255,255,255,0.38)',
                      marginTop:     '8px',
                      display:       'block',
                    }}
                  >
                    Detected Object
                  </span>


                </div>
              )}
            </div>
          ) : editMode && leftTab === 'categories' ? (
            /* ── Categories list ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CATEGORIES.map(cat => {
                const active = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      display:              'flex',
                      alignItems:           'center',
                      gap:                  '12px',
                      padding:              '10px 14px',
                      borderWidth:          0,
                      borderRadius:         '10px',
                      background:           active ? 'rgba(255,255,255,0.08)' : 'transparent',
                      cursor:               'pointer',
                      transition:           'background 180ms ease',
                      position:             'relative',
                    }}
                    onMouseEnter={e => {
                      if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={e => {
                      if (!active) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        width:           '36px',
                        height:          '36px',
                        borderRadius:    '8px',
                        background:      active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                        borderWidth:     0,
                        boxShadow:       active ? 'inset 0 0 0 1px rgba(255,255,255,0.15)' : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        flexShrink:      0,
                        transition:      'all 180ms ease',
                      }}
                    >
                      <Icon size={16} strokeWidth={1.6} style={{ color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.40)' }} />
                    </div>
                    <span
                      style={{
                        fontFamily:   "'Inter', sans-serif",
                        fontSize:     '12px',
                        fontWeight:   active ? 600 : 500,
                        color:        active ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.50)',
                        transition:   'color 180ms ease',
                      }}
                    >
                      {cat.label}
                    </span>
                    {/* Active border overlay */}
                    <div
                      style={{
                        position:     'absolute',
                        inset:        0,
                        borderRadius: '10px',
                        borderWidth:  0,
                        boxShadow:    active ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : 'none',
                        pointerEvents:'none',
                        transition:   'box-shadow 180ms ease',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            /* ── History cards (unchanged structure) ── */
            HISTORY_ITEMS.map(item => {
              const active = selectedHistory === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedHistory(item.id)}
                  style={{
                    width:         '234px',
                    height:        '181px',
                    flexShrink:    0,
                    borderRadius:  '12px',
                    background:    'rgba(255,255,255,0.02)',
                    position:      'relative',
                    cursor:        'pointer',
                    overflow:      'hidden',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'inherit', padding: '1px', height: '100%' }}>
                    {/* ── Image area (120px) with gradient overlay ── */}
                    <div style={{ width: '100%', height: '120px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <img
                        src={item.img}
                        alt={item.style}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div
                        style={{
                          position:   'absolute',
                          left:       0,
                          bottom:     0,
                          width:      '100%',
                          height:     '50px',
                          background: 'linear-gradient(to top, rgba(8,8,10,0.7), rgba(0,0,0,0))',
                        }}
                      />
                    </div>

                    {/* ── Info section (59px) ── */}
                    <div style={{ height: '59px', padding: '8px 10px 0', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      {/* Left column: Style name + Time */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily:  "'Inter', sans-serif",
                            fontSize:    '12px',
                            fontWeight:  600,
                            lineHeight:  '18px',
                            color:       'rgba(255,255,255,0.82)',
                            whiteSpace:  'nowrap',
                          }}
                        >
                          {item.style}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                            <path d={svgPathsClock.p3cf7650} stroke="white" strokeOpacity="0.28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                            <path d="M5 2.5V5L6.66667 5.83333" stroke="white" strokeOpacity="0.28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                          </svg>
                          <span
                            style={{
                              fontFamily:  "'Inter', sans-serif",
                              fontSize:    '10px',
                              fontWeight:  400,
                              lineHeight:  '15px',
                              color:       'rgba(255,255,255,0.28)',
                              whiteSpace:  'nowrap',
                            }}
                          >
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Right column: Palette + Version */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', flexShrink: 0 }}>
                        {/* Color palette pill */}
                        <div
                          style={{
                            display:      'inline-flex',
                            alignItems:   'center',
                            gap:          '4px',
                            height:       '21px',
                            padding:      '1px 8px',
                            borderRadius: '20px',
                            background:   'rgba(255,255,255,0.07)',
                            position:     'relative',
                          }}
                        >
                          <div
                            style={{
                              position:     'absolute',
                              inset:        0,
                              borderRadius: '20px',
                              borderWidth:  0,
                              boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.10)',
                              pointerEvents:'none',
                            }}
                          />
                          <div
                            style={{
                              width:        '7px',
                              height:       '7px',
                              borderRadius: '3.5px',
                              background:   item.paletteColor,
                              flexShrink:   0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily:  "'Inter', sans-serif",
                              fontSize:    '10px',
                              fontWeight:  400,
                              lineHeight:  '15px',
                              color:       'rgba(255,255,255,0.5)',
                              whiteSpace:  'nowrap',
                            }}
                          >
                            {item.palette}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily:  "'Inter', sans-serif",
                            fontSize:    '10px',
                            fontWeight:  600,
                            lineHeight:  '15px',
                            color:       'rgba(255,255,255,0.55)',
                            whiteSpace:  'nowrap',
                          }}
                        >
                          {item.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card border overlay */}
                  <div
                    style={{
                      position:     'absolute',
                      inset:        0,
                      borderRadius: '12px',
                      borderWidth:  0,
                      boxShadow:    active
                        ? 'inset 0 0 0 1px rgba(255,255,255,0.35)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.07)',
                      pointerEvents:'none',
                      transition:   'box-shadow 180ms ease',
                    }}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* ── Erase Component button (pinned bottom, erase flow only, visible after selection confirmed) ── */}
        {eraseMode && componentFlowActive && selectionConfirmed && (
          <div
            style={{
              flexShrink:        0,
              padding:           '12px 14px 14px',
              boxShadow:         'inset 0 1px 0 rgba(255,255,255,0.07)',
              animation:         'matExpandIn 180ms ease-out both',
            }}
          >
            <button
              onClick={() => setShowEraseModal(true)}
              style={{
                width:        '100%',
                height:       '40px',
                borderRadius: '12px',
                borderWidth:  0,
                background:   'rgba(239,68,68,0.12)',
                color:        'rgba(239,68,68,0.95)',
                fontFamily:   "'Inter', sans-serif",
                fontSize:     '13px',
                fontWeight:   600,
                cursor:       'pointer',
                transition:   'background 160ms ease-out, box-shadow 160ms ease-out',
                boxShadow:    '0 2px 8px rgba(239,68,68,0.08)',
                letterSpacing:'-0.1px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.20)';
                e.currentTarget.style.boxShadow  = '0 2px 16px rgba(239,68,68,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                e.currentTarget.style.boxShadow  = '0 2px 8px rgba(239,68,68,0.08)';
              }}
              onMouseDown={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.26)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.20)';
              }}
            >
              Erase Component
            </button>
          </div>
        )}

        {/* ── Confirm Selection button (pinned bottom, capture mode only, hidden after confirmed) ── */}
        {componentFlowActive && selectedAddOption === 'capture' && !selectionConfirmed && (
          <div
            style={{
              flexShrink:  0,
              padding:     '12px 14px 14px',
              borderTopWidth: '1px',
              borderTopStyle: 'solid' as const,
              borderTopColor: 'rgba(255,255,255,0.07)',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              animation:   'captureOverlayIn 120ms ease-out both',
            }}
          >
            <button
              onClick={() => setSelectionConfirmed(true)}
              style={{
                width:                '100%',
                height:               '40px',
                borderRadius:         '12px',
                borderWidth:          0,
                background:           'rgba(255,255,255,0.10)',
                backdropFilter:       'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color:                'rgba(255,255,255,0.92)',
                fontFamily:           "'Inter', sans-serif",
                fontSize:             '13px',
                fontWeight:           600,
                cursor:               'pointer',
                transition:           'background 160ms ease-out, box-shadow 160ms ease-out',
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.20)',
                letterSpacing:        '-0.1px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.16)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.25), 0 2px 16px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.20)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.20)';
              }}
              onMouseDown={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.20)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
              }}
            >
              Confirm Selection
            </button>
          </div>
        )}

      </div>

      {/* ═══════════════  COLUMN 2 — Preview Workspace (expanded) ══════ */}
      <div
        style={{
          flex:           1,
          minWidth:       0,
          display:        'flex',
          flexDirection:  'column',
        }}
      >
        {/* Unified canvas card with integrated toolbar */}
        <div
          style={{
            ...glassPane,
            flex:           1,
            overflow:      'hidden',
            display:       'flex',
            flexDirection: 'column',
            position:      'relative',
          }}
        >
          {/* ── Toolbar row (inside the card) ── */}
          <div
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '6px',
              padding:       '0 16px',
              height:        '49px',
              flexShrink:    0,
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid' as const,
              borderBottomColor: 'rgba(255,255,255,0.07)',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderLeftColor: 'transparent',
            }}
          >
            {TOOLBAR_ACTIONS.map((action, i, arr) => (
              <div key={action.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ToolbarBtn onClick={action.onClick}>
                  {action.icon}
                  <span>{action.label}</span>
                </ToolbarBtn>
                {i < arr.length - 1 && (
                  <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          {/* ── Image preview area ── */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              flex:           1,
              overflow:      'hidden',
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              position:      'relative',
              cursor:        (componentFlowActive && selectedAddOption === 'capture') ? 'crosshair' : isDragging.current ? 'grabbing' : 'default',
              touchAction:   'none',
              userSelect:    'none',
            }}
          >
            {/* Bottom layer — Original image (hidden in capture mode) */}
            <img
              src={ORIGINAL_IMG}
              alt="Original room"
              draggable={false}
              style={{
                position:   'absolute',
                inset:      0,
                width:      '100%',
                height:     '100%',
                objectFit:  'cover',
                display:    'block',
                opacity:    (componentFlowActive && selectedAddOption === 'capture') ? 0 : 1,
                transition: 'opacity 120ms ease-out',
              }}
            />

            {/* Top layer — Generated image (clipped by slider, full in capture mode) */}
            <div
              style={{
                position:   'absolute',
                inset:      0,
                clipPath:   (componentFlowActive && selectedAddOption === 'capture') ? 'none' : `inset(0 ${100 - sliderPos}% 0 0)`,
                transition: 'clip-path 120ms ease-out',
              }}
            >
              <img
                src={currentImage}
                alt="Generated room preview"
                draggable={false}
                style={{
                  width:     '100%',
                  height:    '100%',
                  objectFit: 'cover',
                  display:   'block',
                }}
              />
            </div>

            {/* "Original" label — top-left */}
            <div
              style={{
                position:             'absolute',
                top:                  '12px',
                left:                 '12px',
                zIndex:               6,
                padding:              '3px 10px',
                borderRadius:         '6px',
                background:           'rgba(0,0,0,0.50)',
                backdropFilter:       'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderWidth:          0,
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.08)',
                fontFamily:           "'Inter', sans-serif",
                fontSize:             '10px',
                fontWeight:           500,
                color:                'rgba(255,255,255,0.60)',
                letterSpacing:        '0.3px',
                textTransform:        'uppercase' as const,
                pointerEvents:        'none',
                opacity:              (componentFlowActive && selectedAddOption === 'capture') ? 0 : (sliderPos < 96 ? 1 : 0),
                transition:           'opacity 120ms ease-out',
              }}
            >
              Original
            </div>

            {/* "Generated" label — top of generated side */}
            <div
              style={{
                position:             'absolute',
                top:                  '12px',
                left:                 '12px',
                zIndex:               5,
                padding:              '3px 10px',
                borderRadius:         '6px',
                background:           'rgba(0,0,0,0.50)',
                backdropFilter:       'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderWidth:          0,
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.08)',
                fontFamily:           "'Inter', sans-serif",
                fontSize:             '10px',
                fontWeight:           500,
                color:                'rgba(255,255,255,0.60)',
                letterSpacing:        '0.3px',
                textTransform:        'uppercase' as const,
                pointerEvents:        'none',
                clipPath:             `inset(0 ${100 - sliderPos}% 0 0)`,
                opacity:              (componentFlowActive && selectedAddOption === 'capture') ? 0 : 1,
                transition:           'opacity 120ms ease-out',
              }}
            >
              Generated
            </div>

            {/* ── Slider line ── */}
            <div
              style={{
                position:      'absolute',
                top:           0,
                bottom:        0,
                left:          `${sliderPos}%`,
                transform:     'translateX(-50%)',
                width:         '2px',
                background:    'rgba(255,255,255,0.80)',
                zIndex:        7,
                pointerEvents: 'none',
                boxShadow:     '0 0 8px rgba(0,0,0,0.4)',
                opacity:       (componentFlowActive && selectedAddOption === 'capture') ? 0 : 1,
                transition:    'opacity 120ms ease-out',
              }}
            />

            {/* ── Slider handle ── */}
            <div
              onPointerDown={handlePointerDown}
              style={{
                position:             'absolute',
                top:                  '50%',
                left:                 `${sliderPos}%`,
                transform:            'translate(-50%, -50%)',
                zIndex:               8,
                width:                '32px',
                height:               '32px',
                borderRadius:         '50%',
                background:           'rgba(16,16,20,0.55)',
                backdropFilter:       'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderWidth:          0,
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.20), 0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.25)',
                cursor:               'grab',
                display:              'flex',
                alignItems:           'center',
                justifyContent:       'center',
                touchAction:          'none',
                opacity:              (componentFlowActive && selectedAddOption === 'capture') ? 0 : 1,
                pointerEvents:        (componentFlowActive && selectedAddOption === 'capture') ? 'none' : 'auto',
                transition:           'opacity 120ms ease-out',
              }}
            >
              {/* Arrow icon — direction-aware */}
              <div
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          'rgba(255,255,255,0.85)',
                  transition:     'transform 120ms ease-out, opacity 120ms ease-out',
                  transform:      dragDir === 'left'
                    ? 'scaleX(1)'
                    : dragDir === 'right'
                    ? 'scaleX(-1)'
                    : 'scaleX(1)',
                }}
              >
                {dragDir === 'idle' ? (
                  /* Bidirectional hint — two small chevrons */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
                    <path d="M8 8L4 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 8L20 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <ChevronLeft size={16} strokeWidth={2.2} />
                )}
              </div>
            </div>

            {/* Subtle vignette */}
            <div
              style={{
                position:      'absolute',
                inset:         0,
                background:    'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.34) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Capture Mode Overlay ── */}
            {componentFlowActive && selectedAddOption === 'capture' && (
              <>
                {/* Dark overlay with cutout */}
                <div
                  style={{
                    position:      'absolute',
                    inset:         0,
                    zIndex:        9,
                    pointerEvents: 'none',
                    animation:     'captureOverlayIn 140ms ease-out both',
                  }}
                >
                  <div
                    style={{
                      position:   'absolute',
                      inset:      0,
                      background: 'rgba(0,0,0,0.40)',
                      maskImage:
                        'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskImage:
                        'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',
                      WebkitMaskComposite: 'xor' as any,
                      maskPosition: '0 0, center',
                      WebkitMaskPosition: '0 0, center',
                      maskSize: '100% 100%, 40% 40%',
                      WebkitMaskSize: '100% 100%, 40% 40%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  />
                </div>

                {/* Selection frame */}
                <div
                  style={{
                    position:      'absolute',
                    top:           '50%',
                    left:          '50%',
                    transform:     'translate(-50%, -50%)',
                    width:         '40%',
                    height:        '40%',
                    zIndex:        9,
                    pointerEvents: 'none',
                    animation:     'captureFrameIn 120ms ease-out both',
                  }}
                >
                  {/* Dashed border — amber accent in replace mode */}
                  <div
                    style={{
                      position:     'absolute',
                      inset:        0,
                      borderRadius: '10px',
                      borderWidth:  '2px',
                      borderStyle:  'dashed',
                      borderColor:  eraseMode ? 'rgba(239,68,68,0.70)' : replaceMode ? 'rgba(251,191,36,0.70)' : 'rgba(255,255,255,0.70)',
                      boxShadow:    eraseMode
                        ? '0 0 16px rgba(239,68,68,0.10), inset 0 0 16px rgba(239,68,68,0.04)'
                        : replaceMode
                        ? '0 0 16px rgba(251,191,36,0.10), inset 0 0 16px rgba(251,191,36,0.04)'
                        : '0 0 16px rgba(255,255,255,0.08), inset 0 0 16px rgba(255,255,255,0.03)',
                    }}
                  />

                  {/* Selection Area label */}
                  <div
                    style={{
                      position:             'absolute',
                      top:                  '-32px',
                      left:                 '50%',
                      transform:            'translateX(-50%)',
                      padding:              '4px 12px',
                      borderRadius:         '8px',
                      background:           'rgba(10,10,14,0.72)',
                      backdropFilter:       'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      borderWidth:          0,
                      boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10)',
                      fontFamily:           "'Inter', sans-serif",
                      fontSize:             '10px',
                      fontWeight:           500,
                      color:                'rgba(255,255,255,0.70)',
                      letterSpacing:        '0.3px',
                      whiteSpace:           'nowrap',
                    }}
                  >
                    {eraseMode ? 'Erase Object' : replaceMode ? 'Replace Object' : 'Selection Area'}
                  </div>

                  {/* Corner resize handles */}
                  {[
                    { t: '-5px', l: '-5px', c: 'nwse-resize' },
                    { t: '-5px', r: '-5px', c: 'nesw-resize' },
                    { b: '-5px', l: '-5px', c: 'nesw-resize' },
                    { b: '-5px', r: '-5px', c: 'nwse-resize' },
                  ].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        position:     'absolute',
                        top:          h.t,
                        bottom:       (h as any).b,
                        left:         h.l,
                        right:        (h as any).r,
                        width:        '10px',
                        height:       '10px',
                        borderRadius: '50%',
                        background:   eraseMode ? 'rgba(239,68,68,0.95)' : replaceMode ? 'rgba(251,191,36,0.95)' : 'rgba(255,255,255,0.95)',
                        boxShadow:    eraseMode
                          ? '0 0 6px rgba(0,0,0,0.35), 0 0 10px rgba(239,68,68,0.15)'
                          : replaceMode
                          ? '0 0 6px rgba(0,0,0,0.35), 0 0 10px rgba(251,191,36,0.15)'
                          : '0 0 6px rgba(0,0,0,0.35), 0 0 10px rgba(255,255,255,0.10)',
                        pointerEvents:'auto',
                        cursor:       h.c,
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── Placed sofa components on canvas ── */}
            {placedSofas.map((placed, idx) => {
              const isGlowing = replacedGlowId === placed.id;
              const isReplaceTarget = (replaceMode || eraseMode) && idx === placedSofas.length - 1;
              return (
                <div
                  key={placed.id}
                  style={{
                    position:      'absolute',
                    top:           '50%',
                    left:          '50%',
                    transform:     'translate(-50%, -50%)',
                    width:         '38%',
                    height:        '38%',
                    zIndex:        8,
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent:'center',
                    pointerEvents: 'none',
                    animation:     isGlowing ? 'replacedGlow 1s ease-out both' : 'captureOverlayIn 180ms ease-out both',
                  }}
                >
                  {/* Replace-mode highlight ring around the target component */}
                  {isReplaceTarget && (
                    <div
                      style={{
                        position:     'absolute',
                        inset:        '-6px',
                        borderRadius: '10px',
                        borderWidth:  '1.5px',
                        borderStyle:  'solid',
                        borderColor:  eraseMode ? 'rgba(239,68,68,0.55)' : 'rgba(251,191,36,0.55)',
                        boxShadow:    eraseMode
                          ? '0 0 16px rgba(239,68,68,0.12), inset 0 0 10px rgba(239,68,68,0.04)'
                          : '0 0 16px rgba(251,191,36,0.12), inset 0 0 10px rgba(251,191,36,0.04)',
                        pointerEvents:'none',
                        animation:    'captureOverlayIn 200ms ease-out both',
                      }}
                    />
                  )}
                  <img
                    src={placed.img}
                    alt={placed.name}
                    style={{
                      maxWidth:    '100%',
                      maxHeight:   '100%',
                      objectFit:   'contain',
                      display:     'block',
                      filter:      isGlowing
                        ? 'drop-shadow(0 0 18px rgba(74,222,128,0.55)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))'
                        : isReplaceTarget
                          ? eraseMode
                            ? 'drop-shadow(0 0 10px rgba(239,68,68,0.30)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))'
                            : 'drop-shadow(0 0 10px rgba(251,191,36,0.30)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))'
                          : 'drop-shadow(0 4px 16px rgba(0,0,0,0.40))',
                      borderRadius:'6px',
                      transition:  'filter 400ms ease-out',
                    }}
                  />
                </div>
              );
            })}

            {/* ── Style & Color tag pills (top-right) ── */}
            <div
              style={{
                position:      'absolute',
                top:           '12px',
                right:         '12px',
                zIndex:        8,
                display:       'flex',
                gap:           '8px',
                pointerEvents: 'none',
                opacity:       (componentFlowActive && selectedAddOption === 'capture') ? 0 : 1,
                transition:    'opacity 120ms ease-out',
              }}
            >
              <div
                style={{
                  display:              'flex',
                  alignItems:           'center',
                  gap:                  '5px',
                  padding:              '4px 11px',
                  borderRadius:         '8px',
                  background:           'rgba(0,0,0,0.52)',
                  borderWidth:          0,
                  boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
              >
                {/* sparkle icon */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p19135900} stroke="white" strokeOpacity="0.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                  <path d="M8.33333 1.25V2.91667" stroke="white" strokeOpacity="0.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                  <path d="M9.16667 2.08333H7.5" stroke="white" strokeOpacity="0.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                  <path d="M1.66667 7.08333V7.91667" stroke="white" strokeOpacity="0.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                  <path d="M2.08333 7.5H1.25" stroke="white" strokeOpacity="0.42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                </svg>
                <span
                  style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '11px',
                    fontWeight:    500,
                    color:         'rgba(255,255,255,0.72)',
                    letterSpacing: '0.1px',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {selectedStyle}
                </span>
              </div>
              {/* Color palette tag */}
              <div
                style={{
                  display:              'flex',
                  alignItems:           'center',
                  gap:                  '5px',
                  padding:              '4px 11px',
                  borderRadius:         '8px',
                  background:           'rgba(0,0,0,0.52)',
                  borderWidth:          0,
                  boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="5" cy="5" r="3.5" stroke="white" strokeOpacity="0.42" strokeWidth="0.833333" />
                </svg>
                <span
                  style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '11px',
                    fontWeight:    500,
                    color:         'rgba(255,255,255,0.72)',
                    letterSpacing: '0.1px',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {selectedSwatch}
                </span>
              </div>
            </div>

            {/* ── Floating Navigation Control Panel ── */}
            <div
              style={{
                position:             'absolute',
                bottom:               '28px',
                left:                 '50%',
                transform:            'translateX(-50%)',
                zIndex:               10,
                display:              'flex',
                alignItems:           'center',
                gap:                  '28px',
                padding:              '14px 18px',
                borderRadius:         '20px',
                background:           'rgba(10,10,14,0.62)',
                backdropFilter:       'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderWidth:          0,
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)',
              }}
            >
              <FloatingNavBtn
                icon={
                  <SquareDashedMousePointer size={24} strokeWidth={1.8} />
                }
                label="Edit"
                active={editMode}
                onClick={() => { setEditMode(m => !m); setAddMode(false); setReplaceMode(false); setEraseMode(false); setSelectedAddOption(null); setSelectionConfirmed(false); setAddSubView('options'); setSelectedSofaId(null); }}
              />
              <FloatingNavBtn
                icon={
                  <Plus size={24} strokeWidth={1.8} />
                }
                label="Add"
                active={addMode}
                onClick={() => { setAddMode(m => !m); setEditMode(false); setReplaceMode(false); setEraseMode(false); setSelectedAddOption(null); setSelectionConfirmed(false); setAddSubView('options'); setSelectedSofaId(null); setLibrarySearch(''); }}
              />
              <FloatingNavBtn
                icon={
                  <RefreshCw size={24} strokeWidth={1.8} />
                }
                label="Replace"
                active={replaceMode}
                onClick={() => { setReplaceMode(m => !m); setAddMode(false); setEditMode(false); setEraseMode(false); setSelectedAddOption(null); setSelectionConfirmed(false); setAddSubView('options'); setSelectedSofaId(null); setLibrarySearch(''); }}
              />
              <FloatingNavBtn
                icon={
                  <Eraser size={24} strokeWidth={1.8} />
                }
                label="Erase"
                active={eraseMode}
                onClick={() => { setEraseMode(m => !m); setAddMode(false); setReplaceMode(false); setEditMode(false); setSelectedAddOption(null); setSelectionConfirmed(false); setAddSubView('options'); setSelectedSofaId(null); setLibrarySearch(''); setShowEraseModal(false); }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════  COLUMN 3 — Materials (edit mode) / New Component (confirmed) ═════════════ */}
      <div
        ref={col3Ref}
        style={{
          width:                (editMode || (selectionConfirmed && !eraseMode)) ? '260px' : '0px',
          flexShrink:           0,
          background:           glassPane.background,
          borderRadius:         glassPane.borderRadius,
          backdropFilter:       glassPane.backdropFilter,
          WebkitBackdropFilter: glassPane.WebkitBackdropFilter,
          borderWidth:          0,
          boxShadow:            (editMode || (selectionConfirmed && !eraseMode)) ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
          overflow:             'hidden',
          display:              'flex',
          flexDirection:        'column',
          padding:              '0',
          opacity:              (editMode || (selectionConfirmed && !eraseMode)) ? 1 : 0,
          transition:           'width 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out',
        }}
      >
        {selectionConfirmed ? (
          addSubView === 'library' ? (
            /* ── Library catalog view — 3-section layout ── */
            <div
              ref={libraryWrapperRef}
              style={{
              display:        'flex',
              flexDirection:  'column',
              height:         '100%',
              position:       'relative',
              animation:      'captureOverlayIn 120ms ease-out both',
            }}>
              {/* ── HEADER SECTION — h-73.5px fixed ── */}
              <div style={{
                flexShrink:     0,
                display:        'flex',
                flexDirection:  'column',
                gap:            '4px',
                padding:        '20px 18px 0',
                height:         '73.5px',
                boxSizing:      'border-box',
              }}>
                <div style={{ height: '19.5px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setAddSubView('options');
                      setSelectedSofaId(null);
                      setLibrarySearch('');
                    }}
                    style={{
                      background:    'none',
                      borderWidth:   0,
                      padding:       '4px',
                      cursor:        'pointer',
                      color:         'rgba(255,255,255,0.50)',
                      display:       'flex',
                      alignItems:    'center',
                      justifyContent:'center',
                      borderRadius:  '6px',
                      transition:    'color 140ms ease-out',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.80)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; }}
                  >
                    <ChevronLeft size={16} strokeWidth={2} />
                  </button>
                  <p style={{
                    margin:        0,
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '13px',
                    fontWeight:    600,
                    lineHeight:    '19.5px',
                    color:         'rgba(255,255,255,0.82)',
                    letterSpacing: '-0.18px',
                    whiteSpace:    'nowrap',
                  }}>
                    Choose from Library
                  </p>
                </div>
                <div style={{ height: '30px', flexShrink: 0 }}>
                  <p style={{
                    margin:        0,
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '10px',
                    fontWeight:    400,
                    lineHeight:    '15px',
                    color:         'rgba(255,255,255,0.38)',
                    whiteSpace:    'normal',
                    maxWidth:      '213px',
                  }}>
                    Browse available components and select one to place in the selected area.
                  </p>
                </div>
              </div>

              {/* ── SEARCH & FILTER SECTION — h-136px fixed ── */}
              <div style={{
                flexShrink:     0,
                display:        'flex',
                flexDirection:  'column',
                gap:            '14px',
                padding:        '14px 18px 0',
                height:         '136px',
                boxSizing:      'border-box',
              }}>
                {/* Category filter chips — h-72px container */}
                <div style={{
                  height:         '72px',
                  flexShrink:     0,
                  display:        'flex',
                  gap:            '8px',
                  flexWrap:       'wrap',
                  alignContent:   'flex-start',
                }}>
                  {LIBRARY_FILTERS.map(f => {
                    const active = libraryFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setLibraryFilter(f)}
                        style={{
                          height:               '32px',
                          padding:              '0 14px',
                          borderRadius:         '20px',
                          borderWidth:          0,
                          boxShadow:            active ? 'inset 0 0 0 1px rgba(255,255,255,0.22)' : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                          background:           active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                          cursor:               'pointer',
                          fontFamily:           "'Inter', sans-serif",
                          fontSize:             '12px',
                          fontWeight:           active ? 600 : 400,
                          color:                active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.50)',
                          transition:           'all 160ms ease-out',
                          whiteSpace:           'nowrap',
                          display:              'inline-flex',
                          alignItems:           'center',
                          justifyContent:       'center',
                          lineHeight:           '18px',
                        }}
                        onMouseEnter={e => {
                          if (!active) {
                            e.currentTarget.style.background  = 'rgba(255,255,255,0.07)';
                            e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.14)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!active) {
                            e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.08)';
                          }
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>

                {/* Search bar — h-36px */}
                <div style={{
                  height:               '36px',
                  flexShrink:           0,
                  borderRadius:         '10px',
                  background:           'rgba(255,255,255,0.04)',
                  position:             'relative',
                  display:              'flex',
                  alignItems:           'center',
                }}>
                  <div aria-hidden="true" style={{
                    position:      'absolute',
                    inset:         0,
                    borderRadius:  '10px',
                    borderWidth:   0,
                    boxShadow:     'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    display:       'flex',
                    gap:           '8px',
                    alignItems:    'center',
                    paddingLeft:   '13px',
                    paddingRight:  '11px',
                    width:         '100%',
                    height:        '100%',
                  }}>
                    <Search size={14} strokeWidth={1.05} style={{ color: 'rgba(255,255,255,0.30)', flexShrink: 0 }} />
                    <input
                      type="text"
                      className="library-search-input"
                      value={librarySearch}
                      onChange={e => setLibrarySearch(e.target.value)}
                      placeholder="Search components"
                      style={{
                        flex:           1,
                        minWidth:       0,
                        height:         '18px',
                        borderWidth:    0,
                        background:     'transparent',
                        outline:        'none',
                        fontFamily:     "'Inter', sans-serif",
                        fontSize:       '12px',
                        fontWeight:     400,
                        lineHeight:     'normal',
                        color:          'rgba(255,255,255,0.85)',
                        caretColor:     'rgba(255,255,255,0.60)',
                        padding:        0,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── CATALOG GRID CONTAINER — fills remaining space, scrolls ── */}
              <div style={{
                flex:           1,
                minHeight:      0,
                overflowY:      'auto',
                overflowX:      'hidden' as const,
                padding:        '14px 18px 14px',
                scrollbarWidth: 'thin' as const,
                scrollbarColor: 'rgba(255,255,255,0.10) transparent',
              }}>
                {/* Sofa grid */}
                <div style={{
                  display:             'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap:                 '12px',
                }}>
                  {SOFA_ITEMS
                    .filter(s => !librarySearch || s.name.toLowerCase().includes(librarySearch.toLowerCase()))
                    .map(sofa => {
                      const isSel = selectedSofaId === sofa.id;
                      return (
                        <button
                          key={sofa.id}
                          onClick={() => setSelectedSofaId(prev => prev === sofa.id ? null : sofa.id)}
                          onMouseEnter={e => {
                            const card = e.currentTarget;
                            const wrapper = libraryWrapperRef.current;
                            if (wrapper) {
                              const cardRect = card.getBoundingClientRect();
                              const wrapperRect = wrapper.getBoundingClientRect();
                              setHoveredSofaPos({
                                x: cardRect.left + cardRect.width / 2 - wrapperRect.left,
                                y: cardRect.top - wrapperRect.top,
                              });
                            }
                            setHoveredSofaId(sofa.id);
                            if (!isSel) {
                              card.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.14), 0 4px 14px rgba(0,0,0,0.30)';
                              card.style.transform = 'translateY(-1px)';
                            }
                          }}
                          onMouseLeave={e => {
                            setHoveredSofaId(null);
                            setHoveredSofaPos(null);
                            if (!isSel) {
                              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06)';
                            }
                            e.currentTarget.style.transform = 'none';
                          }}
                          style={{
                            display:       'block',
                            borderWidth:   0,
                            borderRadius:  '10px',
                            background:    'rgba(255,255,255,0.03)',
                            cursor:        'pointer',
                            overflow:      'hidden',
                            padding:       0,
                            height:        '150px',
                            transition:    'box-shadow 120ms ease-out, transform 120ms ease-out',
                            boxShadow:     isSel
                              ? '0 0 0 1.5px rgba(74,222,128,0.55), 0 4px 16px rgba(74,222,128,0.08)'
                              : '0 0 0 1px rgba(255,255,255,0.06)',
                          }}
                        >
                          <img
                            src={sofa.img}
                            alt={sofa.name}
                            style={{
                              width:          '100%',
                              height:         '100%',
                              objectFit:      'cover',
                              display:        'block',
                              pointerEvents:  'none',
                              borderRadius:   '10px',
                            }}
                          />
                        </button>
                      );
                    })}
                </div>

              </div>

              {/* ── FLOATING HOVER PREVIEW — positioned above hovered card ── */}
              {hoveredSofaId && hoveredSofaPos && (() => {
                const sofa = SOFA_ITEMS.find(s => s.id === hoveredSofaId);
                if (!sofa) return null;
                const previewW = 224;
                const wrapperW = libraryWrapperRef.current?.offsetWidth ?? 260;
                let left = hoveredSofaPos.x - previewW / 2;
                if (left < 10) left = 10;
                if (left + previewW > wrapperW - 10) left = wrapperW - 10 - previewW;
                return (
                  <div
                    style={{
                      position:             'absolute',
                      left:                 `${left}px`,
                      top:                  `${hoveredSofaPos.y - 16}px`,
                      transform:            'translateY(-100%)',
                      width:                `${previewW}px`,
                      zIndex:               20,
                      pointerEvents:        'none',
                      animation:            'captureOverlayIn 120ms ease-out both',
                    }}
                  >
                    <div style={{
                      borderRadius:         '12px',
                      overflow:             'hidden',
                      background:           'rgba(28,28,32,0.95)',
                      backdropFilter:       'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderWidth:          0,
                      boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)',
                    }}>
                      <img
                        src={sofa.img}
                        alt={sofa.name}
                        style={{
                          width:        '100%',
                          height:       '160px',
                          objectFit:    'cover',
                          display:      'block',
                        }}
                      />
                      <div style={{
                        padding:      '10px 12px',
                      }}>
                        <p style={{
                          margin:       0,
                          fontFamily:   "'Inter', sans-serif",
                          fontSize:     '14px',
                          fontWeight:   500,
                          color:        'rgba(255,255,255,0.90)',
                          lineHeight:   '18px',
                          whiteSpace:   'nowrap',
                          overflow:     'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {sofa.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ── ACTION BAR — solid glass surface pinned at bottom ── */}
              {selectedSofaId && (
                <div style={{
                  flexShrink:           0,
                  height:               '72px',
                  width:                '100%',
                  padding:              '12px 14px',
                  boxSizing:            'border-box',
                  borderWidth:          0,
                  boxShadow:            'inset 0 1px 0 0 rgba(255,255,255,0.08)',
                  backdropFilter:       'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  animation:            'captureOverlayIn 120ms ease-out both',
                  display:              'flex',
                  alignItems:           'center',
                }}>
                  <button
                    onClick={() => setShowPlacementModal(true)}
                    style={{
                      width:                '100%',
                      height:               '40px',
                      borderRadius:         '10px',
                      borderWidth:          0,
                      background:           'rgba(74,222,128,0.12)',
                      color:                'rgba(74,222,128,0.95)',
                      fontFamily:           "'Inter', sans-serif",
                      fontSize:             '13px',
                      fontWeight:           600,
                      cursor:               'pointer',
                      transition:           'background 160ms ease-out, box-shadow 160ms ease-out',
                      boxShadow:            'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)',
                      letterSpacing:        '-0.1px',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background  = 'rgba(74,222,128,0.18)';
                      e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.45), 0 2px 20px rgba(74,222,128,0.14), 0 2px 8px rgba(0,0,0,0.20)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background  = 'rgba(74,222,128,0.12)';
                      e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)';
                    }}
                    onMouseDown={e => {
                      e.currentTarget.style.background = 'rgba(74,222,128,0.24)';
                    }}
                    onMouseUp={e => {
                      e.currentTarget.style.background = 'rgba(74,222,128,0.18)';
                    }}
                  >
                    {replaceMode ? 'Replace with Selected Item' : 'Add Selected Sofa'}
                  </button>
                </div>
              )}
            </div>
          ) : addSubView === 'upload' ? (
          /* ── Upload Component Image flow ── */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'matExpandIn 180ms ease-out both' }}>
            {/* ── Content Frame ── */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            {/* Header */}
            <div
              style={{
                flexShrink:    0,
                position:      'relative',
                padding:       '14px 18px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    if (uploadStep === 'detected' || uploadStep === 'processing') {
                      if (scanTimerRef.current) { clearTimeout(scanTimerRef.current); scanTimerRef.current = null; }
                      setUploadStep('idle');
                      setUploadedImageUrl(uploadedImages.length > 0 ? uploadedImages[0] : null);
                    } else {
                      if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);
                      uploadedImages.forEach(u => URL.revokeObjectURL(u));
                      setAddSubView('options');
                      setUploadStep('idle');
                      setUploadedImageUrl(null);
                      setUploadedImages([]);
                    }
                  }}
                  style={{
                    background:   'none',
                    borderWidth:  0,
                    padding:      '4px',
                    cursor:       'pointer',
                    color:        'rgba(255,255,255,0.50)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent:'center',
                    borderRadius: '6px',
                    transition:   'color 140ms ease-out',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.80)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; }}
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <span
                  style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '13px',
                    fontWeight:    600,
                    lineHeight:    '19.5px',
                    color:         'rgba(255,255,255,0.82)',
                    letterSpacing: '-0.18px',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {uploadStep === 'detected' ? 'Upload Component Image' : 'Upload Component Images'}
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Hidden file input */}
            <input
              ref={uploadFileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && uploadedImages.length < 3) {
                  const url = URL.createObjectURL(file);
                  setUploadedImages(prev => [...prev, url]);
                  // Set first image as the primary
                  if (!uploadedImageUrl) setUploadedImageUrl(url);
                }
                e.target.value = '';
              }}
            />

            {/* Scrollable content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '14px', minHeight: 0 }}>

              {/* idle — centered modal renders separately, panel shows placeholder */}
              {uploadStep === 'idle' && (
                <div style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  justifyContent:'center',
                  height:        '100%',
                  gap:           '10px',
                  animation:     'captureOverlayIn 140ms ease-out both',
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M5.333 21.333V24a2.667 2.667 0 002.667 2.667h16A2.667 2.667 0 0026.667 24v-2.667" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 20V5.333" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.667 10.667L16 5.333l5.333 5.334" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '12px',
                    fontWeight:  400,
                    color:      'rgba(255,255,255,0.35)',
                    textAlign:  'center',
                    lineHeight: '1.5',
                  }}>
                    Upload images using the<br />centered upload dialog.
                  </span>
                </div>
              )}

              {/* ── Processing / Scanning ── */}
              {uploadStep === 'processing' && uploadedImageUrl && (
                <div style={{ animation: 'captureOverlayIn 140ms ease-out both', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '14px' }}>
                  <div style={{
                    width:        '100%',
                    height:       '3px',
                    borderRadius: '2px',
                    background:   'rgba(255,255,255,0.06)',
                    overflow:     'hidden',
                    position:     'relative',
                  }}>
                    <div style={{
                      position:     'absolute',
                      top:          0,
                      left:         0,
                      height:       '100%',
                      width:        '40%',
                      borderRadius: '2px',
                      background:   'linear-gradient(90deg, rgba(74,222,128,0.0), rgba(74,222,128,0.60), rgba(74,222,128,0.0))',
                      animation:    'scanSlide 1.2s ease-in-out infinite',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '12px',
                    fontWeight:  400,
                    color:      'rgba(255,255,255,0.45)',
                  }}>
                    Processing images...
                  </span>
                </div>
              )}

              {/* ── STEP 4: Processed Preview Screen (detected) ── */}
              {uploadStep === 'detected' && uploadedImageUrl && (
                <div style={{ animation: 'captureOverlayIn 180ms ease-out both' }}>
                  {/* Section 1: Uploaded Image */}
                  <div style={{ height: '24px', position: 'relative', marginBottom: '6px' }}>
                    <span style={{
                      position:      'absolute',
                      top:           '4px',
                      left:          0,
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      '11px',
                      fontWeight:    500,
                      lineHeight:    '16.5px',
                      color:         'rgba(255,255,255,0.45)',
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase',
                      whiteSpace:    'nowrap',
                    }}>
                      Uploaded Image
                    </span>
                  </div>
                  <div style={{
                    borderRadius: '10px',
                    background:   'rgba(255,255,255,0.03)',
                    position:     'relative',
                  }}>
                    <div style={{
                      overflow:     'hidden',
                      borderRadius: 'inherit',
                      width:        '100%',
                    }}>
                      <img
                        src={uploadedImageUrl}
                        alt="Uploaded component"
                        style={{
                          width:     '100%',
                          height:    '160px',
                          objectFit: 'cover',
                          display:   'block',
                        }}
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        position:      'absolute',
                        inset:         0,
                        borderRadius:  '10px',
                        borderWidth:   0,
                        boxShadow:     'inset 0 0 0 1px rgba(255,255,255,0.08)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '11px',
                    fontWeight:  400,
                    color:      'rgba(255,255,255,0.38)',
                    display:    'block',
                    marginTop:  '6px',
                  }}>
                    Original Image
                  </span>

                  {/* Section 2: Detected Object */}
                  <div style={{ height: '24px', position: 'relative', marginTop: '18px', marginBottom: '6px' }}>
                    <span style={{
                      position:      'absolute',
                      top:           '4px',
                      left:          0,
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      '11px',
                      fontWeight:    500,
                      lineHeight:    '16.5px',
                      color:         'rgba(255,255,255,0.45)',
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase',
                      whiteSpace:    'nowrap',
                    }}>
                      Detected Object
                    </span>
                  </div>
                  <div style={{
                    borderRadius:    '10px',
                    position:        'relative',
                    height:          '160px',
                    backgroundImage: 'linear-gradient(144.841deg, rgba(24,24,28,0.95) 0%, rgba(30,30,36,0.95) 100%)',
                  }}>
                    <div style={{
                      overflow:     'hidden',
                      borderRadius: 'inherit',
                      width:        '100%',
                      height:       '100%',
                      position:     'relative',
                    }}>
                      {/* Checkerboard transparency pattern */}
                      <div style={{
                        position:   'absolute',
                        top:        '1px',
                        left:       '1px',
                        right:      '1px',
                        bottom:     '1px',
                        opacity:    0.04,
                        backgroundImage: 'linear-gradient(35.06deg, #fff 25%, transparent 25%), linear-gradient(-35.06deg, #fff 25%, transparent 25%), linear-gradient(35.06deg, transparent 75%, #fff 75%), linear-gradient(-35.06deg, transparent 75%, #fff 75%)',
                        backgroundSize:  '12px 12px',
                        backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
                      }} />
                      <img
                        src={uploadedImageUrl}
                        alt="Detected component"
                        style={{
                          position:  'absolute',
                          top:       '1px',
                          left:      '1px',
                          width:     'calc(100% - 2px)',
                          height:    '158px',
                          objectFit: 'contain',
                          display:   'block',
                        }}
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        position:      'absolute',
                        inset:         0,
                        borderRadius:  '10px',
                        borderWidth:   0,
                        boxShadow:     'inset 0 0 0 1px rgba(74,222,128,0.15)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '11px',
                    fontWeight:  400,
                    color:      'rgba(74,222,128,0.55)',
                    display:    'block',
                    marginTop:  '6px',
                  }}>
                    Detected Component
                  </span>
                </div>
              )}
            </div>

            {/* ── Fixed Bottom: Confirm Image button (detected step only) ── */}
            {uploadStep === 'detected' && uploadedImageUrl && (
              <div style={{
                flexShrink:  0,
                padding:     '12px 14px 14px',
                borderWidth: 0,
                boxShadow:   '0 -1px 0 rgba(255,255,255,0.07)',
              }}>
                <button
                  onClick={() => setShowUploadPlacementModal(true)}
                  style={{
                    width:        '100%',
                    height:       '40px',
                    borderRadius: '10px',
                    borderWidth:  0,
                    background:   'rgba(74,222,128,0.14)',
                    color:        'rgba(74,222,128,0.95)',
                    fontFamily:   "'Inter', sans-serif",
                    fontSize:     '13px',
                    fontWeight:   600,
                    cursor:       'pointer',
                    transition:   'background 140ms ease, box-shadow 140ms ease',
                    boxShadow:    'inset 0 0 0 1px rgba(74,222,128,0.22)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(74,222,128,0.22)';
                    e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(74,222,128,0.32), 0 0 16px rgba(74,222,128,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(74,222,128,0.14)';
                    e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(74,222,128,0.22)';
                  }}
                >
                  Confirm Image
                </button>
              </div>
            )}

            {/* ── Close Content Frame ── */}
            </div>

          </div>
          ) : addSubView === 'generate' ? (
          /* ── Generate with Text Prompt flow ── */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'matExpandIn 180ms ease-out both' }}>
            {/* Header — 48px with back arrow */}
            <div
              style={{
                height:        '48px',
                flexShrink:    0,
                position:      'relative',
                display:       'flex',
                alignItems:    'center',
                gap:           '10px',
                padding:       '0 16px',
              }}
            >
              <button
                onClick={() => {
                  setAddSubView('options');
                  setGeneratePrompt('');
                  setGenerateState('idle');
                  setGeneratedImageUrl(null);
                  if (generateTimerRef.current) clearTimeout(generateTimerRef.current);
                }}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  width:         '26px',
                  height:        '26px',
                  borderRadius:  '7px',
                  borderWidth:   0,
                  background:    'rgba(255,255,255,0.06)',
                  cursor:        'pointer',
                  color:         'rgba(255,255,255,0.60)',
                  transition:    'background 140ms ease-out, color 140ms ease-out',
                  flexShrink:    0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color      = 'rgba(255,255,255,0.90)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color      = 'rgba(255,255,255,0.60)';
                }}
              >
                <ChevronLeft size={15} />
              </button>
              <span
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '13px',
                  fontWeight:    600,
                  color:         'rgba(255,255,255,0.82)',
                  letterSpacing: '-0.18px',
                  whiteSpace:    'nowrap',
                }}
              >
                Generate Component
              </span>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* ── Text input section ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '11px',
                  fontWeight:    600,
                  color:         'rgba(255,255,255,0.55)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                }}>
                  Describe the Component
                </span>
                <textarea
                  value={generatePrompt}
                  onChange={e => setGeneratePrompt(e.target.value)}
                  placeholder="e.g. modern beige L-shaped sofa with wooden legs, minimal style"
                  rows={5}
                  style={{
                    width:                '100%',
                    minHeight:            '108px',
                    maxHeight:            '160px',
                    resize:               'vertical',
                    borderRadius:         '12px',
                    background:           'rgba(255,255,255,0.04)',
                    borderWidth:          '1px',
                    borderStyle:          'solid',
                    borderColor:          'rgba(255,255,255,0.08)',
                    padding:              '12px 14px',
                    fontFamily:           "'Inter', sans-serif",
                    fontSize:             '13px',
                    fontWeight:           400,
                    color:                'rgba(255,255,255,0.88)',
                    lineHeight:           '1.55',
                    outline:              'none',
                    transition:           'border-color 160ms ease-out, box-shadow 160ms ease-out',
                    boxShadow:            'none',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
                    e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(255,255,255,0.04)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                />
              </div>

              {/* ── Generate button ── */}
              <button
                disabled={!generatePrompt.trim() || generateState === 'loading'}
                onClick={() => {
                  setGenerateState('loading');
                  setGeneratedImageUrl(null);
                  if (generateTimerRef.current) clearTimeout(generateTimerRef.current);
                  generateTimerRef.current = setTimeout(() => {
                    setGeneratedImageUrl('https://images.unsplash.com/photo-1693578616322-c8abe6c7393d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWlnZSUyMHNvZmElMjBmdXJuaXR1cmUlMjByZW5kZXJ8ZW58MXx8fHwxNzczODI1MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
                    setGenerateState('done');
                  }, 2200);
                }}
                style={{
                  width:                '100%',
                  height:               '42px',
                  borderRadius:         '10px',
                  borderWidth:          0,
                  background:           (!generatePrompt.trim() || generateState === 'loading')
                    ? 'rgba(74,222,128,0.06)' : 'rgba(74,222,128,0.14)',
                  color:                (!generatePrompt.trim() || generateState === 'loading')
                    ? 'rgba(74,222,128,0.35)' : 'rgba(74,222,128,0.95)',
                  fontFamily:           "'Inter', sans-serif",
                  fontSize:             '13px',
                  fontWeight:           600,
                  cursor:               (!generatePrompt.trim() || generateState === 'loading') ? 'default' : 'pointer',
                  transition:           'background 160ms ease-out, box-shadow 160ms ease-out, color 160ms ease-out',
                  boxShadow:            (!generatePrompt.trim() || generateState === 'loading')
                    ? 'none' : 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)',
                  letterSpacing:        '-0.1px',
                  display:              'flex',
                  alignItems:           'center',
                  justifyContent:       'center',
                  gap:                  '8px',
                }}
                onMouseEnter={e => {
                  if (generatePrompt.trim() && generateState !== 'loading') {
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.20)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.45), 0 2px 20px rgba(74,222,128,0.14)';
                  }
                }}
                onMouseLeave={e => {
                  if (generatePrompt.trim() && generateState !== 'loading') {
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.14)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)';
                  }
                }}
              >
                {generateState === 'loading' && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                    <path d="M12.5 7a5.5 5.5 0 00-5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {generateState === 'loading' ? 'Generating…' : 'Generate Component'}
              </button>

              {/* ── Generated Preview ── */}
              {(generateState === 'loading' || generateState === 'done') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'matExpandIn 180ms ease-out both' }}>
                  <span style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '11px',
                    fontWeight:    600,
                    color:         'rgba(255,255,255,0.55)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                  }}>
                    Generated Preview
                  </span>

                  {/* Preview card */}
                  <div style={{
                    width:        '100%',
                    height:       '180px',
                    borderRadius: '12px',
                    overflow:     'hidden',
                    background:   'rgba(255,255,255,0.03)',
                    borderWidth:  0,
                    boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.07)',
                    position:     'relative',
                  }}>
                    {generateState === 'loading' ? (
                      /* Shimmer skeleton */
                      <div style={{
                        position:   'absolute',
                        inset:      0,
                        background: 'linear-gradient(110deg, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 70%)',
                        backgroundSize: '200% 100%',
                        animation:  'shimmer 1.5s ease-in-out infinite',
                      }}>
                        {/* Sparkle icon centered */}
                        <div style={{
                          position:       'absolute',
                          top:            '50%',
                          left:           '50%',
                          transform:      'translate(-50%, -50%)',
                          display:        'flex',
                          flexDirection:  'column',
                          alignItems:     'center',
                          gap:            '8px',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.3, animation: 'pulse 2s ease-in-out infinite' }}>
                            <path d="M10 1.667l1.175 3.608a2 2 0 001.217 1.217L16.042 7.667l-3.65 1.175a2 2 0 00-1.217 1.217L10 13.708l-1.175-3.65a2 2 0 00-1.217-1.216L3.958 7.667l3.65-1.175a2 2 0 001.217-1.217L10 1.667z" stroke="rgba(255,255,255,0.50)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize:   '11px',
                            fontWeight:  500,
                            color:      'rgba(255,255,255,0.25)',
                          }}>
                            Generating…
                          </span>
                        </div>
                      </div>
                    ) : generatedImageUrl ? (
                      <img
                        src={generatedImageUrl}
                        alt="Generated component"
                        style={{
                          width:     '100%',
                          height:    '100%',
                          objectFit: 'cover',
                          display:   'block',
                        }}
                      />
                    ) : null}
                  </div>

                </div>
              )}
            </div>
          </div>
          ) : (
          /* ── New Component selection panel (options) ── */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'matExpandIn 180ms ease-out both' }}>
            {/* Header */}
            <div
              style={{
                flexShrink:    0,
                position:      'relative',
                padding:       '14px 18px 12px',
              }}
            >
              <span
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '13px',
                  fontWeight:    600,
                  lineHeight:    '19.5px',
                  color:         'rgba(255,255,255,0.82)',
                  letterSpacing: '-0.18px',
                  whiteSpace:    'nowrap',
                  display:       'block',
                }}
              >
                Select the New Component
              </span>
              <span
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '10px',
                  fontWeight:    400,
                  lineHeight:    '15px',
                  color:         'rgba(255,255,255,0.38)',
                  display:       'block',
                  marginTop:     '4px',
                  whiteSpace:    'normal',
                }}
              >
                Choose how you want to provide the new component for this selected area.
              </span>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Option cards */}
            <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {([
                {
                  id:    'library',
                  title: 'Choose from Library',
                  desc:  'Select the new component from a designated database of curated images and assets.',
                  iconPath: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="4" width="7" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="11" y="4" width="7" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="2" y="11.5" width="7" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="11" y="11.5" width="7" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  ),
                },
                {
                  id:    'upload',
                  title: 'Upload Component Image',
                  desc:  'Upload an image of the exact component you want to place in the selected area.',
                  iconPath: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.333 13.333V15a1.667 1.667 0 001.667 1.667h10A1.667 1.667 0 0016.667 15v-1.667" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5V3.333" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.667 6.667L10 3.333l3.333 3.334" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  id:    'generate',
                  title: 'Generate with Text Prompt',
                  desc:  'Use a detailed text prompt to generate the new component for the selected area.',
                  iconPath: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1.667l1.175 3.608a2 2 0 001.217 1.217L16.042 7.667l-3.65 1.175a2 2 0 00-1.217 1.217L10 13.708l-1.175-3.65a2 2 0 00-1.217-1.216L3.958 7.667l3.65-1.175a2 2 0 001.217-1.217L10 1.667z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.833 12.5v3.333" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.167 14.167h3.333" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.167 14.167v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.917 15.417h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (opt.id === 'library') {
                      setAddSubView('library');
                      setSelectedSofaId(null);
                      setLibrarySearch('');
                      setLibraryFilter('Sofas');
                    } else if (opt.id === 'upload') {
                      if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);
                      setAddSubView('upload');
                      setUploadStep('idle');
                      setUploadedImageUrl(null);
                    } else if (opt.id === 'generate') {
                      setAddSubView('generate');
                      setGeneratePrompt('');
                      setGenerateState('idle');
                      setGeneratedImageUrl(null);
                    }
                  }}
                  style={{
                    display:        'flex',
                    alignItems:     'flex-start',
                    gap:            '14px',
                    padding:        '14px 16px',
                    borderWidth:    0,
                    borderRadius:   '12px',
                    background:     'rgba(255,255,255,0.03)',
                    cursor:         'pointer',
                    textAlign:      'left' as const,
                    width:          '100%',
                    position:       'relative' as const,
                    transition:     'background 180ms ease-out, box-shadow 180ms ease-out',
                    boxShadow:      '0 0 0 1px rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow  = '0 0 0 1px rgba(255,255,255,0.16), 0 0 12px rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.boxShadow  = '0 0 0 1px rgba(255,255,255,0.08)';
                  }}
                >
                  {/* Icon container */}
                  <div style={{
                    width:          '40px',
                    height:         '40px',
                    borderRadius:   '10px',
                    background:     'rgba(255,255,255,0.04)',
                    borderWidth:    0,
                    boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                    color:          'rgba(255,255,255,0.50)',
                  }}>
                    {opt.iconPath}
                  </div>
                  {/* Text block */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily:   "'Inter', sans-serif",
                      fontSize:     '14px',
                      fontWeight:   500,
                      color:        'rgba(255,255,255,0.90)',
                      lineHeight:   '1.35',
                      marginBottom: '4px',
                    }}>
                      {opt.title}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize:   '12px',
                      fontWeight:  400,
                      color:       'rgba(255,255,255,0.50)',
                      lineHeight:  '1.55',
                    }}>
                      {opt.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          )
        ) : (
          <>
        {/* ── Header ── */}
        <div
          style={{
            flexShrink:    0,
            position:      'relative',
            padding:       '14px 18px 12px',
          }}
        >
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '13px',
              fontWeight:    600,
              lineHeight:    '19.5px',
              color:         'rgba(255,255,255,0.82)',
              letterSpacing: '-0.18px',
              whiteSpace:    'nowrap',
              display:       'block',
            }}
          >
            Customize exterior
          </span>
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '10px',
              fontWeight:    400,
              lineHeight:    '15px',
              color:         'rgba(255,255,255,0.38)',
              display:       'block',
              marginTop:     '4px',
              whiteSpace:    'normal',
            }}
          >
            Choose a category below, then pick a material or style preset. Only colors, textures, and materials change — structure stays the same.
          </span>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* ── Category sub-header ── */}
        <div
          style={{
            flexShrink:    0,
            padding:       '10px 18px 8px',
          }}
        >
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '11px',
              fontWeight:    600,
              color:         'rgba(255,255,255,0.62)',
              letterSpacing: '0.02em',
              whiteSpace:    'nowrap',
            }}
          >
            {(CATEGORIES.find(c => c.id === selectedCategory)?.label ?? 'Facade')} — <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.38)' }}>from catalog</span>
          </span>
        </div>

        {/* ── Material list ── */}
        <div
          ref={materialsListRef}
          style={{
            flex:           1,
            overflowY:      'auto',
            padding:        '8px 12px',
            display:        'flex',
            flexDirection:  'column',
            gap:            '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.12) transparent',
            position:       'relative',
          }}
        >
          {MATERIALS.map(mat => {
            const isExpanded = selectedMaterial === mat.id;

            /* ── Expanded inline card ── */
            if (isExpanded) {
              return (
                <div
                  key={mat.id}
                  style={{
                    width:          '100%',
                    borderRadius:   '14px',
                    background:     'rgba(255,255,255,0.04)',
                    borderWidth:    0,
                    boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.12)',
                    overflow:       'hidden',
                    flexShrink:     0,
                    animation:      'matExpandIn 180ms ease-out both',
                  }}
                >
                  {/* Clickable header to collapse */}
                  <button
                    onClick={() => setSelectedMaterial(null)}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        '12px',
                      width:      '100%',
                      padding:    '10px 12px',
                      borderWidth: 0,
                      background: 'transparent',
                      cursor:     'pointer',
                      textAlign:  'left',
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden',
                      flexShrink: 0, position: 'relative', background: 'rgba(255,255,255,0.03)',
                      borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                    }}>
                      <img src={mat.img} alt={mat.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600,
                      color: 'rgba(255,255,255,0.95)', flex: 1, minWidth: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {mat.name}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                  {/* Preview image */}
                  <div style={{ width: 'calc(100% - 24px)', aspectRatio: '16/10', position: 'relative', overflow: 'hidden', borderRadius: '10px', margin: '0 12px' }}>
                    <img
                      src={mat.img}
                      alt={mat.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  {/* Info + colors */}
                  <div style={{ padding: '12px 14px 14px' }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400,
                      color: 'rgba(255,255,255,0.42)', lineHeight: '1.5',
                    }}>
                      {mat.desc}
                    </div>
                    {/* Color options */}
                    <div style={{
                      marginTop: '10px', paddingTop: '10px',
                      borderTopWidth: '1px',
                      borderTopStyle: 'solid' as const,
                      borderTopColor: 'rgba(255,255,255,0.06)',
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      borderLeftColor: 'transparent',
                      display: 'flex', flexDirection: 'column', gap: '6px',
                    }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600,
                        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                      }}>
                        Color options
                      </div>
                      {mat.colors.map(clr => {
                        const isColorSelected = selectedColors[mat.id] === clr.id;
                        return (
                          <button
                            key={clr.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedColors(prev => ({ ...prev, [mat.id]: clr.id }));
                            }}
                            style={{
                              display:       'flex',
                              alignItems:    'center',
                              gap:           '10px',
                              padding:       '6px 8px',
                              borderWidth:   0,
                              borderRadius:  '8px',
                              background:    isColorSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
                              cursor:        'pointer',
                              transition:    'background 120ms ease-out',
                              width:         '100%',
                              textAlign:     'left',
                              position:      'relative',
                            }}
                            onMouseEnter={e => {
                              if (!isColorSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={e => {
                              if (!isColorSelected) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            {/* Swatch */}
                            <div style={{
                              width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                              background: clr.hex,
                              borderWidth: 0,
                              boxShadow: isColorSelected ? 'inset 0 0 0 2px rgba(255,255,255,0.70), 0 0 0 2px rgba(255,255,255,0.10)' : 'inset 0 0 0 1.5px rgba(255,255,255,0.15)',
                              transition: 'box-shadow 120ms ease-out',
                            }} />
                            {/* Name */}
                            <span style={{
                              fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: isColorSelected ? 500 : 400,
                              color: isColorSelected ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.55)',
                              transition: 'color 120ms ease-out',
                            }}>
                              {clr.name}
                            </span>
                            {/* Selected indicator */}
                            {isColorSelected && (
                              <div style={{
                                marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%',
                                background: 'rgba(255,255,255,0.65)', flexShrink: 0,
                              }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            /* ── Collapsed list row ── */
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(prev => prev === mat.id ? null : mat.id)}
                style={{
                  display:        'flex',
                  flexDirection:  'row',
                  alignItems:     'center',
                  gap:            '12px',
                  width:          '100%',
                  height:         '48px',
                  padding:        '0 12px',
                  borderWidth:    0,
                  borderRadius:   '10px',
                  background:     'transparent',
                  cursor:         'pointer',
                  position:       'relative',
                  transition:     'background 180ms ease',
                  textAlign:      'left',
                  flexShrink:     0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  setHoveredMaterial(mat.id);
                  const btnRect = e.currentTarget.getBoundingClientRect();
                  setHoverClientY(btnRect.top);
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  setHoveredMaterial(null);
                }}
              >
                {/* Texture thumbnail */}
                <div
                  style={{
                    width:        '32px',
                    height:       '32px',
                    borderRadius: '8px',
                    overflow:     'hidden',
                    flexShrink:   0,
                    position:     'relative',
                    background:   'rgba(255,255,255,0.03)',
                    borderWidth:  0,
                    boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                >
                  <img
                    src={mat.img}
                    alt={mat.name}
                    style={{
                      position:  'absolute',
                      inset:     0,
                      width:     '100%',
                      height:    '100%',
                      objectFit: 'cover',
                      display:   'block',
                    }}
                  />
                </div>
                {/* Material name */}
                <span
                  style={{
                    fontFamily:   "'Inter', sans-serif",
                    fontSize:     '14px',
                    fontWeight:   500,
                    color:        'rgba(255,255,255,0.85)',
                    transition:   'color 180ms ease',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                    flex:         1,
                    minWidth:     0,
                  }}
                >
                  {mat.name}
                </span>
              </button>
            );
          })}
        </div>
          </>
        )}

        {/* ── Bottom Action Frame — flush at panel bottom (upload detected) ── */}
        {selectionConfirmed && addSubView === 'upload' && uploadStep === 'detected' && (
          <div style={{
            flexShrink:    0,
            padding:       '12px 16px 16px',
            borderWidth:       0,
            boxShadow:         'inset 0 1px 0 0 rgba(255,255,255,0.07)',
            backdropFilter:'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation:     'captureOverlayIn 160ms ease-out both',
          }}>
            <button
              onClick={() => setShowUploadPlacementModal(true)}
              style={{
                width:                '100%',
                height:               '40px',
                borderRadius:         '10px',
                borderWidth:          0,
                background:           'rgba(74,222,128,0.12)',
                color:                'rgba(74,222,128,0.95)',
                fontFamily:           "'Inter', sans-serif",
                fontSize:             '13px',
                fontWeight:           600,
                cursor:               'pointer',
                transition:           'background 160ms ease-out, box-shadow 160ms ease-out',
                boxShadow:            'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)',
                letterSpacing:        '-0.1px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(74,222,128,0.18)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.45), 0 2px 20px rgba(74,222,128,0.14), 0 2px 8px rgba(0,0,0,0.20)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(74,222,128,0.12)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)';
              }}
              onMouseDown={e => {
                e.currentTarget.style.background = 'rgba(74,222,128,0.24)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.background = 'rgba(74,222,128,0.18)';
              }}
            >
              {replaceMode ? 'Replace with Detected Item' : 'Add Selected Item'}
            </button>
          </div>
        )}

        {/* ── Bottom Action Frame — flush at panel bottom (generate done) ── */}
        {selectionConfirmed && addSubView === 'generate' && generateState === 'done' && generatedImageUrl && (
          <div style={{
            flexShrink:           0,
            padding:              '12px 16px 16px',
            borderWidth:          0,
            boxShadow:            'inset 0 1px 0 0 rgba(255,255,255,0.07)',
            backdropFilter:       'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation:            'captureOverlayIn 160ms ease-out both',
            display:              'flex',
            flexDirection:        'column',
            gap:                  '12px',
          }}>
            {/* Redo Prompt */}
            <button
              onClick={() => {
                setGenerateState('idle');
                setGeneratedImageUrl(null);
                if (generateTimerRef.current) clearTimeout(generateTimerRef.current);
              }}
              style={{
                width:          '100%',
                height:         '42px',
                borderRadius:   '10px',
                borderWidth:    0,
                background:     'rgba(255,255,255,0.06)',
                color:          'rgba(255,255,255,0.70)',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '13px',
                fontWeight:     500,
                cursor:         'pointer',
                transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.10)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.10)';
              }}
            >
              Redo Prompt
            </button>

            {/* Confirm Generated Item */}
            <button
              onClick={() => setShowGeneratePlacementModal(true)}
              style={{
                width:          '100%',
                height:         '42px',
                borderRadius:   '10px',
                borderWidth:    0,
                background:     'rgba(74,222,128,0.14)',
                color:          'rgba(74,222,128,0.95)',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '13px',
                fontWeight:     600,
                cursor:         'pointer',
                transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                boxShadow:      'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(74,222,128,0.22)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.50), 0 2px 20px rgba(74,222,128,0.16)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(74,222,128,0.14)';
                e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 2px 10px rgba(74,222,128,0.10)';
              }}
            >
              {replaceMode ? 'Replace with Generated Item' : 'Confirm Generated Item'}
            </button>
          </div>
        )}

      </div>

      {/* ── Floating hover preview card (fixed, outside panel overflow) ── */}
      {(() => {
        const hMat = hoveredMaterial && hoveredMaterial !== selectedMaterial
          ? MATERIALS.find(m => m.id === hoveredMaterial) : null;
        if (!hMat || !col3Ref.current) return null;
        const panelRect = col3Ref.current.getBoundingClientRect();
        const previewLeft = panelRect.left - 260 - 14;
        const previewTop = Math.max(panelRect.top, Math.min(hoverClientY - 40, panelRect.bottom - 340));
        return (
          <div
            key={hMat.id}
            style={{
              position:             'fixed',
              left:                 `${previewLeft}px`,
              top:                  `${previewTop}px`,
              width:                '260px',
              borderRadius:         '16px',
              background:           'rgba(10,10,14,0.82)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderWidth:          0,
              boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 12px 48px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.30)',
              overflow:             'hidden',
              pointerEvents:        'none',
              zIndex:               9999,
              animation:            'matPreviewFadeIn 140ms ease-out both',
            }}
          >
            {/* Image preview */}
            <div
              style={{
                width:        'calc(100% - 32px)',
                aspectRatio:  '16/10',
                overflow:     'hidden',
                position:     'relative',
                borderRadius: '12px',
                margin:       '16px 16px 0',
              }}
            >
              <img
                src={hMat.img}
                alt={hMat.name}
                style={{
                  position:  'absolute',
                  inset:     0,
                  width:     '100%',
                  height:    '100%',
                  objectFit: 'cover',
                  display:   'block',
                }}
              />
            </div>
            {/* Text content */}
            <div style={{ padding: '14px 16px 16px' }}>
              <div
                style={{
                  fontFamily:   "'Inter', sans-serif",
                  fontSize:     '14px',
                  fontWeight:   600,
                  color:        'rgba(255,255,255,0.92)',
                  lineHeight:   '1.35',
                  marginBottom: '4px',
                }}
              >
                {hMat.name}
              </div>
              <div
                style={{
                  fontFamily:   "'Inter', sans-serif",
                  fontSize:     '11px',
                  fontWeight:   400,
                  color:        'rgba(255,255,255,0.42)',
                  lineHeight:   '1.5',
                  marginBottom: '10px',
                }}
              >
                {hMat.desc}
              </div>
              {/* Color swatches */}
              <div style={{
                paddingTop: '10px',
                borderTopWidth: '1px',
                borderTopStyle: 'solid' as const,
                borderTopColor: 'rgba(255,255,255,0.06)',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '8px',
              }}>
                {hMat.colors.map(clr => (
                  <div key={clr.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '14px', height: '14px', borderRadius: '50%',
                      background: clr.hex, borderWidth: 0, boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.15)',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400,
                      color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap',
                    }}>
                      {clr.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── PLACEMENT CONFIRMATION MODAL ── */}
      {showPlacementModal && selectedSofaId && (() => {
        const sofa = SOFA_ITEMS.find(s => s.id === selectedSofaId);
        if (!sofa) return null;
        return (
          <>
            {/* Overlay */}
            <div
              onClick={() => setShowPlacementModal(false)}
              style={{
                position:   'fixed',
                inset:      0,
                zIndex:     900,
                background: 'rgba(0,0,0,0.40)',
                animation:  'captureOverlayIn 140ms ease-out both',
              }}
            />
            {/* Modal card */}
            <div
              style={{
                position:             'fixed',
                top:                  '50%',
                left:                 '50%',
                transform:            'translate(-50%, -50%)',
                zIndex:               901,
                width:                '420px',
                borderRadius:         '16px',
                background:           'rgba(24,24,28,0.92)',
                backdropFilter:       'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderWidth:          0,
                boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 16px 64px rgba(0,0,0,0.50), 0 4px 16px rgba(0,0,0,0.30)',
                padding:              '24px',
                animation:            'placementModalIn 140ms ease-out both',
              }}
            >
              {/* Title */}
              <h3 style={{
                margin:       0,
                fontFamily:   "'Inter', sans-serif",
                fontSize:     '17px',
                fontWeight:   600,
                color:        'rgba(255,255,255,0.94)',
                lineHeight:   '1.35',
                letterSpacing: '-0.2px',
              }}>
                {replaceMode ? 'Finalize Component Replacement' : 'Finalize Component Placement'}
              </h3>

              {/* Subtitle */}
              <p style={{
                margin:       '8px 0 0',
                fontFamily:   "'Inter', sans-serif",
                fontSize:     '13px',
                fontWeight:   400,
                color:        'rgba(255,255,255,0.50)',
                lineHeight:   '1.55',
              }}>
                {replaceMode
                  ? 'Do you want to replace the existing component with this one?'
                  : 'Do you want to add this selected component to the chosen area on the canvas?'}
              </p>

              {/* Preview card */}
              <div style={{
                marginTop:    '18px',
                borderRadius: '12px',
                overflow:     'hidden',
                background:   'rgba(255,255,255,0.03)',
                borderWidth:  0,
                boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.07)',
              }}>
                <img
                  src={sofa.img}
                  alt={sofa.name}
                  style={{
                    width:      '100%',
                    height:     '120px',
                    objectFit:  'cover',
                    display:    'block',
                  }}
                />
                <div style={{
                  padding:    '10px 14px',
                }}>
                  <p style={{
                    margin:     0,
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '14px',
                    fontWeight:  500,
                    color:      'rgba(255,255,255,0.88)',
                    lineHeight: '1.35',
                  }}>
                    {sofa.name}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{
                display:    'flex',
                gap:        '12px',
                marginTop:  '20px',
              }}>
                {/* Cancel */}
                <button
                  onClick={() => setShowPlacementModal(false)}
                  style={{
                    flex:           1,
                    height:         '40px',
                    borderRadius:   '10px',
                    borderWidth:    0,
                    background:     'rgba(255,255,255,0.06)',
                    color:          'rgba(255,255,255,0.70)',
                    fontFamily:     "'Inter', sans-serif",
                    fontSize:       '13px',
                    fontWeight:     500,
                    cursor:         'pointer',
                    transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                    boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.10)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.16)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.10)';
                  }}
                >
                  Cancel
                </button>

                {/* Confirm */}
                <button
                  onClick={() => {
                    const sofa = SOFA_ITEMS.find(s => s.id === selectedSofaId);
                    if (sofa) {
                      if (replaceMode && placedSofas.length > 0) {
                        // Replace the last placed item, keeping its id for glow targeting
                        const targetId = placedSofas[placedSofas.length - 1].id;
                        setPlacedSofas(prev => prev.map((p, i) =>
                          i === prev.length - 1
                            ? { ...p, sofaId: sofa.id, img: sofa.img, name: sofa.name }
                            : p
                        ));
                        triggerReplacedGlow(targetId);
                      } else {
                        setPlacedSofas(prev => [...prev, {
                          id: `placed-${Date.now()}`,
                          sofaId: sofa.id,
                          img: sofa.img,
                          name: sofa.name,
                        }]);
                      }
                    }
                    resetFlowState();
                  }}
                  style={{
                    flex:           1,
                    height:         '40px',
                    borderRadius:   '10px',
                    borderWidth:    0,
                    background:     'rgba(74,222,128,0.14)',
                    color:          'rgba(74,222,128,0.95)',
                    fontFamily:     "'Inter', sans-serif",
                    fontSize:       '13px',
                    fontWeight:     600,
                    cursor:         'pointer',
                    transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                    boxShadow:      'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.22)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.50), 0 2px 20px rgba(74,222,128,0.16)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.14)';
                    e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)';
                  }}
                >
                  {replaceMode ? 'Confirm Replacement' : 'Confirm Placement'}
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* ── CENTERED UPLOAD MODAL (idle step) ── */}
      {addSubView === 'upload' && uploadStep === 'idle' && (
        <>
          {/* Overlay */}
          <div
            onClick={() => {
              uploadedImages.forEach(u => URL.revokeObjectURL(u));
              setUploadedImages([]);
              setUploadedImageUrl(null);
              setAddSubView('options');
            }}
            style={{
              position:           'fixed',
              inset:              0,
              zIndex:             9000,
              background:         'rgba(0,0,0,0.55)',
              backdropFilter:     'blur(12px)',
              WebkitBackdropFilter:'blur(12px)',
              animation:          'captureOverlayIn 160ms ease-out both',
            }}
          />
          {/* Modal card */}
          <div style={{
            position:           'fixed',
            top:                '50%',
            left:               '50%',
            transform:          'translate(-50%, -50%)',
            zIndex:             9001,
            width:              '520px',
            borderRadius:       '16px',
            background:         'rgba(20,20,20,0.85)',
            backdropFilter:     'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',
            borderWidth:        0,
            boxShadow:          'inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)',
            padding:            '28px',
            animation:          'placementModalIn 160ms ease-out both',
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span style={{
                fontFamily:   "'Inter', sans-serif",
                fontSize:     '16px',
                fontWeight:   600,
                color:        'rgba(255,255,255,0.92)',
                letterSpacing:'-0.2px',
              }}>
                Upload Component Images
              </span>
              {/* Close X */}
              <button
                onClick={() => {
                  uploadedImages.forEach(u => URL.revokeObjectURL(u));
                  setUploadedImages([]);
                  setUploadedImageUrl(null);
                  setAddSubView('options');
                }}
                style={{
                  background:   'none',
                  borderWidth:  0,
                  padding:      '4px',
                  cursor:       'pointer',
                  color:        'rgba(255,255,255,0.40)',
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent:'center',
                  borderRadius: '6px',
                  transition:   'color 140ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.40)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Subtitle */}
            <span style={{
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '13px',
              fontWeight:   400,
              color:        'rgba(255,255,255,0.40)',
              lineHeight:   '1.5',
              display:      'block',
              marginBottom: '20px',
            }}>
              Upload up to 3 images of the object you want to add.
            </span>

            {/* Upload strip */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              {/* Uploaded thumbnails */}
              {uploadedImages.map((imgUrl, idx) => (
                <div key={idx} style={{
                  width:        '120px',
                  height:       '100px',
                  borderRadius: '12px',
                  position:     'relative',
                  overflow:     'hidden',
                  flexShrink:   0,
                  boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.10)',
                  animation:    'captureOverlayIn 140ms ease-out both',
                }}>
                  <img
                    src={imgUrl}
                    alt={`Upload ${idx + 1}`}
                    style={{
                      width:     '100%',
                      height:    '100%',
                      objectFit: 'cover',
                      display:   'block',
                    }}
                  />
                  {/* Remove X */}
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(imgUrl);
                      setUploadedImages(prev => prev.filter((_, i) => i !== idx));
                      if (uploadedImageUrl === imgUrl) {
                        const remaining = uploadedImages.filter((_, i) => i !== idx);
                        setUploadedImageUrl(remaining.length > 0 ? remaining[0] : null);
                      }
                    }}
                    style={{
                      position:     'absolute',
                      top:          '6px',
                      right:        '6px',
                      width:        '20px',
                      height:       '20px',
                      borderRadius: '50%',
                      borderWidth:  0,
                      background:   'rgba(0,0,0,0.60)',
                      backdropFilter: 'blur(4px)',
                      color:        'rgba(255,255,255,0.85)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent:'center',
                      cursor:       'pointer',
                      padding:      0,
                      transition:   'background 120ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.80)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.60)'; }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Empty upload slot */}
              {uploadedImages.length < 3 && (
                <div
                  onClick={() => uploadFileRef.current?.click()}
                  style={{
                    width:        '120px',
                    height:       '100px',
                    borderRadius: '12px',
                    borderWidth:  '1.5px',
                    borderStyle:  'dashed',
                    borderColor:  'rgba(255,255,255,0.14)',
                    background:   'rgba(255,255,255,0.02)',
                    display:      'flex',
                    flexDirection:'column',
                    alignItems:   'center',
                    justifyContent:'center',
                    gap:          '6px',
                    cursor:       'pointer',
                    flexShrink:   0,
                    transition:   'border-color 140ms ease, background 140ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)';
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize:   '11px',
                    fontWeight:  400,
                    color:      'rgba(255,255,255,0.30)',
                    lineHeight: '1.3',
                    textAlign:  'center',
                  }}>
                    Drop or<br />browse
                  </span>
                </div>
              )}
            </div>

            {/* Upload count */}
            <span style={{
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '12px',
              fontWeight:   400,
              color:        'rgba(255,255,255,0.35)',
              display:      'block',
              marginBottom: '22px',
            }}>
              {uploadedImages.length} / 3 uploaded
            </span>

            {/* Bottom actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => {
                  uploadedImages.forEach(u => URL.revokeObjectURL(u));
                  setUploadedImages([]);
                  setUploadedImageUrl(null);
                  setAddSubView('options');
                }}
                style={{
                  height:       '38px',
                  padding:      '0 22px',
                  borderRadius: '10px',
                  borderWidth:  0,
                  background:   'rgba(255,255,255,0.06)',
                  color:        'rgba(255,255,255,0.65)',
                  fontFamily:   "'Inter', sans-serif",
                  fontSize:     '13px',
                  fontWeight:   500,
                  cursor:       'pointer',
                  transition:   'background 140ms ease, box-shadow 140ms ease',
                  boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                Cancel
              </button>
              <button
                disabled={uploadedImages.length === 0}
                onClick={() => {
                  if (uploadedImages.length > 0) {
                    setUploadedImageUrl(uploadedImages[0]);
                    setUploadStep('processing');
                    scanTimerRef.current = setTimeout(() => {
                      setUploadStep('detected');
                    }, 1800);
                  }
                }}
                style={{
                  height:       '38px',
                  padding:      '0 28px',
                  borderRadius: '10px',
                  borderWidth:  0,
                  background:   uploadedImages.length > 0 ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.04)',
                  color:        uploadedImages.length > 0 ? 'rgba(74,222,128,0.90)' : 'rgba(255,255,255,0.25)',
                  fontFamily:   "'Inter', sans-serif",
                  fontSize:     '13px',
                  fontWeight:   600,
                  cursor:       uploadedImages.length > 0 ? 'pointer' : 'default',
                  transition:   'background 140ms ease, box-shadow 140ms ease',
                  boxShadow:    uploadedImages.length > 0
                    ? 'inset 0 0 0 1px rgba(74,222,128,0.22)'
                    : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  if (uploadedImages.length > 0) e.currentTarget.style.background = 'rgba(74,222,128,0.20)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = uploadedImages.length > 0 ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.04)';
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── UPLOAD PLACEMENT CONFIRMATION MODAL ── */}
      {showUploadPlacementModal && uploadedImageUrl && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowUploadPlacementModal(false)}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     900,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              animation:  'captureOverlayIn 140ms ease-out both',
            }}
          />
          {/* Modal card */}
          <div
            style={{
              position:             'fixed',
              top:                  '50%',
              left:                 '50%',
              transform:            'translate(-50%, -50%)',
              zIndex:               901,
              width:                '420px',
              borderRadius:         '16px',
              background:           'rgba(24,24,28,0.92)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderWidth:          0,
              boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 16px 64px rgba(0,0,0,0.50), 0 4px 16px rgba(0,0,0,0.30)',
              padding:              '24px',
              animation:            'placementModalIn 140ms ease-out both',
            }}
          >
            {/* Title */}
            <h3 style={{
              margin:       0,
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '17px',
              fontWeight:   600,
              color:        'rgba(255,255,255,0.94)',
              lineHeight:   '1.35',
              letterSpacing: '-0.2px',
            }}>
              {replaceMode ? 'Finalize Component Replacement' : 'Finalize Component Placement'}
            </h3>

            {/* Subtitle */}
            <p style={{
              margin:       '8px 0 0',
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '13px',
              fontWeight:   400,
              color:        'rgba(255,255,255,0.50)',
              lineHeight:   '1.55',
            }}>
              {replaceMode
                ? 'Do you want to replace the existing component with this one?'
                : 'Do you want to add this detected component to the selected area on the canvas?'}
            </p>

            {/* Preview card */}
            <div style={{
              marginTop:    '18px',
              borderRadius: '12px',
              overflow:     'hidden',
              background:   'rgba(255,255,255,0.03)',
              borderWidth:  0,
              boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.07)',
            }}>
              <img
                src={uploadedImageUrl}
                alt="Detected component"
                style={{
                  width:      '100%',
                  height:     '180px',
                  objectFit:  'cover',
                  display:    'block',
                }}
              />
              <div style={{
                padding:    '10px 14px',
              }}>
                <p style={{
                  margin:     0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '14px',
                  fontWeight:  500,
                  color:      'rgba(255,255,255,0.88)',
                  lineHeight: '1.35',
                }}>
                  Detected Component
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display:    'flex',
              gap:        '12px',
              marginTop:  '20px',
            }}>
              {/* Cancel */}
              <button
                onClick={() => setShowUploadPlacementModal(false)}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(255,255,255,0.06)',
                  color:          'rgba(255,255,255,0.70)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     500,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.10)';
                }}
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={() => {
                  if (uploadedImageUrl) {
                    if (replaceMode && placedSofas.length > 0) {
                      const targetId = placedSofas[placedSofas.length - 1].id;
                      setPlacedSofas(prev => prev.map((p, i) =>
                        i === prev.length - 1
                          ? { ...p, sofaId: 'upload', img: uploadedImageUrl!, name: 'Uploaded Component' }
                          : p
                      ));
                      triggerReplacedGlow(targetId);
                    } else {
                      setPlacedSofas(prev => [...prev, {
                        id: `placed-${Date.now()}`,
                        sofaId: 'upload',
                        img: uploadedImageUrl,
                        name: 'Uploaded Component',
                      }]);
                    }
                  }
                  resetFlowState();
                }}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(74,222,128,0.14)',
                  color:          'rgba(74,222,128,0.95)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     600,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(74,222,128,0.22)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.50), 0 2px 20px rgba(74,222,128,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(74,222,128,0.14)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)';
                }}
              >
                {replaceMode ? 'Confirm Replacement' : 'Confirm Placement'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── GENERATE PLACEMENT CONFIRMATION MODAL ── */}
      {showGeneratePlacementModal && generatedImageUrl && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowGeneratePlacementModal(false)}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     900,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              animation:  'captureOverlayIn 140ms ease-out both',
            }}
          />
          {/* Modal card */}
          <div
            style={{
              position:             'fixed',
              top:                  '50%',
              left:                 '50%',
              transform:            'translate(-50%, -50%)',
              zIndex:               901,
              width:                '420px',
              borderRadius:         '16px',
              background:           'rgba(24,24,28,0.92)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderWidth:          0,
              boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 16px 64px rgba(0,0,0,0.50), 0 4px 16px rgba(0,0,0,0.30)',
              padding:              '24px',
              animation:            'placementModalIn 140ms ease-out both',
            }}
          >
            {/* Title */}
            <h3 style={{
              margin:       0,
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '17px',
              fontWeight:   600,
              color:        'rgba(255,255,255,0.94)',
              lineHeight:   '1.35',
              letterSpacing: '-0.2px',
            }}>
              {replaceMode ? 'Finalize Component Replacement' : 'Finalize Component Placement'}
            </h3>

            {/* Subtitle */}
            <p style={{
              margin:       '8px 0 0',
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '13px',
              fontWeight:   400,
              color:        'rgba(255,255,255,0.50)',
              lineHeight:   '1.55',
            }}>
              {replaceMode
                ? 'Do you want to replace the existing component with this one?'
                : 'Do you want to add this AI-generated component to the selected area on the canvas?'}
            </p>

            {/* Preview card */}
            <div style={{
              marginTop:    '18px',
              borderRadius: '12px',
              overflow:     'hidden',
              background:   'rgba(255,255,255,0.03)',
              borderWidth:  0,
              boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.07)',
            }}>
              <img
                src={generatedImageUrl}
                alt="Generated component"
                style={{
                  width:      '100%',
                  height:     '180px',
                  objectFit:  'cover',
                  display:    'block',
                }}
              />
              <div style={{ padding: '10px 14px' }}>
                <p style={{
                  margin:     0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '14px',
                  fontWeight:  500,
                  color:      'rgba(255,255,255,0.88)',
                  lineHeight: '1.35',
                }}>
                  AI-Generated Component
                </p>
                <p style={{
                  margin:     '4px 0 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '11px',
                  fontWeight:  400,
                  color:      'rgba(255,255,255,0.38)',
                  lineHeight: '1.45',
                  overflow:   'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {generatePrompt || 'Text prompt generated'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display:    'flex',
              gap:        '12px',
              marginTop:  '20px',
            }}>
              {/* Cancel */}
              <button
                onClick={() => setShowGeneratePlacementModal(false)}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(255,255,255,0.06)',
                  color:          'rgba(255,255,255,0.70)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     500,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.10)';
                }}
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={() => {
                  if (generatedImageUrl) {
                    if (replaceMode && placedSofas.length > 0) {
                      const targetId = placedSofas[placedSofas.length - 1].id;
                      setPlacedSofas(prev => prev.map((p, i) =>
                        i === prev.length - 1
                          ? { ...p, sofaId: 'generated', img: generatedImageUrl!, name: 'AI-Generated Component' }
                          : p
                      ));
                      triggerReplacedGlow(targetId);
                    } else {
                      setPlacedSofas(prev => [...prev, {
                        id: `placed-${Date.now()}`,
                        sofaId: 'generated',
                        img: generatedImageUrl,
                        name: 'AI-Generated Component',
                      }]);
                    }
                  }
                  resetFlowState();
                }}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(74,222,128,0.14)',
                  color:          'rgba(74,222,128,0.95)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     600,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(74,222,128,0.22)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.50), 0 2px 20px rgba(74,222,128,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(74,222,128,0.14)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(74,222,128,0.35), 0 2px 12px rgba(74,222,128,0.10)';
                }}
              >
                {replaceMode ? 'Confirm Replacement' : 'Confirm Placement'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── ERASE CONFIRMATION MODAL ── */}
      {showEraseModal && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowEraseModal(false)}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     900,
              background: 'rgba(0,0,0,0.40)',
              animation:  'captureOverlayIn 140ms ease-out both',
            }}
          />
          {/* Modal card */}
          <div
            style={{
              position:             'fixed',
              top:                  '50%',
              left:                 '50%',
              transform:            'translate(-50%, -50%)',
              zIndex:               901,
              width:                '420px',
              borderRadius:         '16px',
              background:           'rgba(24,24,28,0.92)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderWidth:          0,
              boxShadow:            'inset 0 0 0 1px rgba(255,255,255,0.10), 0 16px 64px rgba(0,0,0,0.50), 0 4px 16px rgba(0,0,0,0.30)',
              padding:              '24px',
              animation:            'placementModalIn 140ms ease-out both',
            }}
          >
            {/* Title */}
            <h3 style={{
              margin:       0,
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '17px',
              fontWeight:   600,
              color:        'rgba(255,255,255,0.94)',
              lineHeight:   '1.35',
              letterSpacing: '-0.2px',
            }}>
              Confirm Object Erasure
            </h3>

            {/* Subtitle */}
            <p style={{
              margin:       '8px 0 0',
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '13px',
              fontWeight:   400,
              color:        'rgba(255,255,255,0.50)',
              lineHeight:   '1.55',
            }}>
              Do you want to remove this selected object from the canvas?
            </p>

            {/* Preview card */}
            <div style={{
              marginTop:    '18px',
              borderRadius: '12px',
              overflow:     'hidden',
              background:   'rgba(255,255,255,0.03)',
              borderWidth:  0,
              boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.07)',
            }}>
              <img
                src={currentImage}
                alt="Object to erase"
                style={{
                  width:      '100%',
                  height:     '120px',
                  objectFit:  'cover',
                  display:    'block',
                  filter:     'brightness(0.9)',
                }}
              />
              <div style={{ padding: '10px 14px' }}>
                <p style={{
                  margin:     0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '14px',
                  fontWeight:  500,
                  color:      'rgba(255,255,255,0.88)',
                  lineHeight: '1.35',
                }}>
                  Selected Object
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display:    'flex',
              gap:        '12px',
              marginTop:  '20px',
            }}>
              {/* Cancel */}
              <button
                onClick={() => setShowEraseModal(false)}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(255,255,255,0.06)',
                  color:          'rgba(255,255,255,0.70)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     500,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(255,255,255,0.10)';
                }}
              >
                Cancel
              </button>

              {/* Confirm Erase */}
              <button
                onClick={() => {
                  // Store current image in redo stack
                  setImageStack(s => [...s, currentImage]);
                  // "Erase" — fill with the original/bare image
                  setCurrentImage(ORIGINAL_IMG);
                  // Remove the last placed component if any
                  if (placedSofas.length > 0) {
                    setPlacedSofas(prev => prev.slice(0, -1));
                  }
                  resetFlowState();
                }}
                style={{
                  flex:           1,
                  height:         '40px',
                  borderRadius:   '10px',
                  borderWidth:    0,
                  background:     'rgba(239,68,68,0.14)',
                  color:          'rgba(239,68,68,0.95)',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     600,
                  cursor:         'pointer',
                  transition:     'background 140ms ease-out, box-shadow 140ms ease-out',
                  boxShadow:      'inset 0 0 0 1px rgba(239,68,68,0.35), 0 2px 12px rgba(239,68,68,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(239,68,68,0.22)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(239,68,68,0.50), 0 2px 20px rgba(239,68,68,0.16)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(239,68,68,0.14)';
                  e.currentTarget.style.boxShadow    = 'inset 0 0 0 1px rgba(239,68,68,0.35), 0 2px 12px rgba(239,68,68,0.10)';
                }}
              >
                Confirm Erase
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}