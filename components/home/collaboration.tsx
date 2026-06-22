// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { isSmallScreen, NO_MOTION_PREFERENCE_QUERY } from "pages";

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap",
  SECTION:
    "w-full relative select-none tall:pt-16 pt-20 tall:pb-60 pb-72 section-container flex flex-col",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center",
};

const CollaborationSection = () => {
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const targetSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshTriggers = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    const timers = [100, 500, 1000, 2500].map((t) => setTimeout(refreshTriggers, t));

    // Native scroll listener to bypass all GSAP ScrollTrigger offset bugs
    let animationFrameId: number;
    const handleScroll = () => {
      if (!targetSection.current) return;
      const rect = targetSection.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementHeight = rect.height;
      const totalScrollDistance = windowHeight + elementHeight;
      const currentScroll = windowHeight - rect.top;
      
      let progress = currentScroll / totalScrollDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      const maxPercent = isSmallScreen() ? -80 : -50;
      const leftPercent = progress * maxPercent;
      const rightPercent = maxPercent - (progress * maxPercent);
      
      const uiLeft = targetSection.current.querySelector(".ui-left");
      const uiRight = targetSection.current.querySelector(".ui-right");
      
      if (uiLeft) gsap.to(uiLeft, { xPercent: rightPercent, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      if (uiRight) gsap.to(uiRight, { xPercent: leftPercent, duration: 0.5, ease: "power2.out", overwrite: "auto" });

      // Gradient text scroll-based logic
      if (quoteRef.current) {
        const quoteRect = quoteRef.current.getBoundingClientRect();
        // Calculate progress based on the text's distance from the bottom of the screen.
        // It goes from 0 (at the bottom) to 1 (when it reaches the vertical center of the screen).
        let quoteProgress = (windowHeight - quoteRect.top) / (windowHeight / 2);
        quoteProgress = Math.max(0, Math.min(1, quoteProgress));

        gsap.to(quoteRef.current, {
          opacity: quoteProgress,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });

        const textStrong = quoteRef.current.querySelector(".text-strong");
        if (textStrong) {
          gsap.to(textStrong, {
            backgroundPositionX: `${quoteProgress * 100}%`,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      
      timers.forEach(clearTimeout);
      if (targetSection.current) {
        gsap.set(targetSection.current.querySelectorAll('.ui-left, .ui-right'), { clearProps: "all" });
      }
      if (quoteRef.current) {
        gsap.set(quoteRef.current, { clearProps: "all" });
        const textStrong = quoteRef.current.querySelector(".text-strong");
        if (textStrong) gsap.set(textStrong, { clearProps: "all" });
      }
    };
  }, [quoteRef, targetSection]);

  const renderSlidingText = (text: string, layoutClasses: string) => (
    <p className={`${layoutClasses} ${COLLABORATION_STYLE.SLIDING_TEXT}`}>
      {Array(5)
        .fill(text)
        .reduce((str, el) => str.concat(el), "")}
    </p>
  );

  const renderTitle = () => (
    <h1
      ref={quoteRef}
      className={`${COLLABORATION_STYLE.TITLE}`}
    >
      Interested in <span className="text-strong font-bold">Collaboration</span>
      ?
    </h1>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {renderSlidingText(
        "   Mobile Apps   •   Full Stack Web & App Development   •   ",
        "ui-left text-right"
      )}

      {renderTitle()}

      {renderSlidingText(
        "               API Integration   •   CI/CD Pipeline   •   AI Automation   •   ",
        "mt-6 md:mt-8 ui-right"
      )}
    </section>
  );
};

export default CollaborationSection;
