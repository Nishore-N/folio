// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import ProjectTile from "../common/project-tile";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IDesktop, NO_MOTION_PREFERENCE_QUERY } from "pages";

const PROJECT_STYLES = {
  SECTION:
    "w-full relative select-none section-container flex-col flex pb-8 pt-20 lg:pt-24 justify-center",
  PROJECTS_WRAPPER:
    "tall:mt-12 mt-6 grid grid-flow-col auto-cols-max md:gap-10 gap-6 project-wrapper w-fit seq snap-x scroll-pl-6 snap-mandatory",
};

const ProjectsSection = ({ isDesktop }: IDesktop) => {
  const targetSectionRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const sectionTitleElementRef: MutableRefObject<HTMLDivElement> = useRef(null);

  const [horizontalAnimationEnabled, sethorizontalAnimationEnabled] =
    useState(false);


  const initProjectsAnimation = (
    targetSectionRef: MutableRefObject<HTMLDivElement>,
    sectionTitleElementRef: MutableRefObject<HTMLDivElement>
  ): [GSAPTimeline, ScrollTrigger] => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    const sidePadding =
      document.body.clientWidth -
      targetSectionRef.current.querySelector(".inner-container").clientWidth;
    const elementWidth =
      sidePadding +
      targetSectionRef.current.querySelector(".project-wrapper").clientWidth;
    targetSectionRef.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;
    timeline
      .to(targetSectionRef.current, { x: width })
      .to(sectionTitleElementRef.current, { x: -width }, "<");

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSectionRef.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    return [timeline, scrollTrigger];
  };

  useEffect(() => {
    let projectsScrollTrigger: ScrollTrigger | undefined;
    let projectsTimeline: GSAPTimeline | undefined;
    let initTimer: NodeJS.Timeout;

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);
    sethorizontalAnimationEnabled(isDesktop && matches);

    // Wrap initialization in a timeout to guarantee the DOM has settled
    // after any previous Strict Mode cleanup wiped the inline styles.
    initTimer = setTimeout(() => {
      if (isDesktop && matches) {
        if (targetSectionRef.current && sectionTitleElementRef.current) {
          [projectsTimeline, projectsScrollTrigger] = initProjectsAnimation(
            targetSectionRef,
            sectionTitleElementRef
          );
          // Force GSAP to recognize the new pinned heights
          ScrollTrigger.refresh();
        }
      } else {
        if (targetSectionRef.current) {
          const projectWrapper = targetSectionRef.current.querySelector(
            ".project-wrapper"
          ) as HTMLDivElement;
          const parentPadding = window
            .getComputedStyle(targetSectionRef.current)
            .getPropertyValue("padding-left");

          targetSectionRef.current.style.setProperty("width", "100%");
          if (projectWrapper) {
            projectWrapper.classList.add("overflow-x-auto");
            projectWrapper.style.setProperty("width", `calc(100vw)`);
            projectWrapper.style.setProperty("padding", `0 ${parentPadding}`);
            projectWrapper.style.setProperty(
              "transform",
              `translateX(-${parentPadding})`
            );
          }
        }
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      projectsScrollTrigger && projectsScrollTrigger.kill();
      projectsTimeline && projectsTimeline.kill();
      
      // CRITICAL: Strip all inline styles left by GSAP and manual logic 
      if (targetSectionRef.current) {
        gsap.set(targetSectionRef.current, { clearProps: "all" });
        const projectWrapper = targetSectionRef.current.querySelector(".project-wrapper") as HTMLDivElement;
        if (projectWrapper) {
          gsap.set(projectWrapper, { clearProps: "all" });
          projectWrapper.classList.remove("overflow-x-auto");
        }
      }
      if (sectionTitleElementRef.current) {
        gsap.set(sectionTitleElementRef.current, { clearProps: "all" });
      }
    };
  }, [targetSectionRef, sectionTitleElementRef, isDesktop]);

  const renderSectionTitle = (): React.ReactNode => (
    <div
      className="flex flex-col inner-container"
      ref={sectionTitleElementRef}
    >
      <p className="section-title-sm seq">PROJECTS</p>
      <h1 className="section-heading seq mt-2">My Works</h1>
      <h2 className="text-2xl md:max-w-3xl w-full seq max-w-sm mt-2">
        I have worked on various projects including IoT applications, mobile apps, and web development using modern technologies
      </h2>
    </div>
  );

  const renderProjectTiles = (): React.ReactNode =>
    PROJECTS.map((project) => (
      <ProjectTile
        project={project}
        key={project.name}
        animationEnabled={horizontalAnimationEnabled}
      ></ProjectTile>
    ));

  const { ref: projectsSectionRef } = MENULINKS[1];

  return (
    <section
      ref={targetSectionRef}
      className={`${isDesktop ? "min-h-screen" : ""} ${PROJECT_STYLES.SECTION}`}
      id={projectsSectionRef}
    >
      {renderSectionTitle()}
      <div className={PROJECT_STYLES.PROJECTS_WRAPPER}>
        {renderProjectTiles()}
      </div>
    </section>
  );
};

export default ProjectsSection;
