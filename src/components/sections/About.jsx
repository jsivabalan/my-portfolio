import { useInView } from "react-intersection-observer";
import { personal } from "@/data/portfolio";
import SectionLabel from "@/components/common/SectionLabel";

const INFO_ROWS = [
  ["name", "Sivabalan Jayaraman"],
  ["role", ".NET Full Stack Developer"],
  ["location", "Kuala Lumpur, Malaysia"],
  ["experience", "~4 years"],
  ["status", "Open to work ✓"],
  ["education", "BCA, Univ. of Madras"],
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <SectionLabel number={1} label="About" />

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div style={fade(0)}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Building systems
              <br />
              <span className="gradient-text">that actually ship.</span>
            </h2>

            <p
              style={{
                color: "var(--text-2)",
                lineHeight: 1.8,
                marginBottom: "1.2rem",
                fontSize: "1rem",
              }}
            >
              I&apos;m a .NET Full Stack Developer based in Kuala Lumpur with
              close to 4 years of experience building production-grade
              enterprise applications. My work spans airport security platforms,
              AI camera monitoring systems, and digital permit workflows — each
              serving real users at scale.
            </p>
            <p
              style={{
                color: "var(--text-2)",
                lineHeight: 1.8,
                marginBottom: "1.2rem",
                fontSize: "1rem",
              }}
            >
              I care deeply about clean architecture, maintainable code, and
              end-to-end ownership. Whether it&apos;s designing the database
              schema or building the Angular front-end, I take full
              responsibility for what I ship.
            </p>
            <p
              style={{
                color: "var(--text-2)",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              Originally from Chennai, now building my career in Malaysia —
              looking for the next challenge at an MNC where I can grow as a
              senior engineer.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  label: "↗ LinkedIn",
                  href: personal.linkedin,
                  external: true,
                },
                {
                  label: `✉ ${personal.email}`,
                  href: `mailto:${personal.email}`,
                  external: false,
                },
              ].map(({ label, href, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    border: "1px solid rgba(0,212,255,0.3)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                    letterSpacing: "0.06em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,212,255,0.08)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — code card */}
          <div style={fade(0.2)}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  background: "var(--surface-2)",
                  padding: "0.75rem 1.2rem",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-3)",
                    marginLeft: "0.5rem",
                  }}
                >
                  profile.json
                </span>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "1.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  lineHeight: 2,
                }}
              >
                <span style={{ color: "var(--text-3)" }}>{"{"}</span>
                {INFO_ROWS.map(([key, val]) => (
                  <div key={key} style={{ paddingLeft: "1.5rem" }}>
                    <span style={{ color: "var(--accent)" }}>
                      &quot;{key}&quot;
                    </span>
                    <span style={{ color: "var(--text-3)" }}>: </span>
                    <span style={{ color: "#a3e635" }}>&quot;{val}&quot;</span>
                    <span style={{ color: "var(--text-3)" }}>,</span>
                  </div>
                ))}
                <span style={{ color: "var(--text-3)" }}>{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
