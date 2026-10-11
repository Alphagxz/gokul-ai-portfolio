 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
    title: "MoneyPilot", type: "AI UGC · Performance Advertising", file: "moneypilot.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/money%20pilot%20v43.mp4", poster: "moneypilot.svg", size: "tall",
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
    title: "Rumik AI", type: "AI UGC · App Advertising", file: "rumik.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/rumik%20ira.MP4", poster: "rumik.svg", size: "tall",
    caseStudy: { focus: "Creator-led creative for an AI app.", approach: "Short-form storytelling that introduces the product in a familiar social format and keeps the message focused.", tags: ["AI UGC", "AI Apps", "Performance Creative"] }
  },
];

const otherWorks: PortfolioProject[] = [
  { title: "Adukale", type: "AI Product Advertisement", file: "adukale.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Adukale%20Khara%20chakkli.mp4", poster: "adukale.svg", size: "wide" },
  { title: "CardOutpost", type: "AI UGC · Social Creative", file: "cardoutpost.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cardoutpost%202.mp4", poster: "cardoutpost.svg", size: "tall" },
  { title: "MoneyPilot · Alternate Cut", type: "AI UGC · Alternate Creative", file: "moneypilot-v65.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/moneypilot%20v65.mp4", poster: "moneypilot-alt.svg", size: "tall" },
  { title: "Cheater Scanner · Alternate Cut", type: "AI UGC · Alternate Creative", file: "cheaterscanner-alt.mp4", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner.mp4", poster: "cheater-scanner-alt.svg", size: "tall" },
];

function Project({ p }: { p: PortfolioProject }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = p.src ?? `/videos/${p.file}`;
            video.load();
          }
        } else if (!video.paused) {
          video.pause();
        }
      }
    }, { rootMargin: "240px 0px", threshold: 0.01 });
    observer.observe(video);
    const onReady = () => setReady(true);
    const onError = () => setReady(false);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onError);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onError);
      video.pause();
    };
  }, [p.file, p.src]);

  return (
    <article className={`project project--${p.size} ${p.caseStudy ? "project--case-study" : ""}`}>
      <div className={`project-media ${ready ? "is-ready" : "is-pending"}`}>
        <div className="project-placeholder" aria-hidden="true">
          <span className="placeholder-kicker">AI FILM / SELECTED WORK</span>
          <strong>{p.title}</strong>
          <span className="placeholder-type">{p.type}</span>
          <span className="placeholder-mark">G<span>·</span></span>
        </div>
        {p.poster && <img className="project-poster" src={`/posters/${p.poster}`} alt={`${p.title} video thumbnail`} loading="lazy" />}
        <video
          ref={ref}
          data-video-src={p.src ?? `/videos/${p.file}`}
          poster={p.poster ? `/posters/${p.poster}` : undefined}
          controls
          playsInline
          preload="none"
          aria-label={`${p.title} video. Use the video controls to play, pause, and adjust sound.`}
          onPlay={() => setReady(true)}
        />
        <div className="project-shade" aria-hidden="true" />
        <span className="project-type">{p.caseStudy ? "CASE STUDY · " : ""}{p.type}</span>
        <span className="project-index">{p.caseStudy ? String(projects.indexOf(p) + 1).padStart(2, "0") : "↗"}</span>
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
  { title: "Cannazo", type: "AI PRODUCT FILM", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cannazo%20herovF.mp4", poster: "cannazo.svg" },
  { title: "Pet Project", type: "AI ANIMATED BRAND FILM", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/pet%20project%20spa%20Animated.mp4", poster: "pet-project.svg" },
  { title: "Cheater Scanner", type: "AI UGC / SOCIAL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner%20v22.mp4", poster: "cheater-scanner.svg" },
  { title: "Social Catfish", type: "AI UGC / SOCIAL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Social%20catfish%20v1.mov", poster: "social-catfish.svg" },
  { title: "TripSniper", type: "AI UGC / TRAVEL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Copy%20of%20Copy%20of%20Tripsniper%20AD%20Reel%204.mp4", poster: "tripsniper.svg" },
];

export default function Portfolio() {
  const [workFolderOpen, setWorkFolderOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [stressPresses, setStressPresses] = useState(0);
  const [squishing, setSquishing] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const stressResetRef = useRef<number | null>(null);
  const buttonResetRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (stressResetRef.current) window.clearTimeout(stressResetRef.current);
    if (buttonResetRef.current) window.clearTimeout(buttonResetRef.current);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanupCursor = () => {};
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(".hero-title span", { y: "0.35em", opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: "power3.out", clearProps: "transform"
        });
        gsap.fromTo(".hero-copy > *:not(.hero-title), .hero-metrics > div", { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.06, duration: 0.65, ease: "power2.out", delay: 0.12
        });
        // Replay the count-up whenever the metrics re-enter the viewport in either direction.
        const metricTargets = [
          { selector: '[data-metric="videos"]', value: 300, suffix: "+", decimals: 0 },
          { selector: '[data-metric="years"]', value: 1.5, suffix: "+", decimals: 1 },
          { selector: '[data-metric="brands"]', value: 15, suffix: "+", decimals: 0 },
        ];
        metricTargets.forEach(({ selector, value, suffix, decimals }) => {
          const node = document.querySelector<HTMLElement>(selector);
          if (!node) return;
          const counter = { value: 0 };
          gsap.fromTo(counter, { value: 0 }, {
            value,
            duration: 1.45,
            ease: "power2.out",
            scrollTrigger: { trigger: ".hero-metrics", start: "top 86%", toggleActions: "restart reset restart reset" },
            onStart: () => { node.textContent = `0${decimals ? ".0" : ""}`; },
            onUpdate: () => { node.textContent = `${counter.value.toFixed(decimals)}${suffix}`; },
            onComplete: () => { node.textContent = `${value.toFixed(decimals)}${suffix}`; },
          });
        });
        gsap.utils.toArray<HTMLElement>(".reveal, .project").forEach((el) => {
          gsap.fromTo(el, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true }
          });
        });
        gsap.to(".hero-orbit", { rotate: 360, duration: 75, repeat: -1, ease: "none" });
        gsap.to(".hero-glow", {
          yPercent: 12, xPercent: -5, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 }
        });

        // The reel stays in normal document flow. Native page scrolling remains available,
        // and the short clip rail can be swiped horizontally without a pinned scroll trap.

        gsap.to(".scroll-progress", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.35 }
        });

        const dots = Array.from(document.querySelectorAll<HTMLElement>(".cursor-trail-dot"));
        if (dots.length && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const xSetters = dots.map((dot, i) => gsap.quickTo(dot, "x", { duration: 0.055 + i * 0.035, ease: "power2.out" }));
          const ySetters = dots.map((dot, i) => gsap.quickTo(dot, "y", { duration: 0.055 + i * 0.035, ease: "power2.out" }));
          const onMove = (event: PointerEvent) => {
            dots.forEach((dot, i) => {
              xSetters[i](event.clientX);
              ySetters[i](event.clientY);
              dot.style.opacity = String(Math.max(0.12, 0.9 - i * 0.16));
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
        gsap.set(".hero-title span, .hero-copy > *:not(.hero-title), .hero-metrics > div, .reveal, .project", { opacity: 1, y: 0 });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 250);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    // Native page scrolling avoids the lag caused by stacking two scroll engines.
    return () => {
      cleanupCursor();
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main>
      <div className="ambient-background" aria-hidden="true"><span className="ambient-orb ambient-orb--one"/><span className="ambient-orb ambient-orb--two"/><span className="ambient-orb ambient-orb--three"/><span className="ambient-grain"/></div>
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
        <button className="nav-pill nav-pill-button" type="button" onClick={() => setProjectFormOpen(true)}>Start a project ↗</button>
      </nav>

      <section id="top" className="hero">
        <div className="hero-glow" />
        <div className="hero-orbit" />
        <div className="hero-copy">
          <p className="eyebrow">AI CONTENT CREATOR · AI VIDEO PRODUCER · AI UGC</p>
          <h1 className="hero-title"><span>I make ads</span><span>with AI.</span></h1>
          <p className="hero-sub">Generative video, AI UGC and performance creative for brands that need ideas to move faster.</p>
          <div className="hero-actions"><a className="primary" href="#work">Explore work ↓</a><a className="underlink" href="#showreel">Watch selected films ↘</a><button className="underlink hero-contact-trigger" type="button" onClick={() => setProjectFormOpen(true)}>Available globally ↗</button></div>
        </div>
        <div className="hero-metrics" aria-label="Portfolio statistics">
          <div className="hero-metric"><strong data-metric="videos">300+</strong><small>AI videos</small></div>
          <div className="hero-metric"><strong data-metric="years">1.5+</strong><small>years with AI</small></div>
          <div className="hero-metric"><strong data-metric="brands">15+</strong><small>brands &amp; clients</small></div>
        </div>
        <aside className="stress-playground" aria-label="Interactive stress-relief playground">
          <div className="stress-playground-head">
            <div>
              <span className="stress-kicker">A TINY DIGITAL RESET</span>
              <h2>Take a breath<span>.</span></h2>
              <p>Squish the chrome blob. Press the button. No score, no pressure.</p>
            </div>
            <span className="stress-live-dot" aria-hidden="true" />
          </div>
          <div className={`stress-ball-stage ${squishing ? "is-squishing" : ""}`}>
            <div className="stress-halo stress-halo--one" aria-hidden="true" />
            <div className="stress-halo stress-halo--two" aria-hidden="true" />
            <button
              type="button"
              className={`stress-ball ${squishing ? "is-squishing" : ""}`}
              aria-label="Squish the stress ball"
              onPointerDown={() => { setSquishing(true); setStressPresses((n) => n + 1); if (stressResetRef.current) window.clearTimeout(stressResetRef.current); }}
              onPointerUp={() => { stressResetRef.current = window.setTimeout(() => setSquishing(false), 180); }}
              onPointerLeave={() => { stressResetRef.current = window.setTimeout(() => setSquishing(false), 180); }}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSquishing(true); }}
              onKeyUp={() => setSquishing(false)}
            >
              <span className="stress-ball-glint" />
              <span className="stress-ball-shine" />
            </button>
            <span className="stress-ball-hint">PRESS · DRAG · RELEASE</span>
            <span className="stress-counter">SQUISHES <b>{String(stressPresses).padStart(2, "0")}</b></span>
          </div>
          <div className="satisfying-row">
            <div className="satisfying-copy"><span>NEED A LITTLE RESET?</span><small>Give this one a press.</small></div>
            <button type="button" className={`satisfying-button ${buttonPressed ? "is-pressed" : ""}`} onClick={() => { setButtonPressed(true); if (buttonResetRef.current) window.clearTimeout(buttonResetRef.current); buttonResetRef.current = window.setTimeout(() => setButtonPressed(false), 650); }}>
              <span className="satisfying-button-icon">✳</span><span>PRESS FOR CALM</span><span className="satisfying-button-arrow">↗</span>
            </button>
          </div>
        </aside>
      </section>

      <section className="showreel" id="showreel" aria-label="Selected video work">
        <div className="showreel-pin">
          <div className="showreel-heading">
            <div>
              <p className="eyebrow">SELECTED WORK / 01—05</p>
              <h2>Scroll through<br /><em>the reel.</em></h2>
            </div>
            <p className="showreel-instruction">Five selected vertical films, each with its own thumbnail. Use the player controls for sound and playback, then keep scrolling for the case studies.</p>
          </div>
          <div className="showreel-track">
            {showreelClips.map((clip, i) => (
              <article className="showreel-slide" key={clip.title}>
                <div className="showreel-video-frame">
                  <img className="showreel-poster" src={`/posters/${clip.poster}`} alt={`${clip.title} video thumbnail`} loading={i < 3 ? "eager" : "lazy"} />
                  <video
                    className="showreel-video"
                    src={clip.src}
                    poster={`/posters/${clip.poster}`}
                    controls
                    playsInline
                    preload="none"
                    onLoadedData={(event) => event.currentTarget.classList.add("is-loaded")}
                    onCanPlay={(event) => event.currentTarget.classList.add("is-loaded")}
                    aria-label={`${clip.title} showreel clip. Use controls for playback and sound.`}
                    onPlay={(event) => {
                      document.querySelectorAll<HTMLVideoElement>(".showreel-video").forEach((other) => {
                        if (other !== event.currentTarget) other.pause();
                      });
                    }}
                  />
                </div>
                <div className="showreel-slide-meta">
                  <span>{String(i + 1).padStart(2, "0")} / 05 · {clip.type}</span>
                  <strong>{clip.title}</strong>
                </div>
              </article>
            ))}
          </div>
          <div className="showreel-footer"><span>KEEP SCROLLING FOR CASE STUDIES</span><span>05 FILMS <b>↔</b></span></div>
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-head reveal"><div><p className="eyebrow">FOUR FEATURED CASE STUDIES</p><h2>Built for the scroll.</h2></div><p>A focused selection of four projects. The rest stays tucked into the work folder, so the page can breathe.</p></div>
        <div className="project-grid project-grid--featured">{projects.map((p)=><Project key={p.title} p={p}/>)}</div>
        <div className="work-folder-wrap">
          <button className="work-folder-toggle" type="button" aria-expanded={workFolderOpen} onClick={() => setWorkFolderOpen((open) => !open)}>
            <span className="work-folder-icon" aria-hidden="true">▤</span>
            <span className="work-folder-copy"><strong>Other work</strong><small>More selected projects and alternate cuts · {otherWorks.length} videos</small></span>
            <span className={`work-folder-arrow ${workFolderOpen ? "is-open" : ""}`} aria-hidden="true">↗</span>
          </button>
          {workFolderOpen && <div className="project-grid project-grid--folder">{otherWorks.map((p)=><Project key={p.title} p={p}/>)}</div>}
        </div>
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
          <div className="socials"><a href="https://www.linkedin.com/in/gokul-das-k-m-728795348/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/gokulgxz/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=garciaalpha007@gmail.com" target="_blank" rel="noopener noreferrer">Email ↗</a><a href="https://wa.me/919074512437?text=Hi%20Gokul%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
        </div>
      </section>

      <section className="contact">
        <p className="eyebrow">GLOBAL / REMOTE</p>
        <h2>Have an idea<br/><em>worth making?</em></h2>
        <button type="button" onClick={() => setProjectFormOpen(true)} className="contact-button">Start a project <span aria-hidden="true">↗</span></button>
        <div className="contact-methods" aria-label="Contact links">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=garciaalpha007@gmail.com" target="_blank" rel="noopener noreferrer">Email ↗</a>
          <a href="https://wa.me/919074512437?text=Hi%20Gokul%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href="https://www.linkedin.com/in/gokul-das-k-m-728795348/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://www.instagram.com/gokulgxz/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </section>

      {projectFormOpen && (
        <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProjectFormOpen(false); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button type="button" className="project-modal-close" aria-label="Close project enquiry form" onClick={() => setProjectFormOpen(false)}>×</button>
            <p className="eyebrow">LET’S MAKE SOMETHING</p>
            <h2 id="project-modal-title">Start a project.</h2>
            <p className="project-modal-intro">Share a few details and I’ll get back to you directly.</p>
            <form className="project-enquiry-form" action="https://formsubmit.co/garciaalpha007@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="New portfolio project enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label>Name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
              <label>Email<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label>
              <label>Phone / WhatsApp<input name="phone" type="tel" placeholder="Country code + number" autoComplete="tel" required /></label>
              <label>What are you looking for?
                <select name="project_type" defaultValue="" required>
                  <option value="" disabled>Select a project type</option>
                  <option>AI UGC / Performance Ads</option>
                  <option>AI Product Film / Commercial</option>
                  <option>AI Animation / Explainer</option>
                  <option>Ongoing Creative Partnership</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>Project details <span className="form-optional">(optional)</span><textarea name="message" rows={3} placeholder="A short note about your idea, timeline or budget…" /></label>
              <button className="project-form-submit" type="submit">Send project enquiry <span aria-hidden="true">↗</span></button>
              <p className="form-privacy-note">Your details are used only to respond to this enquiry.</p>
            </form>
          </section>
        </div>
      )}

      <footer><span>GOKUL DAS KM</span><span>AI CONTENT · VIDEO · UGC</span><span>BANGALORE / GLOBAL</span></footer>
    </main>
  );
}
