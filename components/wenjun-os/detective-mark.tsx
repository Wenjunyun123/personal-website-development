export function DetectiveMark({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8.2" cy="8.2" r="5.55" stroke="currentColor" strokeWidth="1.7" />
      <path d="m12.45 12.45 4.35 4.35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8.2" cy="8.2" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}
