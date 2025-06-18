import { useBoard } from "@/app/_context/BoradContext";
import ActionsMenuTrigger from "../reusable/ActionsMenuTrigger"
import CheckBoxItem from "../reusable/CheckBoxItem";
import DropDownMenu from "../reusable/DropDownMenu";

function ViewTaskModal({ task, onClose }) {

  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find((b) => b.name === selectedBoardName)
  const columnNames = selectedBoard?.columns.map((col) => col.name) || [];

  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
  const allSubTasks = task.subtasks.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center justify-between ">
        <h1 className="heading-lg dark:text-primary-white text-primary-black flex-1"> {task.title}</h1>
        <div className="flex items-center justify-between relative">
          <ActionsMenuTrigger text='task' data={task} />
        </div>
      </div>
      {
        task.description &&
        <p className="body-lg text-medium-grey"> {task.description}</p>
      }
      <div className="w-full">
        <p className="text-xs font-bold text-medium-grey mb-4">Subtasks ({completedSubtasks} of {allSubTasks})</p>
        {
          task.subtasks.map((item, index) => (
            <CheckBoxItem key={index} task={item.title} status={item.isCompleted} />
          ))
        }
      </div>
      <div className="w-full">
        <p className="text-xs font-bold text-medium-grey mb-4">Current Status</p>
        <DropDownMenu options={columnNames} value={task.status} />
      </div>

      <button onClick={onClose} className="mt-4 text-red-500">Close</button>
    </div>
  )
}

export default ViewTaskModal

