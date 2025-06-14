import ModalWrapper from "./ModalWrapper"

function AddBoardForm({ onClose }) {
  return (
    <div className="bg-white dark:bg-dark-grey p-6 rounded-lg w-[90%] max-w-md">
      <h2 className="heading-lg mb-4">Add New Board</h2>
      {/* Your form fields here */}
      <button onClick={onClose} className="mt-4 text-red-500">Close</button>
    </div>
  )
}

export default AddBoardForm
