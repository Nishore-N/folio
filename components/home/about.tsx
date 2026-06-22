// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap } from "gsap";
import React, { MutableRefObject, useEffect, useRef } from "react";

const AboutSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    let animationFrameId: number;
    let timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "none", duration: 0.1 },
    });

    if (quoteRef.current) {
      timeline
        .fromTo(
          quoteRef.current.querySelector(".about-1"),
          { opacity: 0.2 },
          { opacity: 1 }
        )
        .to(quoteRef.current.querySelector(".about-1"), {
          opacity: 0.2,
          delay: 0.5,
        })
        .fromTo(
          quoteRef.current.querySelector(".about-2"),
          { opacity: 0.2 },
          { opacity: 1 },
          "<"
        )
        .to(quoteRef.current.querySelector(".about-2"), {
          opacity: 0.2,
          delay: 1,
        });
    }

    const handleScroll = () => {
      if (!targetSection.current) return;
      const rect = targetSection.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionCenter = rect.top + rect.height / 2;
      const startPoint = windowHeight * 0.8;
      const endPoint = 0;
      
      let progress = (startPoint - sectionCenter) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));
      
      // Use gsap.to to smoothly scrub the timeline instead of raw jump
      gsap.to(timeline, { progress: progress, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      timeline.kill();
      if (quoteRef.current) {
        gsap.set(quoteRef.current.querySelectorAll(".about-1, .about-2"), { clearProps: "all" });
      }
    };
  }, []);

  const renderQuotes = (): React.ReactNode => (
    <h1 ref={quoteRef} className="font-medium text-3xl sm:text-4xl md:text-6xl">
      <span className="about-1 leading-tight">
        I am a Software Developer experienced in building scalable mobile and Full stack applications.{" "}
      </span>
      <span className="about-2 leading-tight">
        As a tech-agnostic developer, I leverage AI to rapidly master new technologies and seamlessly adapt to the ever-evolving demands of the modern tech arena.
      </span>
    </h1>
  );

  return (
    <section
      className="tall:pt-20 tall:pb-16 pt-40 pb-24 w-full relative select-none section-container"
      ref={targetSection}
    >
      {renderQuotes()}
    </section>
  );
};

export default AboutSection;
