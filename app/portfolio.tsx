 "use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState(false);
  const isCaseStudy = Boolean(p.caseStudy);
  const projectIndex = isCaseStudy ? String(projects.indexOf(p) + 1).padStart(2, "0") : "↗";

  const startPlayback = () => {
    const video = ref.current;
    if (!video || !p.src) return;
    setPlayError(false);
    setHasStarted(true);
    video.controls = true;
    if (!video.src || video.src !== p.src) video.src = p.src;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        setIsPlaying(false);
        setPlayError(true);
      });
    }
  };

  return (
    <article className={`project project--${p.size} ${isCaseStudy ? "project--case-study" : ""}`}>
      <div className={`project-media${videoVisible && !playError ? " is-video-visible" : ""}${isPlaying ? " is-playing" : ""}${playError ? " has-error" : ""}`}>
        <div className="project-placeholder" aria-hidden="true">
          <span className="placeholder-kicker">AI FILM / SELECTED WORK</span>
          <strong>{p.title}</strong>
          <span className="placeholder-type">{p.type}</span>
          <span className="placeholder-mark">G<span>·</span></span>
        </div>
        {p.poster && <img className="project-poster" src={`/poster/${p.poster}`} alt={`${p.title} video thumbnail`} loading="lazy" />}
        <video
          ref={ref}
          data-video-src={p.src ?? `/videos/${p.file}`}
          controls={hasStarted}
          playsInline
          preload="none"
          aria-label={`${p.title} video. Use the video controls to play, pause, and adjust sound.`}
          onLoadedData={() => { setVideoVisible(true); setPlayError(false); }}
          onCanPlay={() => setPlayError(false)}
          onPlaying={() => { setVideoVisible(true); setIsPlaying(true); setPlayError(false); }}
          onPause={() => setIsPlaying(false)}
          onError={() => { setIsPlaying(false); setVideoVisible(false); setPlayError(true); }}
        />
        <div className="project-shade" aria-hidden="true" />
        <span className="project-type">{isCaseStudy ? "CASE STUDY" : "SELECTED WORK"}</span>
        <span className="project-index">{projectIndex}</span>
        <div className={`project-title-overlay${isPlaying ? " is-hidden" : ""}`}>
          <span className="project-overlay-index">{isCaseStudy ? `FEATURED CASE STUDY · ${projectIndex}` : "MORE SELECTED WORK"}</span>
          <strong>{p.title}</strong>
          <span className="project-overlay-type">{p.type}</span>
          <button className="project-center-play" type="button" onClick={startPlayback} aria-label={`${playError ? "Retry" : "Play"} ${p.title}`}>
            <span aria-hidden="true">{playError ? "↻" : "▶"}</span>
          </button>
          <small className="project-play-label">{playError ? "COULDN’T LOAD · TRY AGAIN" : isPlaying ? "PAUSE FILM" : "PLAY FILM"}</small>
        </div>
      </div>
      <div className="project-caption"><h3>{p.title}</h3><span>{isCaseStudy ? "Featured case study ↗" : "Selected work ↗"}</span></div>
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

type ShowreelClip = { title: string; type: string; src: string; poster: string };

const showreelClips: ShowreelClip[] = [
  { title: "Cannazo", type: "AI PRODUCT FILM", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cannazo%20herovF.mp4", poster: "cannazo.svg" },
  { title: "Pet Project", type: "AI ANIMATED BRAND FILM", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/pet%20project%20spa%20Animated.mp4", poster: "pet-project.svg" },
  { title: "Cheater Scanner", type: "AI UGC / SOCIAL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/cheaterscanner%20v22.mp4", poster: "cheater-scanner.svg" },
  { title: "Social Catfish", type: "AI UGC / SOCIAL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Social%20catfish%20v1.mov", poster: "social-catfish.svg" },
  { title: "TripSniper", type: "AI UGC / TRAVEL AD", src: "https://zmqzeztomyhvgfnk.public.blob.vercel-storage.com/showreel/Copy%20of%20Copy%20of%20Tripsniper%20AD%20Reel%204.mp4", poster: "tripsniper.svg" },
];

function ShowreelCard({ clip, index }: { clip: ShowreelClip; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState(false);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlayError(false);
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setPlayError(true));
    }
  };

  return (
    <article className="showreel-slide" key={clip.title}>
      <div className={`showreel-video-frame${isPlaying ? " is-playing" : ""}${playError ? " has-error" : ""}`}>
        <video
          ref={videoRef}
          className="showreel-video"
          src={clip.src}
          poster={`/poster/${clip.poster}`}
          controls
          playsInline
          preload="metadata"
          aria-label={`${clip.title} showreel clip. Use controls for playback and sound.`}
          onLoadedData={() => setPlayError(false)}
          onCanPlay={() => setPlayError(false)}
          onError={() => { setIsPlaying(false); setPlayError(true); }}
          onPlay={() => {
            setIsPlaying(true);
            setPlayError(false);
            document.querySelectorAll<HTMLVideoElement>(".showreel-video").forEach((other) => {
              if (other !== videoRef.current) other.pause();
            });
          }}
          onPause={() => setIsPlaying(false)}
        />
        <div className="showreel-title-overlay">
          <span className="showreel-overlay-index">{String(index + 1).padStart(2, "0")} / 05</span>
          <strong>{clip.title}</strong>
          <span className="showreel-overlay-type">{clip.type}</span>
          <button className="showreel-center-play" type="button" onClick={startPlayback} aria-label={`Play ${clip.title}`}>
            <span aria-hidden="true">▶</span>
          </button>
          <small className="showreel-play-label">{playError ? "REEL COULD NOT LOAD · TRY AGAIN" : "PLAY FILM"}</small>
        </div>
      </div>
    </article>
  );
}

type GooPosition = { x: number; y: number };
type JellyForce = {
  press: number;
  pressTarget: number;
  dragX: number;
  dragY: number;
  dragXTarget: number;
  dragYTarget: number;
  contactAngle: number;
  contactStrength: number;
  contactTarget: number;
  splash: number;
  phase: number;
};
type JellySplashStyle = CSSProperties & { "--splash-angle": string; "--splash-distance": string };
type JellyDrag = {
  pointerId: number;
  mode: "move" | "stretch";
  startClientX: number;
  startClientY: number;
  startPosition: GooPosition;
};
type JellyToyProps = {
  index: number;
  position: GooPosition;
  stageRef: { current: HTMLDivElement | null };
  onPositionChange: (index: number, position: GooPosition) => void;
  soundEnabled: boolean;
  playSound: (kind: "squish" | "pop") => void;
};

function buildJellyPath(force: JellyForce, time: number, variant: number) {
  const points: Array<{ x: number; y: number }> = [];
  const count = 42;
  const center = 90;
  const radius = variant === 0 ? 58 : 47;
  const dragMagnitude = Math.min(2.6, Math.hypot(force.dragX, force.dragY));
  const dragAngle = Math.atan2(force.dragY, force.dragX);
  const phase = force.phase;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const contactDistance = Math.atan2(Math.sin(angle - force.contactAngle), Math.cos(angle - force.contactAngle));
    const localDent = -0.25 * force.contactStrength * Math.exp(-Math.pow(contactDistance / 0.36, 2));
    const nearbyBulgeA = 0.105 * force.contactStrength * Math.exp(-Math.pow((contactDistance - 0.60) / 0.26, 2));
    const nearbyBulgeB = 0.105 * force.contactStrength * Math.exp(-Math.pow((contactDistance + 0.60) / 0.26, 2));
    const alongPull = Math.cos(angle - dragAngle);
    // Stretch the material itself: the pulled side grows, the opposite side thins,
    // while the toy's center stays anchored in edge-stretch mode.
    const elasticStretch = Math.max(-0.58, Math.min(1.7,
      dragMagnitude * (0.70 * alongPull - 0.16 * Math.cos(2 * (angle - dragAngle)))
    ));
    const radialPulse = force.splash * (0.075 * Math.sin(angle * 7 + time * 0.018 + phase) + 0.038 * Math.sin(angle * 11 - time * 0.022));
    const idleWobble = 0.024 * Math.sin(angle * 3 + time * 0.0018 + phase) + 0.014 * Math.sin(angle * 5 - time * 0.0013 + phase * 1.7);
    const pressedFill = force.press * 0.075;
    const r = radius * (1 + idleWobble + elasticStretch + localDent + nearbyBulgeA + nearbyBulgeB + radialPulse + pressedFill);
    const squashX = 1 + force.press * 0.10 + force.contactStrength * 0.035;
    const squashY = 1 - force.press * 0.105 + force.contactStrength * 0.025;
    points.push({
      x: center + Math.cos(angle) * r * squashX,
      y: center + Math.sin(angle) * r * squashY,
    });
  }
  const midpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  let d = "";
  const firstMid = midpoint(points[count - 1], points[0]);
  d = `M ${firstMid.x.toFixed(2)} ${firstMid.y.toFixed(2)} `;
  for (let i = 0; i < count; i++) {
    const nextMid = midpoint(points[i], points[(i + 1) % count]);
    d += `Q ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} ${nextMid.x.toFixed(2)} ${nextMid.y.toFixed(2)} `;
  }
  return `${d}Z`;
}

