 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CaseStudyDetails = { focus: string; approach: string; tags: string[] };
type PortfolioProject = {
  title: string;
  type: string;
  file: string;
  poster: string;
  size: "wide" | "tall";
  caseStudy?: CaseStudyDetails;
};

const projects: PortfolioProject[] = [
  {
    title: "MoneyPilot", type: "AI UGC · Performance Advertising", file: "moneypilot.mp4", poster: "moneypilot.svg", size: "wide",
    caseStudy: { focus: "Performance-led financial product creative.", approach: "Creator-style short-form storytelling with a clear opening hook and concise product messaging.", tags: ["AI UGC", "Paid Social", "Hook-led Creative"] }
  },
  {
    title: "Pet Project", type: "AI Animated Brand Film", file: "pet-project.mp4", poster: "pet-project.svg", size: "tall",
    caseStudy: { focus: "A character-led animated brand film for a pet-care concept.", approach: "A playful visual world shaped through animated scenes, a clear narrative progression and a polished final edit.", tags: ["AI Animation", "Brand Film", "Storytelling"] }
  },
  {
    title: "Cheater Scanner", type: "AI UGC · TikTok Creative", file: "cheater-scanner.mp4", poster: "cheater-scanner.svg", size: "tall",
    caseStudy: { focus: "Social-first advertising for an app-oriented service.", approach: "A vertical UGC format built around an immediate hook, a concise narrative and platform-native pacing.", tags: ["AI UGC", "TikTok", "App Advertising"] }
  },
  {
    title: "Rumik AI", type: "AI UGC · App Advertising", file: "rumik.mp4", poster: "rumik.svg", size: "wide",
    caseStudy: { focus: "Creator-led creative for an AI app.", approach: "Short-form storytelling that introduces the product in a familiar social format and keeps the message focused.", tags: ["AI UGC", "AI Apps", "Performance Creative"] }
  },
  { title: "Adukale", type: "AI Product Advertisement", file: "adukale.mp4", poster: "adukale.svg", size: "wide" },
  { title: "Social Catfish", type: "AI UGC · TikTok Creative", file: "social-catfish.mp4", poster: "social-catfish.svg", size: "tall" },
  { title: "TripSniper", type: "AI UGC · TikTok Creative", file: "tripsniper.mp4", poster: "tripsniper.svg", size: "tall" },
  { title: "Cannazo", type: "AI Product Film", file: "cannazo.mp4", poster: "cannazo.svg", size: "wide" },
];

function Project({ p }: { p: PortfolioProject }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <article className={`project project--${p.size} ${p.caseStudy ? "project--case-study" : ""}`}>
      <div className="project-media">
        <video ref={ref} src={`/videos/${p.file}`} poster={`/posters/${p.poster}`} muted loop playsInline preload="metadata"
          onPointerEnter={() => { if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.play().catch(()=>{}); }}
          onPointerLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
        />
        <div className="project-shade" />
        <span className="project-type">{p.caseStudy ? "CASE STUDY · " : ""}{p.type}</span>
        <span className="project-index">{String(projects.indexOf(p)+1).padStart(2,"0")}</span>
      </div>
      <div className="project-caption"><h3>{p.title}</h3><span>{p.caseStudy ? "Featured case study ↗" : "Selected work ↗"}</span></div>
      {p.caseStudy && (
        <div className="project-case-study">
          <div><span className="case-label">CREATIVE FOCUS</span><p>{p.caseStudy.focus}</p></div>
          <div><span className="case-label">APPROACH</span><p>{p.caseStudy.approach}</p></div>
          <div className="case-tags">{p.caseStudy.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      )}
    </article>
  );
}

