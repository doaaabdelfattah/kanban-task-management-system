'use client';
import { useState } from "react";
import Image from "next/image";
import threeDots from '@/public/assets/icon-vertical-ellipsis.svg';
import ActionsMenu from "../layout/ActionsMenu";


function ActionsMenuTrigger({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <button
        className="cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image src={threeDots} height={12} width={4} alt="actions menu" />
      </button>

      {isOpen && <ActionsMenu text={text} onClose={setIsOpen} />}
    </>

  );
}

export default ActionsMenuTrigger;
