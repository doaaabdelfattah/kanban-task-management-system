import { createPortal } from "react-dom"

function ModalWrapper({ children }) {

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black/10 z-[1000]">
      <div className="fixed top-[50%] left-[50%] translate-[-50%, -50%] bg-primary-white p-5">

        {children}

      </div>
    </div>,
    document.body
  )
}

export default ModalWrapper
