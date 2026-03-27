import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type FlowState =
  | 'phone'
  | 'sendingOtp'
  | 'otpSent'
  | 'otpSendError'
  | 'otpInput'
  | 'verifying'
  | 'verifyError';

const INTERIOR_IMG = 'https://images.unsplash.com/photo-1758448511421-debb41f3e621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvciUyMHdhcm0lMjBsaWdodGluZyUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc0MjQ2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1758448511421-debb41f3e621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjB3YXJtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc0MjU2MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1765862835319-18fb6f8caff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBlbGVnYW50JTIwZGVzaWdufGVufDF8fHx8MTc3NDI1NjMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1771795638652-01821921a461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBtYXJibGUlMjBjb3VudGVydG9wfGVufDF8fHx8MTc3NDI1NjMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1771218829838-f30edb7e0263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yJTIwY2hhbmRlbGllcnxlbnwxfHx8fDE3NzQyNTYzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1767948693674-e96ae5a755c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGZhY2FkZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NDI1NjMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1727106996790-90cb17ba571e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbnRyYW5jZSUyMGdhdGUlMjBjb21wb3VuZCUyMHdhbGx8ZW58MXx8fHwxNzc0MjU2MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1762117360944-82ad090fffb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkcml2ZXdheSUyMHBhcmtpbmclMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc3NDI1NjMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1762195804066-2fece9b24496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwb3V0ZG9vciUyMHNlYXRpbmclMjBtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzc0MjU2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const GOOGLE_SVG = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

/* ── Format phone: 12345 67890 ── */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 5) return digits;
  return digits.slice(0, 5) + ' ' + digits.slice(5);
}

