export default function SkipOnboarding({ onComplete }) {
  return (
    <button
      onClick={() => onComplete({})}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        padding: '8px 14px',
        background: '#ff6b6b',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        fontSize: '0.78rem',
        fontWeight: 700,
        cursor: 'pointer',
        opacity: 0.85,
        fontFamily: 'inherit',
      }}
    >
      DEV: Skip
    </button>
  );
}
