import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUpLib from "react-countup";
const CountUp = CountUpLib.default ?? CountUpLib;
import HologramPet from "@/components/common/HologramPet";
import { personal, stats } from "@/data/portfolio";

const TYPING_STRINGS = [
  ".NET Full Stack Developer",
  "ASP.NET Core Engineer",
  "Angular & React Developer",
  "Enterprise Systems Builder",
];

function TypingText() {
  const [text, setText] = useState("");
  const [strIndex, setStrIndex] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[strIndex];
    const delay = deleting ? 38 : 75;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIdx + 1);
        setText(next);
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        const next = current.slice(0, charIdx - 1);
        setText(next);
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setStrIndex((s) => (s + 1) % TYPING_STRINGS.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, strIndex]);

  return (
    <span>
      <span style={{ color: "var(--accent)" }}>{text}</span>
      <span className="animate-blink" style={{ color: "var(--accent)" }}>
        |
      </span>
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "3%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(168,85,247,0.05) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            ...fade(0),
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "100px",
            padding: "0.3rem 0.9rem",
            marginBottom: "2rem",
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
              color: "var(--accent)",
              letterSpacing: "0.08em",
            }}
          >
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            ...fade(0.1),
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "1.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="gradient-text-cyan">Sivabalan <span style={{ color: "var(--text)" }}>Jayaraman</span></span>
          <br />
          
        </h1>

        {/* Typing subtitle */}
        <div
          style={{
            ...fade(0.2),
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "var(--text-2)",
            marginBottom: "1.5rem",
            minHeight: "2em",
          }}
        >
          <TypingText />
        </div>

        {/* Tagline */}
        <p
          style={{
            ...fade(0.3),
            fontSize: "1.05rem",
            color: "var(--text-2)",
            marginBottom: "2.5rem",
            lineHeight: 1.75,
          }}
        >
          Results-driven .NET Full Stack Developer with ~4 years of experience
          across airport security, AI camera networks, facilities management and
          e-commerce. Originally from Tamil Nadu — currently working on-site in
          Kuala Lumpur, open to senior roles at MNCs.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            ...fade(0.4),
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          <a
            href="#experience"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              padding: "0.8rem 2rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00b8d9";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0,212,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              background: "transparent",
              color: "var(--text)",
              padding: "0.8rem 2rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid var(--border-2)",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-2)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            ...fade(0.5),
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1px",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "1.2rem 1.4rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                {inView ? <CountUp end={s.value} duration={2} /> : "0"}
                <span style={{ fontSize: "1.1rem" }}>+</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
