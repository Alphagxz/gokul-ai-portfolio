 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CaseStudyDetails = { focus: string; approach: string; tags: string[] };
type PortfolioProject = {
  title: string;
  type: string;
  file: string;
  src?: string;
  poster?: string;
  size: "wide" | "tall";
  caseStudy?: CaseStudyDetails;
};

const projects: PortfolioProject[] = [
  {
    title: "MoneyPilot", type: "AI UGC · Performance Advertising", file: "moneypilot.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/money%20pilot%20v43.mp4", poster: "moneypilot.svg", size: "wide",
    caseStudy: { focus: "Performance-led financial product creative.", approach: "Creator-style short-form storytelling with a clear opening hook and concise product messaging.", tags: ["AI UGC", "Paid Social", "Hook-led Creative"] }
  },
  {
    title: "Pet Project", type: "AI Animated Brand Film", file: "pet-project.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/pet%20project%20spa%20Animated.mp4", poster: "pet-project.svg", size: "tall",
    caseStudy: { focus: "A character-led animated brand film for a pet-care concept.", approach: "A playful visual world shaped through animated scenes, a clear narrative progression and a polished final edit.", tags: ["AI Animation", "Brand Film", "Storytelling"] }
  },
  {
    title: "Cheater Scanner", type: "AI UGC · TikTok Creative", file: "cheater-scanner.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner%20v22.mp4", poster: "cheater-scanner.svg", size: "tall",
    caseStudy: { focus: "Social-first advertising for an app-oriented service.", approach: "A vertical UGC format built around an immediate hook, a concise narrative and platform-native pacing.", tags: ["AI UGC", "TikTok", "App Advertising"] }
  },
  {
    title: "Rumik AI", type: "AI UGC · App Advertising", file: "rumik.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/rumik%20ira.MP4", poster: "rumik.svg", size: "wide",
    caseStudy: { focus: "Creator-led creative for an AI app.", approach: "Short-form storytelling that introduces the product in a familiar social format and keeps the message focused.", tags: ["AI UGC", "AI Apps", "Performance Creative"] }
  },
  { title: "Adukale", type: "AI Product Advertisement", file: "adukale.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Adukale%20Khara%20chakkli.mp4", poster: "adukale.svg", size: "wide" },
  { title: "Social Catfish", type: "AI UGC · TikTok Creative", file: "social-catfish.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Social%20catfish%20v1.mov", poster: "social-catfish.svg", size: "tall" },
  { title: "TripSniper", type: "AI UGC · TikTok Creative", file: "tripsniper.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Copy%20of%20Copy%20of%20Tripsniper%20AD%20Reel%204.mp4", poster: "tripsniper.svg", size: "tall" },
  { title: "Cannazo", type: "AI Product Film", file: "cannazo.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cannazo%20herovF.mp4", poster: "cannazo.svg", size: "wide" },
  { title: "CardOutpost", type: "AI UGC · Social Creative", file: "cardoutpost.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cardoutpost%202.mp4", size: "tall" },
  { title: "Cheater Scanner · Variant", type: "AI UGC · Alternate Creative", file: "cheaterscanner-alt.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner.mp4", poster: "cheater-scanner.svg", size: "tall" },
  { title: "MoneyPilot · Variant", type: "AI UGC · Alternate Creative", file: "moneypilot-v65.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/moneypilot%20v65.mp4", poster: "moneypilot.svg", size: "wide" },
];

