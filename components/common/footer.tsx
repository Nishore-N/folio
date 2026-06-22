// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { EMAIL, MENULINKS, SOCIAL_LINKS } from "../../constants";
import Image from "next/image";
import Button, { ButtonTypes } from "./button";
import { useState } from "react";

const Footer = () => {
  const images = ["/Portfolio1.jpeg", "/Portfolio2.jpeg"];
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleBadgeClick = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const renderSocialIcons = (): React.ReactNode => {
    return Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className="link hover:opacity-80 duration-300 md:px-2 px-1"
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));
  };

  const renderFooterContent = (): React.ReactNode => (
    <>
      {/* Modern Profile Badge with Click/Hover-to-Slide */}
      <div 
        onClick={handleBadgeClick}
        onMouseEnter={() => setCurrentIdx(1)}
        onMouseLeave={() => setCurrentIdx(0)}
        className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#6dd5ed] to-[#2193b0] shadow-[0_0_20px_rgba(109,213,237,0.3)] hover:shadow-[0_0_30px_rgba(109,213,237,0.6)] transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer"
        title="Hover or Click to view more"
      >
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-900 relative bg-gray-800">
          <div 
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`NISHORE N Profile ${idx + 1}`}
                className="w-full h-full object-cover object-center scale-105 flex-shrink-0"
              />
            ))}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-2 -right-1 w-5 h-5 bg-[#6dd5ed] rounded-full border-4 border-gray-900 animate-bounce"></div>
        <div className="absolute -bottom-1 left-4 w-4 h-4 bg-[#2193b0] rounded-full border-2 border-gray-900 animate-pulse"></div>
      </div>

      <h1 className="font-medium text-3xl md:text-4xl text-center">
        Connect with me on social media.
      </h1>
      <div className="flex mt-8">{renderSocialIcons()}</div>
      <div className="flex mt-8">
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
          type={ButtonTypes.WHITE}
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
      <h2 className="text-center text-sm sm:text-base mt-8">
        Designed and Developed with ❤️ by NISHORE N
      </h2>
    </>
  );

  const { ref: footerRef } = MENULINKS[4];

  return (
    <footer
      className="w-full relative select-none bg-cover flex flex-col items-stretch"
      id={footerRef}
    >
      <Image
        src="/footer-curve.svg"
        alt="Footer"
        className="w-full"
        loading="lazy"
        height={290}
        role="presentation"
        width={1440}
      />
      <div className="h-full w-full">
        <div className="section-container flex-col flex h-full justify-end z-10 items-center py-12">
          {renderFooterContent()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
