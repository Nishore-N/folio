// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";
import React, { MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap, Linear } from "gsap";
import Button, { ButtonTypes } from "../common/button";
import HeroImage from "./hero-image";

const HERO_STYLES = {
  SECTION:
    "w-full flex md:items-center py-8 section-container min-h-screen relative mb-24",
  CONTENT: "font-medium flex flex-col pt-16 md:pt-0 select-none w-full md:w-2/5 z-10",
  SOCIAL_LINK: "link hover:opacity-80 duration-300 md:mr-4 mr-2",
  BG_WRAPPER:
    "absolute hero-bg right-0 md:bottom-0 bottom-8 -z-1 md:w-3/4 w-full scale-125 sm:scale-100 flex items-end",
  TYPED_SPAN: "text-xl sm:text-2xl md:text-3xl font-light seq text-gray-300 leading-snug",
};

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const initTypeAnimation = (
    typedSpanElement: MutableRefObject<HTMLSpanElement>
  ): Typed => {
    return new Typed(typedSpanElement.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 8000,
      loop: true,
    });
  };

  const initRevealAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): GSAPTimeline => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 },
        "<"
      );

    return revealTl;
  };

  useEffect(() => {
    const typed = initTypeAnimation(typedSpanElement);
    initRevealAnimation(targetSection);

    return typed.destroy;
  }, [typedSpanElement, targetSection]);

  const renderBackgroundImage = (): React.ReactNode => (
    <div className={HERO_STYLES.BG_WRAPPER} style={{ maxHeight: "650px" }}>
      <HeroImage />
    </div>
  );

  const renderSocialLinks = (): React.ReactNode =>
    Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className={HERO_STYLES.SOCIAL_LINK}
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));

  const renderHeroContent = (): React.ReactNode => (
    <div className={HERO_STYLES.CONTENT}>
      <div className="mb-8 md:mb-10">
        <h2 className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-white uppercase mb-8 md:mb-10 seq whitespace-normal md:whitespace-nowrap italic leading-relaxed">
          HELLO THERE — WELCOME TO MY DIGITAL SPACE
        </h2>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black seq tracking-tighter text-gradient leading-none italic">
          NISHORE N
        </h1>
      </div>
      
      {/* Decorative Gap Filler */}
      <div className="seq mb-10 flex items-center w-full max-w-[250px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[450px] opacity-80">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent to-[#6dd5ed]"></div>
        <div className="relative mx-3 sm:mx-4 flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#6dd5ed] animate-ping absolute"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#6dd5ed] shadow-[0_0_12px_rgba(109,213,237,1)]"></div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-l from-transparent to-[#2193b0]"></div>
      </div>

      <p className="mb-8">
        <span className={HERO_STYLES.TYPED_SPAN} ref={typedSpanElement}></span>
      </p>
      <div className="flex seq mb-6">{renderSocialLinks()}</div>
      <div className="flex seq">
        <Button
          classes="mr-3"
          type={ButtonTypes.OUTLINE}
          name="Resume"
          otherProps={{
            target: "_blank",
            rel: "noreferrer",
          }}
          href="/NISHORE_Resume.pdf"
        ></Button>
        <Button
          classes="ml-3"
          type={ButtonTypes.PRIMARY}
          name="Let's Talk"
          href="#contact"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const el = document.getElementById("contact");
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
            el.classList.add("contact-highlight");
            setTimeout(() => el.classList.remove("contact-highlight"), 1200);
          }}
        ></Button>
      </div>
    </div>
  );

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      className={HERO_STYLES.SECTION}
      id={heroSectionRef}
      ref={targetSection}
      style={{ opacity: 0 }}
    >
      {renderHeroContent()}
      {renderBackgroundImage()}
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;
