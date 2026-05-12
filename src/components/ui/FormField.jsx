export default function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  onBlur,
  multiline = false,
  rows = 5,
  required = true,
}) {
  const hasError = Boolean(error);

  const inputStyle = {
    width: "100%",
    background: "var(--bg-3)",
    border: `1px solid ${hasError ? "#ef4444" : "var(--border-2)"}`,
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.92rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    resize: multiline ? "vertical" : "none",
    lineHeight: 1.6,
    boxSizing: "border-box",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = hasError ? "#ef4444" : "var(--accent)";
    e.target.style.boxShadow = hasError
      ? "0 0 0 3px rgba(239,68,68,0.08)"
      : "0 0 0 3px rgba(0,212,255,0.08)";
  };

  const handleBlurInternal = (e) => {
    e.target.style.borderColor = hasError ? "#ef4444" : "var(--border-2)";
    e.target.style.boxShadow = "none";
    if (onBlur) onBlur(e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        htmlFor={name}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          color: hasError ? "#ef4444" : "var(--text-2)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--accent)", marginLeft: "3px" }}>*</span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={onChange}
          onBlur={handleBlurInternal}
          onFocus={handleFocus}
          style={inputStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlurInternal}
          onFocus={handleFocus}
          style={inputStyle}
        />
      )}

      {hasError && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#ef4444",
            letterSpacing: "0.04em",
          }}
        >
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
