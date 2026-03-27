import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, User, LayoutGrid, UserCircle, Tag, FileText, LogOut } from 'lucide-react';

interface AppHeaderProps {
  onBack?: () => void;
  onNext?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

export function AppHeader({ onBack, onNext, onProfileClick, onLogout, isLoggedIn }: AppHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      setDropdownOpen(prev => !prev);
    } else {
      onProfileClick?.();
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout?.();
  };

  return (
    <div
      style={{
        position:             'absolute',
        top:                  0,
        left:                 0,
        right:                0,
        height:               '48px',
        zIndex:               50,
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-between',
        padding:              '0 40px',
        background:           'rgba(255,255,255,0.03)',
        borderBottomWidth:    '1px',
        borderBottomStyle:    'solid' as const,
        borderBottomColor:    'rgba(255,255,255,0.10)',
        boxShadow:            '0px 4px 18px 0px rgba(0,0,0,0.15)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Left: conditional back + next buttons ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '8px',
              background:   'transparent',
              borderWidth:  0,
              cursor:       'pointer',
              color:        'rgba(255,255,255,0.58)',
              padding:      '5px 10px',
              borderRadius: '9px',
              fontSize:     '13px',
              fontWeight:   500,
              fontFamily:   "'Inter', sans-serif",
              transition:   'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.color      = 'rgba(255,255,255,0.90)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color      = 'rgba(255,255,255,0.58)';
            }}
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Back
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '8px',
              background:   'transparent',
              borderWidth:  0,
              cursor:       'pointer',
              color:        'rgba(255,255,255,0.58)',
              padding:      '5px 10px',
              borderRadius: '9px',
              fontSize:     '13px',
              fontWeight:   500,
              fontFamily:   "'Inter', sans-serif",
              transition:   'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.color      = 'rgba(255,255,255,0.90)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color      = 'rgba(255,255,255,0.58)';
            }}
          >
            Next
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* ── Right: tatva:Ops logo + user avatar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontWeight:    700,
              fontSize:      '15px',
              color:         '#ec4899',
              letterSpacing: '-0.45px',
            }}
          >
            tatva
          </span>
          <span
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontWeight:    700,
              fontSize:      '15px',
              color:         'rgba(255,255,255,0.82)',
              letterSpacing: '-0.45px',
            }}
          >
            :Ops
          </span>
        </div>

        {/* Avatar + dropdown wrapper */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <div
            onClick={handleAvatarClick}
            style={{
              width:          '30px',
              height:         '30px',
              borderRadius:   '50%',
              background:     isLoggedIn
                ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #374151 0%, #1F2937 100%)',
              borderWidth:    0,
              boxShadow:      isLoggedIn
                ? 'inset 0 0 0 1.5px rgba(255,255,255,0.20), 0 0 12px rgba(236,72,153,0.25)'
                : 'inset 0 0 0 1.5px rgba(255,255,255,0.13)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
              cursor:         'pointer',
              transition:     'box-shadow 160ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = isLoggedIn
              ? 'inset 0 0 0 1.5px rgba(255,255,255,0.30), 0 0 16px rgba(236,72,153,0.35)'
              : 'inset 0 0 0 1.5px rgba(255,255,255,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = isLoggedIn
              ? 'inset 0 0 0 1.5px rgba(255,255,255,0.20), 0 0 12px rgba(236,72,153,0.25)'
              : 'inset 0 0 0 1.5px rgba(255,255,255,0.13)'; }}
          >
            {isLoggedIn ? (
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1,
              }}>U</span>
            ) : (
              <User size={14} style={{ color: 'rgba(255,255,255,0.62)' }} />
            )}
          </div>

          {/* ── Avatar dropdown ── */}
          {dropdownOpen && isLoggedIn && (
            <div
              style={{
                position: 'absolute',
                top: '38px',
                right: 0,
                width: '260px',
                borderRadius: '16px',
                background: 'rgba(20,20,20,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderWidth: 0,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.4)',
                padding: '12px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '8px',
                animation: 'headerDropdownIn 150ms ease-out both',
              }}
            >
              {/* User info */}
              <div style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                {/* Avatar circle */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(139,92,246,0.25)',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}>A</span>
                </div>
                {/* Text block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap' as const,
                  }}>
                    Arjun Mehta
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap' as const,
                  }}>
                    arjun.mehta@email.com
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

              {/* Menu items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <DropdownItem icon={<LayoutGrid size={16} strokeWidth={1.8} />} label="Dashboard" onClick={() => setDropdownOpen(false)} />
                <DropdownItem icon={<UserCircle size={16} strokeWidth={1.8} />} label="Profile" onClick={() => setDropdownOpen(false)} />
                <DropdownItem icon={<Tag size={16} strokeWidth={1.8} />} label="Pricing" onClick={() => setDropdownOpen(false)} />
                <DropdownItem icon={<FileText size={16} strokeWidth={1.8} />} label="Billing & Invoices" onClick={() => setDropdownOpen(false)} />
              </div>

              {/* Bottom divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

              {/* Sign Out */}
              <DropdownItem icon={<LogOut size={16} strokeWidth={1.8} />} label="Sign Out" onClick={handleLogout} />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown animation */}
      <style>{`
        @keyframes headerDropdownIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Dropdown menu item ── */
function DropdownItem({ icon, label, onClick }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        borderRadius: '8px',
        borderWidth: 0,
        background: 'transparent',
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.9)',
        cursor: 'pointer',
        transition: 'background 120ms ease',
        textAlign: 'left' as const,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
      {label}
    </button>
  );
}