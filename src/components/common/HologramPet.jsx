// components/HologramPet.jsx
import { useEffect, useRef, useState } from "react";

export default function HologramPet({
  isVisible = true,
  onWave,
  characterStyle = "protagonist",
}) {
  const petRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [greeting, setGreeting] = useState("");

  const greetings = [
    "Yo! 👋",
    "Let's code! 💻",
    "Ready? 🚀",
    "Hey there! ✨",
    "Welcome! 🔥",
  ];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        triggerWelcome();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const triggerWelcome = () => {
    setIsAnimating(true);
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    if (onWave) onWave();

    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setGreeting(""), 1500);
    }, 2000);
  };

  const handleClick = () => {
    if (isAnimating) return;
    triggerWelcome();
  };

  return (
    <div
      ref={petRef}
      className="manga-hologram-wrapper"
      style={{
        position: "absolute",
        bottom: "clamp(1rem, 6vh, 3rem)",
        right: "clamp(0.5rem, 3vw, 2rem)",
        zIndex: 3,
        pointerEvents: "auto",
        display: isVisible ? "block" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="Manga hologram companion - click to interact"
    >
      {/* Hologram projection base */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(80px, 18vw, 140px)",
          height: "4px",
          borderRadius: "2px",
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
          boxShadow:
            "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(168,85,247,0.3)",
          animation: "pulse-glow 1.5s ease-in-out infinite",
        }}
      />

      {/* Main hologram container */}
      <div
        className="manga-hologram"
        style={{
          position: "relative",
          width: "clamp(90px, 20vw, 160px)",
          height: "clamp(140px, 32vw, 240px)",
          animation: isAnimating
            ? "manga-entry 0.6s ease-out, float 3s ease-in-out infinite 0.6s"
            : "float 3s ease-in-out infinite",
          cursor: "pointer",
          transition: "filter 0.2s ease, transform 0.2s ease",
          filter: isHovered
            ? "drop-shadow(0 0 12px rgba(0,212,255,0.9))"
            : "drop-shadow(0 0 6px rgba(0,212,255,0.5))",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {/* Hologram scan effect overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0, 212, 255, 0.05) 3px,
              rgba(0, 212, 255, 0.05) 6px
            )`,
            pointerEvents: "none",
            animation: "scan 1.5s linear infinite",
            borderRadius: "4px",
          }}
        />

        {/* Manga Character SVG */}
        <svg
          viewBox="0 0 120 200"
          className="manga-character-svg"
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          <defs>
            {/* Hologram gradient */}
            <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.95" />
            </linearGradient>

            {/* Hair gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#16213e" />
              <stop offset="100%" stopColor="#0f0f23" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="holoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2"
                result="blurred"
              />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Edge glow */}
            <filter id="edgeGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feFlood
                floodColor="#00d4ff"
                floodOpacity="0.5"
                result="glowColor"
              />
              <feComposite
                in="glowColor"
                in2="blur"
                operator="in"
                result="softGlow"
              />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body silhouette glow */}
          <ellipse
            cx="60"
            cy="170"
            rx="35"
            ry="8"
            fill="rgba(0,212,255,0.15)"
            style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
          />

          {/* Jacket/Outfit */}
          <path
            d="M 35 120 Q 30 150 35 180 L 45 185 L 45 140 Q 60 135 75 140 L 75 185 L 85 180 Q 90 150 85 120 Z"
            fill="url(#hairGrad)"
            stroke="url(#holoGrad)"
            strokeWidth="1.5"
            opacity="0.95"
            filter="url(#edgeGlow)"
          />

          {/* Jacket details */}
          <path
            d="M 52 130 L 52 160 M 68 130 L 68 160"
            stroke="rgba(0,212,255,0.6)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="60" cy="145" r="3" fill="rgba(168,85,247,0.8)" />

          {/* Neck */}
          <rect
            x="52"
            y="105"
            width="16"
            height="18"
            fill="rgba(255,230,200,0.7)"
            stroke="url(#holoGrad)"
            strokeWidth="0.8"
          />

          {/* Head */}
          <ellipse
            cx="60"
            cy="85"
            rx="22"
            ry="26"
            fill="rgba(255,235,210,0.85)"
            stroke="url(#holoGrad)"
            strokeWidth="1.5"
            filter="url(#edgeGlow)"
          />

          {/* Spiky Manga Hair */}
          <g filter="url(#edgeGlow)">
            {/* Main hair mass */}
            <path
              d="M 38 85 Q 30 60 45 45 Q 50 30 60 25 Q 70 30 75 45 Q 90 60 82 85 Q 85 75 78 65 Q 82 55 72 48 Q 65 42 60 45 Q 55 42 48 48 Q 38 55 42 65 Q 35 75 38 85 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="1.2"
            />
            {/* Spikes */}
            <path
              d="M 45 45 L 42 28 L 50 40 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="0.8"
            />
            <path
              d="M 60 25 L 60 12 L 68 30 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="0.8"
            />
            <path
              d="M 75 45 L 82 28 L 72 40 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="0.8"
            />
            {/* Side spikes */}
            <path
              d="M 38 75 L 28 70 L 40 78 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="0.8"
            />
            <path
              d="M 82 75 L 92 70 L 80 78 Z"
              fill="url(#hairGrad)"
              stroke="url(#holoGrad)"
              strokeWidth="0.8"
            />
          </g>

          {/* Eyebrows - determined */}
          <path
            d="M 48 72 Q 52 68 56 70"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 64 70 Q 68 68 72 72"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Eyes - manga style */}
          <g className="manga-eyes">
            {/* Left eye */}
            <ellipse
              cx="50"
              cy="82"
              rx="7"
              ry="9"
              fill="white"
              stroke="#1a1a2e"
              strokeWidth="1"
            />
            <ellipse cx="52" cy="84" rx="4" ry="5" fill="url(#holoGrad)" />
            <circle cx="53" cy="82" r="2" fill="white" opacity="0.9" />
            <circle cx="50" cy="86" r="1" fill="white" opacity="0.6" />

            {/* Right eye */}
            <ellipse
              cx="70"
              cy="82"
              rx="7"
              ry="9"
              fill="white"
              stroke="#1a1a2e"
              strokeWidth="1"
            />
            <ellipse cx="68" cy="84" rx="4" ry="5" fill="url(#holoGrad)" />
            <circle cx="67" cy="82" r="2" fill="white" opacity="0.9" />
            <circle cx="70" cy="86" r="1" fill="white" opacity="0.6" />

            {/* Eye shine animation */}
            <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </g>

          {/* Nose */}
          <path
            d="M 60 90 L 58 96 L 62 96 Z"
            fill="none"
            stroke="rgba(26,26,46,0.6)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Mouth - confident smile */}
          <path
            d="M 52 102 Q 60 108 68 102"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Scar/Mark on cheek (protagonist trait) */}
          <path
            d="M 78 92 Q 82 95 80 100"
            fill="none"
            stroke="rgba(255,100,100,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Waving Arm - dynamic pose */}
          <g
            className="manga-arm"
            style={{
              transformOrigin: "85px 125px",
              animation: isAnimating
                ? "manga-wave 0.12s ease-in-out 7"
                : "none",
            }}
          >
            {/* Upper arm */}
            <path
              d="M 78 125 Q 95 115 105 100"
              fill="none"
              stroke="url(#hairGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Forearm */}
            <path
              d="M 105 100 Q 115 85 118 75"
              fill="none"
              stroke="url(#hairGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Hand */}
            <ellipse
              cx="118"
              cy="75"
              rx="6"
              ry="8"
              fill="rgba(255,235,210,0.85)"
              stroke="url(#holoGrad)"
              strokeWidth="1"
            />
            {/* Fingers */}
            <path
              d="M 115 68 L 114 60 M 118 67 L 118 58 M 121 68 L 122 62"
              stroke="rgba(26,26,46,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Other arm - relaxed pose */}
          <path
            d="M 42 125 Q 35 145 38 165"
            fill="none"
            stroke="url(#hairGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <ellipse
            cx="38"
            cy="168"
            rx="5"
            ry="7"
            fill="rgba(255,235,210,0.85)"
            stroke="url(#holoGrad)"
            strokeWidth="1"
          />

          {/* Floating energy particles */}
          <g className="energy-particles" opacity="0.8">
            <circle
              cx="25"
              cy="60"
              r="2"
              fill="#00d4ff"
              className="particle-float"
              style={{ animationDelay: "0s" }}
            />
            <circle
              cx="95"
              cy="50"
              r="2.5"
              fill="#a855f7"
              className="particle-float"
              style={{ animationDelay: "0.3s" }}
            />
            <circle
              cx="15"
              cy="120"
              r="1.5"
              fill="#22c55e"
              className="particle-float"
              style={{ animationDelay: "0.6s" }}
            />
            <circle
              cx="100"
              cy="140"
              r="2"
              fill="#00d4ff"
              className="particle-float"
              style={{ animationDelay: "0.9s" }}
            />
            <circle
              cx="40"
              cy="30"
              r="1.8"
              fill="#ff6b35"
              className="particle-float"
              style={{ animationDelay: "1.2s" }}
            />
          </g>

          {/* Speed lines for dynamic effect */}
          <g className="speed-lines" opacity="0.3">
            <line
              x1="10"
              y1="40"
              x2="35"
              y2="55"
              stroke="var(--accent)"
              strokeWidth="0.5"
              className="speed-line"
              style={{ animationDelay: "0s" }}
            />
            <line
              x1="110"
              y1="60"
              x2="90"
              y2="75"
              stroke="var(--purple)"
              strokeWidth="0.5"
              className="speed-line"
              style={{ animationDelay: "0.2s" }}
            />
            <line
              x1="5"
              y1="100"
              x2="25"
              y2="110"
              stroke="var(--accent)"
              strokeWidth="0.5"
              className="speed-line"
              style={{ animationDelay: "0.4s" }}
            />
          </g>
        </svg>

        {/* Speech bubble greeting */}
        {greeting && (
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--surface)",
              border: "2px solid var(--accent)",
              borderRadius: "12px 12px 12px 4px",
              padding: "0.5rem 0.9rem",
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.65rem, 2.2vw, 0.85rem)",
              color: "var(--accent)",
              fontWeight: "700",
              whiteSpace: "nowrap",
              boxShadow:
                "0 4px 24px rgba(0,212,255,0.4), inset 0 0 20px rgba(0,212,255,0.1)",
              animation:
                "bubble-pop 0.3s ease-out, float 2s ease-in-out infinite",
              zIndex: 20,
            }}
          >
            {greeting}
            {/* Bubble tail */}
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "0",
                height: "0",
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "10px solid var(--surface)",
              }}
            />
          </div>
        )}

        {/* Hover glow ring */}
        {isHovered && !isAnimating && (
          <div
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "8px",
              border: "2px dashed rgba(0,212,255,0.5)",
              animation: "rotate-dash 3s linear infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Interaction hint */}
      {isHovered && !isAnimating && (
        <div
          style={{
            position: "absolute",
            bottom: "-28px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.5rem, 1.8vw, 0.65rem)",
            color: "var(--text-3)",
            letterSpacing: "0.08em",
            animation: "fade-in 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          [ CLICK TO INTERACT ]
        </div>
      )}
    </div>
  );
}
