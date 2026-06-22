// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/common/menu";

const Header = () => {
  const [menuVisible, setmenuVisible] = useState(false);

  return (
    <header className="w-full fixed top-0 select-none z-50">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md shadow-sm -z-10"></div>
      <div className="flex justify-between section-container py-6">
        <a href="#home" className="link flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Logo - NISHORE N"
            width={22}
            height={22}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-semibold text-sm tracking-[0.25em] text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300 mt-1">
            FOLIO<span className="text-[#6dd5ed]">.</span>
          </span>
        </a>
        <nav className={`outer-menu ${menuVisible ? "menu-visible" : ""}`}>
          <button
            className="hamburger w-6 h-6 flex items-center justify-center link relative"
            onClick={setmenuVisible.bind(null, !menuVisible)}
          >
            <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center"></div>
          </button>
          <Menu setmenuVisible={setmenuVisible} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
