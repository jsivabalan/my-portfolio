import "./index.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Freelance from "@/components/sections/Freelance";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap";
document.head.appendChild(link);

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Freelance />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
