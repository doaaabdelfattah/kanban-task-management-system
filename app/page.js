'use client'

import { useState } from "react";
import SideBar from "./_components/layout/SideBar";
import Header from "./_components/layout/Header";
import Logo from "./_components/layout/Logo";
import BoardContent from "./_components/layout/BoardContent";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className={`bg-light-grey grid
      grid-rows-[6rem_1fr] min-h-screen`}>

      {/* ======== Row 1========== */}
      <div className="grid grid-cols-[18.75rem_1fr]">
        <div className={`border-r-light-lines border-r-1 flex justify-center bg-primary-white  ${isSidebarOpen ? '' : 'border-b-light-lines border-b-1 '}`}>
          <Logo />
        </div>
        <Header />
      </div>

      {/* =========== row 2 ============= */}

      <div className={`grid h-full transition-all duration-700
    ${isSidebarOpen ? 'grid-cols-[18.75rem_1fr]' : 'grid-cols-[0_1fr]'}`}>
        <aside className=" ">
          <SideBar isOpen={isSidebarOpen} toggleOpen={setIsSidebarOpen} />
        </aside>

        <main className="p-6 overflow-scroll">
          <BoardContent />
        </main>

      </div>
    </div>

  )
}
// 