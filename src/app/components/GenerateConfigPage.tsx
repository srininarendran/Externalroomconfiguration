import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScannerOverlay } from './ScannerOverlay';
import svgPaths from '../../imports/svg-jdrmn7b9u7';
import svgPathsClock from '../../imports/svg-2wqq7nuxvx';
import imgImageModern from "figma:asset/6fdffe93d7829fdab4c7121fa6912bcc0f27dee5.png";
import imgImageScandinavian from "figma:asset/a1f40f026fde7ada0a5d6754c7864dbff4c45b86.png";
import imgImageLuxury from "figma:asset/23b6757b5b634e6a1aa4acacfc4d02780c360c43.png";
import imgImageIndustrialLoft from "figma:asset/618532f3ce9ea9af787497951d558cca41d9f6a3.png";

const STYLE_IMAGES: Record<string, string> = {
  Modern: 'https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  Minimalist: 'https://images.unsplash.com/photo-1564610863211-d4f77e197c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  Luxury: 'https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  Industrial: 'https://images.unsplash.com/photo-1618522786784-88c35429eb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  Coastal: 'https://images.unsplash.com/photo-1511840831832-3efd661c1d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  Mediterranean: 'https://images.unsplash.com/photo-1761347604372-ae52634c690a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
};

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

const STYLE_OPTIONS = [
  'Modern', 'Minimalist', 'Luxury', 'Industrial', 'Coastal', 'Mediterranean',
];

