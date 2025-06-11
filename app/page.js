'use client'
import Image from "next/image";
import SideBar from "./_components/layout/SideBar";
import plusIcon from '@/public/assets/icon-add-task-mobile.svg'
import threeDots from '@/public/assets/icon-vertical-ellipsis.svg'
import { useBoard } from "./_context/BoradContext";

export default function Home() {
  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find(b => b.name === selectedBoardName);

  return (
    <>
      <aside className=" ">
        <SideBar />
      </aside>

      <div className="content">
        <header className="h-[6rem] bg-primary-white border-b-light-lines border-b-1 p-6 flex justify-between w-full items-center">
          <h1 className="heading-xl">
            {selectedBoardName}
          </h1>
          <div className="flex items-center justify-center gap-6">
            <button className="cursor-pointer py-3.5 heading-md px-6 text-white rounded-3xl bg-main-purple hover:bg-main-purple/25 flex  items-center justify-center gap-1">
              <Image src={plusIcon} height='10' width='10' />
              Add New Task
            </button>
            <button className="cursor-pointer">
              <Image src={threeDots} height='12' width='4' />

            </button>
          </div>
        </header >
        <section>
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
        </section>
      </div >
    </>
  )
}
// 