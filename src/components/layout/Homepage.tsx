import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Lenis from "lenis";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const Homepage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, orientation: 'vertical', smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll Progress Bar
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.3 }
      });

      // 2. Horizontal Scroll Section (The Gallery)
      const races = document.querySelector(".horizontal-scroll-wrapper");
      if (races) {
        gsap.to(races, {
          x: () => -(races.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${races.scrollWidth}`,
            scrub: 1,
            pin: true,
          }
        });
      }

      // 3. 3D Floating Mockups
      gsap.utils.toArray<HTMLElement>(".floating-card").forEach((card) => {
        gsap.to(card, {
          y: -100,
          rotationY: 15,
          rotationX: 5,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 4. Staggered List Reveal
      gsap.from(".list-item", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".list-container",
          start: "top 70%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-zinc-50 text-zinc-900 overflow-x-hidden">

      <div className="progress-bar fixed top-0 left-0 w-full h-1 bg-blue-500 origin-left scale-x-0 z-[100]" />

      <nav className="fixed top-0 w-full z-90 flex justify-between items-center px-10 py-6 mix-blend-difference text-white">
        <span className="font-black text-2xl tracking-tighter">TALKSY.</span>
        <Link to="/login" className="text-sm font-bold border-b-2 border-blue-500 pb-1">Enter App</Link>
      </nav>

      <section className="h-screen flex items-center justify-center relative bg-white">
        <div className="text-center z-10">
          <h1 className="text-[12vw] font-black leading-none tracking-tighter uppercase italic">
            Talksy <br /> <span className="text-blue-500 not-italic">01</span>
          </h1>
          <p className="mt-4 font-mono text-zinc-400">SCROLL TO EXPLORE THE FUTURE OF CHAT</p>
        </div>
        <div className="absolute bottom-10 animate-bounce text-blue-500">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
        </div>
      </section>

      {/* Section 2: Horizontal Scrolling Gallery */}
      <section className="horizontal-section h-screen bg-zinc-900 flex items-center overflow-hidden">
        <div className="horizontal-scroll-wrapper flex gap-20 px-20">
          <div className="w-[400px] h-[500px] flex-shrink-0 bg-blue-500 rounded-3xl p-10 flex flex-col justify-end">
            <h3 className="text-4xl font-black text-white">STOMP <br /> Protocol</h3>
          </div>
          <div className="w-[600px] h-[500px] flex-shrink-0 bg-zinc-800 rounded-3xl p-10 flex flex-col justify-end border border-zinc-700">
            <h3 className="text-4xl font-black text-white">Spring AI <br /> Integration</h3>
          </div>
          <div className="w-[400px] h-[500px] flex-shrink-0 bg-blue-100 rounded-3xl p-10 flex flex-col justify-end">
            <h3 className="text-4xl font-black text-blue-900">Voice & Video <br /> Calling</h3>
          </div>
          <div className="w-[700px] h-[500px] flex-shrink-0 bg-zinc-950 rounded-3xl p-10 flex flex-col justify-end border-l-4 border-blue-500">
            <h3 className="text-4xl font-black text-white">JWT <br /> Security</h3>
          </div>
        </div>
      </section>

      {/* Section 3: Feature Layers (Parallax Cards) */}
      <section className="py-40 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="list-container space-y-12">
            <h2 className="text-5xl font-black italic">The Tech Stack.</h2>
            {[
              { title: "React & GSAP", desc: "For buttery smooth interfaces." },
              { title: "Spring Boot", desc: "Robust backend performance." },
              { title: "Zustand", desc: "State management done right." },
              { title: "MySQL", desc: "Reliable persistent storage." }
            ].map((item, i) => (
              <div key={i} className="list-item border-l-2 border-zinc-200 pl-6 py-2 group hover:border-blue-500 transition-colors">
                <h4 className="text-xl font-bold group-hover:text-blue-500">{item.title}</h4>
                <p className="text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="perspective-1000 relative h-[600px]">
            <div className="floating-card absolute top-0 left-0 w-64 h-80 bg-white shadow-2xl rounded-2xl border border-zinc-100 z-30 p-6">
              <div className="w-10 h-10 rounded-full bg-blue-500 mb-4" />
              <div className="h-2 w-full bg-zinc-100 rounded mb-2" />
              <div className="h-2 w-2/3 bg-zinc-100 rounded" />
            </div>
            <div className="floating-card absolute bottom-0 right-0 w-64 h-80 bg-zinc-900 shadow-2xl rounded-2xl z-20 p-6 translate-x-10 translate-y-10">
              <div className="w-10 h-10 rounded-full bg-zinc-700 mb-4" />
              <div className="h-2 w-full bg-zinc-800 rounded mb-2" />
              <div className="h-2 w-2/3 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Massive Quote */}
      <section className="py-60 bg-white border-y border-zinc-100 text-center px-4">
        <blockquote className="text-4xl md:text-7xl font-black max-w-6xl mx-auto leading-[1.1] tracking-tighter">
          "The best way to <span className="text-zinc-300">predict</span> the future is to <span className="text-blue-500 italic">build</span> it."
        </blockquote>
      </section>

      {/* Section 5: The Sanvaad Experience */}
      <section className="h-[200vh] relative bg-zinc-900 flex flex-col items-center pt-40">
        <div className="sticky top-40 text-center w-full px-4">
          <h2 className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase mb-6">Experience Talksy</h2>
          <div className="text-white text-6xl md:text-[10rem] font-black leading-none select-none">
            REAL-TIME<br />POWER
          </div>
          {/* This sub-text fades in as we scroll through the 200vh */}
          <div className="mt-20 max-w-lg mx-auto text-zinc-500 text-lg">
            Scroll deeper to witness the STOMP and WebSocket integration that makes Talksy feel like it's living in the future.
          </div>
        </div>
      </section>

      {/* Section 6: CTA Final */}
      <section className="py-40 bg-white flex flex-col items-center">
        <div className="w-32 h-32 bg-blue-500 rounded-4xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-blue-200 mb-12">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </div>
        <h2 className="text-5xl font-black mb-6">Talksy.</h2>
        <p className="text-zinc-400 mb-10 text-xl font-medium">A Real Time Messaging Platform.</p>
        <div className="">
          <Link to="/register" className="px-12 py-6 bg-zinc-900 text-white font-bold rounded-2xl hover:scale-110 transition-transform">Get Started</Link>
        </div>
      </section>

      <footer className="p-10 border-t border-zinc-100 text-center font-medium">
        <div className="mt-4 md:mt-0">© 2026 Talksy Project</div>
      </footer>
    </div>
  );
};