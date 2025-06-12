'use client'

import { useEffect, useState } from "react";
import SideBar from "./_components/layout/SideBar";
import Header from "./_components/layout/Header";
import Logo from "./_components/layout/Logo";
import BoardContent from "./_components/layout/BoardContent";
import useDarkMode from "./_hooks/useDarkMode";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSideMobile, setIsSideMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div className={`bg-light-grey dark:bg-dark-grey grid
      grid-rows-[6rem_1fr] h-screen`}>

      {/* ======== Row 1========== */}
      <div className="fixed top-0 left-0 right-0 grid lg:grid-cols-[18.75rem_1fr] md:grid-cols-[16.25rem_1fr] ">
        <div className={`border-r-light-lines dark:border-r-dark-lines  border-r-1 max-md:hidden  flex justify-center bg-primary-white dark:bg-dark-grey  ${isSidebarOpen ? '' : 'border-b-light-lines dark:border-b-dark-lines border-b-1 '}`}>
          <Logo />

        </div>
        <Header isOpen={isSideMobile} toggleOpen={setIsSideMobile} />
      </div>

      {/* =========== row 2 ============= */}

      <div className={`md:pt-[6rem] pt-[5rem] grid h-screen
    ${isSidebarOpen ? 'lg:grid-cols-[18.75rem_1fr] md:grid-cols-[16.25rem_1fr]' : 'grid-cols-[0_1fr]'}`}>

        <aside className={`md:block max-md:w-[70vw] max-md:mx-auto max-md:mt-2 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2
           ${isSideMobile ? 'block' : 'hidden'}`}>
          <SideBar setIsSideMobile={setIsSideMobile} isOpen={isSidebarOpen} toggleOpen={setIsSidebarOpen} />
        </aside>


        <main className="p-6 overflow-auto dark:bg-very-dark-grey">
          <BoardContent />
        </main>

      </div>
    </div>

  )
}
// 