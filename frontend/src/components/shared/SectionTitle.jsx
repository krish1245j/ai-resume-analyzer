function SectionTitle({ eyebrow, title, description, icon: Icon, align = "left", className = "" }) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-violetLight">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-ink-faint sm:text-base">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;