function JellyToy({ index, position, stageRef, onPositionChange, soundEnabled, playSound }: JellyToyProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const shapeRef = useRef<SVGPathElement | null>(null);
  const sheenRef = useRef<SVGPathElement | null>(null);
  const clipShapeRef = useRef<SVGPathElement | null>(null);
  const dragRef = useRef<JellyDrag | null>(null);
  const frameRef = useRef<number | null>(null);
  const loopRef = useRef<(() => void) | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [splashKey, setSplashKey] = useState(0);
  const forceRef = useRef<JellyForce>({
    press: 0, pressTarget: 0,
    dragX: 0, dragY: 0, dragXTarget: 0, dragYTarget: 0,
    contactAngle: -Math.PI / 3, contactStrength: 0, contactTarget: 0,
    splash: 0, phase: index * 1.7 + 0.4,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let running = true;
    let localFrame = 0;
    const tick = (now: number) => {
      if (!running) return;
      const f = forceRef.current;
      f.press += (f.pressTarget - f.press) * 0.19;
      f.dragX += (f.dragXTarget - f.dragX) * 0.17;
      f.dragY += (f.dragYTarget - f.dragY) * 0.17;
      f.contactStrength += (f.contactTarget - f.contactStrength) * 0.16;
      if (!dragRef.current) f.splash *= 0.91;
      if (f.splash < 0.003) f.splash = 0;
      const nextPath = buildJellyPath(f, now, index);
      if (shapeRef.current) shapeRef.current.setAttribute("d", nextPath);
      if (sheenRef.current) sheenRef.current.setAttribute("d", nextPath);
      if (clipShapeRef.current) clipShapeRef.current.setAttribute("d", nextPath);
      const active = Boolean(dragRef.current) || f.splash > 0.003 || f.press > 0.005 || Math.abs(f.dragX) > 0.005 || Math.abs(f.dragY) > 0.005 || f.contactStrength > 0.005;
      if (!reducedMotion || active) {
        localFrame = window.requestAnimationFrame(tick);
        frameRef.current = localFrame;
      } else {
        frameRef.current = null;
      }
    };
    loopRef.current = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(tick);
    };
    loopRef.current();
    return () => {
      running = false;
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      loopRef.current = null;
    };
  }, [index]);

  const startPress = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 180 - 90;
    const localY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 180 - 90;
    const normalizedRadius = Math.hypot(localX, localY) / 90;
    // Grab near the middle to move the whole toy. Grab near the rim to pull the jelly itself.
    const mode: JellyDrag["mode"] = normalizedRadius > 0.48 ? "stretch" : "move";
    const f = forceRef.current;
    f.contactAngle = Math.atan2(localY, localX);
    f.pressTarget = 1;
    f.contactTarget = 1;
    f.splash = 0.34;
    loopRef.current?.();
    dragRef.current = {
      pointerId: event.pointerId,
      mode,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPosition: position,
    };
    setIsDragging(true);
    setSplashKey((value) => value + 1);
    target.setPointerCapture(event.pointerId);
    if (soundEnabled) playSound("squish");
  };

  const movePress = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !stage) return;
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const dx = event.clientX - drag.startClientX;
    const dy = event.clientY - drag.startClientY;
    if (drag.mode === "move") {
      onPositionChange(index, {
        x: Math.max(4, Math.min(96, drag.startPosition.x + (dx / bounds.width) * 100)),
        y: Math.max(8, Math.min(92, drag.startPosition.y + (dy / bounds.height) * 100)),
      });
    }
    const f = forceRef.current;
    // Edge drags stretch the jelly in place, with a much longer elastic range.
    f.dragXTarget = drag.mode === "stretch" ? Math.max(-2.6, Math.min(2.6, dx / 52)) : 0;
    f.dragYTarget = drag.mode === "stretch" ? Math.max(-2.6, Math.min(2.6, dy / 52)) : 0;
    f.pressTarget = drag.mode === "stretch" ? 0.28 : 0.58;
    f.contactTarget = 0.58;
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 180 - 90;
    const localY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 180 - 90;
    f.contactAngle = Math.atan2(localY, localX);
    loopRef.current?.();
  };

  const endPress = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    const f = forceRef.current;
    f.pressTarget = 0;
    f.contactTarget = 0;
    f.dragXTarget = 0;
    f.dragYTarget = 0;
    f.splash = 1;
    setIsDragging(false);
    setSplashKey((value) => value + 1);
    loopRef.current?.();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (soundEnabled) playSound("pop");
  };

  const style = { left: `${position.x}%`, top: `${position.y}%`, zIndex: isDragging ? 8 : 4 } as CSSProperties;
  const colorName = index === 0 ? "violet" : "pearl";
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`jelly-toy jelly-toy--${colorName}${isDragging ? " is-dragging" : ""}`}
      style={style}
      aria-label={index === 0 ? "Grab, press, stretch and release the violet jelly toy" : "Grab, press, stretch and release the iridescent jelly toy"}
      onPointerDown={startPress}
      onPointerMove={movePress}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onLostPointerCapture={(event) => { if (dragRef.current?.pointerId === event.pointerId) endPress(event); }}
    >
      <svg className="jelly-shape" viewBox="0 0 180 180" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`jelly-fill-${index}`} cx="28%" cy="20%" r="80%">
            {index === 0 ? <><stop offset="0%" stopColor="#fff8ff"/><stop offset="13%" stopColor="#e6ceff"/><stop offset="35%" stopColor="#a57bff"/><stop offset="68%" stopColor="#6443bd"/><stop offset="100%" stopColor="#261641"/></> : <><stop offset="0%" stopColor="#ffffff"/><stop offset="15%" stopColor="#e7fbff"/><stop offset="35%" stopColor="#9ed8ff"/><stop offset="58%" stopColor="#b49aff"/><stop offset="80%" stopColor="#6e4dbe"/><stop offset="100%" stopColor="#1d193c"/></>}
          </radialGradient>
          <linearGradient id={`jelly-sheen-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".66"/><stop offset="45%" stopColor="#ffffff" stopOpacity=".05"/><stop offset="70%" stopColor={index === 0 ? "#d7bdff" : "#a4efff"} stopOpacity=".22"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
          <filter id={`jelly-shadow-${index}`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
          <clipPath id={`jelly-clip-${index}`}><path ref={clipShapeRef} d={buildJellyPath(forceRef.current, 0, index)} /></clipPath>
        </defs>
        <ellipse className="jelly-shadow" cx="91" cy="153" rx={index === 0 ? "45" : "36"} ry="8" fill="#05040b" opacity=".38" filter={`url(#jelly-shadow-${index})`} />
        <path ref={shapeRef} className="jelly-body-path" d={buildJellyPath(forceRef.current, 0, index)} fill={`url(#jelly-fill-${index})`} />
        <path ref={sheenRef} className="jelly-surface-sheen" d={buildJellyPath(forceRef.current, 0, index)} fill={`url(#jelly-sheen-${index})`} />
        <g clipPath={`url(#jelly-clip-${index})`}>
          <ellipse className="jelly-highlight jelly-highlight--main" cx="64" cy="44" rx={index === 0 ? "18" : "15"} ry="7" transform="rotate(-32 64 44)" />
          <ellipse className="jelly-highlight jelly-highlight--small" cx="112" cy="62" rx="5" ry="10" transform="rotate(28 112 62)" />
          <path className="jelly-light-ribbon" d="M48 70 Q38 98 62 120" fill="none" stroke="#fff" strokeOpacity=".30" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </svg>
      <span className={`jelly-splash${splashKey > 0 ? " is-active" : ""}`} key={splashKey} aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => <i key={i} style={{ "--splash-angle": `${(360 / 11) * i}deg`, "--splash-distance": `${index === 0 ? 62 + (i % 4) * 13 : 48 + (i % 4) * 11}px` } as JellySplashStyle} />)}
      </span>
      <span className={`jelly-ripple${splashKey > 0 ? " is-active" : ""}`} key={`ripple-${splashKey}`} aria-hidden="true" />
    </button>
  );
}


