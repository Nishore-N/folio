// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { MENULINKS, SKILLS } from "../../constants";
import Image from "next/image";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";

const SKILL_STYLES = {
  SECTION:
    "w-full relative select-none mb-0 section-container py-16 lg:py-24 flex flex-col justify-center",
  SKILL_TITLE: "section-title-sm mb-4 seq",
};

const SkillsSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    let animationFrameId: number;
    const revealTl = gsap.timeline({ paused: true, defaults: { ease: Linear.easeNone } });

    if (targetSection.current) {
      revealTl.from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 }
      );
    }

    const handleScroll = () => {
      if (!targetSection.current) return;
      const windowHeight = window.innerHeight;
      
      const startPoint = windowHeight - 100;
      const endPoint = windowHeight / 2;
      
      const wrapper = targetSection.current.querySelector(".skills-wrapper");
      if (!wrapper) return;
      const wrapperRect = wrapper.getBoundingClientRect();
      
      let progress = (startPoint - wrapperRect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));
      
      gsap.to(revealTl, { progress: progress, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      revealTl.kill();
      if (targetSection.current) {
        gsap.set(targetSection.current.querySelectorAll(".seq"), { clearProps: "all" });
      }
    };
  }, []);

  const renderSectionTitle = (): React.ReactNode => (
    <div className="flex flex-col">
      <p className="section-title-sm seq">SKILLS</p>
      <h1 className="section-heading seq mt-2">My Skills</h1>
      <h2 className="text-2xl md:max-w-2xl w-full seq mt-2">
        I have expertise in web development, mobile app development, UI/UX design, and database management.{" "}
      </h2>
    </div>
  );

  const renderBackgroundPattern = (): React.ReactNode => (
    <>
      <div className="absolute right-0 -bottom-1/3 w-1/5 max-w-xs md:flex hidden justify-end">
        <Image
          src="/pattern-r.svg"
          loading="lazy"
          height={700}
          width={320}
          alt="pattern"
        />
      </div>
      <div className="absolute left-0 -bottom-3.5 w-1/12 max-w-xs md:block hidden">
        <Image
          src="/pattern-l.svg"
          loading="lazy"
          height={335}
          width={140}
          alt="pattern"
        />
      </div>
    </>
  );

  const renderSkillColumn = (
    title: string,
    skills: string[]
  ): React.ReactNode => (
    <>
      <h3 className={SKILL_STYLES.SKILL_TITLE}>{title}</h3>
      <div className="flex flex-wrap seq">
        {skills.map((skill) => {
          let imageSrc = `/skills/${skill}.svg`;
          if (skill === 'flutter') imageSrc = '/skills/Flutter.png';
          if (skill === 'canva') imageSrc = '/skills/Canva.jpeg';
          if (skill === 'java') imageSrc = '/skills/java.png';
          if (skill === 'c') imageSrc = '/skills/C.png';
          if (skill === 'sql') imageSrc = '/skills/sql.png';
          if (skill === 'arduino') imageSrc = '/skills/arduino.png';
          if (skill === 'firebase') imageSrc = '/skills/firebase.png';
          
          return (
            <Image
              key={skill}
              src={imageSrc}
              alt={skill}
              width={76}
              height={76}
              className="skill"
            />
          );
        })}
      </div>
    </>
  );

  return (
    <section className="relative">
      {renderBackgroundPattern()}
      <div
        className={SKILL_STYLES.SECTION}
        id={MENULINKS[2].ref}
        ref={targetSection}
      >
        <div className="flex flex-col skills-wrapper">
          {renderSectionTitle()}
          <div className="mt-10">
            {renderSkillColumn("FRONTEND DEVELOPMENT", SKILLS.frontend)}
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="mr-6 mb-6">
              {renderSkillColumn(
                "UI/UX",
                SKILLS.uiUx
              )}
            </div>
            <div>{renderSkillColumn("Other Skills", SKILLS.other)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
