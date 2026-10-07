
Loading older messages…
User attachment
I can see that this deployment also failed, but the screenshot cuts off the actual error message. I can only make out the red error banner at the top, not the reason.

Don't change anything yet.

Do this
Click the “Inspect Deployment” button shown in your screenshot.

That should open the deployment logs.

Then scroll to the red error section and send me a screenshot where the actual error text is visible.

I specifically need the lines around:

Error:
...
Build failed
...
The previous problem was the missing app directory. Since you've now added it, this is likely a different build error, and guessing at it would be the traditional human approach to debugging. We'll read the actual error instead.

User attachment
Got it. This screenshot tells us something important: don't click Redeploy here.

Vercel is saying:

“A more recent Production Deployment has been created, so the one you are looking at cannot be redeployed anymore.”

So you're looking at an older failed deployment. Vercel is being annoyingly literal.

Do this now
Click Cancel on that Redeploy popup.
Go to Deployments at the top of Vercel.
You should see your newest deployment at the top.
Click that newest deployment.
Click Logs.
Find the red error section near the bottom.
I need to see the actual error from the newest deployment, not this older one.

What I'm looking for
Something like:

Error: ...
or

Module not found: ...
or

Couldn't find ...
Take a screenshot of the red error lines and send it.

Don't change anything in GitHub or Vercel yet. Once I see that error, I'll tell you exactly what needs fixing.

User attachment
This is good. It's working.

The important part of your screenshot is:

GET 200 /
GET 200 /
A 200 status means the website is successfully responding. So the Next.js build/deployment issue is fixed. Humanity survives another deployment.

Do this now
Go to the Deployment tab at the top, next to Logs.

You should see the deployment marked Ready or Ready / Production.

There should also be a domain similar to:

gokul-ai-portfolio-ten.vercel.app
Click that domain and open the website.

What we're checking
The site should load, but the videos may not play yet. That's expected because we haven't put the actual MP4 files into production storage.

For now, check:

Does the homepage load?
Does the hero section appear?
Does the scrolling work?
Do the project sections appear?
Are the poster/placeholder images showing?
Open the Vercel URL and send me a screenshot of the actual website. Then we'll move on to the video files and make the portfolio actually look like the expensive thing we intended, rather than a beautifully deployed empty shell.

User attachment
There we go. The latest deployment is Ready. The earlier errors are now irrelevant.

Your screenshot shows:

Latest deployment: Ready
Build time: 28s
Environment: Production
Branch: main
Older deployments: also now showing Ready
The original e6034cd deployment is the only failed one
So the deployment is successfully live.

Next step
Click the top Ready deployment in the list.

That will open the deployment details. Look for the .vercel.app URL and click it.

It should open your actual portfolio website.

Then check these 4 things
Does the homepage load?
Does the “I make ads with AI.” hero appear?
Does scrolling/animation work?
Do the project sections appear?
The videos probably won't play yet, and that's expected. We haven't connected the actual MP4 files.

Send me a screenshot of the actual website after clicking the Ready deployment, not the Vercel dashboard. Then we can move on to the video hosting.

No
Got it. I misunderstood what you meant by “No.”

Tell me what you're seeing now, or send me a screenshot of the current screen. I’ll follow exactly what’s on your screen instead of making you click through another 14 layers of Vercel bureaucracy.

User attachment

Worked for 18s

Yes, now we know the actual problem.

The Vercel deployment itself is working. The website is crashing in the browser after loading. I checked the code that was in the project, and I found the likely culprit:

require("@studio-freight/lenis")
The original portfolio was trying to initialize Lenis from inside the client-side browser bundle. That's what's causing the “Application error: a client-side exception has occurred” screen.

I’ve fixed the portfolio.tsx file by removing that problematic runtime initialization while keeping the GSAP animations and the rest of the design intact.

Download the fixed file
Download the fixed portfolio.tsx

Now replace the file on GitHub
Go to your GitHub repository:
Alphagxz → gokul-ai-portfolio

Open:

app
Click:
portfolio.tsx

Click the pencil/edit icon in the top-right.

Select all the existing code and delete it.

Open the downloaded portfolio.tsx file on your Mac.

Copy all of its code.

Paste it into GitHub.

Scroll down to Commit changes.

Use:

Fix client-side runtime error
Click Commit changes.
Then
Vercel should automatically detect the new GitHub commit and create a new Production deployment.

Wait until it says:

Ready

Then open the new deployment URL.

The important thing is don't touch the Vercel settings. The build is already working. We're fixing the browser runtime error, not rebuilding the whole thing because apparently that would be too merciful. 


portfolio.tsx
Code



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
    // Use native scrolling for maximum Vercel/browser compatibility.
    // The original version initialized Lenis through `require()` inside the
    // client bundle, which can trigger a browser-side runtime exception.
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
    return () => { ctx.revert(); };
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

