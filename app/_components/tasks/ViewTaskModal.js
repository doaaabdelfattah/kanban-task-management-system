'use client'
import { useBoard } from "@/app/_context/BoradContext";
import ActionsMenuTrigger from "../reusable/ActionsMenuTrigger"
import CheckBoxItem from "../reusable/CheckBoxItem";
import DropDownMenu from "../reusable/DropDownMenu";
import Button from "../reusable/Button";
import { useModal } from "@/app/_context/ModalContext";
import { useState } from "react";
function ViewTaskModal({ task }) {

  const { data, selectedBoardName, updateTaskStatus } = useBoard();
  const selectedBoard = data.boards.find((b) => b.name === selectedBoardName)
  const columnNames = selectedBoard?.columns.map((col) => col.name) || [];

  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
  const allSubTasks = task.subtasks.length;


  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);

  const handleToggleSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSubtasks(updatedSubtasks);
  };
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    updateTaskStatus(task.id, newStatus); // <-- Global update
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center justify-between ">
        <h1 className="heading-lg dark:text-primary-white text-primary-black flex-1"> {task.title}</h1>
        <div className="flex items-center justify-between relative">
          <ActionsMenuTrigger itemType='task' onDeleteData={task} />
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
            <CheckBoxItem key={index} task={item.title} status={item.isCompleted} onToggle={() => handleToggleSubtask(index)} />
          ))
        }
      </div>
      <div className="w-full">
        <p className="text-xs font-bold text-medium-grey mb-4">Current Status</p>
        <DropDownMenu options={columnNames} onChange={handleStatusChange} value={status} />
      </div>

    </div>
  )
}

export default ViewTaskModal

