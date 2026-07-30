function Logo({ size = "md", withWordmark = true, className = "" }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className={`hidden lg:flex items-center gap-2.5 ${className}`}>
      <img src="/favicon.svg" alt="" className={sizes[size]} />
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          PrepForge
        </span>
      )}
    </div>
  );
}

export default Logo;
