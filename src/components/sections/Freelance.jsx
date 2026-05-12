import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { freelance } from "@/data/portfolio";
import SectionLabel from "@/components/common/SectionLabel";

function FreelanceCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, background 0.2s, border-color 0.2s`,
        background: hovered ? "var(--surface-2)" : "var(--surface)",
        border: `1px solid ${hovered ? project.color + "55" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        borderTop: `2px solid ${project.color}`,
      }}
    >
      {/* Hover glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.color}10 0%, transparent 70%)`,
          transform: "translate(30%,-30%)",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Tag */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          color: project.color,
          border: `1px solid ${project.color}66`,
          padding: "0.15rem 0.5rem",
          borderRadius: "2px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "inline-block",
          marginBottom: "1rem",
        }}
      >
        Freelance · {project.tag}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: "0.8rem",
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          color: "var(--text-2)",
          fontSize: "0.88rem",
          lineHeight: 1.7,
          marginBottom: "1.2rem",
        }}
      >
        {project.description}
      </p>

      {/* Features */}
      <div style={{ marginBottom: "1.5rem" }}>
        {project.highlights.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              marginBottom: "0.35rem",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: `${project.color}22`,
                border: `1px solid ${project.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
                fontSize: "0.5rem",
                color: project.color,
              }}
            >
              ✓
            </span>
            <span
              style={{
                color: "var(--text-2)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}
            >
              {h}
            </span>
          </div>
        ))}
      </div>

      {/* Tech */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-2)",
              background: "var(--bg-3)",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              padding: "0.15rem 0.5rem",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Freelance() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="freelance" className="section" ref={ref}>
      <div className="container">
        <SectionLabel number={3} label="Freelance" />

        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Built for <span className="gradient-text">real businesses.</span>
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Alongside my full-time role, I&apos;ve built practical internal
            tools for small businesses with real-world requirements.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {freelance.map((p, i) => (
            <FreelanceCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
