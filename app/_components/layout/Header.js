'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBoard } from "@/app/_context/BoradContext";
import plusIcon from '@/public/assets/icon-add-task-mobile.svg'
import threeDots from '@/public/assets/icon-vertical-ellipsis.svg'
import logoMobile from '@/public/assets/logo-mobile.svg'
import chevDown from '@/public/assets/icon-chevron-down.svg'
import chevUp from '@/public/assets/icon-chevron-up.svg'
import ActionsMenu from "./ActionsMenu";
import ActionsMenuTrigger from "../reusable/ActionsMenuTrigger";

function Header({ isOpen, toggleOpen }) {
  const [isOpenwindow, setIsOpenWindow] = useState(false);
  const { selectedBoardName } = useBoard();
  return (
    <header className="bg-primary-white dark:bg-dark-grey  border-b-light-lines dark:border-none  border-b-1 md:p-6 p-5 flex justify-between w-full items-center">
      <div className="flex gap-4 items-center justify-between">
        <Link href="/" className="flex items-center md:hidden">
          <Image src={logoMobile} height='25' width='24' quality={100} alt="kanban managemnent system " />
        </Link>

        <h1 className="md:heading-xl dark:text-primary-white heading-lg cursor-pointer min-w-fit" onClick={() => {
          if (window.innerWidth < 768) toggleOpen(prev => !prev);
        }}>
          {selectedBoardName}
        </h1>

        <Image className="md:hidden cursor-pointer" src={isOpen ? chevUp : chevDown} height='4' width='10' quality={100} alt="kanban managemnent system " onClick={() => toggleOpen(prev => !prev)} />

      </div>
      <div className="flex items-center justify-center gap-6 relative">
        <button className="cursor-pointer py-3.5 heading-md px-6 text-white rounded-3xl bg-main-purple hover:bg-main-purple/25 flex  items-center justify-center gap-1">
          <Image src={plusIcon} className="max-md:w-3" height='10' width='10' alt='add task' />
          <span className="max-md:hidden">Add New Task</span>
        </button>

        <ActionsMenuTrigger />
      </div>
    </header >
  )
}

export default Header
