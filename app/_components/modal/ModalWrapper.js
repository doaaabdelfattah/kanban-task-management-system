import { createPortal } from "react-dom"

function ModalWrapper({ children }) {

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
      <div className="bg-primary-white dark:bg-dark-grey  p-8 w-[480px] min-h-[50vh] rounded-md shadow-lg">
        {children}

      </div>
    </div>,
    document.body
  )
}

export default ModalWrapper
