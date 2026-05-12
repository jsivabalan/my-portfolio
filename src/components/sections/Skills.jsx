import { useInView } from "react-intersection-observer";
import { skills } from "@/data/portfolio";
import SectionLabel from "@/components/common/SectionLabel";

const COLORS = {
  Languages: "#00d4ff",
  Frameworks: "#a855f7",
  Architecture: "#ff6b35",
  "Front-End": "#ec4899",
  Databases: "#22c55e",
  "APIs & Services": "#f59e0b",
  DevTools: "#06b6d4",
  Methodologies: "#8b5cf6",
};

function SkillCard({ category, items, color, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "1.5rem",
        borderTop: `2px solid ${color}`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: color,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "1rem",
        }}
      >
        {category}
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {items.map((skill) => (
          <span
            key={skill}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-2)",
              background: "var(--bg-3)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "0.3rem 0.7rem",
              transition: "all 0.2s ease",
              cursor: "default",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = color;
              e.currentTarget.style.borderColor = `${color}66`;
              e.currentTarget.style.background = `${color}11`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-2)";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--bg-3)";
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="skills"
      className="section"
      style={{ background: "var(--bg-2)" }}
      ref={ref}
    >
      <div className="container">
        <SectionLabel number={4} label="Skills" />

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
            The full <span className="gradient-text">tech stack.</span>
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "1rem",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            End-to-end capabilities — from clean architecture patterns to
            responsive front-end UIs and cloud integrations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {Object.entries(skills).map(([cat, items], i) => (
            <SkillCard
              key={cat}
              category={cat}
              items={items}
              color={COLORS[cat] || "var(--accent)"}
              index={i}
            />
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1.5rem 2rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
        >
          <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚡</span>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "0.88rem",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              Quick adaptor.
            </span>{" "}
            My current role has required picking up new stacks and architectures
            on the fly. I learn fast and apply in production environments with
            confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
