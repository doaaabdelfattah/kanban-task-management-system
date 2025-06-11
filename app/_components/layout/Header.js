
import Image from "next/image";

import plusIcon from '@/public/assets/icon-add-task-mobile.svg'
import threeDots from '@/public/assets/icon-vertical-ellipsis.svg'
import { useBoard } from "@/app/_context/BoradContext";

function Header() {
  const { selectedBoardName } = useBoard();
  return (
    <header className="bg-primary-white border-b-light-lines border-b-1 p-6 flex justify-between w-full items-center">
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
  )
}

export default Header
