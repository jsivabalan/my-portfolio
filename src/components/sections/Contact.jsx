import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { personal } from "@/data/portfolio";
import { useContactForm } from "@/hooks/useContactForm";
import FormField from "@/components/ui/FormField";
import SectionLabel from "@/components/common/SectionLabel";

function SuccessScreen({ onReset }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 2rem",
        background: "var(--surface)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(34,197,94,0.12)",
          border: "1px solid rgba(34,197,94,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#22c55e",
        }}
      >
        ✓
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#22c55e",
        }}
      >
        Message sent!
      </h3>
      <p
        style={{
          color: "var(--text-2)",
          fontSize: "0.9rem",
          maxWidth: "300px",
          lineHeight: 1.7,
        }}
      >
        Thanks for reaching out. I&apos;ll get back to you at your email within
        24 hours.
      </p>
      <button
        onClick={onReset}
        style={{
          marginTop: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--text-2)",
          background: "transparent",
          border: "1px solid var(--border-2)",
          borderRadius: "4px",
          padding: "0.45rem 1rem",
          cursor: "pointer",
          letterSpacing: "0.06em",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "var(--text-2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-2)";
          e.currentTarget.style.borderColor = "var(--border-2)";
        }}
      >
        Send another message
      </button>
    </div>
  );
}

function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rows = [
    {
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      actionLabel: copied ? "✓ Copied" : "Copy",
      onAction: copy,
      actionColor: copied ? "#22c55e" : undefined,
    },
    {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      value: "linkedin.com/in/sivabalanj2303",
      href: personal.linkedin,
    },
    {
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Location",
      value: personal.location,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      {rows.map(
        ({ icon, label, value, href, actionLabel, onAction, actionColor }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.9rem 1.1rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>
              {icon}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--text-3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.1rem",
                }}
              >
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                </a>
              ) : (
                <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>
                  {value}
                </span>
              )}
            </div>
            {onAction && (
              <button
                onClick={onAction}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: actionColor || "var(--text-3)",
                  background: "transparent",
                  border: `1px solid ${actionColor ? `${actionColor}55` : "var(--border)"}`,
                  borderRadius: "3px",
                  padding: "0.2rem 0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  flexShrink: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {actionLabel}
              </button>
            )}
          </div>
        ),
      )}
    </div>
  );
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const {
    fields,
    errors,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useContactForm();

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <SectionLabel number={5} label="Contact" />

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div style={fade(0)}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: "1.2rem",
                letterSpacing: "-0.02em",
              }}
            >
              Let&apos;s build something
              <br />
              <span className="gradient-text">great together.</span>
            </h2>
            
            <ContactInfo />

            {/* Available badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "100px",
                padding: "0.35rem 0.9rem",
                marginTop: "1.5rem",
              }}
            >
              <span
                className="animate-pulse-glow"
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "#22c55e",
                  letterSpacing: "0.06em",
                }}
              >
                Available for new roles
              </span>
            </div>
          </div>

          {/* Right — form */}
          <div style={fade(0.2)}>
            {status === "success" ? (
              <SuccessScreen onReset={reset} />
            ) : (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "2rem",
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Send me a message
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-3)",
                    }}
                  >
                    Goes directly to my inbox · I reply within 24 hours
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {/* Name + Title row */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <FormField
                      label="Full Name"
                      name="name"
                      value={fields.name}
                      placeholder="John Smith"
                      error={errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormField
                      label="Job Title"
                      name="title"
                      value={fields.title}
                      placeholder="Engineering Manager"
                      error={errors.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={fields.email}
                    placeholder="john@company.com"
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FormField
                    label="Message"
                    name="message"
                    value={fields.message}
                    placeholder="Tell me about the role or project..."
                    error={errors.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                    rows={5}
                  />

                  {/* Error banner */}
                  {status === "error" && (
                    <div
                      style={{
                        padding: "0.7rem 1rem",
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "#ef4444",
                      }}
                    >
                      ⚠ Something went wrong. Email me directly at{" "}
                      <a
                        href={`mailto:${personal.email}`}
                        style={{
                          color: "#ef4444",
                          textDecoration: "underline",
                        }}
                      >
                        {personal.email}
                      </a>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      padding: "0.85rem",
                      background:
                        status === "sending"
                          ? "var(--border-2)"
                          : "var(--accent)",
                      color: "var(--bg)",
                      border: "none",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      if (status === "sending") return;
                      e.currentTarget.style.background = "#00b8d9";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0,212,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        status === "sending"
                          ? "var(--border-2)"
                          : "var(--accent)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <span
                          className="animate-spin"
                          style={{
                            width: "14px",
                            height: "14px",
                            border: "2px solid rgba(0,0,0,0.3)",
                            borderTop: "2px solid var(--bg)",
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .form-row     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
