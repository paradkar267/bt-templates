import './App.css';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import Home from './Home';
import { useCart } from './CartContext';

export default function App() {
  const [mountSpline, setMountSpline] = useState(true);
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
      gsap.to(".orbit-master", { rotationY: 360, duration: 75, repeat: -1, ease: "none" });
      [1,2,3,4,5].forEach(i => gsap.to(`.orbit-card-counter-${i}`, { rotationY: "-=360", duration: 75, repeat: -1, ease: "none" }));
      if (window.location.hash === '#catalog') {
        setTimeout(() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return () => {
        gsap.killTweensOf(".orbit-master");
        [1,2,3,4,5].forEach(i => gsap.killTweensOf(`.orbit-card-counter-${i}`));
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
    gsap.set(".scene-7-hero", { pointerEvents: "none", opacity: 0, scale: 0.95 });

    tl.to(".text-great", { opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" })
      .to({}, { duration: 0.1 })
      .to(".text-great", { opacity: 0, scale: 1.1, duration: 0.2, ease: "power2.in" })
      .to(".text-desktop", { opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" })
      .to({}, { duration: 0.1 })
      .to(".text-desktop", { opacity: 0, scale: 1.1, duration: 0.2, ease: "power2.in" })
      .to(".text-idea-word", { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: "back.out(1.5)" })
      .to({}, { duration: 0.5 })
      
      // Reveal Hero
      .to(".text-idea-word", { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.inOut" }, "reveal-=0.4")
      .to(".scene-7-hero", { opacity: 1, scale: 1, pointerEvents: "auto", duration: 1.2, ease: "expo.out", onComplete: () => gsap.set(".scene-7-hero", { clearProps: "all" }) }, "reveal")
      
      .fromTo(".hero-watermark", { opacity: 0, scale: 1.1 }, { opacity: 0.8, scale: 1.5, duration: 4, ease: "power3.out" }, "reveal+=0.6")
      .fromTo(".hero-nav", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "reveal+=0.8")
      .fromTo(".info-stagger", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "reveal+=0.9")
      .fromTo(".hero-robot-container", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.8)" }, "reveal+=0.8")
      .fromTo(".orbit-distance", { z: 0, scale: 0, opacity: 0 }, { z: 300, scale: 0.8, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, "reveal+=0.7");

    gsap.to(".orbit-master", { rotationY: 360, duration: 75, repeat: -1, ease: "none" });
    [1,2,3,4,5].forEach(i => gsap.to(`.orbit-card-counter-${i}`, { rotationY: "-=360", duration: 75, repeat: -1, ease: "none" }));

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
      gsap.killTweensOf(".orbit-master");
      [1,2,3,4,5].forEach(i => gsap.killTweensOf(`.orbit-card-counter-${i}`));
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
