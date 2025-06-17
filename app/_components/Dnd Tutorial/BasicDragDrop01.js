'use client'
import { DndContext, useDraggable, useDroppable, pointerWithin } from "@dnd-kit/core"
import { useState } from "react"


function Draggable({ }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: 'dragable' })
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-24 w-24 cursor-grab touch-none active:cursor-grabbing rounded-md bg-blue-500 p-4 text-white"
      {...listeners} {...attributes}>
      Drag me
    </div>)
}

function Droppable({ children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'dropable'
  })
  return (
    <div ref={setNodeRef} className={`flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed  ${isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}>
      {children || (<span className="text-gray-500 dark:text-gray-400">Drop here</span>)}
    </div>)
}



export default function BasicDragDrop() {
  const [isDropped, setIsDropped] = useState(false);
  function handleDragEnd(event) {
    if (event.over && event.over.id === 'dropable') {
      setIsDropped(true)
    }
    else {
      setIsDropped(false)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {!isDropped && <Draggable />}

        <Droppable >{isDropped && <Draggable />}</Droppable>

      </div>
    </DndContext>
  )
}