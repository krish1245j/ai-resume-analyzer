import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Input({
  label,
  type = "text",
  icon: Icon,
  error,
  className = "",
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-ink-dim"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-faint" />
        )}
        <input
          id={id}
          type={resolvedType}
          className={`w-full rounded-xl border bg-surface-light/80 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors duration-200
            ${Icon ? "pl-10" : "pl-3.5"} ${isPassword ? "pr-11" : "pr-3.5"}
            ${error ? "border-signal-danger/60" : "border-surface-borderStrong focus:border-brand-violetLight/70"}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-dim transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff className="h-4.5 w-4.5" /> : <FiEye className="h-4.5 w-4.5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-signal-danger">{error}</p>}
    </div>
  );
}

export default Input;
