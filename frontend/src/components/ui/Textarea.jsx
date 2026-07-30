function Textarea({
  label,
  icon: Icon,
  rows = 10,
  maxLength,
  value = "",
  className = "",
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-2 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-brand-violetLight" />}
          <label className="text-sm font-medium text-ink-dim">{label}</label>
        </div>
      )}
      <textarea
        rows={rows}
        value={value}
        maxLength={maxLength}
        className="w-full resize-y rounded-xl border border-surface-borderStrong bg-surface-light/80 p-4 text-sm leading-relaxed text-ink placeholder:text-ink-faint outline-none transition-colors duration-200 focus:border-brand-violetLight/70"
        {...props}
      />
      {maxLength && (
        <div className="mt-1.5 text-right font-mono text-xs text-ink-faint">
          {value.length.toLocaleString()} / {maxLength.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default Textarea;
