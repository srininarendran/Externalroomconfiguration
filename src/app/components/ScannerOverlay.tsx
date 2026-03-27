import { useEffect, useRef, useState } from 'react';

const CYAN = '#00e5ff';
const SWEEP_DURATION = 2800;        // ms – single bottom→top sweep
const FADE_DURATION  = 600;         // ms – scan line fade-out after reaching top
const GRID_ROWS = 7;
const CELL_SIZE = 28;               // px – square cell size (rows & cols)
const GRID_BAND_H = GRID_ROWS * CELL_SIZE;

/* ── Grid-intersection dots (sparse) ─────────────────────────────── */
interface GridDot { col: number; row: number; delay: number; dur: number; }

const GRID_DOTS: GridDot[] = [
  { col: 3,  row: 1, delay: 0.0, dur: 1.4 },
  { col: 9,  row: 0, delay: 0.6, dur: 1.2 },
  { col: 15, row: 2, delay: 1.2, dur: 1.5 },
  { col: 6,  row: 3, delay: 0.3, dur: 1.3 },
  { col: 20, row: 1, delay: 1.8, dur: 1.1 },
  { col: 12, row: 4, delay: 0.9, dur: 1.4 },
  { col: 18, row: 0, delay: 2.2, dur: 1.2 },
  { col: 24, row: 2, delay: 1.5, dur: 1.3 },
];

/* ── Component ────────────────────────────────────────────────────── */

export function ScannerOverlay({
  active,
  phase,
  onComplete,
}: {
  active: boolean;
  phase: 'scanning' | 'revealing' | 'done';
  onComplete?: () => void;
}) {
  const groupRef     = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const rafRef       = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      completedRef.current = false;
      setFadingOut(false);
      return;
    }

    completedRef.current = false;
    setFadingOut(false);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;

      if (elapsed >= SWEEP_DURATION) {
        // Reached top — park at 0% and start fade-out
        if (groupRef.current) groupRef.current.style.top = '0%';
        if (!completedRef.current) {
          completedRef.current = true;
          setFadingOut(true);
          fadeTimerRef.current = setTimeout(() => {
            onComplete?.();
          }, FADE_DURATION);
        }
        return;
      }

      // Ease-out: starts fast at bottom, decelerates toward top
      const t = elapsed / SWEEP_DURATION;
      const eased = 1 - Math.pow(1 - t, 2.5);
      const pct = (1 - eased) * 100; // 100% → 0%

      if (groupRef.current) groupRef.current.style.top = `${pct}%`;
      if (gridRef.current) {
        gridRef.current.style.transform = 'scaleY(1)';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [active, onComplete]);

  /* ── Blur overlay (visible during scanning, fades on reveal) ────── */
  const showBlur = phase === 'scanning' || phase === 'revealing';

  return (
    <>
      <style>{`
        @keyframes scanDotPulse {
          0%, 100% { opacity: 0;    transform: translate(-50%,-50%) scale(0.15); }
          25%      { opacity: 0.85; transform: translate(-50%,-50%) scale(1.15); }
          55%      { opacity: 0.5;  transform: translate(-50%,-50%) scale(0.95); }
        }
        @keyframes sweepFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* ── Glass blur overlay on image during scan ── */}
      {showBlur && (
        <div
          style={{
            position:            'absolute',
            inset:               0,
            zIndex:              5,
            pointerEvents:       'none',
            background:          'rgba(0,0,0,0.08)',
            backdropFilter:      phase === 'scanning' ? 'blur(6px)' : 'blur(0px)',
            WebkitBackdropFilter: phase === 'scanning' ? 'blur(6px)' : 'blur(0px)',
            opacity:             phase === 'revealing' ? 0 : 1,
            transition:          'opacity 800ms ease-out, backdrop-filter 800ms ease-out, -webkit-backdrop-filter 800ms ease-out',
          }}
        />
      )}

      {/* ── Scanner Sweep group ── */}
      {active && (
        <div
          ref={groupRef}
          style={{
            position:      'absolute',
            left:          0,
            right:         0,
            top:           '100%',
            height:        0,
            pointerEvents: 'none',
            zIndex:        6,
            animation:     'sweepFadeIn 350ms ease-out forwards',
            opacity:       fadingOut ? 0 : 1,
            transition:    fadingOut ? `opacity ${FADE_DURATION}ms ease-out` : undefined,
          }}
        >
          {/* ── Scan line (bright cyan glow) ── */}
          <div
            style={{
              position:     'absolute',
              left:         0,
              right:        0,
              top:          '-2px',
              height:       '4px',
              background:   CYAN,
              borderRadius: '2px',
              zIndex:       2,
              boxShadow:    [
                `0 0 10px 4px ${CYAN}`,
                `0 0 28px 8px rgba(0,229,255,0.30)`,
                `0 0 56px 14px rgba(0,229,255,0.10)`,
              ].join(', '),
            }}
          />

          {/* ── Square grid band (trails behind the line — downward) ── */}
          <div
            ref={gridRef}
            style={{
              position:        'absolute',
              left:            0,
              right:           0,
              top:             0,
              height:          `${GRID_BAND_H}px`,
              transformOrigin: '50% 0%',
              transform:       'scaleY(1)',
              pointerEvents:   'none',
              overflow:        'hidden',
              maskImage:       'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)',
            }}
          >
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', inset: 0 }}
            >
              <defs>
                <pattern
                  id="sweepSquareGrid"
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  patternUnits="userSpaceOnUse"
                >
                  {/* Vertical line (right edge of cell) */}
                  <line
                    x1={CELL_SIZE} y1="0"
                    x2={CELL_SIZE} y2={CELL_SIZE}
                    stroke={CYAN} strokeWidth="0.6" opacity="0.18"
                  />
                  {/* Horizontal line (bottom edge of cell) */}
                  <line
                    x1="0" y1={CELL_SIZE}
                    x2={CELL_SIZE} y2={CELL_SIZE}
                    stroke={CYAN} strokeWidth="0.6" opacity="0.18"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sweepSquareGrid)" />
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={CYAN} strokeWidth="0.6" opacity="0.18" />
              <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke={CYAN} strokeWidth="0.6" opacity="0.18" />
            </svg>

            {/* ── Dots at grid intersections (inside grid band) ── */}
            {GRID_DOTS.map((d, i) => (
              <div
                key={i}
                style={{
                  position:      'absolute',
                  left:          `${d.col * CELL_SIZE}px`,
                  top:           `${d.row * CELL_SIZE}px`,
                  width:         '5px',
                  height:        '5px',
                  borderRadius:  '50%',
                  background:    CYAN,
                  boxShadow:     `0 0 4px 1.5px rgba(0,229,255,0.6)`,
                  zIndex:        3,
                  opacity:       0,
                  transform:     'translate(-50%,-50%) scale(0.15)',
                  animation:     `scanDotPulse ${d.dur}s ease-in-out ${d.delay}s infinite`,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>

          {/* ── Soft glow halo ── */}
          <div
            style={{
              position:      'absolute',
              left:          0,
              right:         0,
              top:           '-24px',
              height:        '48px',
              background:    `linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.06) 30%, rgba(0,229,255,0.10) 50%, rgba(0,229,255,0.06) 70%, transparent 100%)`,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </>
  );
}
