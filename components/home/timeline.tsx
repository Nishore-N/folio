// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Branch,
  BranchNode,
  CheckpointNode,
  ItemSize,
  MENULINKS,
  NodeTypes,
  TIMELINE,
  TimelineNodeV2,
} from "../../constants";
import Image from "next/image";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IDesktop, isSmallScreen } from "pages";

const svgColor = "#9CA3AF";
const animColor = "#FCD34D";
const separation = 800;
const strokeWidth = 2;
const leftBranchX = 13;
const curveLength = 150;
const dotSize = 26;

const TimelineSection = ({ isDesktop }: IDesktop) => {
  const [svgWidth, setSvgWidth] = useState(400);
  const [rightBranchX, setRightBranchX] = useState(109);

  const svgCheckpointItems = TIMELINE.filter(
    (item) => item.type === NodeTypes.CHECKPOINT && item.shouldDrawLine
  );

  // Calculate length to perfectly bound all dots. This calculates to 5600px.
  // The final dot is mathematically at 5213px, leaving a safe 387px internal padding.
  const svgLength = svgCheckpointItems?.length * separation;

  const timelineSvg: MutableRefObject<SVGSVGElement> = useRef(null);
  const svgContainer: MutableRefObject<HTMLDivElement> = useRef(null);
  const screenContainer: MutableRefObject<HTMLDivElement> = useRef(null);

  const addNodeRefsToItems = (
    timeline: Array<TimelineNodeV2>
  ): Array<LinkedTimelineNode> => {
    return timeline.map((node, idx) => ({
      ...node,
      next: timeline[idx + 1],
      prev: timeline[idx - 1],
    }));
  };

  const generateTimelineSvg = (timeline: Array<TimelineNodeV2>): string => {
    let index = 1;
    let y = dotSize / 2;
    const timelineStyle = `<style>.str, .dot{stroke-width: ${strokeWidth}px}.anim-branch{stroke-dasharray: 186}</style>`;
    let isDiverged = false;

    const timelineSvg = addNodeRefsToItems(timeline).reduce(
      (svg: string, node: LinkedTimelineNode) => {
        const { type, next } = node;
        let lineY = y;
        let dotY = y + separation / 2;

        switch (type) {
          case NodeTypes.CHECKPOINT:
            {
              const { shouldDrawLine } = node;

              // special handling for last checkpoint
              if (!next) {
                lineY = y - separation / 2;
              }

              // special handling for dot without line
              if (!shouldDrawLine) {
                dotY = y;
              }

              if (shouldDrawLine) {
                svg = `${drawLine(node, lineY, index, isDiverged)}${svg}`;
                y = y + separation;
                index++;
              }

              svg = svg.concat(drawDot(node, dotY, isDiverged));
            }
            break;
          case NodeTypes.DIVERGE:
            {
              isDiverged = true;

              svg = `${drawBranch(node, y, index)}${svg}`;
            }
            break;
          case NodeTypes.CONVERGE:
            {
              isDiverged = false;

              // Drawing CONVERGE branch with previous line and index
              svg = `${drawBranch(node, y - separation, index - 1)}${svg}`;
            }
            break;
        }

        return svg;
      },
      timelineStyle
    );

    return timelineSvg;
  };

  const getDotString = (x: number, y: number) => {
    return `<rect class='dot' width=${dotSize} height=${dotSize} fill='#111827' x=${
      x - dotSize / 2
    } y=${
      y - dotSize / 2
    } ></rect><circle cx=${x} cy=${y} r='7' stroke=${svgColor} class='dot' ></circle>`;
  };

  const drawDot = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    isDiverged: boolean
  ) => {
    const { next, alignment } = timelineNode as LinkedCheckpointNode;

    // Diverging
    if (next && next.type === NodeTypes.DIVERGE) {
      y = y - curveLength + 6 * dotSize;
    }

    // Converging
    if (next && next.type === NodeTypes.CONVERGE) {
      y = y + curveLength - 6 * dotSize;
    }

    const dotString = getDotString(
      alignment === Branch.LEFT ? leftBranchX : rightBranchX,
      y
    );

    const textString = addText(timelineNode, y, isDiverged);

    return `${textString}${dotString}`;
  };

  const addText = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    isDiverged: boolean
  ) => {
    if (timelineNode.size === ItemSize.LARGE) {
      const offset = isDesktop ? 30 : 12;
      const x = timelineNode.alignment === Branch.LEFT ? leftBranchX + offset : rightBranchX + offset;
      const fontSize = isDesktop ? "2.5rem" : "1.5rem";
      return `<text x='${x}' y='${y + 12}' fill='white' font-size='${fontSize}' font-weight='bold' class='year-text'>${timelineNode.title}</text>`;
    }
    return "";
  };

  const drawLine = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    i: number,
    isDiverged: boolean
  ) => {
    const { alignment, prev, next } = timelineNode as LinkedCheckpointNode;

    const isPrevDiverge = prev && prev.type === NodeTypes.DIVERGE;
    const isNextConverge = next && next.type === NodeTypes.CONVERGE;

    const lineY = Math.abs(y + separation);

    // Smaller line for Diverging
    if (isPrevDiverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    // Smaller line for Converging
    if (isNextConverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    const lineX = alignment === Branch.LEFT ? leftBranchX : rightBranchX;

    let str = `<line class='str' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${animColor} />`;

    // If already diverged, draw parallel line to the existing line
    if (isDiverged) {
      const divergedLineX =
        alignment === Branch.LEFT ? rightBranchX : leftBranchX;
      str = str.concat(
        `<line class='str' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${animColor} />`
      );
    }
    return str;
  };

  const drawBranch = (timelineNode: LinkedBranchNode, y: number, i: number) => {
    const { type } = timelineNode;

    switch (type) {
      case NodeTypes.DIVERGE:
        return `<path class='str' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${
          y + separation
        } stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${y + separation} stroke=${animColor} />`;
      case NodeTypes.CONVERGE:
        return `<path class='str' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${animColor} />`;
      default:
        return "";
    }
  };

  const addLineSvgAnimation = (
    timeline: GSAPTimeline,
    duration: number,
    index: number,
    stepStartTime: number
  ): GSAPTimeline => {
    timeline.from(
      svgContainer.current.querySelectorAll(`.line-${index + 1}`),
      { scaleY: 0, duration },
      `start+=${stepStartTime}`
    );

    return timeline;
  };

  const addDivergingBranchLineAnimation = (
    timeline: GSAPTimeline,
    duration: number,
    index: number,
    stepStartTime: number
  ): GSAPTimeline => {
    timeline
      .from(
        svgContainer.current.querySelector(`.line-${index + 1}`),
        { scaleY: 0, duration },
        `start+=${stepStartTime}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-${index + 1}`),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${stepStartTime}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-line-${index + 1}`),
        { scaleY: 0, duration: duration - 1 },
        `start+=${stepStartTime + duration - 2}`
      );

    return timeline;
  };

  const addConvergingBranchLineAnimation = (
    timeline: GSAPTimeline,
    duration: number,
    index: number,
    stepStartTime: number
  ): GSAPTimeline => {
    timeline
      .from(
        svgContainer.current.querySelector(`.line-${index + 1}`),
        { scaleY: 0, duration },
        `start+=${stepStartTime}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-line-${index + 1}`),
        { scaleY: 0, duration: duration - 1 },
        `start+=${stepStartTime}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-${index + 1}`),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${stepStartTime + duration - 1}`
      );

    return timeline;
  };

  const animateTimeline = (timeline: GSAPTimeline): void => {
    let index = 0;
    const lineDuration = 2; // Time spent drawing the line
    const delayBeforeCard = 1.5; // Wait before transitioning card
    const cardDuration = 12; // Time spent animating the cards
    const stepDuration = lineDuration + delayBeforeCard + cardDuration;

    addNodeRefsToItems(TIMELINE).forEach((item) => {
      const { type } = item;

      if (type === NodeTypes.CHECKPOINT && item.shouldDrawLine) {
        const { next, prev } = item;
        const stepStartTime = index * stepDuration;

        // Draw the line to the next card (or to the final dot)
        if (prev?.type === NodeTypes.DIVERGE) {
          addDivergingBranchLineAnimation(timeline, lineDuration, index, stepStartTime);
        } else if (next?.type === NodeTypes.CONVERGE) {
          addConvergingBranchLineAnimation(timeline, lineDuration, index, stepStartTime);
        } else {
          addLineSvgAnimation(timeline, lineDuration, index, stepStartTime);
        }

        const cardStartTime = stepStartTime + lineDuration + delayBeforeCard;
        const isLastCard = index === svgCheckpointItems.length - 1;

        if (!isLastCard) {
          // Current card exits to the right
          timeline.to(
            screenContainer.current.querySelector(`.slide-${index + 1}`),
            { opacity: 0, x: "120%", scale: 0.1, duration: cardDuration, ease: "power2.inOut" },
            `start+=${cardStartTime}`
          );

          // Next card enters from the left smoothly AT THE SAME TIME
          timeline.fromTo(
            screenContainer.current.querySelector(`.slide-${index + 2}`),
            { opacity: 0, x: "-120%", scale: 0.1 },
            { opacity: 1, x: "0%", scale: 1, duration: cardDuration, ease: "power3.out", immediateRender: false },
            `start+=${cardStartTime}`
          );
        }

        index++;
      }
    });
  };

  const setTimelineSvg = (
    svgContainer: MutableRefObject<HTMLDivElement>,
    timelineSvg: MutableRefObject<SVGSVGElement>
  ) => {
    const containerWidth = svgContainer.current.clientWidth;
    setSvgWidth(containerWidth);

    const resultSvgString = generateTimelineSvg(TIMELINE);
    timelineSvg.current.innerHTML = resultSvgString;

    if (isSmallScreen()) {
      setRightBranchX(70);
    }
  };

  const initScrollTrigger = (): {
    timeline: GSAPTimeline;
    scrollTrigger: ScrollTrigger;
  } => {
    const timeline = gsap
      .timeline({ defaults: { ease: Linear.easeNone } })
      .addLabel("start");

    let trigger: HTMLDivElement;
    let start: string;
    let end: string;
    let additionalConfig = {};

    const platformHeight =
      screenContainer.current.getBoundingClientRect().height;

    trigger = screenContainer.current;
    start = "center center";
    // Release the pin when the bottom of the SVG (5600px) hits 387px below the center of the screen.
    // This perfectly aligns the pinned card's center with the final dot at 5213px.
    end = "bottom center+=387";
    additionalConfig = {
      endTrigger: svgContainer.current,
      pin: true,
      pinSpacing: false,
    };

    const scrollTrigger = ScrollTrigger.create({
      ...additionalConfig,
      trigger,
      start,
      end,
      scrub: 2.5, // Highly smoothed scrubbing for slower transitions
      animation: timeline,
    });
    return { timeline, scrollTrigger };
  };

  useEffect(() => {
    // Generate and set the timeline svg
    setTimelineSvg(svgContainer, timelineSvg);

    const { timeline, scrollTrigger } = initScrollTrigger();

    // Animation for Timeline SVG
    animateTimeline(timeline);

    // Force GSAP to recalculate ScrollTrigger markers after pinning
    setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      timeline.kill();
      if (scrollTrigger) scrollTrigger.kill();
      if (screenContainer.current) {
        gsap.set(screenContainer.current, { clearProps: "all" });
        gsap.set(screenContainer.current.querySelectorAll("[class^='slide-']"), { clearProps: "all" });
      }
      if (svgContainer.current) {
        gsap.set(svgContainer.current, { clearProps: "all" });
      }
    };
  }, [
    timelineSvg,
    svgContainer,
    svgWidth,
    rightBranchX,
    screenContainer,
    svgCheckpointItems.length,
    isDesktop,
    svgLength,
  ]);

  const renderSlides = (): React.ReactNode => (
    <div
      className="w-full h-[350px] md:h-[450px] relative"
      ref={screenContainer}
    >
      {svgCheckpointItems.map((item, index) => {
        const checkpointItem = item as CheckpointNode;
        return (
          <div
            key={`${checkpointItem.title}-${index}`}
            className={`w-full h-full absolute top-0 left-0 flex items-center slide-${index + 1}`}
            style={{ 
              opacity: index === 0 ? 1 : 0,
            }}
          >
            {/* The actual Card container with overflow-hidden */}
            <div className="w-full h-auto py-6 md:py-10 relative shadow-2xl rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 flex flex-col justify-center items-center p-4 md:p-8">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter md:blur-[80px] blur-[40px] opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter md:blur-[80px] blur-[40px] opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Card Content */}
              <div className="relative z-10 w-full max-w-lg bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-4 md:p-8 shadow-2xl transform transition-all hover:scale-[1.02] duration-300 group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-2 md:w-3 h-8 md:h-12 rounded-full bg-gradient-to-b from-blue-400 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                    <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight">{checkpointItem.title}</h3>
                  </div>
                  
                  {checkpointItem.subtitle && (
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed pl-3 md:pl-7">
                      {checkpointItem.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSVG = (): React.ReactNode => (
    <svg
      width={svgWidth}
      height={svgLength}
      viewBox={`0 0 ${svgWidth} ${svgLength}`}
      fill="none"
      ref={timelineSvg}
      style={{ overflow: "visible" }}
    ></svg>
  );

  const renderSectionTitle = (): React.ReactNode => (
    <div className="flex flex-col">
      <p className="section-title-sm seq">MILESTONES</p>
      <h1 className="section-heading seq mt-2">Timeline</h1>
      <h2 className="text-2xl md:max-w-2xl w-full seq mt-2">
        A quick recap of my educational journey and professional milestones
      </h2>
    </div>
  );

  return (
    <section
      className="w-full relative select-none min-h-screen section-container pt-24 pb-8 flex flex-col justify-center"
      id={MENULINKS[3].ref}
    >
      {renderSectionTitle()}
      <div className="grid grid-cols-12 gap-4 mt-20">
        <div className="col-span-3 md:col-span-6 line-svg z-20 relative pointer-events-none" ref={svgContainer}>
          {renderSVG()}
        </div>
        <div className="col-span-9 md:col-span-6 flex">
          {renderSlides()}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

type LinkedTimelineNode = LinkedCheckpointNode | LinkedBranchNode;

type LinkedCheckpointNode = LinkNode & CheckpointNode;

type LinkedBranchNode = LinkNode & BranchNode;

interface LinkNode {
  next?: LinkedTimelineNode;
  prev?: LinkedTimelineNode;
}
