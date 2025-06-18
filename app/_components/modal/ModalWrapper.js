'use client'

import { useModal } from "@/app/_context/ModalContext";
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

function ModalWrapper({ children }) {
  const { closeModal } = useModal();
  const ref = useRef();
  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target))
        closeModal();
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick, true)
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
