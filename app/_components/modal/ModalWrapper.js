'use client'

import { useModal } from "@/app/_context/ModalContext";
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

function ModalWrapper({ children }) {
  const { closeModal } = useModal();
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      const clickedInsideModal = ref.current && ref.current.contains(e.target);
      const clickedDropdown = e.target.closest(".dropdown-menu");

      if (!clickedInsideModal && !clickedDropdown) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeModal]);




  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
      {/* container for the modal */}
      <div className="bg-primary-white dark:bg-dark-grey  w-[480px]   
      md:p-8 p-6 min-h-fit rounded-md shadow-lg  max-md:w-[70%]" ref={ref}>

        {children}

      </div>
    </div>,
    document.body
  )
}

export default ModalWrapper
