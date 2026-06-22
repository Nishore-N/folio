// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import styles from "./ProjectTile.module.scss";
import Image from "next/image";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { IProject } from "../../constants";

const ProjectTile = ({
  project,
  animationEnabled,
}: {
  project: IProject;
  animationEnabled: boolean;
}) => {
  const projectCard: MutableRefObject<HTMLDivElement> = useRef(null);
  const [showTechList, setShowTechList] = useState(false);
  const {
    name,
    tech,
    image,
    blurImage,
    description,
    gradient: [stop1, stop2],
    category,
    url,
  } = project;

  useEffect(() => {
    VanillaTilt.init(projectCard.current, {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      gyroscope: false,
    });
  }, [projectCard]);

  const renderTechIcons = (techStack: string[]): React.ReactNode => (
    <div
      className={`
      ${styles.techIcons} w-1/2 h-full absolute left-24 top-0 sm:flex items-center hidden
    `}
    >
      <div className="flex flex-col pb-8">
        {techStack.map((tech, i) => {
          // Determine tech icon extension based on tech name
          let techIconSrc = `/projects/tech/${tech}.svg`;
          if (tech === 'flutter') techIconSrc = '/projects/tech/flutter.png';
          if (tech === 'firebase') techIconSrc = '/projects/tech/firebase.png';
          if (tech === 'arduino') techIconSrc = '/projects/tech/arduino.png';
          if (tech === 'sql') techIconSrc = '/projects/tech/sql.png';
          
          return (
            <div className={`${i % 2 === 0 && "ml-16"} mb-4`} key={tech}>
              <Image
                src={techIconSrc}
                alt={tech}
                height={45}
                objectFit="contain"
                width={45}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDescription = (description: string): React.ReactNode => (
    <h2
      className="text-lg z-10 tracking-wide font-medium"
      style={{ transform: "translateZ(0.8rem)" }}
    >
      {description}
    </h2>
  );

  const renderCategoryLabel = (category: string): React.ReactNode => (
    <div className="z-20 pl-2 mt-3">
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ease-in-out ${
          category === "hardware" 
            ? "bg-orange-500 bg-opacity-90 text-white border-orange-400" 
            : "bg-blue-500 bg-opacity-90 text-white border-blue-400"
        }`}
      >
        {category}
      </span>
    </div>
  );

  const renderProjectName = (name: string): React.ReactNode => (
    <h1
      className="text-2xl sm:text-3xl font-bold z-10 pl-2 leading-tight"
      style={{ transform: "translateZ(3rem)" }}
    >
      {name}
    </h1>
  );

  const renderTechnologies = (techStack: string[]): React.ReactNode => {
    return (
      <div className="relative mt-4 z-10" style={{ transform: "translateZ(1rem)" }}>
        <button
          className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm font-medium text-white backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200"
          onMouseEnter={() => setShowTechList(true)}
          onMouseLeave={() => setShowTechList(false)}
        >
          Technologies
        </button>
        
        {showTechList && (
          <div 
            className="absolute bottom-full left-0 mb-2 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-3 min-w-max"
            onMouseEnter={() => setShowTechList(true)}
            onMouseLeave={() => setShowTechList(false)}
          >
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black border-t-opacity-90"></div>
          </div>
        )}
      </div>
    );
  };

  const renderLinks = (url: string): React.ReactNode => {
    if (!url || url === "#") return null;
    return (
      <div className="relative mt-4 z-10" style={{ transform: "translateZ(1rem)" }}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="link cursor-none px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm font-medium text-white backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200 border border-white/10 flex items-center gap-2"
        >
          <span>Live preview</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    );
  };

  const renderTopBottomGradient = (gradient: string): React.ReactNode => (
    <>
      <div
        className="absolute top-0 left-0 w-full h-20"
        style={{
          background: `linear-gradient(180deg, ${gradient} 0%, rgba(0,0,0,0) 100%)`,
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-32"
        style={{
          background: `linear-gradient(0deg, ${gradient} 10%, rgba(0,0,0,0) 100%)`,
        }}
      ></div>
    </>
  );

  const renderProjectImage = (
    image: string,
    blurImage: string,
    name: string
  ): React.ReactNode => (
    <Image
      placeholder="blur"
      blurDataURL={blurImage}
      src={image}
      alt={name}
      layout="fill"
      className={`${styles.ProjectImg} z-0`}
    />
  );

  return (
    <div
      className="overflow-hidden rounded-3xl snap-start h-full"
      style={{
        maxWidth: animationEnabled
          ? "calc(100vw - 2rem)"
          : "calc(100vw - 4rem)",
        flex: "1 0 auto",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <div
        ref={projectCard}
        className={`
          ${styles.ProjectTile}
           h-full rounded-3xl relative p-6 flex-col flex justify-between max-w-full
           transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
        `}
        style={{
          background: `linear-gradient(90deg, ${stop1} 0%, ${stop2} 100%)`,
        }}
      >
        <Image
          src="/project-bg.svg"
          alt="Project"
          layout="fill"
          className="absolute w-full h-full top-0 left-0 opacity-20"
        />
        {renderTopBottomGradient(stop1)}
        <div className="flex flex-col mb-4">
          {renderProjectName(name)}
          {renderCategoryLabel(category)}
        </div>
        {renderDescription(description)}
        <div className="flex items-center justify-between w-full">
          {renderTechnologies(tech)}
          {renderLinks(url)}
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;