const COLOR_SWATCHES = [
  { name: 'Surprise Me',   gradient: 'linear-gradient(135deg, rgb(192,132,216) 0%, rgb(107,184,212) 50%, rgb(242,201,110) 100%)' },
  { name: 'High-Contrast', gradient: 'linear-gradient(135deg, rgb(26,26,26) 0%, rgb(140,140,140) 50%, rgb(245,240,235) 100%)' },
  { name: 'Forest',        gradient: 'linear-gradient(135deg, rgb(44,74,48) 0%, rgb(122,158,106) 50%, rgb(217,203,170) 100%)' },
  { name: 'Ocean Breeze',  gradient: 'linear-gradient(135deg, rgb(27,94,130) 0%, rgb(96,184,204) 50%, rgb(214,238,245) 100%)' },
  { name: 'Sunset Warmth', gradient: 'linear-gradient(135deg, rgb(192,88,40) 0%, rgb(232,154,74) 50%, rgb(245,217,192) 100%)' },
  { name: 'Earth Tones',   gradient: 'linear-gradient(135deg, rgb(107,66,38) 0%, rgb(160,120,90) 50%, rgb(212,191,160) 100%)' },
  { name: 'Pastel Dreams', gradient: 'linear-gradient(135deg, rgb(184,169,217) 0%, rgb(244,194,204) 50%, rgb(184,222,202) 100%)' },
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

/* ── Panel slide transition constants ───────────────────────────────── */
const PANEL_W   = 260; // inner panel width
const PANEL_GAP = 24;  // gap between panel and canvas
const PANEL_TOTAL = PANEL_W + PANEL_GAP; // 284px — what the wrapper collapses/expands
const SLIDE_TRANSITION = 'width 300ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease';

/* ── Component ──────────────────────────────────────────────────────── */

export function GenerateConfigPage({ previewImageUrl, onContinue }: { previewImageUrl?: string | null; onContinue?: (style: string, swatch: string) => void }) {
  const [selectedHistory, setSelectedHistory] = useState('1');
  const [selectedStyle, setSelectedStyle]     = useState('Modern');
  const [selectedSwatch, setSelectedSwatch]   = useState('Surprise Me');
  const [activeTab, setActiveTab]             = useState<'color' | 'style'>('color');
  const [scanActive, setScanActive]           = useState(true);
  const [scanPhase, setScanPhase]             = useState<'scanning' | 'revealing' | 'done'>('scanning');
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  /* Panel visibility — both collapsed by default */
  const [historyOpen, setHistoryOpen] = useState(false);
  const [styleOpen, setStyleOpen]     = useState(false);

  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Re-trigger scan whenever the preview image changes */
  useEffect(() => {
    setScanActive(true);
    setScanPhase('scanning');
  }, [previewImageUrl]);

  const handleScanComplete = useCallback(() => {
    setScanActive(false);
    setScanPhase('revealing');
    revealTimerRef.current = setTimeout(() => setScanPhase('done'), 800);
  }, []);

  useEffect(() => {
    return () => { if (revealTimerRef.current) clearTimeout(revealTimerRef.current); };
  }, []);

  /* ── Toolbar action buttons ── */
  const toolbarActions = [
    { label: 'Regenerate', paths: [svgPaths.p3ae100, svgPaths.pb791e00, svgPaths.p32f90200, svgPaths.p12626e40] },
    { label: 'Share',      paths: [svgPaths.p31a9a700, svgPaths.p7bf1600, svgPaths.p34ce3f00, svgPaths.pa8abbc0, svgPaths.p23e65300] },
    { label: 'Like',       paths: [svgPaths.p3179bd80] },
    { label: 'Download',   paths: [svgPaths.p2b89e180, svgPaths.pbaa8720, 'M6.5 8.125V1.625'] },
  ];

  return (
    <>
    <div
      style={{
        position:      'absolute',
        top:           '78px',
        left:          '112px',
        right:         '0',
        height:        '657px',
        zIndex:        1,
        display:       'flex',
        /* No gap — panels manage their own spacing via padding */
        padding:       '0 24px 0 0',
        overflow:      'hidden',
      }}
    >

      {/* ═══════════════  COLUMN 1 — History (collapsible)  ════════════ */}
      {/* Outer sliding wrapper: collapses width to 0 including both gaps  */}
      {/* History inner is 308px: 24px left gap + 260px panel + 24px right gap */}
      <div
        style={{
          flexShrink:  0,
          overflow:    'hidden',
          width:       historyOpen ? `${PANEL_W + PANEL_GAP * 2}px` : '0px',
          opacity:     historyOpen ? 1 : 0,
          transition:  SLIDE_TRANSITION,
          pointerEvents: historyOpen ? 'auto' : 'none',
        }}
      >
        {/* Inner: always 308px wide so it slides cleanly */}
        <div
          style={{
            width:          `${PANEL_W + PANEL_GAP * 2}px`,
            paddingLeft:    `${PANEL_GAP}px`,
            paddingRight:   `${PANEL_GAP}px`,
            height:         '100%',
            display:        'flex',
          }}
        >
          <div
            style={{
              flex:           1,
              ...glassPane,
              overflow:       'hidden',
              display:        'flex',
              flexDirection:  'column',
              padding:        '0',
            }}
          >
            {/* ── Header ── */}
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
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* ── Scrollable card list ── */}
            <div
              className="tatva-panel-scroll"
              style={{
                flex:           1,
                overflowY:      'auto',
                overflowX:      'hidden',
                display:        'flex',
                flexDirection:  'column',
                gap:            '10px',
                padding:        '12px 12px 12px 12px',
              }}
            >
              {HISTORY_ITEMS.map(item => {
                const active = selectedHistory === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedHistory(item.id)}
                    style={{
                      width:         '100%',
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
                      {/* ── Image area ── */}
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

                      {/* ── Info section ── */}
                      <div style={{ height: '59px', padding: '8px 10px 0', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
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

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', flexShrink: 0 }}>
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
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════  COLUMN 2 — Preview Workspace  ════════════════ */}
      <div
        style={{
          flex:           1,
          minWidth:       0,
          display:        'flex',
          flexDirection:  'column',
          /* Left margin: always 24px from sidebar (or from left edge if history collapsed) */
          marginLeft:     historyOpen ? '0' : `${PANEL_GAP}px`,
          transition:     'margin-left 300ms cubic-bezier(0.4,0,0.2,1)',
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
          {/* ── Toolbar row ── */}
          <div
            style={{
              display:           'flex',
              alignItems:        'center',
              gap:               '2px',
              padding:           '0 12px',
              height:            '49px',
              flexShrink:        0,
              boxShadow:         'inset 0 -1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* Standard action buttons */}
            {toolbarActions.map((action, i, arr) => (
              <div key={action.label} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button
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
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
                    {action.paths.map((d, pi) => (
                      <path
                        key={pi}
                        d={d}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.08333"
                      />
                    ))}
                  </svg>
                  <span>{action.label}</span>
                </button>
                {/* Separator after each action button */}
                <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)', flexShrink: 0, marginLeft: '2px' }} />
              </div>
            ))}

            {/* ── Panel toggle buttons ── */}
            <PanelToggleBtn
              label="History"
              active={historyOpen}
              onClick={() => setHistoryOpen(v => !v)}
            />
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)', flexShrink: 0, margin: '0 2px' }} />
            <PanelToggleBtn
              label="Style"
              active={styleOpen}
              onClick={() => setStyleOpen(v => !v)}
            />
          </div>

          {/* ── Image preview area ── */}
          <div
            style={{
              flex:           1,
              overflow:      'hidden',
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              position:      'relative',
            }}
          >
            <img
              src={previewImageUrl || PREVIEW_IMG}
              alt="Generated room preview"
              style={{
                width:     '100%',
                height:    '100%',
                objectFit: 'cover',
                display:   'block',
              }}
            />
            {/* Subtle vignette */}
            <div
              style={{
                position:      'absolute',
                inset:         0,
                background:    'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.34) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Style tag pills (top-right) ── */}
            <div
              style={{
                position:      'absolute',
                top:           '12px',
                right:         '12px',
                zIndex:        8,
                display:       'flex',
                gap:           '8px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '5px',
                  padding:    '4px 11px',
                  borderRadius:'8px',
                  background: 'rgba(0,0,0,0.52)',
                  borderWidth: 0,
                  boxShadow:  'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
              >
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
              <div
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '5px',
                  padding:    '4px 11px',
                  borderRadius:'8px',
                  background: 'rgba(0,0,0,0.52)',
                  borderWidth: 0,
                  boxShadow:  'inset 0 0 0 1px rgba(255,255,255,0.10)',
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

            {/* ── AI Scanner Overlay ── */}
            <ScannerOverlay active={scanActive} phase={scanPhase} onComplete={handleScanComplete} />

            {/* ── Finalize the Image — floating bottom-right ── */}
            <div
              style={{
                position:      'absolute',
                bottom:        '20px',
                right:         '20px',
                zIndex:        10,
                pointerEvents: 'auto',
              }}
            >
              <button
                style={{
                  height:        '44px',
                  padding:       '0 28px',
                  borderRadius:  '12px',
                  background:    'rgba(0,0,0,0.55)',
                  borderWidth:   0,
                  boxShadow:     'inset 0 0 0 1.5px rgba(255,255,255,0.80), 0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)',
                  cursor:        'pointer',
                  transition:    'all 200ms ease',
                  backdropFilter:       'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  ...interFont(13, 600, 0.92),
                  letterSpacing: '0.01em',
                  whiteSpace:    'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1.5px rgba(255,255,255,0.95), 0px 0px 28px rgba(255,255,255,0.50), inset 0px 1px 2px rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1.5px rgba(255,255,255,0.80), 0px 0px 18px rgba(255,255,255,0.35), inset 0px 1px 2px rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.55)';
                }}
                onClick={() => setShowFinalizeModal(true)}
              >
                Finalize the Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════  COLUMN 3 — Style & Color (collapsible)  ══════ */}
      <div
        style={{
          flexShrink:    0,
          overflow:      'hidden',
          width:         styleOpen ? `${PANEL_TOTAL}px` : '0px',
          opacity:       styleOpen ? 1 : 0,
          transition:    SLIDE_TRANSITION,
          pointerEvents: styleOpen ? 'auto' : 'none',
        }}
      >
        {/* Inner: always 284px wide */}
        <div
          style={{
            width:          `${PANEL_TOTAL}px`,
            paddingLeft:    `${PANEL_GAP}px`,
            height:         '100%',
            display:        'flex',
            flexDirection:  'column',
          }}
        >
          {/* ── Tabbed panel ── */}
          <div
            style={{
              ...glassPane,
              padding:       '20px',
              display:       'flex',
              flexDirection: 'column',
              gap:           '16px',
              flex:          1,
              minHeight:     0,
            }}
          >
            {/* Tab row */}
            <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <div style={{ display: 'flex' }}>
                {(['color', 'style'] as const).map(tab => {
                  const active = activeTab === tab;
                  const label = tab === 'color' ? 'COLOR' : 'STYLE SELECTION';
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex:           1,
                        padding:        '0 0 10px',
                        borderWidth:    0,
                        background:     'transparent',
                        cursor:         'pointer',
                        transition:     'color 160ms ease',
                        fontFamily:     "'Inter', sans-serif",
                        fontSize:       '11px',
                        fontWeight:      600,
                        color:          `rgba(255,255,255,${active ? 0.88 : 0.38})`,
                        letterSpacing:  '0.08em',
                        textTransform:  'uppercase' as const,
                        textAlign:      'center',
                        lineHeight:     '1',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {/* Tab indicator line */}
              <div style={{ position: 'relative', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
                <div
                  style={{
                    position:      'absolute',
                    top:           0,
                    left:          activeTab === 'color' ? '0%' : '50%',
                    width:         '50%',
                    height:        '2px',
                    borderRadius:  '1px',
                    background:    'rgba(255,255,255,0.70)',
                    transition:    'left 220ms ease',
                  }}
                />
              </div>
            </div>

            {/* Tab content */}
            <div className="tatva-panel-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {activeTab === 'color' && (
                <div
                  style={{
                    display:             'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap:                 '10px',
                    padding:             '16px 14px 0',
                  }}
                >
                  {COLOR_SWATCHES.map(sw => {
                    const active = selectedSwatch === sw.name;
                    return (
                      <div
                        key={sw.name}
                        onClick={() => setSelectedSwatch(sw.name)}
                        style={{
                          display:       'flex',
                          flexDirection: 'column',
                          alignItems:    'center',
                          gap:           '7px',
                          cursor:        'pointer',
                        }}
                      >
                        <div
                          style={{
                            width:           '100%',
                            aspectRatio:     '1 / 1',
                            borderRadius:    '12px',
                            backgroundImage: sw.gradient,
                            boxShadow:       active
                              ? '0 3px 10px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.60)'
                              : '0 3px 10px rgba(0,0,0,0.35)',
                            transition:      'box-shadow 160ms ease',
                          }}
                        />
                        <span
                          style={{
                            fontFamily:    "'Inter', sans-serif",
                            fontSize:      '10px',
                            fontWeight:    400,
                            lineHeight:    '13px',
                            color:         active ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.46)',
                            textAlign:     'center',
                            letterSpacing: '0.1px',
                            whiteSpace:    'nowrap',
                            transition:    'color 160ms ease',
                          }}
                        >
                          {sw.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'style' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {STYLE_OPTIONS.map(name => {
                    const active = selectedStyle === name;
                    return (
                      <div
                        key={name}
                        onClick={() => setSelectedStyle(name)}
                        style={{
                          borderRadius:  '12px',
                          borderWidth:   0,
                          boxShadow:     active
                            ? 'inset 0 0 0 1px rgba(255,255,255,0.50), 0 0 20px rgba(255,255,255,0.12), 0 0 6px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.15)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                          background:    active ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.03)',
                          cursor:        'pointer',
                          overflow:      'hidden',
                          flexShrink:    0,
                          transition:    'box-shadow 180ms ease, background 180ms ease',
                        }}
                      >
                        {/* Thumbnail */}
                        <div style={{ width: '100%', height: '100px', overflow: 'hidden' }}>
                          <img
                            src={STYLE_IMAGES[name]}
                            alt={name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                        {/* Info */}
                        <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={interFont(12, 600, 0.85)}>{name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* ═══════════════  FINALIZE CONFIRMATION MODAL  ═══════════════ */}
    {showFinalizeModal && (
      <div
        onClick={() => setShowFinalizeModal(false)}
        style={{
          position:         'fixed',
          inset:            0,
          zIndex:           9999,
          display:          'flex',
          alignItems:       'center',
          justifyContent:   'center',
          background:       'rgba(0,0,0,0.45)',
          backdropFilter:   'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          animation:        'fadeInOverlay 220ms ease forwards',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width:              '480px',
            maxWidth:           'calc(100vw - 48px)',
            background:         'rgba(255,255,255,0.06)',
            borderWidth:        0,
            boxShadow:          'inset 0 0 0 1px rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.55), 0 0 1px rgba(255,255,255,0.10)',
            borderRadius:       '20px',
            backdropFilter:     'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            padding:            '40px 36px 32px',
            display:            'flex',
            flexDirection:      'column',
            alignItems:         'center',
            gap:                '24px',
            animation:          'scaleInModal 260ms cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {/* Heading */}
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '20px',
              fontWeight:    600,
              color:         'rgba(255,255,255,0.92)',
              letterSpacing: '-0.3px',
              textAlign:     'center',
            }}
          >
            Finalize the Image
          </span>
          {/* Body */}
          <span
            style={{
              fontFamily:  "'Inter', sans-serif",
              fontSize:    '13px',
              fontWeight:  400,
              lineHeight:  '20px',
              color:       'rgba(255,255,255,0.58)',
              textAlign:   'center',
              maxWidth:    '340px',
            }}
          >
            Would you like to finalize your style choices and move to further customization?
          </span>

          {/* Selection pill tags */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '6px',
                padding:       '6px 14px',
                borderRadius:  '20px',
                background:    'rgba(255,255,255,0.08)',
                borderWidth:   0,
                boxShadow:     'inset 0 0 0 1px rgba(255,255,255,0.14)',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                <path d={svgPaths.p19135900} stroke="white" strokeOpacity="0.50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '12px',
                  fontWeight:  500,
                  color:       'rgba(255,255,255,0.75)',
                  whiteSpace:  'nowrap',
                }}
              >
                Style: {selectedStyle}
              </span>
            </div>
            <div
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '6px',
                padding:       '6px 14px',
                borderRadius:  '20px',
                background:    'rgba(255,255,255,0.08)',
                borderWidth:   0,
                boxShadow:     'inset 0 0 0 1px rgba(255,255,255,0.14)',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="5" cy="5" r="3.5" stroke="white" strokeOpacity="0.50" strokeWidth="0.833333" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   '12px',
                  fontWeight:  500,
                  color:       'rgba(255,255,255,0.75)',
                  whiteSpace:  'nowrap',
                }}
              >
                Color: {selectedSwatch}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '4px' }}>
            <button
              onClick={() => setShowFinalizeModal(false)}
              style={{
                flex:           1,
                height:         '42px',
                borderRadius:   '10px',
                background:     'rgba(255,255,255,0.06)',
                borderWidth:    0,
                boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.14)',
                cursor:         'pointer',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '13px',
                fontWeight:     500,
                color:          'rgba(255,255,255,0.62)',
                transition:     'all 160ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(255,255,255,0.22)';
                e.currentTarget.style.color      = 'rgba(255,255,255,0.82)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(255,255,255,0.14)';
                e.currentTarget.style.color      = 'rgba(255,255,255,0.62)';
              }}
            >
              Go Back
            </button>
            <button
              onClick={() => {
                setShowFinalizeModal(false);
                if (onContinue) onContinue(selectedStyle, selectedSwatch);
              }}
              style={{
                flex:           1,
                height:         '42px',
                borderRadius:   '10px',
                background:     'rgba(255,255,255,0.88)',
                borderWidth:    0,
                boxShadow:      'inset 0 0 0 1px rgba(255,255,255,0.95), 0 0 20px rgba(255,255,255,0.18)',
                cursor:         'pointer',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '13px',
                fontWeight:     600,
                color:          'rgba(0,0,0,0.88)',
                transition:     'all 160ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,1)';
                e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(255,255,255,0.95), 0 0 28px rgba(255,255,255,0.30)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.88)';
                e.currentTarget.style.boxShadow  = 'inset 0 0 0 1px rgba(255,255,255,0.95), 0 0 20px rgba(255,255,255,0.18)';
              }}
            >
              Continue to Customization
            </button>
          </div>
        </div>
      </div>
    )}

    <style>{`
      @keyframes fadeInOverlay {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleInModal {
        from { opacity: 0; transform: scale(0.95) translateY(8px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }
      .tatva-panel-scroll::-webkit-scrollbar {
        width: 4px;
      }
      .tatva-panel-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      .tatva-panel-scroll::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.12);
        border-radius: 4px;
      }
      .tatva-panel-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(255,255,255,0.22);
      }
      .tatva-panel-scroll {
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.12) transparent;
      }
    `}</style>
  </>
  );
}

/* ── Panel toggle button ─────────────────────────────────────────────── */

function PanelToggleBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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
        background:    active ? 'rgba(255,255,255,0.10)' : 'transparent',
        cursor:        'pointer',
        whiteSpace:    'nowrap',
        fontFamily:    "'Inter', sans-serif",
        fontSize:      '12px',
        fontWeight:    active ? 600 : 500,
        color:         active ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.45)',
        transition:    'background 150ms ease, color 150ms ease, box-shadow 150ms ease',
        boxShadow:     active ? 'inset 0 0 0 1px rgba(255,255,255,0.16)' : 'none',
        position:      'relative',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color      = 'rgba(255,255,255,0.72)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color      = 'rgba(255,255,255,0.45)';
        }
      }}
    >
      {/* Active dot indicator */}
      {active && (
        <span
          style={{
            width:        '4px',
            height:       '4px',
            borderRadius: '2px',
            background:   'rgba(255,255,255,0.70)',
            flexShrink:   0,
          }}
        />
      )}
      {label}
    </button>
  );
}