function stripPhone(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

/* Simple spinner */
function Spinner({ size = 16, color = 'rgba(255,255,255,0.70)' }: { size?: number; color?: string }) {
  return (
    <Loader2
      size={size}
      strokeWidth={2.2}
      style={{ color, animation: 'loginSpin 800ms linear infinite' }}
    />
  );
}

export function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const [phone, setPhone] = useState(''); // raw digits only
  const [flowState, setFlowState] = useState<FlowState>('phone');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [sendAttempt, setSendAttempt] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselFade, setCarouselFade] = useState(true);
  const [textKey, setTextKey] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const carouselTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValidPhone = /^\d{10}$/.test(phone);
  const otpComplete = otp.every(d => d !== '');
  const isOtpPhase = flowState === 'otpInput' || flowState === 'verifying' || flowState === 'verifyError';
  const phoneDisabled = flowState !== 'phone';

  /* ── Cleanup timers on unmount ── */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
      if (carouselFadeRef.current) clearTimeout(carouselFadeRef.current);
    };
  }, []);

  /* ── Carousel auto-rotation ── */
  useEffect(() => {
    if (!open) return;
    setCarouselIndex(0);
    setCarouselFade(true);
    setTextKey(0);

    carouselTimerRef.current = setInterval(() => {
      // Fade out
      setCarouselFade(false);
      carouselFadeRef.current = setTimeout(() => {
        // Switch image and fade in
        setCarouselIndex(prev => (prev + 1) % CAROUSEL_IMAGES.length);
        setTextKey(prev => prev + 1);
        setCarouselFade(true);
      }, 400);
    }, 3000);

    return () => {
      if (carouselTimerRef.current) { clearInterval(carouselTimerRef.current); carouselTimerRef.current = null; }
      if (carouselFadeRef.current) { clearTimeout(carouselFadeRef.current); carouselFadeRef.current = null; }
    };
  }, [open]);

  /* ── Reset everything when modal closes ── */
  useEffect(() => {
    if (!open) {
      setPhone('');
      setFlowState('phone');
      setOtp(['', '', '', '', '', '']);
      setResendTimer(30);
      setSendAttempt(0);
      setRememberMe(false);
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    }
  }, [open]);

  const startResendTimer = useCallback(() => {
    setResendTimer(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleSendOtp = useCallback(() => {
    if (!isValidPhone) return;
    setFlowState('sendingOtp');
    setSendAttempt(prev => prev + 1);

    timeoutRef.current = setTimeout(() => {
      const willFail = (sendAttempt + 1) % 3 === 0;
      if (willFail) {
        setFlowState('otpSendError');
      } else {
        setFlowState('otpSent');
        timeoutRef.current = setTimeout(() => {
          setFlowState('otpInput');
          setOtp(['', '', '', '', '', '']);
          startResendTimer();
          requestAnimationFrame(() => {
            otpRefs.current[0]?.focus();
          });
        }, 900);
      }
    }, 1700);
  }, [isValidPhone, sendAttempt, startResendTimer]);

  const handleVerifyOtp = useCallback(() => {
    if (!otpComplete) return;
    setFlowState('verifying');

    timeoutRef.current = setTimeout(() => {
      const code = otp.join('');
      if (code === '000000') {
        setFlowState('verifyError');
      } else {
        onLoginSuccess();
        onClose();
      }
    }, 1500);
  }, [otpComplete, otp, onLoginSuccess, onClose]);

  const handleOtpChange = (index: number, value: string) => {
    if (flowState === 'verifyError') setFlowState('otpInput');
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || '';
    setOtp(next);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  /* ── Back to login options (reset to phone state with social) ── */
  const handleBackToLogin = () => {
    setFlowState('phone');
    setOtp(['', '', '', '', '', '']);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const handleGoogleLogin = () => {
    onLoginSuccess();
    onClose();
  };

  /* ── Phone input change with formatting ── */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(raw);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,10,10,0.40)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        animation: 'loginOverlayIn 200ms ease-out both',
      }}
    >
      {/* Modal */}
      <div
        style={{
          width: '920px',
          height: '520px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.09)',
          borderWidth: 0,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 0 rgba(255,255,255,0.18), 0 32px 64px rgba(0,0,0,0.35), 0 0 80px rgba(255,255,255,0.03)',
          backdropFilter: 'blur(32px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
          display: 'flex',
          flexDirection: 'row' as const,
          overflow: 'hidden',
          position: 'relative' as const,
          animation: 'loginModalIn 200ms ease-out both',
        }}
      >
        {/* ── Left: Visual ── */}
        <div style={{ width: '50%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '20px 0 0 20px' }}>
          {/* Carousel images */}
          {CAROUSEL_IMAGES.map((src, i) => (
            <ImageWithFallback
              key={src}
              src={src}
              alt={`Interior ${i + 1}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: i === carouselIndex && carouselFade ? 1 : 0,
                transition: 'opacity 400ms ease-in-out',
                animation: i === carouselIndex ? 'loginKenBurns 3s ease-in-out forwards' : undefined,
                willChange: 'opacity, transform',
              }}
            />
          ))}
          {/* Glass wash overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.40) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Text overlay with fade-in + slide-up on each change */}
          <span
            key={textKey}
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '28px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.3px',
              lineHeight: '1.3',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              animation: 'loginTextSlideIn 400ms ease-out both',
            }}
          >
            Design your<br />perfect space
          </span>
        </div>

        {/* ── Right: Form ── */}
        <div style={{
          width: '50%',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          overflowY: 'auto',
          background: 'rgba(255,255,255,0.03)',
        }}>
          {/* Header */}
          <div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
              letterSpacing: '-0.5px',
            }}>
              Hello! Welcome Back
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.45)',
              margin: '6px 0 0',
            }}>
              {isOtpPhase ? 'Enter the OTP sent to your phone' : 'Login to continue'}
            </p>
          </div>

          {/* Phone input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.60)',
            }}>
              Phone number
            </label>
            <input
              ref={phoneRef}
              type="tel"
              placeholder="Enter your mobile number"
              value={formatPhone(phone)}
              maxLength={11} /* 10 digits + 1 space */
              disabled={phoneDisabled}
              onChange={handlePhoneChange}
              style={{
                height: '48px',
                borderRadius: '10px',
                background: phoneDisabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255,255,255,0.13)',
                padding: '0 16px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                letterSpacing: '0.5px',
                color: phoneDisabled ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.90)',
                outline: 'none',
                transition: 'border-color 160ms ease, opacity 160ms ease',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.04)',
                opacity: phoneDisabled ? 0.7 : 1,
              }}
              onFocus={e => { if (!phoneDisabled) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; }}
            />
          </div>

          {/* Remember me */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: phoneDisabled ? 'default' : 'pointer',
              opacity: phoneDisabled ? 0.5 : 1,
              transition: 'opacity 160ms ease',
            }}
            onClick={() => { if (!phoneDisabled) setRememberMe(prev => !prev); }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                borderWidth: 0,
                background: rememberMe ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)',
                boxShadow: rememberMe
                  ? 'inset 0 0 0 1px rgba(255,255,255,0.30)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 160ms ease, box-shadow 160ms ease',
              }}
            >
              {rememberMe && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 3.5L3.5 6L9 1" stroke="rgba(255,255,255,0.90)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              userSelect: 'none',
            }}>
              Remember me
            </span>
          </div>

          {/* ── Primary action area ── */}
          {flowState === 'phone' && (
            <button
              onClick={handleSendOtp}
              disabled={!isValidPhone}
              style={{
                height: '48px',
                borderRadius: '10px',
                background: isValidPhone ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)',
                color: isValidPhone ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.30)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                cursor: isValidPhone ? 'pointer' : 'default',
                transition: 'background 160ms ease, color 160ms ease',
                boxShadow: isValidPhone
                  ? 'inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.15)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                if (isValidPhone) e.currentTarget.style.background = 'rgba(255,255,255,0.20)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isValidPhone ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)';
              }}
            >
              Send OTP
            </button>
          )}

          {flowState === 'sendingOtp' && (
            <button
              disabled
              style={{
                height: '48px',
                borderRadius: '10px',
                borderWidth: 0,
                background: 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.04)',
                animation: 'loginBtnGlow 1.2s ease-in-out infinite alternate',
              }}
            >
              <Spinner size={15} />
              Sending OTP...
            </button>
          )}

          {flowState === 'otpSent' && (
            <div
              style={{
                height: '48px',
                borderRadius: '10px',
                background: 'rgba(74,222,128,0.06)',
                boxShadow: 'inset 0 0 0 1px rgba(74,222,128,0.30), 0 0 16px rgba(74,222,128,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(74,222,128,0.90)',
                animation: 'loginFadeIn 200ms ease-out both',
              }}
            >
              OTP Sent ✓
            </div>
          )}

          {flowState === 'otpSendError' && (
            <button
              onClick={handleSendOtp}
              style={{
                height: '48px',
                borderRadius: '10px',
                borderWidth: 0,
                background: 'rgba(239,68,68,0.08)',
                boxShadow: 'inset 0 0 0 1px rgba(239,68,68,0.30), 0 0 12px rgba(239,68,68,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(239,68,68,0.90)',
                cursor: 'pointer',
                transition: 'background 160ms ease',
                animation: 'loginFadeIn 200ms ease-out both',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
            >
              Failed to send OTP — Retry
            </button>
          )}

          {/* ── OTP Input Section ── */}
          {isOtpPhase && (
            <div style={{ animation: 'loginSlideUp 200ms ease-out both' }}>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.60)',
                display: 'block',
                marginBottom: '10px',
              }}>
                OTP
              </label>

              {/* 6 digit boxes */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  animation: flowState === 'verifyError' ? 'loginShake 200ms ease-out' : undefined,
                }}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={flowState === 'verifying'}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    style={{
                      width: '44px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.06)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: flowState === 'verifyError'
                        ? 'rgba(239,68,68,0.55)'
                        : digit
                          ? 'rgba(255,255,255,0.24)'
                          : 'rgba(255,255,255,0.13)',
                      textAlign: 'center' as const,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.92)',
                      outline: 'none',
                      transition: 'border-color 160ms ease, box-shadow 160ms ease',
                      caretColor: 'rgba(255,255,255,0.60)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.04)',
                    }}
                    onFocus={e => {
                      if (flowState !== 'verifyError') {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.06)';
                      }
                    }}
                    onBlur={e => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = flowState === 'verifyError'
                        ? 'rgba(239,68,68,0.55)'
                        : digit ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.13)';
                    }}
                  />
                ))}
              </div>

              {/* Error text */}
              {flowState === 'verifyError' && (
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'rgba(239,68,68,0.85)',
                  margin: '10px 0 0',
                  textAlign: 'center' as const,
                  animation: 'loginFadeIn 200ms ease-out both',
                }}>
                  Invalid OTP. Try again.
                </p>
              )}

              {/* Resend + Back to login options */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
              }}>
                {resendTimer > 0 ? (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.32)',
                  }}>
                    Resend OTP in 00:{String(resendTimer).padStart(2, '0')}
                  </span>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    style={{
                      background: 'transparent',
                      borderWidth: 0,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.65)',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 160ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.90)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    Resend OTP
                  </button>
                )}
                <button
                  onClick={handleBackToLogin}
                  style={{
                    background: 'transparent',
                    borderWidth: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.45)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 160ms ease, text-decoration-color 160ms ease',
                    textDecoration: 'underline',
                    textDecorationColor: 'transparent',
                    textUnderlineOffset: '3px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.80)';
                    e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  Back to login options
                </button>
              </div>

              {/* Verify OTP button */}
              {flowState === 'verifying' ? (
                <button
                  disabled
                  style={{
                    width: '100%',
                    height: '48px',
                    marginTop: '16px',
                    borderRadius: '10px',
                    borderWidth: 0,
                    background: 'rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.04)',
                    animation: 'loginBtnGlow 1.2s ease-in-out infinite alternate',
                  }}
                >
                  <Spinner size={15} />
                  Verifying...
                </button>
              ) : (
                <button
                  onClick={handleVerifyOtp}
                  disabled={!otpComplete}
                  style={{
                    width: '100%',
                    height: '48px',
                    marginTop: '16px',
                    borderRadius: '10px',
                    borderWidth: 0,
                    background: otpComplete ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
                    color: otpComplete ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.30)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: otpComplete ? 'pointer' : 'default',
                    transition: 'background 160ms ease, color 160ms ease',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    if (otpComplete) e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = otpComplete ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)';
                  }}
                >
                  Verify OTP
                </button>
              )}
            </div>
          )}

          {/* Divider + Google — only on initial/phone states (not OTP phase) */}
          {!isOtpPhase && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.32)',
                  whiteSpace: 'nowrap' as const,
                }}>
                  or Continue with
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <button
                onClick={handleGoogleLogin}
                style={{
                  height: '48px',
                  borderRadius: '10px',
                  borderWidth: 0,
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'background 160ms ease',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.82)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              >
                {GOOGLE_SVG}
                Sign in with Google
              </button>
            </>
          )}

          {/* Footer */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.28)',
            lineHeight: '1.6',
            margin: 0,
            textAlign: 'center' as const,
          }}>
            By continuing, you agree to our{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>Terms &amp; Conditions</span>
            {' '}and{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            borderWidth: 0,
            background: 'rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 160ms ease',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
        >
          <X size={15} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.65)' }} />
        </button>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes loginOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes loginModalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes loginSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        @keyframes loginBtnGlow {
          from { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 12px rgba(255,255,255,0.03); }
          to { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16), 0 0 24px rgba(255,255,255,0.06); }
        }
        @keyframes loginKenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes loginTextSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}