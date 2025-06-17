import { useModal } from "@/app/_context/ModalContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

function DnDTaskCard({ task, id, isOverlay = false, }) {
  const { openModal } = useModal();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isOverlay ? false : isDragging;
  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
  const allSubTasks = task.subtasks.length;

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => openModal('view-task', { task })}
      className={`${dragging ? 'z-10 opacity-50 ' : ''} cursor-grab dark:bg-dark-grey group list-none bg-white min-h-[5.5rem] px-4 py-6 mb-2 rounded-lg [box-shadow:0px_4px_6px_0px_rgba(54,78,126,0.1)]`}
    >
      <h4 className="heading-md dark:text-primary-white group-hover:text-main-purple">
        {task.title}
      </h4>
      <p className="body-md text-medium-grey mt-2">
        {completedSubtasks} of {allSubTasks} subtasks
      </p>
    </li>
  );
}

export default DnDTaskCard;
