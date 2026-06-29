import './App.css';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import Home from './Home';
import { useCart } from './CartContext';

export default function App() {
  const [mountSpline, setMountSpline] = useState(false); // Delay mounting 3D scene until intro is done
  const [introVisible, setIntroVisible] = useState(true);
  const { hasPlayedIntro, setHasPlayedIntro } = useCart();

  useEffect(() => {
    const skipIntro = window.location.hash === '#catalog' || hasPlayedIntro;

    if (skipIntro) {
      setIntroVisible(false);
      document.body.style.overflow = 'auto';
      setMountSpline(true);
      gsap.set(".scene-7-hero", { clearProps: "all", pointerEvents: "auto" });
      gsap.set(".hero-watermark", { opacity: 0.8, scale: 1.5 });
      gsap.set(".hero-nav, .info-stagger, .hero-robot-container", { opacity: 1, y: 0 });
      gsap.set(".orbit-distance", { z: 300, scale: 0.8, opacity: 1 });
      if (window.location.hash === '#catalog') {
        setTimeout(() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return () => {
      };
    }

    setHasPlayedIntro(true);
    document.body.style.overflow = 'hidden';

    // --- OLD INTRO ANIMATION ("Great Websites") ---
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        setMountSpline(true);
        setIntroVisible(false);
      }
    });

    // Initial setup
    gsap.set(".text-great, .text-desktop", { opacity: 0, scale: 0.7 });
    gsap.set(".text-idea-word", { opacity: 0, y: 30, scale: 0.9 });
    gsap.set(".scene-7-hero", { pointerEvents: "none", opacity: 0 }); // Removed scale: 0.95

    tl.to(".text-great", { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" })
      .to({}, { duration: 0.2 })
      .to(".text-great", { opacity: 0, scale: 1.05, duration: 0.4, ease: "power2.inOut" })
      .to(".text-desktop", { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .to({}, { duration: 0.2 })
      .to(".text-desktop", { opacity: 0, scale: 1.05, duration: 0.4, ease: "power2.inOut" })
      .to(".text-idea-word", { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.2")
      .to({}, { duration: 0.6 })
      
      // Reveal Hero
      .to(".text-idea-word", { opacity: 0, scale: 0.95, duration: 0.8, ease: "power3.inOut" }, "reveal-=0.6")
      .to(".scene-7-hero", { opacity: 1, pointerEvents: "auto", duration: 1.5, ease: "power3.inOut", onComplete: () => gsap.set(".scene-7-hero", { clearProps: "all" }) }, "reveal")
      
      .fromTo(".hero-watermark", { opacity: 0, scale: 1.1 }, { opacity: 0.8, scale: 1.5, duration: 4, ease: "power2.out" }, "reveal+=0.4")
      .fromTo(".hero-nav", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "reveal+=0.6")
      .fromTo(".info-stagger", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, "reveal+=0.8")
      .fromTo(".hero-robot-container", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }, "reveal+=0.6")
      .fromTo(".orbit-distance", { z: 0, scale: 0.8, opacity: 0 }, { z: 300, scale: 0.8, opacity: 1, duration: 1.5, stagger: 0.15, ease: "power3.out" }, "reveal+=0.5");

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-gray-200 dark:selection:text-black dark:text-white min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-white dark:bg-black -z-20"></div>

      {introVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none px-4">
          <h1 className="text-great font-sans absolute text-[15vw] md:text-[220px] font-extrabold tracking-[-0.08em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-500 to-gray-200 dark:from-white dark:via-gray-200 dark:to-gray-500">Great</h1>
          <h1 className="text-desktop font-sans absolute text-[15vw] md:text-[220px] font-extrabold tracking-[-0.08em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-500 to-gray-200 dark:from-white dark:via-gray-200 dark:to-gray-500 text-center">Websites</h1>
          <h1 className="font-sans absolute w-full px-8 text-[8vw] md:text-[100px] font-black tracking-tighter text-gray-900 dark:text-white leading-tight flex gap-[2vw] md:gap-5 flex-wrap justify-center text-center">
            {["Great", "Websites", "start", "with", "an", "idea."].map((word, i) => (<span key={i} className="text-idea-word block" style={{ willChange: "transform, opacity" }}>{word}</span>))}
          </h1>
        </div>
      )}

      <Home mountSpline={mountSpline} />
    </div>
  );
}