export default function Portfolio() {
  const showreel = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(".hero-title span",
          { yPercent: 115, rotateX: -8 },
          { yPercent: 0, rotateX: 0, stagger: 0.12, duration: 1.25, ease: "power4.out", delay: 0.12 }
        );
        gsap.fromTo(".hero-copy > *:not(.hero-title)",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: "power3.out", delay: 0.35 }
        );
        gsap.fromTo(".hero-metrics > div",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.75 }
        );

        gsap.utils.toArray<HTMLElement>(".reveal, .project").forEach((el) => {
          gsap.fromTo(el, { y: 56, opacity: 0, rotateX: 2 }, {
            y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          });
        });
        gsap.to(".hero-orbit", { rotate: 360, duration: 42, repeat: -1, ease: "none" });
        gsap.to(".hero-glow", {
          yPercent: 35, xPercent: -15,
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 }
        });
        gsap.to(".showreel-frame", {
          scale: 0.9, borderRadius: 28,
          scrollTrigger: { trigger: ".showreel", start: "top top", end: "bottom bottom", scrub: 1 }
        });
        gsap.to(".scroll-progress", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.15 }
        });

        // A soft acid-lime light follows the pointer. No custom cursor, just atmosphere.
        const glow = document.querySelector<HTMLElement>(".pointer-glow");
        if (glow) {
          const xTo = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3" });
          const yTo = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3" });
          const onMove = (event: PointerEvent) => {
            xTo(event.clientX - 190);
            yTo(event.clientY - 190);
            glow.style.opacity = "1";
          };
          const onLeave = () => { glow.style.opacity = "0"; };
          window.addEventListener("pointermove", onMove, { passive: true });
          document.documentElement.addEventListener("pointerleave", onLeave);
          ctx.add(() => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
          });
        }
      } else {
        gsap.set(".hero-title span", { yPercent: 0, rotateX: 0 });
        gsap.set(".hero-copy > *:not(.hero-title), .hero-metrics > div, .reveal, .project", { opacity: 1, y: 0 });
        gsap.set(".scroll-progress", { scaleX: 0 });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <nav className="nav">
        <a href="#top" className="brand"><b>G</b><span>GOKUL DAS KM</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#services">Capabilities</a><a href="#about">About</a></div>
        <a className="nav-pill" href="mailto:gokuldas.km@gmail.com">Let's talk</a>
      </nav>

      <section id="top" className="hero">
        <div className="hero-glow" />
        <div className="hero-orbit" />
        <div className="hero-copy">
          <p className="eyebrow">AI CONTENT CREATOR · AI VIDEO PRODUCER · AI UGC</p>
          <h1 className="hero-title"><span>I make ads</span><span>with AI.</span></h1>
          <p className="hero-sub">Generative video, AI UGC and performance creative for brands that need ideas to move faster.</p>
          <div className="hero-actions"><a className="primary" href="#work">Explore work</a><a className="underlink" href="mailto:gokuldas.km@gmail.com">Available globally ↗</a></div>
        </div>
        <div className="hero-metrics"><div><strong>300+</strong><small>AI videos</small></div><div><strong>1.5+</strong><small>years with AI</small></div><div><strong>15+</strong><small>brands & clients</small></div></div>
      </section>

      <section className="showreel">
        <div className="showreel-frame">
          <video ref={showreel} src="/videos/showreel.mp4" poster="/posters/showreel.svg" autoPlay muted loop playsInline />
          <div className="showreel-copy"><span>SELECTED SHOWREEL</span><strong>Ideas, generated.</strong></div>
          <div className="showreel-count">SCROLL / 01—08</div>
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-head reveal"><div><p className="eyebrow">FOUR CASE STUDIES · MORE SELECTED WORK</p><h2>Built for the scroll.</h2></div><p>Four featured case studies across performance ads, animation and AI UGC, followed by selected client work.</p></div>
        <div className="project-grid">{projects.map((p)=><Project key={p.title} p={p}/>)}</div>
      </section>

      <section id="services" className="section services">
        <div className="service-title reveal">
          <p className="eyebrow">CAPABILITIES / 01—08</p>
          <h2>A format for<br />every scroll.</h2>
          <p className="capability-intro">From performance ads built to test, to story-led films built to remember. One production pipeline, different creative outputs.</p>
        </div>
        <div className="capability-grid">
          {[
            { n: "01", title: "Meta Ads & Performance", desc: "Direct-response concepts, thumb-stopping hooks and creative variations designed for paid social testing.", tags: ["Meta Ads", "Paid Social", "Hook Variations"] },
            { n: "02", title: "AI UGC & Talking Head", desc: "Creator-style ads, scripted talking-head videos and native-feeling social content without a full shoot setup.", tags: ["UGC", "Talking Head", "Creator Ads"] },
            { n: "03", title: "SaaS & App Ads", desc: "Feature-led ads, product walkthroughs and clear use-case stories for software, apps and digital products.", tags: ["SaaS", "Apps", "Product Demos"] },
            { n: "04", title: "Vertical Series", desc: "Repeatable episode formats, multi-part stories and recurring short-form concepts that give audiences a reason to return.", tags: ["Series", "Episodic", "Storytelling"] },
            { n: "05", title: "Product Films & Commercials", desc: "AI-generated hero films, product beauty shots and cinematic brand advertising built around a strong visual idea.", tags: ["Product Film", "Commercials", "Brand Ads"] },
            { n: "06", title: "2D Animation & Explainers", desc: "Flat 2D visuals, animated brand stories and simple explainers that make an idea easy to follow.", tags: ["2D Animation", "Explainers", "Animated Stories"] },
            { n: "07", title: "Social-First Shorts", desc: "Vertical-first creative edited for the pace and framing of TikTok, Instagram Reels and YouTube Shorts.", tags: ["TikTok", "Reels", "Shorts"] },
            { n: "08", title: "Creative to Final Cut", desc: "Concepting, scripting, visual direction, AI generation, editing, colour, sound design and finishing in one workflow.", tags: ["Creative Direction", "Editing", "Post-Production"] }
          ].map((item) => (
            <article className="capability-card reveal" key={item.n}>
              <div className="capability-card-top"><span className="capability-number">{item.n}</span><span className="capability-arrow" aria-hidden="true">↗</span></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="capability-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section about">
        <div className="reveal"><p className="eyebrow">ABOUT</p><h2>Based in Bangalore.<br/>Working globally.</h2></div>
        <div className="about-copy reveal">
          <p>I’m Gokul Das KM, an AI content creator and video producer focused on generative advertising, AI UGC and short-form creative.</p>
          <p>I’ve produced 300+ AI videos across agency, freelance and studio work, including Trifid Media, TripleSpeed and K12 Ad Labs.</p>
          <div className="socials"><a href="https://www.linkedin.com" target="_blank">LinkedIn ↗</a><a href="https://www.instagram.com/gokulgxz" target="_blank">Instagram ↗</a><a href="mailto:gokuldas.km@gmail.com">Email ↗</a></div>
        </div>
      </section>

      <section className="contact">
        <p className="eyebrow">GLOBAL / REMOTE</p>
        <h2>Have an idea<br/><em>worth making?</em></h2>
        <a href="mailto:gokuldas.km@gmail.com" className="contact-button">Start a project ↗</a>
      </section>

      <footer><span>GOKUL DAS KM</span><span>AI CONTENT · VIDEO · UGC</span><span>BANGALORE / GLOBAL</span></footer>
    </main>
  );
}
