 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Cannazo", type: "AI Product Film", file: "cannazo.mp4", poster: "cannazo.svg", size: "wide" },
  { title: "Pet Project", type: "AI Animated Brand Film", file: "pet-project.mp4", poster: "pet-project.svg", size: "tall" },
  { title: "Rumik AI", type: "AI UGC Performance Creative", file: "rumik.mp4", poster: "rumik.svg", size: "tall" },
  { title: "Adukale", type: "AI Product Advertisement", file: "adukale.mp4", poster: "adukale.svg", size: "wide" },
  { title: "Social Catfish", type: "AI UGC · TikTok Creative", file: "social-catfish.mp4", poster: "social-catfish.svg", size: "tall" },
  { title: "TripSniper", type: "AI UGC · TikTok Creative", file: "tripsniper.mp4", poster: "tripsniper.svg", size: "tall" },
  { title: "Cheater Scanner", type: "AI UGC · Performance Creative", file: "cheater-scanner.mp4", poster: "cheater-scanner.svg", size: "wide" },
];

function Project({ p }: { p: typeof projects[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <article className={`project project--${p.size}`}>
      <div className="project-media">
        <video ref={ref} src={`/videos/${p.file}`} poster={`/posters/${p.poster}`} muted loop playsInline preload="metadata"
          onPointerEnter={() => { if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.play().catch(()=>{}); }}
          onPointerLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
        />
        <div className="project-shade" />
        <span className="project-type">{p.type}</span>
        <span className="project-index">{String(projects.indexOf(p)+1).padStart(2,"0")}</span>
      </div>
      <div className="project-caption"><h3>{p.title}</h3><span>View project ↗</span></div>
    </article>
  );
}

export default function Portfolio() {
  const showreel = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const lenis = new (require("@studio-freight/lenis").default)({ lerp: 0.085, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title span", { yPercent: 120 }, { yPercent: 0, stagger: .08, duration: 1.2, ease: "power4.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" }});
      });
      gsap.to(".hero-orbit", { rotate: 360, duration: 35, repeat: -1, ease: "none" });
      gsap.to(".hero-glow", { yPercent: 22, xPercent: -10, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }});
      gsap.to(".showreel-frame", { scale: .88, borderRadius: 32, scrollTrigger: { trigger: ".showreel", start: "top top", end: "bottom bottom", scrub: 1 }});
    });
    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  return (
    <main>
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
          <div className="showreel-count">SCROLL / 01—07</div>
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-head reveal"><div><p className="eyebrow">SELECTED WORK</p><h2>Built for the scroll.</h2></div><p>A focused cut of AI ads, product films and UGC-style performance creatives.</p></div>
        <div className="project-grid">{projects.map((p)=><Project key={p.title} p={p}/>)}</div>
      </section>

      <section id="services" className="section services">
        <div className="service-title reveal"><p className="eyebrow">CAPABILITIES</p><h2>From first frame to final cut.</h2></div>
        <div className="service-list">
          {[
            ["01","AI Advertising","Commercial concepts, product films and social-first ads built with generative video."],
            ["02","AI UGC","TikTok-native hooks, creators and UGC-style performance creatives for testing at scale."],
            ["03","Creative Direction","Concepts, prompts, visual systems and iteration across fast-moving campaigns."],
            ["04","Post-Production","Editing, colour, sound, pacing and finishing in DaVinci Resolve and CapCut."]
          ].map(([n,t,d])=><div className="service reveal" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
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
