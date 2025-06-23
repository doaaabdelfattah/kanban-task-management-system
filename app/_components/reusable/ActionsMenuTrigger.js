'use client';
import { useState } from "react";
import Image from "next/image";
import threeDots from '@/public/assets/icon-vertical-ellipsis.svg';
import ActionsMenu from "../layout/ActionsMenu";


function ActionsMenuTrigger({ itemType, onDeleteData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <button
        className="cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image src={threeDots} height={12} width={4} alt="actions menu" />
      </button>

      {isOpen && <ActionsMenu itemType={itemType} onClose={setIsOpen} onDeleteData={onDeleteData} />}
    </>

  );
}

export default ActionsMenuTrigger;
