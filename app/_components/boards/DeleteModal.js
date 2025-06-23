'use client'
import { useModal } from "@/app/_context/ModalContext"
import Button from "../reusable/Button"
import { useBoard } from "@/app/_context/BoradContext";

function DeleteModal({ entity, data }) {

  const { closeModal } = useModal();
  const { selectedBoardName, deleteBoard, deleteTask } = useBoard();

  const handleDelete = () => {
    if (entity === 'board') {
      deleteBoard(selectedBoardName)
      closeModal();
    }
    if (entity === 'task') {
      deleteTask(data)
      closeModal();
    }

  }

  return (
    <div className="space-y-4">
      <h1 className="heading-lg text-main-red">
        Delete this {entity}?
      </h1>
      <p className="body-lg text-medium-grey">
        {`Are you sure you want to delete the ${entity === 'board' ? selectedBoardName : data?.title} board? This action will remove all columns and tasks and cannot be reversed`}
      </p>
      <div className="md:flex gap-2 items-center">

        <Button size='small' color='destructive' handleOnClick={handleDelete} >Delete</Button>
        <Button size='small' color='secondary' handleOnClick={closeModal} >Cancel</Button>
      </div>
    </div>
  )
}

export default DeleteModal
