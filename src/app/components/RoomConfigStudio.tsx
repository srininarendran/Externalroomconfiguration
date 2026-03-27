import { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Building2, X, ImagePlus, Upload } from 'lucide-react';
import imgContainer from "figma:asset/cbb61108720d04d2ff8d142ee51098e6c2f1f1ef.png";
import imgImageRobot from "figma:asset/6854101e0adfcbe57d7b01a404b895b405fd650c.png";

const STEPS = [
  { label: 'Mode',      done: true  },
  { label: 'Upload',    done: true  },
  { label: 'Select',    done: false },
  { label: 'Configure', done: false },
] as const;

const CARDS = [
  {
    title: 'Internal Configuration',
    Icon:  LayoutDashboard,
    desc:  'Configure room layouts, partitions, and internal spatial arrangements.',
  },
  {
    title: 'External Configuration',
    Icon:  Building2,
    desc:  'Set exterior facades, building elevations, and outer structures.',
  },
] as const;

const STYLES = [
  { name: 'Modern',          img: 'https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Minimalist',      img: 'https://images.unsplash.com/photo-1564610863211-d4f77e197c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Rustic',          img: 'https://images.unsplash.com/photo-1760077248546-0bee8048a4c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Luxury',          img: 'https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Tropical',        img: 'https://images.unsplash.com/photo-1763878121493-cefae6d5e66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Cozy',            img: 'https://images.unsplash.com/photo-1767710924314-def0e691dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Farmhouse',       img: 'https://images.unsplash.com/photo-1765987390566-0ed7ab0bf722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Mediterranean',   img: 'https://images.unsplash.com/photo-1761347604372-ae52634c690a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Midcentury',      img: 'https://images.unsplash.com/photo-1709056330726-00a8ea31059a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Zen',             img: 'https://images.unsplash.com/photo-1771389804896-a8a5324f5df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Scandinavian',    img: 'https://images.unsplash.com/photo-1594468244287-81206de65083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Bohemian',        img: 'https://images.unsplash.com/photo-1656424427230-c846584f72e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Contemporary',    img: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Traditional',     img: 'https://images.unsplash.com/photo-1769060686975-6d3c4c54948a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Industrial',      img: 'https://images.unsplash.com/photo-1758789667762-56175fe4601c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Coastal',         img: 'https://images.unsplash.com/photo-1511840831832-3efd661c1d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Art Deco',        img: 'https://images.unsplash.com/photo-1771665374839-a12f852df22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Japanese',        img: 'https://images.unsplash.com/photo-1621565854953-04850d19ec3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Transitional',    img: 'https://images.unsplash.com/photo-1762979790878-301b3d9962f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Industrial Loft', img: 'https://images.unsplash.com/photo-1618522786784-88c35429eb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

const PALETTES = [
  { name: 'Surprise Me',            desc: 'Let AI pick the perfect mix',         colors: ['#8B5CF6', '#06B6D4', '#F59E0B'] },
  { name: 'High-Contrast Neutrals', desc: 'Bold blacks, whites and grays',        colors: ['#D0D0D0', '#C8B9A0', '#1A1A1A'] },
  { name: 'Forest-Inspired',        desc: 'Deep greens and earthy browns',        colors: ['#1B5E20', '#6B7C37', '#C8A87A'] },
  { name: 'Romance',                desc: 'Soft pinks, blush and rose',           colors: ['#FBBBD3', '#E05580', '#9B2551'] },
  { name: 'Ocean Breeze',           desc: 'Crisp blues and soft seafoam',         colors: ['#BAE6FD', '#06B6D4', '#1E40AF'] },
  { name: 'Sunset Warmth',          desc: 'Warm oranges, reds and golden hues',   colors: ['#FCD34D', '#F97316', '#DC2626'] },
  { name: 'Earth Tones',            desc: 'Terracotta, sand and warm browns',     colors: ['#D05A2A', '#C8956C', '#7B4B2A'] },
  { name: 'Monochrome',             desc: 'Timeless shades of grey',              colors: ['#E8E8E8', '#888888', '#222222'] },
  { name: 'Jewel Tones',            desc: 'Rich emerald, sapphire and amethyst',  colors: ['#059669', '#2563EB', '#7C3AED'] },
  { name: 'Pastel Dreams',          desc: 'Soft lavender, mint and blush',        colors: ['#C4B5FD', '#86EFAC', '#FBCFE8'] },
  { name: 'Industrial',             desc: 'Raw steel, charcoal and rust',         colors: ['#94A3B8', '#374151', '#B45309'] },
  { name: 'Coastal Serenity',       desc: 'Sandy beige, sky blue and white',      colors: ['#D4A96A', '#60A5FA', '#BFEDE8'] },
  { name: 'Autumn Harvest',         desc: 'Burnt orange, gold and red-brown',     colors: ['#EA580C', '#EAB308', '#7C2D12'] },
  { name: 'Lavender Mist',          desc: 'Soft purple, lilac and cool white',    colors: ['#7C3AED', '#C4B5FD', '#EDE9FE'] },
];

export function RoomConfigStudio({ onModalChange, onGenerate }: { onModalChange?: (active: boolean) => void; onGenerate?: (data: { style: string | null; palette: string | null; referenceCount: number; selectedImageUrl: string | null }) => void }) {
  const [hoveredCard,     setHoveredCard]     = useState<string | null>(null);
  const [activeModal,     setActiveModal]     = useState<'internal' | 'external' | null>(null);
  const [internalImages,  setInternalImages]  = useState<(string | null)[]>(Array(6).fill(null));
  const [externalImages,  setExternalImages]  = useState<(string | null)[]>(Array(6).fill(null));
  const fileRefs          = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const rafRef            = useRef<number | null>(null);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [analysisDone,    setAnalysisDone]    = useState(false);
  const [analysisResult,  setAnalysisResult]  = useState<'valid' | 'invalid' | null>(null);
  const [selectedImage,   setSelectedImage]   = useState<number | null>(null);
  const [modalStep,       setModalStep]       = useState<'upload' | 'styleSelect' | 'paletteSelect' | 'referencePrefs'>('upload');
  const [selectedStyle,   setSelectedStyle]   = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [prefsDescription, setPrefsDescription] = useState('');
  const refImageInputRef = useRef<HTMLInputElement | null>(null);

  // Refs to track latest state for unmount cleanup (avoids stale closure)
  const internalImagesRef  = useRef(internalImages);
  const externalImagesRef  = useRef(externalImages);
  const referenceImagesRef = useRef(referenceImages);
  const handedOffUrlRef    = useRef<string | null>(null);
  internalImagesRef.current  = internalImages;
  externalImagesRef.current  = externalImages;
  referenceImagesRef.current = referenceImages;

  const uploadedImages    = activeModal === 'internal' ? internalImages : externalImages;
  const setUploadedImages = activeModal === 'internal' ? setInternalImages : setExternalImages;

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedImages(prev => {
      const next = [...prev];
      // Revoke previous blob URL to prevent memory leak
      if (next[index]) URL.revokeObjectURL(next[index]!);
      next[index] = url;
      return next;
    });
  };

  const handleCloseModal = () => {
    // Revoke all blob URLs to prevent memory leaks
    uploadedImages.forEach(u => { if (u) URL.revokeObjectURL(u); });
    referenceImages.forEach(u => URL.revokeObjectURL(u));
    setUploadedImages(Array(6).fill(null));
    setActiveModal(null);
    setAnalyzeProgress(0);
    setAnalysisDone(false);
    setAnalysisResult(null);
    setSelectedImage(null);
    setModalStep('upload');
    setSelectedStyle(null);
    setSelectedPalette(null);
    setReferenceImages([]);
    setPrefsDescription('');
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const filledCount   = uploadedImages.filter(Boolean).length;
  const allFilled     = filledCount >= 4;
  const showAnalyzing = filledCount >= 4;
  const buttonActive  = allFilled && analysisResult !== 'invalid';

  useEffect(() => {
    if (!showAnalyzing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setAnalyzeProgress(0);
      setAnalysisDone(false);
      setAnalysisResult(null);
      setSelectedImage(null);
      return;
    }
    setAnalyzeProgress(0);
    setAnalysisDone(false);
    setAnalysisResult(null);
    setSelectedImage(null);
    const target    = 100;
    const duration  = 2800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t      = Math.min((now - startTime) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      setAnalyzeProgress(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnalyzing, activeModal]);

  useEffect(() => {
    if (analyzeProgress === 100 && !analysisDone) {
      const timer = setTimeout(() => {
        setAnalysisDone(true);
        const filled   = uploadedImages.filter(Boolean);
        const allValid = filled.every(() => Math.random() > 0.20);
        setAnalysisResult(allValid ? 'valid' : 'invalid');
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [analyzeProgress, analysisDone, uploadedImages]);

  /* Revoke all blob URLs on unmount to prevent memory leaks.
     Uses refs so the cleanup always sees the latest state values.
     Excludes the URL handed off to the parent via onGenerate. */
  useEffect(() => {
    return () => {
      const handedOff = handedOffUrlRef.current;
      internalImagesRef.current.forEach(u => { if (u && u !== handedOff) URL.revokeObjectURL(u); });
      externalImagesRef.current.forEach(u => { if (u && u !== handedOff) URL.revokeObjectURL(u); });
      referenceImagesRef.current.forEach(u => { if (u !== handedOff) URL.revokeObjectURL(u); });
    };
  }, []);

  /* Notify parent whenever modal opens / closes */
  useEffect(() => {
    onModalChange?.(!!activeModal);
  }, [activeModal, onModalChange]);

  return (
    <div
      style={{
        position:      'relative',
        width:         '100%',
        height:        '100%',
        background:    'transparent',
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        fontFamily:    "'Inter', sans-serif",
        paddingTop:    '48px',
      }}
    >
      <style>{`
        @keyframes rcs-bot-breathe {
          0%, 100% { transform: scale(1);      filter: drop-shadow(0 0 14px rgba(236,72,153,0.42)) drop-shadow(0 0 30px rgba(236,72,153,0.20)); }
          50%       { transform: scale(1.028); filter: drop-shadow(0 0 22px rgba(236,72,153,0.52)) drop-shadow(0 0 44px rgba(236,72,153,0.26)); }
        }
        .rcs-bot { animation: rcs-bot-breathe 1900ms ease-in-out infinite; }

        @keyframes rcs-glow-pulse {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 1;    }
        }
        .rcs-active-glow { animation: rcs-glow-pulse 2200ms ease-in-out infinite; }

        @keyframes rcs-analyze-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255,255,255,0.55), 0 0 22px rgba(255,255,255,0.22); }
          50%       { box-shadow: 0 0 16px rgba(255,255,255,0.80), 0 0 34px rgba(255,255,255,0.36); }
        }
        .rcs-analyze-fill { animation: rcs-analyze-glow 1600ms ease-in-out infinite; }

        .rcs-style-grid::-webkit-scrollbar { width: 4px; }
        .rcs-style-grid::-webkit-scrollbar-track { background: transparent; }
        .rcs-style-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
      `}</style>

      {/* ── Blur overlay lives in UploadFloorPlan root stacking context ── */}

      {/* Main body — NO zIndex so it doesn't form a stacking context.        */}
      {/* Hero text & cards stay in category-6 (below blur at z=50).          */}
      {/* Stepper's z=100 propagates directly to motion.div SC (above blur).  */}
      <div
        style={{
          position:  'relative',
          flex:      1,
          display:   'flex',
          padding:   '24px 32px 24px 136px',
          minHeight: 0,
          overflow:  'hidden',
        }}
      >
        {/* Central area */}
        <div
          style={{
            position:       'relative',
            flex:           1,
            minHeight:      0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'flex-start',
            gap:            '40px',
            paddingTop:     '28px',
            paddingLeft:    '20px',
            paddingRight:   '20px',
            overflowY:      'auto',
          }}
        >
          {/* Blur overlay — REMOVED from here, now lives at root level above */}

          {/* Progress tracker */}
          <div style={{ position: 'relative', zIndex: 100, width: '100%', maxWidth: '720px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {STEPS.map((step, i) => {
                const prevDone = i > 0 && STEPS[i - 1].done && step.done;
                const nextDone = i < STEPS.length - 1 && step.done && STEPS[i + 1].done;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      {/* Left connector */}
                      <div style={{
                        flex:         1,
                        height:       '2px',
                        borderRadius: '2px',
                        background:   i === 0 ? 'transparent'
                          : prevDone
                            ? 'linear-gradient(90deg, rgba(47,122,85,0.55), rgba(141,227,181,0.85))'
                            : 'rgba(255,255,255,0.08)',
                        filter: (i !== 0 && prevDone)
                          ? 'drop-shadow(0 0 4px rgba(74,222,128,0.55))'
                          : 'none',
                      }} />

                      {/* Step circle */}
                      <div style={{
                        width:                '38px',
                        height:               '38px',
                        borderRadius:         '50%',
                        flexShrink:           0,
                        position:             'relative',
                        display:              'flex',
                        alignItems:           'center',
                        justifyContent:       'center',
                        background:           step.done
                          ? 'radial-gradient(circle at 38% 36%, rgba(74,222,128,0.92) 0%, rgba(34,197,94,0.68) 48%, rgba(22,163,74,0.88) 100%)'
                          : 'rgba(255,255,255,0.044)',
                        borderWidth:          step.done ? '1px' : '1.5px',
                        borderStyle:          'solid',
                        borderColor:          step.done ? 'rgba(134,239,172,0.40)' : 'rgba(255,255,255,0.12)',
                        boxShadow:            step.done
                          ? '0 0 14px rgba(34,197,94,0.55), 0 0 30px rgba(34,197,94,0.22), inset 0 -4px 9px rgba(0,0,0,0.30), inset 0 1px 2px rgba(255,255,255,0.28)'
                          : 'none',
                        backdropFilter:       step.done ? 'blur(20px)' : 'blur(10px)',
                        WebkitBackdropFilter: step.done ? 'blur(20px)' : 'blur(10px)',
                        overflow:             'hidden',
                      }}>
                        {step.done && (
                          <>
                            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 36%, transparent 58%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(142deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.07) 36%, transparent 58%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.26) 0%, transparent 46%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ['radial-gradient(circle at 68% 22%, rgba(255,255,255,0.50) 0%, transparent 16%)', 'radial-gradient(circle at 78% 34%, rgba(255,255,255,0.18) 0%, transparent 10%)'].join(', '), pointerEvents: 'none' }} />
                          </>
                        )}
                        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {step.done ? (
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                              <path d="M2.5 7.5L6 11L12.5 4.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <span style={{ color: 'rgba(255,255,255,0.24)', fontSize: '11px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right connector */}
                      <div style={{
                        flex:         1,
                        height:       '2px',
                        borderRadius: '2px',
                        background:   i === STEPS.length - 1 ? 'transparent'
                          : nextDone
                            ? 'linear-gradient(90deg, rgba(141,227,181,0.85), rgba(47,122,85,0.55))'
                            : 'rgba(255,255,255,0.08)',
                        filter: (i !== STEPS.length - 1 && nextDone)
                          ? 'drop-shadow(0 0 4px rgba(74,222,128,0.55))'
                          : 'none',
                      }} />
                    </div>

                    <span style={{
                      marginTop:     '10px',
                      color:         step.done ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.22)',
                      fontSize:      '11px',
                      fontWeight:    step.done ? 500 : 400,
                      letterSpacing: '0.20px',
                      textAlign:     'center',
                      whiteSpace:    'nowrap',
                      fontFamily:    "'Inter', sans-serif",
                    }}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero text */}
          <div style={{ width: '100%', maxWidth: '820px', textAlign: 'center' }}>
            <h1 style={{ margin: 0, marginBottom: '13px', fontFamily: "'Inter', sans-serif", fontSize: '31px', fontWeight: 600, color: '#f4f0e6', letterSpacing: '0px', lineHeight: 1.18 }}>
              AI Room Configuration Studio
            </h1>
            <p style={{ margin: '0 auto', fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 400, color: 'rgba(255,255,255,0.44)', letterSpacing: '-0.10px', lineHeight: '1.66', maxWidth: '520px' }}>
              Select Internal or External configuration, upload images, then let AI
              detect and reconfigure with full or component-based controls.
            </p>
          </div>

          {/* Configuration cards */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
            {CARDS.map(({ title, Icon, desc }) => {
              const isHovered  = hoveredCard === title;
              const isInternal = title === 'Internal Configuration';
              return (
                <div
                  key={title}
                  onMouseEnter={() => setHoveredCard(title)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    width:                '300px',
                    borderRadius:         '22px',
                    padding:              '38px 28px 36px',
                    background:           'rgba(255,255,255,0.06)',
                    backdropFilter:       'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    borderWidth:          '1px',
                    borderStyle:          'solid',
                    borderColor:          isHovered ? 'rgba(255,255,255,0.70)' : 'rgba(255,255,255,0.18)',
                    boxShadow:            isHovered ? '0px 0px 30px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.07)' : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 52px rgba(0,0,0,0.36)',
                    transform:            isHovered ? 'translateY(-5px)' : 'translateY(0)',
                    display:              'flex',
                    flexDirection:        'column',
                    alignItems:           'center',
                    gap:                  '14px',
                    cursor:               'pointer',
                    transition:           'all 200ms ease',
                  }}
                >
                  <div style={{
                    width:          '58px',
                    height:         '58px',
                    borderRadius:   '16px',
                    background:     isHovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.055)',
                    borderWidth:    '1px',
                    borderStyle:    'solid',
                    borderColor:    isHovered ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.09)',
                    boxShadow:      isHovered ? '0 0 20px rgba(255,255,255,0.12)' : 'none',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                    transition:     'all 200ms ease',
                  }}>
                    <Icon size={26} style={{ color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.80)', filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.45))' : 'none', transition: 'all 200ms ease' }} />
                  </div>

                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.92)', textAlign: 'center', lineHeight: 1.22 }}>
                    {title}
                  </span>

                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: '1.62', maxWidth: '218px' }}>
                    {desc}
                  </span>

                  <div
                    onClick={isInternal ? () => setActiveModal('internal') : () => setActiveModal('external')}
                    style={{
                      marginTop:      '8px',
                      background:     isHovered ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.07)',
                      borderRadius:   '10px',
                      height:         '43px',
                      width:          '140px',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      cursor:         'pointer',
                      borderWidth:    isHovered ? '1.5px' : '1px',
                      borderStyle:    'solid',
                      borderColor:    isHovered ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.11)',
                      boxShadow:      isHovered ? '0px 0px 18px rgba(255,255,255,0.22), inset 0px 1px 2px rgba(255,255,255,0.08)' : 'none',
                      transition:     'all 200ms ease',
                      flexShrink:     0,
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.80)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.10px', transition: 'color 200ms ease' }}>
                      Get Started
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Floating bot — zIndex:60 keeps it above blur (50) when modal is open */}
      <div style={{ position: 'absolute', bottom: '24px', right: '30px', zIndex: 60, cursor: 'pointer' }}>
        <img
          src={imgImageRobot}
          alt="AI Assistant"
          className="rcs-bot"
          style={{ width: '78px', height: '78px', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      {activeModal && (
        <div
          onClick={handleCloseModal}
          style={{
            position:       'fixed',
            top:            '48px',
            left:           '112px',
            right:          0,
            bottom:         0,
            zIndex:         200,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            paddingTop:     '80px',
            paddingBottom:  '24px',
            overflowY:      'auto',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width:                '620px',
              height:               '441px',
              borderRadius:         '24px',
              background:           'rgba(18,18,20,0.82)',
              backdropFilter:       'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderWidth:          0,
              boxShadow:            '0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.10)',
              display:              'flex',
              flexDirection:        'column',
              overflow:             'hidden',
            }}
          >

            {/* ══ STEP 1 — UPLOAD ══════════════════════════════════ */}
            {modalStep === 'upload' && (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 32px 0' }}>
                  <div>
                    <h2 style={{ margin: 0, marginBottom: '7px', fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 600, color: '#f4f0e6', lineHeight: 1.2 }}>
                      Upload Exterior Images
                    </h2>
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                      Upload 4 to 6 images for AI detection
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 180ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  >
                    <X size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                  </button>
                </div>

                {/* Upload grid 3×2 */}
                <div style={{
                  flex:                '1',
                  minHeight:           0,
                  padding:             '14px 32px',
                  display:             'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows:    'repeat(2, 1fr)',
                  columnGap:           '16px',
                  rowGap:              '16px',
                }}>
                  {Array.from({ length: 6 }, (_, i) => {
                    const imgUrl       = uploadedImages[i];
                    const isSelected   = selectedImage === i;
                    const inSelectMode = analysisResult === 'valid';
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (inSelectMode && imgUrl) {
                            setSelectedImage(i);
                          } else if (!inSelectMode) {
                            fileRefs.current[i]?.click();
                          }
                        }}
                        style={{
                          borderRadius:         '12px',
                          borderWidth:          inSelectMode && imgUrl
                            ? isSelected ? '2px' : '1px'
                            : imgUrl ? '1px' : '1.5px',
                          borderStyle:          inSelectMode && imgUrl ? 'solid' : imgUrl ? 'solid' : 'dashed',
                          borderColor:          inSelectMode && imgUrl
                            ? isSelected ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.28)'
                            : imgUrl ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.14)',
                          background:           imgUrl ? 'transparent' : 'rgba(255,255,255,0.030)',
                          backdropFilter:       'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          display:              'flex',
                          flexDirection:        'column',
                          alignItems:           'center',
                          justifyContent:       'center',
                          gap:                  '9px',
                          cursor:               inSelectMode ? (imgUrl ? 'pointer' : 'default') : 'pointer',
                          overflow:             'hidden',
                          position:             'relative',
                          boxShadow:            inSelectMode && isSelected
                            ? '0 0 0 3px rgba(255,255,255,0.14), 0 0 22px rgba(255,255,255,0.16)'
                            : imgUrl ? '0 0 14px rgba(255,255,255,0.10)' : 'none',
                          transition: 'border-color 180ms ease, background 180ms ease, box-shadow 180ms ease',
                        }}
                        onMouseEnter={e => {
                          if (!inSelectMode && !imgUrl) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.45)';
                            (e.currentTarget as HTMLDivElement).style.background  = 'rgba(255,255,255,0.05)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!inSelectMode && !imgUrl) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)';
                            (e.currentTarget as HTMLDivElement).style.background  = 'rgba(255,255,255,0.030)';
                          }
                        }}
                      >
                        <input
                          ref={el => { fileRefs.current[i] = el; }}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={e => handleFileChange(i, e)}
                        />

                        {imgUrl ? (
                          <>
                            <img
                              src={imgUrl}
                              alt={`Room ${i + 1}`}
                              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                            />
                            {inSelectMode && !isSelected && selectedImage !== null && (
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', borderRadius: '12px', zIndex: 1, transition: 'background 180ms ease' }} />
                            )}
                            {inSelectMode ? (
                              isSelected ? (
                                <div style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 12px rgba(255,255,255,0.55)' }}>
                                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              ) : null
                            ) : (
                              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.055)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <ImagePlus size={16} style={{ color: 'rgba(255,255,255,0.38)' }} />
                            </div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10.5px', fontWeight: 400, color: 'rgba(255,255,255,0.32)', textAlign: 'center', lineHeight: 1.5 }}>
                              Drop image or Browse
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Analyzing section */}
                {showAnalyzing && !analysisDone && (
                  <div style={{ padding: '20px 32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.40)', textAlign: 'center' }}>
                      Analyzing images…
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', paddingLeft: '24px', paddingRight: '24px' }}>
                      <div style={{ flex: 1, height: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'visible' }}>
                        <div
                          className="rcs-analyze-fill"
                          style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${analyzeProgress}%`, borderRadius: '8px', background: 'linear-gradient(90deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.92) 100%)', transition: 'width 60ms linear', minWidth: analyzeProgress > 0 ? '8px' : '0' }}
                        />
                        {analyzeProgress > 0 && (
                          <div style={{ position: 'absolute', top: '50%', left: `${analyzeProgress}%`, transform: 'translate(-50%, -50%)', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', borderWidth: 0, boxShadow: '0 0 10px rgba(255,255,255,0.85), 0 0 22px rgba(255,255,255,0.40), inset 0 0 0 2px rgba(255,255,255,0.80)', zIndex: 2, transition: 'left 60ms linear' }} />
                        )}
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', minWidth: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {analyzeProgress}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Post-analysis feedback */}
                {analysisDone && (
                  <div style={{ padding: '16px 56px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%' }}>
                    {analysisResult === 'invalid' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="7" cy="7" r="6.25" stroke="rgba(239,68,68,0.80)" strokeWidth="1.4" />
                          <path d="M7 4.5V7.5" stroke="rgba(239,68,68,0.90)" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="7" cy="9.75" r="0.75" fill="rgba(239,68,68,0.90)" />
                        </svg>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(239,68,68,0.88)', textAlign: 'center', lineHeight: 1.55 }}>
                          Invalid images detected. Please upload clear interior room images.
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.50)', textAlign: 'center', lineHeight: 1.55 }}>
                        Select one image to continue.
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', padding: '12px 32px 16px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', marginRight: 'auto' }}>
                    {filledCount} / 6 uploaded
                  </span>
                  <button
                    onClick={handleCloseModal}
                    style={{ height: '40px', padding: '0 22px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.62)', transition: 'all 180ms ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!buttonActive}
                    onClick={() => { if (buttonActive) setModalStep('styleSelect'); }}
                    style={{ height: '40px', padding: '0 26px', borderRadius: '10px', background: buttonActive ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.04)', borderWidth: buttonActive ? '1.5px' : '1px', borderStyle: 'solid', borderColor: buttonActive ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.08)', boxShadow: buttonActive ? '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)' : 'none', cursor: buttonActive ? 'pointer' : 'not-allowed', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: buttonActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.22)', transition: 'all 200ms ease', opacity: buttonActive ? 1 : 0.55 }}
                  >
                    Configure &amp; Generate
                  </button>
                </div>
              </>
            )}

            {/* ══ STEP 2 — STYLE SELECTION ═════════════════════════ */}
            {modalStep === 'styleSelect' && (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 32px 0' }}>
                  <div>
                    <h2 style={{ margin: 0, marginBottom: '7px', fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 600, color: '#f4f0e6', lineHeight: 1.2 }}>
                      Style Selection
                    </h2>
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                      Choose a design style. The AI will apply this style to your room.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 180ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  >
                    <X size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                  </button>
                </div>

                {/* Style grid — 4 cols, scrollable */}
                <div
                  className="rcs-style-grid"
                  style={{
                    flex:                '1',
                    minHeight:           0,
                    padding:             '14px 32px',
                    display:             'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap:           '16px',
                    rowGap:              '16px',
                    overflowY:           'auto',
                    alignContent:        'start',
                  }}
                >
                  {STYLES.map(style => {
                    const isSel = selectedStyle === style.name;
                    return (
                      <div
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        style={{
                          display:       'flex',
                          flexDirection: 'column',
                          alignItems:    'center',
                          gap:           '8px',
                          padding:       '10px 4px',
                          borderRadius:  '14px',
                          borderWidth:   isSel ? '1.5px' : '1px',
                          borderStyle:   'solid',
                          borderColor:   isSel ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.07)',
                          background:    isSel
                            ? 'rgba(255,255,255,0.09)'
                            : 'rgba(255,255,255,0.025)',
                          boxShadow:     isSel ? '0 0 18px rgba(255,255,255,0.10)' : 'none',
                          cursor:        'pointer',
                          transition:    'all 180ms ease',
                        }}
                        onMouseEnter={e => {
                          if (!isSel) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.22)';
                            (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.055)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSel) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                            (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)';
                          }
                        }}
                      >
                        {/* Circular image */}
                        <div style={{
                          width:        '64px',
                          height:       '64px',
                          borderRadius: '50%',
                          overflow:     'hidden',
                          flexShrink:   0,
                          borderWidth:  isSel ? '2px' : '1.5px',
                          borderStyle:  'solid',
                          borderColor:  isSel ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.18)',
                          boxShadow:    isSel ? '0 0 14px rgba(255,255,255,0.28)' : 'none',
                          transition:   'all 180ms ease',
                        }}>
                          <img
                            src={style.img}
                            alt={style.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        {/* Style name */}
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize:   '10px',
                          fontWeight: isSel ? 500 : 400,
                          color:      isSel ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.50)',
                          textAlign:  'center',
                          lineHeight: 1.3,
                          transition: 'all 180ms ease',
                        }}>
                          {style.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', padding: '12px 32px 16px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', marginRight: 'auto' }}>
                    {selectedStyle ? `"${selectedStyle}" selected` : 'No style selected'}
                  </span>
                  <button
                    onClick={() => setModalStep('upload')}
                    style={{ height: '40px', padding: '0 22px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.62)', transition: 'all 180ms ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
                  >
                    Back
                  </button>
                  <button
                    disabled={!selectedStyle}
                    onClick={() => { if (selectedStyle) setModalStep('paletteSelect'); }}
                    style={{ height: '40px', padding: '0 26px', borderRadius: '10px', background: selectedStyle ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.04)', borderWidth: selectedStyle ? '1.5px' : '1px', borderStyle: 'solid', borderColor: selectedStyle ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.08)', boxShadow: selectedStyle ? '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)' : 'none', cursor: selectedStyle ? 'pointer' : 'not-allowed', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: selectedStyle ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.22)', transition: 'all 200ms ease', opacity: selectedStyle ? 1 : 0.55 }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* ══ STEP 3 — PALETTE SELECTION ═══════════════════════ */}
            {modalStep === 'paletteSelect' && (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 32px 0' }}>
                  <div>
                    <h2 style={{ margin: 0, marginBottom: '7px', fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 600, color: '#f4f0e6', lineHeight: 1.2 }}>
                      Select a color palette
                    </h2>
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                      Choose a color palette to guide the AI.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 180ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  >
                    <X size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                  </button>
                </div>

                {/* Palette grid — 3 cols square cards, scrollable */}
                <div
                  className="rcs-style-grid"
                  style={{
                    flex:                '1',
                    minHeight:           0,
                    padding:             '12px 32px',
                    display:             'grid',
                    gridTemplateColumns: 'repeat(3, 160px)',
                    gridAutoRows:        'auto',
                    justifyContent:      'center',
                    columnGap:           '16px',
                    rowGap:              '24px',
                    overflowY:           'auto',
                    alignContent:        'start',
                  }}
                >
                  {PALETTES.map(palette => {
                    const isSel = selectedPalette === palette.name;
                    return (
                      /* Transparent outer wrapper — no border/background, just a flex column */
                      <div
                        key={palette.name}
                        onClick={() => setSelectedPalette(isSel ? null : palette.name)}
                        style={{
                          width:         '100%',
                          display:       'flex',
                          flexDirection: 'column',
                          alignItems:    'center',
                          cursor:        'pointer',
                        }}
                      >
                        {/* ── Color box: 160×160 perfect square, gradient fill ── */}
                        <div
                          style={{
                            width:        '100%',
                            height:       '160px',
                            flexShrink:   0,
                            boxSizing:    'border-box',
                            borderRadius: '16px',
                            opacity:      0.85,
                            background:   `linear-gradient(160deg, ${palette.colors[0]} 0%, ${palette.colors[1]} 50%, ${palette.colors[2]} 100%)`,
                            borderWidth:  isSel ? '1.5px' : '1px',
                            borderStyle:  'solid',
                            borderColor:  isSel ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.12)',
                            boxShadow:    isSel
                              ? `0 0 24px ${palette.colors[0]}55, 0 0 8px rgba(255,255,255,0.10)`
                              : '0 4px 20px rgba(0,0,0,0.35)',
                            transition:   'all 180ms ease',
                          }}
                          onMouseEnter={e => {
                            if (!isSel) {
                              (e.currentTarget as HTMLDivElement).style.borderWidth = '1.5px';
                              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.35)';
                              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 28px rgba(0,0,0,0.45)';
                              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isSel) {
                              (e.currentTarget as HTMLDivElement).style.borderWidth = '1px';
                              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)';
                              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
                              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                            }
                          }}
                        />

                        {/* ── Palette name — BELOW the square, 8px gap ── */}
                        <div style={{
                          marginTop:  '8px',
                          width:      '100%',
                          fontFamily: "'Inter', sans-serif",
                          fontSize:   '11px',
                          fontWeight: isSel ? 500 : 400,
                          color:      isSel ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)',
                          lineHeight: 1.3,
                          textAlign:  'center',
                          transition: 'color 180ms ease',
                          whiteSpace: 'normal',
                          wordBreak:  'break-word',
                        }}>
                          {palette.name}
                        </div>

                        {/* ── Subtitle — BELOW name, 4px gap ── */}
                        <div style={{
                          marginTop:  '4px',
                          width:      '100%',
                          fontFamily: "'Inter', sans-serif",
                          fontSize:   '12px',
                          fontWeight: 400,
                          color:      '#9CA3AF',
                          lineHeight: 1.3,
                          textAlign:  'center',
                          whiteSpace: 'normal',
                          wordBreak:  'break-word',
                        }}>
                          {palette.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', padding: '12px 32px 16px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', marginRight: 'auto' }}>
                    {selectedPalette ? `"${selectedPalette}" selected` : 'No palette selected'}
                  </span>
                  <button
                    onClick={() => setModalStep('styleSelect')}
                    style={{ height: '40px', padding: '0 22px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.62)', transition: 'all 180ms ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setModalStep('referencePrefs')}
                    style={{ height: '40px', padding: '0 26px', borderRadius: '10px', background: 'rgba(0,0,0,0.45)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.80)', boxShadow: '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.92)', transition: 'all 200ms ease' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0px 0px 26px rgba(255,255,255,0.48), inset 0px 1px 2px rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)'; }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* ══ STEP 4 — REFERENCE IMAGES & PREFERENCES ══════════ */}
            {modalStep === 'referencePrefs' && (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 32px 0' }}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
                    <h2 style={{ margin: 0, marginBottom: '10px', fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 600, color: '#f4f0e6', lineHeight: 1.2 }}>
                      Reference Images & Preferences
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.32)', marginLeft: '8px' }}>(Optional)</span>
                    </h2>
                    <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '12.5px', fontWeight: 400, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                      Upload reference images for additional style or layout guidance, or add a description below. Since a style has already been selected, you can skip this and generate directly, or add preferences for better customization.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 180ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  >
                    <X size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                  </button>
                </div>

                {/* Scrollable content area */}
                <div
                  className="rcs-style-grid"
                  style={{
                    flex:      '1',
                    minHeight: 0,
                    padding:   '24px 32px 16px',
                    overflowY: 'auto',
                    display:   'flex',
                    flexDirection: 'column',
                    gap:       '28px',
                  }}
                >
                  {/* Section 1 — Upload reference images */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      ref={refImageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={e => {
                        const files = e.target.files;
                        if (!files) return;
                        const remaining = 4 - referenceImages.length;
                        const newUrls: string[] = [];
                        for (let i = 0; i < Math.min(files.length, remaining); i++) {
                          newUrls.push(URL.createObjectURL(files[i]));
                        }
                        if (newUrls.length > 0) setReferenceImages(prev => [...prev, ...newUrls]);
                        e.target.value = '';
                      }}
                    />

                    {/* Upload button */}
                    <button
                      onClick={() => { if (referenceImages.length < 4) refImageInputRef.current?.click(); }}
                      disabled={referenceImages.length >= 4}
                      style={{
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        gap:            '8px',
                        width:          '100%',
                        height:         '48px',
                        borderRadius:   '12px',
                        background:     'rgba(255,255,255,0.04)',
                        borderWidth:    '1.5px',
                        borderStyle:    'dashed',
                        borderColor:    'rgba(255,255,255,0.18)',
                        cursor:         referenceImages.length >= 4 ? 'not-allowed' : 'pointer',
                        fontFamily:     "'Inter', sans-serif",
                        fontSize:       '13px',
                        fontWeight:     500,
                        color:          referenceImages.length >= 4 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.62)',
                        transition:     'all 180ms ease',
                        opacity:        referenceImages.length >= 4 ? 0.55 : 1,
                      }}
                      onMouseEnter={e => {
                        if (referenceImages.length < 4) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (referenceImages.length < 4) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
                        }
                      }}
                    >
                      <Upload size={16} />
                      Upload reference image(s)
                    </button>

                    {/* Helper text */}
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.30)', textAlign: 'center' }}>
                      {referenceImages.length} / 4 reference images
                    </span>

                    {/* Thumbnail strip */}
                    {referenceImages.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {referenceImages.map((url, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)', flexShrink: 0 }}>
                            <img src={url} alt={`Ref ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            <button
                              onClick={() => { URL.revokeObjectURL(url); setReferenceImages(prev => prev.filter((_, i) => i !== idx)); }}
                              style={{
                                position:       'absolute',
                                top:            '4px',
                                right:          '4px',
                                width:          '18px',
                                height:         '18px',
                                borderRadius:   '50%',
                                background:     'rgba(0,0,0,0.65)',
                                borderWidth:    0,
                                boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.20)',
                                display:        'flex',
                                alignItems:     'center',
                                justifyContent: 'center',
                                cursor:         'pointer',
                                padding:        0,
                              }}
                            >
                              <X size={10} style={{ color: 'rgba(255,255,255,0.80)' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 2 — Description / preferences */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.72)' }}>
                      Add description or preferences
                    </label>
                    <textarea
                      value={prefsDescription}
                      onChange={e => setPrefsDescription(e.target.value)}
                      placeholder="e.g. Workspace for 15 members, warm lighting, plants near the window, desk by the wall..."
                      style={{
                        width:           '100%',
                        minHeight:       '100px',
                        resize:          'vertical',
                        borderRadius:    '12px',
                        padding:         '12px 14px',
                        background:      'rgba(255,255,255,0.04)',
                        borderWidth:     '1px',
                        borderStyle:     'solid',
                        borderColor:     'rgba(255,255,255,0.12)',
                        fontFamily:      "'Inter', sans-serif",
                        fontSize:        '12.5px',
                        fontWeight:      400,
                        color:           'rgba(255,255,255,0.85)',
                        lineHeight:      '1.6',
                        outline:         'none',
                        transition:      'border-color 180ms ease',
                        boxSizing:       'border-box',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', padding: '14px 32px 22px' }}>
                  <button
                    onClick={() => setModalStep('paletteSelect')}
                    style={{ height: '40px', padding: '0 22px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', borderWidth: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.62)', transition: 'all 180ms ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}
                  >
                    Back
                  </button>
                  <button
                    style={{ height: '40px', padding: '0 26px', borderRadius: '10px', background: 'rgba(0,0,0,0.45)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.80)', boxShadow: '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.92)', transition: 'all 200ms ease' }}
                    onClick={() => { const imgUrl = selectedImage !== null ? uploadedImages[selectedImage] ?? null : null; handedOffUrlRef.current = imgUrl; onGenerate?.({ style: selectedStyle, palette: selectedPalette, referenceCount: referenceImages.length, selectedImageUrl: imgUrl }); }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0px 0px 26px rgba(255,255,255,0.48), inset 0px 1px 2px rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)'; }}
                  >
                    Generate Room Configuration
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}