interface Props {
  className?: string;
  showTagline?: boolean;
}

const MiramarLogo = ({ className = "", showTagline = true }: Props) => (
  <div className={`flex flex-col items-center text-center ${className}`}>
    <svg
      viewBox="0 0 200 32"
      className="h-8 w-auto text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 16 Q 30 4 55 16 T 105 16 T 155 16 T 195 16" opacity="0.9" />
      <path d="M5 24 Q 30 14 55 24 T 105 24 T 155 24 T 195 24" opacity="0.5" />
    </svg>
    <h1 className="mt-2 font-serif text-3xl font-medium tracking-[0.25em] text-foreground">
      MIRAMAR
    </h1>
    {showTagline && (
      <p className="mt-1 text-[10px] font-light tracking-[0.45em] text-accent/90">
        ROOFTOP GASTRONOMIA
      </p>
    )}
  </div>
);

export default MiramarLogo;
