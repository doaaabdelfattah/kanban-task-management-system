'use client'
import { useBoard } from "./_context/BoradContext";
import SideBar from "./_components/layout/SideBar";
import Header from "./_components/layout/Header";
import { useState } from "react";
import Logo from "./_components/layout/Logo";


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find(b => b.name === selectedBoardName);

  return (
    <div className={`bg-light-grey grid
      grid-rows-[6rem_1fr] h-screen`}>

      {/* ======== Row 1========== */}
      <div className="grid grid-cols-[18.75rem_1fr]">
        <div className={`border-r-light-lines border-r-1 flex justify-center bg-primary-white  ${isSidebarOpen ? '' : 'border-b-light-lines border-b-1 '}`}>
          <Logo />
        </div>
        <Header />
      </div>

      <div className={`grid h-full transition-all duration-700
    ${isSidebarOpen ? 'grid-cols-[18.75rem_1fr]' : 'grid-cols-[0_1fr]'}`}>
        <aside className=" ">
          <SideBar isOpen={isSidebarOpen} toggleOpen={setIsSidebarOpen} />
        </aside>

        <main className="">
          <div className="flex space-x-4">
            {selectedBoard.columns.map(column => (
              <div key={column.name} className="bg-gray-100 p-4 rounded-md w-64">
                <h3 className="font-semibold mb-2">{column.name}</h3>
                {column.tasks.map(task => (
                  <div key={task.title} className="bg-white p-2 mb-2 rounded shadow-sm">
                    {task.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>

  )
}
// 