function Project({ p }: { p: PortfolioProject }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !p.src) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) {
            video.src = p.src!;
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { rootMargin: "180px 0px", threshold: 0.05 });
    observer.observe(video);
    const onLoadedData = () => setReady(true);
    const onError = () => setReady(false);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
      video.pause();
    };
  }, [p.src]);

  return (
    <article className={`project project--${p.size} ${p.caseStudy ? "project--case-study" : ""}`}>
      <div className={`project-media ${ready ? "is-ready" : "is-pending"}`}>
        <div className="project-placeholder" aria-hidden="true">
          <span className="placeholder-kicker">AI FILM / SELECTED WORK</span>
          <strong>{p.title}</strong>
          <span className="placeholder-type">{p.type}</span>
          <span className="placeholder-mark">G<span>·</span></span>
        </div>
        <video
          ref={ref}
          data-video-src={p.src ?? `/videos/${p.file}`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${p.title} video preview`}
        />
        <div className="project-shade" />
        <span className="project-type">{p.caseStudy ? "CASE STUDY · " : ""}{p.type}</span>
        <span className="project-index">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
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

const showreelClips = [
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cannazo%20herovF.mp4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/pet%20project%20spa%20Animated.mp4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner%20v22.mp4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/rumik%20ira.MP4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Adukale%20Khara%20chakkli.mp4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Copy%20of%20Copy%20of%20Tripsniper%20AD%20Reel%204.mp4",
  "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/money%20pilot%20v43.mp4",
];

export default function Portfolio() {
  const showreel = useRef<HTMLVideoElement>(null);
  const [showreelIndex, setShowreelIndex] = useState(0);
  const lastClipChange = useRef(-1);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduceMotion
      ? null
      : new Lenis({
          lerp: 0.14,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.85,
        });

    const updateLenis = lenis ? (time: number) => lenis.raf(time * 1000) : null;
    if (lenis && updateLenis) {
      lenis.on("scroll", () => ScrollTrigger.update());
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
      (window as Window & { __portfolioLenis?: typeof lenis }).__portfolioLenis = lenis;
    }

    // Keep native event-listener cleanup outside the GSAP context callback.
    // The context callback runs immediately, so calling ctx.add() inside it
    // would access `ctx` before the const assignment has completed.
    let cleanupCursor = () => {};
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(
          ".hero-title span",
          { y: "0.42em", opacity: 0, rotateX: -4 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.14,
            duration: 1.15,
            ease: "power3.out",
            delay: 0.1,
            clearProps: "transform",
          }
        );
        gsap.fromTo(
          ".hero-copy > *:not(.hero-title)",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.75, ease: "power2.out", delay: 0.28 }
        );
        gsap.fromTo(
          ".hero-metrics > div",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power2.out", delay: 0.65 }
        );

        gsap.utils.toArray<HTMLElement>(".reveal, .project").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true, fastScrollEnd: true },
            }
          );
        });

        gsap.to(".hero-orbit", { rotate: 360, duration: 60, repeat: -1, ease: "none" });
        gsap.to(".hero-glow", {
          yPercent: 18,
          xPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        // Cinematic sticky reel: subtle horizontal drift, never a zoom-bounce.
        gsap.fromTo(".showreel-frame",
          { yPercent: 4, borderRadius: "24px" },
          { yPercent: -4, borderRadius: "10px", ease: "none",
            scrollTrigger: { trigger: ".showreel", start: "top bottom", end: "bottom top", scrub: 1.2 } }
        );
        gsap.fromTo(".showreel-copy",
          { y: 24, opacity: 0.55 },
          { y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".showreel", start: "top 70%", end: "center 35%", scrub: 0.8 } }
        );
        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });

        // Lightweight cursor trail: no giant blur layer and no always-running RAF loop.
        const dots = Array.from(document.querySelectorAll<HTMLElement>(".cursor-trail-dot"));
        if (dots.length && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const xSetters = dots.map((dot, i) => gsap.quickTo(dot, "x", { duration: 0.08 + i * 0.055, ease: "power2.out" }));
          const ySetters = dots.map((dot, i) => gsap.quickTo(dot, "y", { duration: 0.08 + i * 0.055, ease: "power2.out" }));
          const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            dots.forEach((dot, i) => {
              xSetters[i](event.clientX);
              ySetters[i](event.clientY);
              dot.style.opacity = String(Math.max(0.12, 0.95 - i * 0.14));
            });
          };
          const onLeave = () => dots.forEach((dot) => { dot.style.opacity = "0"; });
          window.addEventListener("pointermove", onMove, { passive: true });
          document.documentElement.addEventListener("pointerleave", onLeave);
          cleanupCursor = () => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
          };
        }


      } else {
        gsap.set(".hero-title span", { y: 0, opacity: 1, rotateX: 0 });
        gsap.set(".hero-copy > *:not(.hero-title), .hero-metrics > div, .reveal, .project", { opacity: 1, y: 0 });
        gsap.set(".scroll-progress", { scaleX: 0 });
      }
    });

    // Refresh once layout and fonts have settled, so scroll-triggered motion starts at the right positions.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cleanupCursor();
      ctx.revert();
      if (lenis && updateLenis) {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
        delete (window as Window & { __portfolioLenis?: typeof lenis }).__portfolioLenis;
        gsap.ticker.lagSmoothing(500, 33);
      }
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-trail" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => <span className={`cursor-trail-dot cursor-trail-dot--${i + 1}`} key={i} />)}
      </div>
      <a className="whatsapp-float" href="https://wa.me/919074512437?text=Hi%20Gokul%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp chat with Gokul">
        <span className="whatsapp-float-mark" aria-hidden="true">WA</span>
        <span>Let&apos;s talk</span>
        <span className="whatsapp-float-arrow" aria-hidden="true">↗</span>
      </a>
      <nav className="nav">
        <a href="#top" className="brand"><b>G</b><span>GOKUL DAS KM</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#services">Capabilities</a><a href="#about">About</a></div>
        <a className="nav-pill" href="mailto:garciaalpha007@gmail.com">Let's talk</a>
      </nav>

      <section id="top" className="hero">
        <div className="hero-glow" />
        <div className="hero-orbit" />
        <div className="hero-copy">
          <p className="eyebrow">AI CONTENT CREATOR · AI VIDEO PRODUCER · AI UGC</p>
          <h1 className="hero-title"><span>I make ads</span><span>with AI.</span></h1>
          <p className="hero-sub">Generative video, AI UGC and performance creative for brands that need ideas to move faster.</p>
          <div className="hero-actions"><a className="primary" href="#work">Explore work</a><a className="underlink" href="mailto:garciaalpha007@gmail.com">Available globally ↗</a></div>
        </div>
        <div className="hero-metrics"><div><strong>300+</strong><small>AI videos</small></div><div><strong>1.5+</strong><small>years with AI</small></div><div><strong>15+</strong><small>brands & clients</small></div></div>
      </section>

      <section className="showreel">
        <div className="showreel-frame">
          <video
            key={showreelIndex}
            ref={showreel}
            src={showreelClips[showreelIndex]}
            autoPlay muted playsInline preload="metadata"
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (video.currentTime >= 4.2 && lastClipChange.current !== showreelIndex) {
                lastClipChange.current = showreelIndex;
                setShowreelIndex((index) => (index + 1) % showreelClips.length);
              }
            }}
            onError={() => setShowreelIndex((index) => (index + 1) % showreelClips.length)}
          />
          <div className="showreel-copy"><span>SELECTED SHOWREEL</span><strong>Ideas, generated.</strong></div>
          <div className="showreel-count">SCROLL / SELECTED CLIPS</div>
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
          <div className="socials"><a href="https://www.linkedin.com/in/gokul-das-k-m-728795348/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/gokulgxz/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="mailto:garciaalpha007@gmail.com">Email ↗</a><a href="https://wa.me/919074512437?text=Hi%20Gokul%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="tel:+919074512437">+91 90745 12437 ↗</a></div>
        </div>
      </section>

      <section className="contact">
        <p className="eyebrow">GLOBAL / REMOTE</p>
        <h2>Have an idea<br/><em>worth making?</em></h2>
        <a href="mailto:garciaalpha007@gmail.com" className="contact-button">Start a project ↗</a>
        <div className="contact-methods" aria-label="Contact links">
          <a href="mailto:garciaalpha007@gmail.com">garciaalpha007@gmail.com</a>
          <a href="tel:+919074512437">+91 90745 12437</a>
          <a href="https://wa.me/919074512437?text=Hi%20Gokul%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href="https://www.linkedin.com/in/gokul-das-k-m-728795348/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://www.instagram.com/gokulgxz/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </section>

      <footer><span>GOKUL DAS KM</span><span>AI CONTENT · VIDEO · UGC</span><span>BANGALORE / GLOBAL</span></footer>
    </main>
  );
}
