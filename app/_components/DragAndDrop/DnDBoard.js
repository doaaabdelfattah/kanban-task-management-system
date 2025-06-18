import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,

} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import DnDTaskCard from "@/app/_components/DragAndDrop/DnDTaskCard";
import { useBoard } from "@/app/_context/BoradContext";



function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
}

function DnDBoard() {

  const { data, selectedBoardName, setData } = useBoard();
  const selectedBoard = data.boards.find((b) => b.name === selectedBoardName);
  const columns = selectedBoard.columns.map((col) => col.name);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 50, tolerance: 5, } }));

  const [activeTask, setActiveTask] = useState(null); // For overlay
  const [overId, setOverId] = useState(null); // For hover visual



  const handleDragStart = ({ active }) => {
    // Flatten all tasks from all columns and find the one being dragged
    const task = selectedBoard.columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    // Save it to state for the overlay preview
    setActiveTask(task);
  };

  const handleDragOver = ({ over }) => {
    if (over) setOverId(over.id); // Save hovered ID for visual highlighting
  };

  const handleDragEnd = ({ active, over }) => {
    // Reset temporary drag states
    setActiveTask(null);
    setOverId(null);

    if (!over) return;  // If dropped outside any target, do nothing

    const activeId = active.id; // dragged task ID
    const overId = over.id; // target item or column ID

    let fromColumnIndex = -1;
    let toColumnIndex = -1;

    selectedBoard.columns.forEach((col, index) => {
      // Check which column the task came from
      if (col.tasks.some((t) => t.id === activeId)) fromColumnIndex = index;
      // Check which column it was dropped into (by ID match or task ID)
      if (col.name === overId || col.tasks.some((t) => t.id === overId)) {
        toColumnIndex = index;
      }
    });
    // If not dropped on any column, default to the original column
    toColumnIndex = toColumnIndex === -1 ? fromColumnIndex : toColumnIndex;



    const fromColumn = selectedBoard.columns[fromColumnIndex];
    const toColumn = selectedBoard.columns[toColumnIndex];


    // 🧠 CASE 1: Moving within the same column
    if (fromColumn === toColumn) {
      // Get old and new positions
      const oldIndex = fromColumn.tasks.findIndex((t) => t.id === activeId);
      const newIndex = toColumn.tasks.findIndex((t) => t.id === overId);
      // If same position or drop target not found, exit
      if (oldIndex === newIndex || newIndex === -1) return;

      // Reorder tasks using `arrayMove`
      const newTasks = arrayMove(fromColumn.tasks, oldIndex, newIndex);

      // Replace the updated column with reordered tasks
      const updatedColumns = [...selectedBoard.columns];
      updatedColumns[fromColumnIndex] = { ...fromColumn, tasks: newTasks };

      // Update board data in state
      setData({
        ...data,
        boards: data.boards.map((b) =>
          b.name === selectedBoardName ? { ...b, columns: updatedColumns } : b
        ),
      });
    }

    //🧠 CASE 2: Moving to a different column
    else {
      // Get the task being moved
      const movingTask = {
        ...fromColumn.tasks.find((t) => t.id === activeId),
        status: toColumn.name,
      };
      // Remove it from the old column
      const updatedFromTasks = fromColumn.tasks.filter((t) => t.id !== activeId);
      // Add it to the beginning of the new column
      const updatedToTasks = [movingTask, ...toColumn.tasks];

      // Create copy from the original data
      const updatedColumns = [...selectedBoard.columns];

      // [1] replaces the column at fromColumnIndex with a new object (after removing the dragged task)
      updatedColumns[fromColumnIndex] = {
        ...fromColumn,
        tasks: updatedFromTasks,
      };
      // [2] updates the column at toColumnIndex (adds the dragged task to its tasks)
      updatedColumns[toColumnIndex] = {
        ...toColumn,
        tasks: updatedToTasks,
      };

      setData({
        ...data,
        boards: data.boards.map((b) =>
          b.name === selectedBoardName ? { ...b, columns: updatedColumns } : b
        ),
      });
    }
  };

  const handleDragCancel = ({ event }) => {
    setActiveTask(null)
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        <div className="grid auto-cols-[17.5rem] grid-flow-col gap-6">
          {selectedBoard.columns.map((column) => (
            <DroppableColumn key={column.name} id={column.name}>
              <h2 className="font-bold mb-4">
                {column.name} ({column.tasks.length})
              </h2>
              <SortableContext
                items={column.tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="flex flex-col gap-4">
                  {column.tasks.map((task) => (
                    <DnDTaskCard
                      key={task.id}
                      id={task.id}
                      task={task}
                      isOver={task.id === overId}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DroppableColumn>
          ))}
          <div className="bg-light-lines/50 dark:bg-[#2B2C37]/50 group rounded-md mt-10 cursor-pointer h-screen flex items-center justify-center">
            <button className="heading-xl group-hover:text-main-purple text-medium-grey">
              + New Column
            </button>
          </div>
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{
        duration: 500,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeTask && (

          <DnDTaskCard task={activeTask} isOverlay={true} />

        )}
      </DragOverlay>
    </DndContext>
  );
}

export default DnDBoard;
