import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    // Set initial stroke states to hide the lines
    gsap.set(".triangle-side", {
      strokeDasharray: 120, // Enough length to cover the sides (approx length is 80)
      strokeDashoffset: 120,
      opacity: 1,
    });

    // Hide the real solid logo initially
    gsap.set(".real-logo", { opacity: 0, scale: 0.8 });
    
    // Set up the container for rotation
    gsap.set(".logo-container", { rotation: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Restore scrolling and hide splash
        document.body.style.overflow = "";
        setIsVisible(false);
      },
    });

    // 1. Draw Side 1 (Top to Bottom Left)
    tl.to(".side-1", {
      strokeDashoffset: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });

    // 2. Draw Side 2 (Bottom Left to Bottom Right)
    tl.to(".side-2", {
      strokeDashoffset: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });

    // 3. Draw Side 3 (Bottom Right to Top)
    tl.to(".side-3", {
      strokeDashoffset: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });

    // 4. "Construct Together" - snap the lines into the solid final logo
    tl.to(".real-logo", {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    }, "+=0.1");

    tl.to(".splash-lines", {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
    }, "<"); // start at the exact same time as the logo fade in

    // 5. Unique Animation: Energy Gather & Shockwave Explosion
    tl.to(".real-logo", {
      scale: 0.7,
      duration: 0.4,
      ease: "back.in(2)",
    }, "+=0.2");

    tl.to(".real-logo", {
      scale: 1.15,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    // Fire the phantom shockwave exactly when the logo expands
    tl.fromTo(".phantom-logo", 
      { scale: 0.7, opacity: 0.8 },
      { scale: 4, opacity: 0, duration: 1, ease: "power3.out" },
      "<" // Start at the same time as the elastic expansion
    );

    // 6. Complete animation - Fade out splash screen
    tl.to(".splash-container", {
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      delay: 0.2,
    });

  }, [isMounted]);

  if (!isVisible) return null;

  return (
    <div className="splash-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900">
      
      {/* Central Rotation Container */}
      <div className="logo-container relative flex flex-col items-center justify-center w-[100px] h-[100px]">
        
        {/* Animated Lines constructing the triangle one by one */}
        <svg 
          className="splash-lines absolute inset-0 z-20 drop-shadow-[0_0_15px_rgba(109,213,237,0.3)]" 
          width="100" 
          height="100" 
          viewBox="0 0 100 100"
        >
          {/* Left Side */}
          <path className="triangle-side side-1" d="M 50 15 L 15 85" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Bottom Side */}
          <path className="triangle-side side-2" d="M 15 85 L 85 85" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Right Side */}
          <path className="triangle-side side-3" d="M 85 85 L 50 15" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>

        {/* Real Logo to snap in after the construction */}
        <div className="real-logo absolute inset-0 z-10 flex items-center justify-center">
          <svg
            width="85"
            height="85"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_rgba(109,213,237,0.7)]"
          >
            <path
              d="M11.0575 0.636853C11.0575 0.62238 11.0575 0.615143 11.0575 0.615143C11.0575 0.615143 11.0575 0.629616 11.0431 0.629616C11.0431 0.629616 11.0431 0.615143 11.0288 0.615143C11.0288 0.615143 11.0288 0.629617 11.0288 0.636853C10.5974 1.4908 0.0718926 21.3487 0.438559 21.3342C0.934638 21.3198 1.4451 21.3342 1.94117 21.3704C2.13529 21.3849 2.20719 21.2763 2.28627 21.1388C2.80392 20.1619 10.2523 6.15857 11.0431 4.74014C11.8196 6.15857 19.2105 20.1619 19.7137 21.1388C19.7928 21.2763 19.8647 21.3849 20.0588 21.3704C20.5549 21.3487 21.051 21.327 21.5471 21.3342C21.9281 21.3487 11.4961 1.49804 11.0575 0.636853Z"
              fill="white"
            />
            <path
              d="M18.1608 21.3849C17.9883 21.0158 17.7294 20.5599 17.4778 20.104C17.3412 19.8579 17.3053 19.8 16.8092 19.8C15.5726 19.8 13.2791 19.7783 11.0647 19.7638H11.0504H11.036C8.83598 19.7855 6.57127 19.8 5.34905 19.8C4.85297 19.8 4.81702 19.8579 4.68761 20.104C4.43598 20.5599 4.19153 21.0013 4.01898 21.3849C4.27062 21.3849 7.68565 21.3849 11.0719 21.3632C14.4582 21.3849 17.8948 21.3849 18.1608 21.3849Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Phantom Logo Shockwave */}
        <div className="phantom-logo absolute inset-0 z-0 flex items-center justify-center opacity-0 pointer-events-none">
          <svg
            width="85"
            height="85"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0575 0.636853C11.0575 0.62238 11.0575 0.615143 11.0575 0.615143C11.0575 0.615143 11.0575 0.629616 11.0431 0.629616C11.0431 0.629616 11.0431 0.615143 11.0288 0.615143C11.0288 0.615143 11.0288 0.629617 11.0288 0.636853C10.5974 1.4908 0.0718926 21.3487 0.438559 21.3342C0.934638 21.3198 1.4451 21.3342 1.94117 21.3704C2.13529 21.3849 2.20719 21.2763 2.28627 21.1388C2.80392 20.1619 10.2523 6.15857 11.0431 4.74014C11.8196 6.15857 19.2105 20.1619 19.7137 21.1388C19.7928 21.2763 19.8647 21.3849 20.0588 21.3704C20.5549 21.3487 21.051 21.327 21.5471 21.3342C21.9281 21.3487 11.4961 1.49804 11.0575 0.636853Z"
              stroke="#6dd5ed"
              strokeWidth="0.8"
            />
            <path
              d="M18.1608 21.3849C17.9883 21.0158 17.7294 20.5599 17.4778 20.104C17.3412 19.8579 17.3053 19.8 16.8092 19.8C15.5726 19.8 13.2791 19.7783 11.0647 19.7638H11.0504H11.036C8.83598 19.7855 6.57127 19.8 5.34905 19.8C4.85297 19.8 4.81702 19.8579 4.68761 20.104C4.43598 20.5599 4.19153 21.0013 4.01898 21.3849C4.27062 21.3849 7.68565 21.3849 11.0719 21.3632C14.4582 21.3849 17.8948 21.3849 18.1608 21.3849Z"
              stroke="#6dd5ed"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
      
    </div>
  );
};

export default SplashScreen;