type ParticleMode = "attract" | "repel" | "swirl" | "flow";
type ParticleDot = { x: number; y: number; px: number; py: number; vx: number; vy: number; size: number; hue: number; alpha: number; phase: number };
type ParticleBurst = { x: number; y: number; radius: number; life: number };

function ParticlePlayground({ onBurst }: { onBurst: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<ParticleMode>("attract");
  const [resetToken, setResetToken] = useState(0);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const onBurstRef = useRef(onBurst);
  onBurstRef.current = onBurst;

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !stage || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let lastTime = 0;
    let dots: ParticleDot[] = [];
    const bursts: ParticleBurst[] = [];
    const pointer = pointerRef.current;

    const makeDots = () => {
      const area = width * height;
      const count = Math.max(68, Math.min(210, Math.round(area / (window.innerWidth < 600 ? 1900 : 2500))));
      dots = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x, y, px: x, py: y,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          size: 0.7 + Math.random() * 1.35,
          hue: Math.random() < 0.72 ? 248 + Math.random() * 40 : 176 + Math.random() * 35,
          alpha: 0.28 + Math.random() * 0.62,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeDots();
    };

    const localPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const pointerMove = (event: PointerEvent) => localPoint(event);
    const pointerLeave = () => { pointer.active = false; };
    const pointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("button")) return;
      localPoint(event);
      bursts.push({ x: pointer.x, y: pointer.y, radius: 0, life: 1 });
      if (bursts.length > 5) bursts.shift();
      onBurstRef.current();
    };

    const draw = (now: number) => {
      const dt = lastTime ? Math.min(1.8, Math.max(0.4, (now - lastTime) / 16.67)) : 1;
      lastTime = now;
      context.clearRect(0, 0, width, height);
      const t = now * 0.001;
      const animate = !reducedMotion || pointer.active || bursts.length > 0;
      context.globalCompositeOperation = "lighter";

      for (const dot of dots) {
        dot.px = dot.x;
        dot.py = dot.y;
        if (animate) {
          if (!reducedMotion) {
            dot.vx += Math.sin(dot.y * 0.009 + t * 0.34 + dot.phase) * 0.008 * dt;
            dot.vy += Math.cos(dot.x * 0.008 - t * 0.27 + dot.phase) * 0.009 * dt;
          }
          const dx = pointer.x - dot.x;
          const dy = pointer.y - dot.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          if (pointer.active && distance < 245) {
            const strength = (1 - distance / 245) ** 2;
            if (mode === "attract") {
              dot.vx += (dx / distance) * strength * 0.085 * dt;
              dot.vy += (dy / distance) * strength * 0.085 * dt;
            } else if (mode === "repel") {
              dot.vx -= (dx / distance) * strength * 0.16 * dt;
              dot.vy -= (dy / distance) * strength * 0.16 * dt;
            } else if (mode === "swirl") {
              dot.vx += (-dy / distance) * strength * 0.115 * dt;
              dot.vy += (dx / distance) * strength * 0.115 * dt;
              dot.vx -= (dx / distance) * strength * 0.025 * dt;
              dot.vy -= (dy / distance) * strength * 0.025 * dt;
            } else {
              dot.vx += Math.sin(dy * 0.014 + t + dot.phase) * strength * 0.065 * dt;
              dot.vy += Math.cos(dx * 0.014 - t + dot.phase) * strength * 0.065 * dt;
            }
          }
          for (const burst of bursts) {
            const bx = dot.x - burst.x;
            const by = dot.y - burst.y;
            const bd = Math.max(1, Math.hypot(bx, by));
            const ringDistance = Math.abs(bd - burst.radius);
            if (ringDistance < 34) {
              const wave = (1 - ringDistance / 34) * burst.life;
              dot.vx += (bx / bd) * wave * 0.2 * dt;
              dot.vy += (by / bd) * wave * 0.2 * dt;
            }
          }
          dot.vx *= mode === "flow" ? 0.992 : 0.984;
          dot.vy *= mode === "flow" ? 0.992 : 0.984;
          const speed = Math.hypot(dot.vx, dot.vy);
          const maxSpeed = mode === "repel" ? 3.1 : 2.2;
          if (speed > maxSpeed) { dot.vx = dot.vx / speed * maxSpeed; dot.vy = dot.vy / speed * maxSpeed; }
          dot.x += dot.vx * dt;
          dot.y += dot.vy * dt;
          if (dot.x < -8) { dot.x = width + 8; dot.px = dot.x; }
          if (dot.x > width + 8) { dot.x = -8; dot.px = dot.x; }
          if (dot.y < -8) { dot.y = height + 8; dot.py = dot.y; }
          if (dot.y > height + 8) { dot.y = -8; dot.py = dot.y; }
        }
        const hue = dot.hue;
        context.strokeStyle = `hsla(${hue}, 96%, 76%, ${dot.alpha * (animate ? 0.48 : 0.32)})`;
        context.lineWidth = dot.size * 0.8;
        context.beginPath();
        context.moveTo(dot.px, dot.py);
        context.lineTo(dot.x, dot.y);
        context.stroke();
        context.fillStyle = `hsla(${hue}, 100%, 82%, ${dot.alpha})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        if (animate) { burst.radius += 7.5 * dt; burst.life -= 0.018 * dt; }
        context.beginPath();
        context.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(187, 158, 255, ${Math.max(0, burst.life) * 0.58})`;
        context.lineWidth = 1.2;
        context.stroke();
        context.beginPath();
        context.arc(burst.x, burst.y, burst.radius * 0.72, 0, Math.PI * 2);
        context.strokeStyle = `rgba(113, 229, 229, ${Math.max(0, burst.life) * 0.24})`;
        context.lineWidth = 0.8;
        context.stroke();
        if (burst.life <= 0) bursts.splice(i, 1);
      }
      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    stage.addEventListener("pointermove", pointerMove, { passive: true });
    stage.addEventListener("pointerleave", pointerLeave, { passive: true });
    stage.addEventListener("pointerdown", pointerDown);
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", pointerMove);
      stage.removeEventListener("pointerleave", pointerLeave);
      stage.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("resize", resize);
    };
  }, [mode, resetToken]);

  const modes: { value: ParticleMode; label: string }[] = [
    { value: "attract", label: "ATTRACT" },
    { value: "repel", label: "REPEL" },
    { value: "swirl", label: "SWIRL" },
    { value: "flow", label: "FLOW" },
  ];

  return (
    <div className="particle-playground" ref={stageRef} aria-label="Interactive particle playground. Move to influence the particles and tap to create a ripple.">
      <canvas ref={canvasRef} className="particle-canvas" aria-label="Interactive field of glowing particles" />
      <div className="particle-playground-label" aria-hidden="true"><span>PARTICLE PLAYGROUND</span><small>MOVE TO SHAPE THE FLOW</small></div>
      <div className="particle-mode-controls" role="group" aria-label="Particle interaction mode">
        {modes.map((item) => <button key={item.value} type="button" className={mode === item.value ? "is-active" : ""} aria-pressed={mode === item.value} onClick={() => setMode(item.value)}>{item.label}</button>)}
        <button type="button" className="particle-reset" onClick={() => setResetToken((value) => value + 1)} aria-label="Reset particle field">RESET ↺</button>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [workFolderOpen, setWorkFolderOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [gooPositions, setGooPositions] = useState<GooPosition[]>([
    { x: 83, y: 39 },
    { x: 75, y: 66 },
  ]);
  const [jellySoundEnabled, setJellySoundEnabled] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState<"jelly" | "particles">("jelly");
  const gooPlaygroundRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playJellySound = (kind: "squish" | "pop") => {
    if (!jellySoundEnabled || typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext;
      if (!AudioContextClass) return;
      const context = audioContextRef.current ?? new AudioContextClass();
      audioContextRef.current = context;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      const duration = kind === "squish" ? 0.17 : 0.12;
      oscillator.type = kind === "squish" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(kind === "squish" ? 148 : 270, now);
      oscillator.frequency.exponentialRampToValueAtTime(kind === "squish" ? 58 : 470, now + duration * 0.82);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "squish" ? 0.034 : 0.026, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.015);
    } catch {
      // The toy remains fully usable when audio is unsupported or unavailable.
    }
  };

  const updateGooPosition = (index: number, next: GooPosition) => {
    setGooPositions((current) => current.map((position, i) => i === index ? next : position));
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 850px)").matches) {
      setGooPositions([{ x: 31, y: 36 }, { x: 72, y: 68 }]);
    }
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        void audioContextRef.current.close();
      }
    };
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
        <div className={`goo-playground${interactiveMode === "particles" ? " is-particles-mode" : ""}`} ref={gooPlaygroundRef} aria-label="Interactive jelly toy and particle playground">
          {interactiveMode === "jelly" ? (
            <>
              {gooPositions.map((position, index) => (
                <JellyToy
                  key={index}
                  index={index}
                  position={position}
                  stageRef={gooPlaygroundRef}
                  onPositionChange={updateGooPosition}
                  soundEnabled={jellySoundEnabled}
                  playSound={playJellySound}
                />
              ))}
            </>
          ) : (
            <ParticlePlayground onBurst={() => playJellySound("pop")} />
          )}
          <div className="goo-playground-note">
            <div className="playground-experience-switch" role="group" aria-label="Choose interactive experience">
              <button type="button" aria-pressed={interactiveMode === "jelly"} className={interactiveMode === "jelly" ? "is-active" : ""} onClick={() => setInteractiveMode("jelly")}>JELLY</button>
              <button type="button" aria-pressed={interactiveMode === "particles"} className={interactiveMode === "particles" ? "is-active" : ""} onClick={() => setInteractiveMode("particles")}>PARTICLES</button>
            </div>
            {interactiveMode === "jelly" && <span className="goo-playground-hint" aria-hidden="true">GRAB · SQUISH · STRETCH · RELEASE</span>}
            <button className="goo-sound-toggle" type="button" aria-pressed={jellySoundEnabled} onClick={() => setJellySoundEnabled((enabled) => !enabled)}>
              <span aria-hidden="true">{jellySoundEnabled ? "♪" : "♫"}</span> SOUND {jellySoundEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </section>

      <section className="showreel" id="showreel" aria-label="Selected video work">
        <div className="showreel-pin">
          <div className="showreel-heading">
            <div>
              <p className="eyebrow">SELECTED WORK / 01—05</p>
              <h2>Scroll through<br /><em>the reel.</em></h2>
            </div>
            <p className="showreel-instruction">Five selected films with centered titles and direct playback controls. Keep scrolling for the case studies.</p>
          </div>
          <div className="showreel-track">
            {showreelClips.map((clip, i) => <ShowreelCard key={clip.title} clip={clip} index={i} />)}
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
