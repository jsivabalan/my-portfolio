import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { experience } from "@/data/portfolio";
import SectionLabel from "@/components/common/SectionLabel";

function TechBadge({ label }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        color: "var(--text-2)",
        background: "var(--bg-3)",
        border: "1px solid var(--border)",
        borderRadius: "3px",
        padding: "0.15rem 0.5rem",
        letterSpacing: "0.04em",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, background 0.2s, border-color 0.2s`,
        background: hovered ? "var(--surface-2)" : "var(--surface)",
        border: `1px solid ${hovered ? project.color + "44" : "var(--border)"}`,
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: project.color,
          borderRadius: "2px 0 0 2px",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.2s",
        }}
      />

      <div style={{ paddingLeft: "0.5rem" }}>
        {/* Tags row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            marginBottom: "0.6rem",
            flexWrap: "wrap",
          }}
        >
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
            }}
          >
            {project.tag}
          </span>
          {project.client && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-3)",
              }}
            >
              → {project.client}
            </span>
          )}
        </div>

        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "0.6rem",
          }}
        >
          {project.name}
        </h4>

        <p
          style={{
            color: "var(--text-2)",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        <ul style={{ marginBottom: "1rem", paddingLeft: 0, listStyle: "none" }}>
          {project.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                marginBottom: "0.3rem",
              }}
            >
              <span
                style={{
                  color: project.color,
                  marginTop: "0.35rem",
                  fontSize: "0.55rem",
                  flexShrink: 0,
                }}
              >
                ▶
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
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="experience"
      className="section"
      style={{ background: "var(--bg-2)" }}
      ref={ref}
    >
      <div className="container">
        <SectionLabel number={2} label="Experience" />

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "3rem",
            letterSpacing: "-0.02em",
          }}
        >
          Where I&apos;ve <span className="gradient-text">worked.</span>
        </h2>

        {experience.map((job, ji) => (
          <div key={job.company} style={{ marginBottom: "4rem" }}>
            {/* Job header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                paddingBottom: "1.2rem",
                borderBottom: "1px solid var(--border)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${ji * 0.1}s, transform 0.5s ease ${ji * 0.1}s`,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {job.role}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {job.company}
                  </span>
                  <span style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>
                    · {job.location}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-3)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "4px",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {job.period}
              </span>
            </div>

            {/* Projects */}
            {job.projects.map((p, pi) => (
              <ProjectCard key={p.name} project={p} index={pi} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
