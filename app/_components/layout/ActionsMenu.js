import { useModal } from "@/app/_context/ModalContext"





function ActionsMenu({ itemType, onClose, onDeleteData }) {
  const { openModal } = useModal();

  const handleEdit = () => {
    if (itemType === 'task') {
      openModal('add-task', { taskToEdit: onDeleteData })
    }
    if (itemType === 'board') {
      openModal('add-board', { boardToEdited: onDeleteData })

    }
    onClose(prev => !prev)
  }
  const handleDelete = () => {
    openModal('delete-modal', { entity: itemType, data: onDeleteData })

    onClose(prev => !prev)
  }
  return (
    <div className="w-[192px] h-[94px] p-4 flex flex-col items-start gap-4 [box-shadow:0px_4px_6px_0px_rgba(54,78,126,0.1)] dark:bg-very-dark-grey bg-primary-white rounded-lg z-50 absolute  top-[50px] md:top-[60px]  right-0">
      <button className="body-lg text-medium-grey hover:opacity-70 cursor-pointer  w-full text-left" onClick={handleEdit}>
        Edit {itemType}
      </button>
      <button className="body-lg w-full text-left text-main-red cursor-pointer hover:opacity-70" onClick={handleDelete}>
        Delete {itemType}
      </button>
    </div>
  )
}

export default ActionsMenu
