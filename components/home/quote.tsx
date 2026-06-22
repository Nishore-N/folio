// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap } from "gsap";
import React, { MutableRefObject, useEffect, useRef } from "react";

const QuoteSection = () => {
  const quoteRef: MutableRefObject<HTMLHeadingElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (quoteRef.current) {
        const quoteRect = quoteRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
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
      
      if (quoteRef.current) {
        gsap.set(quoteRef.current, { clearProps: "all" });
        const textStrong = quoteRef.current.querySelector(".text-strong");
        if (textStrong) gsap.set(textStrong, { clearProps: "all" });
      }
    };
  }, []);

  const renderQuote = (): React.ReactNode => (
    <div className="py-16 md:py-32 section-container">
      <h1
        ref={quoteRef}
        className="font-medium text-4xl md:text-5xl text-center"
      >
        I have a <span className="text-strong font-bold">strong</span> obsession
        for attention to detail.
      </h1>
    </div>
  );

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      {renderQuote()}
    </section>
  );
};

export default QuoteSection;
