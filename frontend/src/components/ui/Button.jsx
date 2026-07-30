function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  icon: Icon,
  className = "",
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-medium font-body rounded-xl transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variants = {
    primary:
      "text-white bg-cta-gradient bg-[length:180%_100%] bg-left hover:bg-right shadow-glow active:scale-[0.98]",
    secondary:
      "text-ink bg-surface-light border border-surface-borderStrong hover:border-brand-violetLight/60 hover:bg-surface active:scale-[0.98]",
    ghost:
      "text-ink-dim hover:text-ink hover:bg-white/5 active:scale-[0.98]",
    danger:
      "text-white bg-signal-danger/90 hover:bg-signal-danger active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ transitionProperty: "background-position, transform, background-color, border-color" }}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      )}
      {!loading && Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
