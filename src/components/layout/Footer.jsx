import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-3)",
          }}
        >
          <span style={{ color: "var(--text-3)" }}>{"<"}</span>
          <span style={{ color: "var(--accent)" }}>SJ</span>
          <span style={{ color: "var(--text-3)" }}>{"/>"}</span>
          {" · "}
          {new Date().getFullYear()}
          {" · Built with React + Vite"}
        </span>

        <a
          href={`mailto:${personal.email}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-3)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
        >
          {personal.email}
        </a>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-3)",
          }}
        >
          {personal.location}
        </span>
      </div>
    </footer>
  );
}
