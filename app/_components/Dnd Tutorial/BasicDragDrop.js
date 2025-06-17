'use client'
import { useState } from 'react'

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, DragStartEvent, UniqueIdentifier, closestCorners, useDroppable } from '@dnd-kit/core'
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";



function SortableItems({ id, content }) {
  const { setNodeRef, attributes, listeners, transform, isDragging, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`rounded-md border p-3 bg-blue-900 dark:border-gray-700 dark:bg-gray-800 ${isDragging ? 'z-10 opacity-50  shadow-md' : 'bg-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">
          ⋮
        </span>
        <span className="dark:text-gray-200">{content}</span>
      </div>
    </li>);

}

function DroppableContainer({ id, title, items }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="flex h-full min-h-40 flex-col rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
    >
      <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <div className="flex-1">
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>

          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <SortableItems key={item.id} id={item.id} content={item.content} />
            ))}
          </ul>
        </SortableContext>

        {items.length === 0 && (
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drop items here
            </p>
          </div>
        )}
      </div>
    </div>)
}




export default function MultipleContainers() {
  const [containers, setContainers] = useState([
    {
      id: 'todo',
      title: 'To Do',
      items: [
        { id: 'task-1', content: 'Research @dnd-kit' },
        { id: 'task-2', content: 'Create basic example' },
        { id: 'task-3', content: 'Write tutorial' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      items: [{ id: 'task-4', content: 'Record demo video' }],
    },
    {
      id: 'done',
      title: 'Done',
      items: [{ id: 'task-5', content: 'Setup project' }],
    },
  ])
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0
      }
    }), useSensor(KeyboardSensor)
  )

  function findContainerId(itemId) {
    if (containers.some((container) => container.id === itemId)) {
      return itemId;
    }
    const container = containers.find((container) =>
      container.items.some((item) => item.id === itemId)
    );
    return container?.id;
  }


  function handleDragEnd(event) {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }
    const activeContainerId = findContainerId(active.id);
    const overContainerId = findContainerId(over.id);
    if (!activeContainerId || !overContainerId) {
      setActiveId(null)
      return
    }
    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex((c) => c.id === activeContainerId)
      if (containerIndex === -1) {
        setActiveId(null)
        return
      }
      const container = containers[containerIndex]
      const activeIndex = container.items.findIndex((item) => item.id === active.id)
      const overIndex = container.items.findIndex((item) => item.id === over.id)
      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.items, activeIndex, overIndex)
        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...verticalListSortingStrategy, items: newItems }
            }
            return c
          })
        })
      }
    }


  }
  function handleDragStart(event) { }



  function handleDragOver(event) {
    const { active, over } = event
    if (!over) return
    const activeId = active.id;
    const overId = over.id
    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);

    // safety check - prevents the app from crashing or misbehaving
    // ⛔ If we can't detect either container, exit
    if (!activeContainerId || !overContainerId) return
    // draging within the same container
    // if (activeContainerId === overContainerId && activeId !== overId) return
    // ⛔ If dragging over the same item in same container, do nothing
    if (activeContainerId === overContainerId) return

    setContainers((prev) => {

      // 1. find source container - Find the container from which the dragged item started
      const activeContainer = prev.find((c) => c.id === activeContainerId)
      if (!activeContainer) return prev // if not found, no changes


      // 2. Find the dragged item inside the active (source) container
      const activeItem = activeContainer.items.find((item) => item.id === activeId)
      if (!activeItem) return prev // if not found, exit



      // 3. Map through all containers to return a new updated state
      const newContainers = prev.map((container) => {

        // [a] If this is the source container, remove the item
        if (container.id === activeContainerId) {
          return {
            ...container,
            items: container.items.filter((item) => item.id !== activeId)
          }
        }

        //[b] If this is the destination container
        if (container.id === overContainerId) {
          // [b]-1 If it's dropped on the container itself (not on a specific item) e.g empty area
          if (overId === overContainerId) {
            return { ...container, items: [...container.items, activeItem] } // just append to the end
          }
          // Try to find the index of the item it was dropped on
          const overItemIndex = container.items.findIndex((item) => item.id === overId)
          // [b]-2 If the index is valid, insert after the item it was dropped on
          if (overItemIndex !== -1) {
            return {
              ...container,
              items: [
                ...container.items.slice(0, overItemIndex + 1),
                activeItem,
                ...container.items.slice(overItemIndex + 1),
              ]
            }
          }
        }


        // [c] For all other containers, return as-is
        return container

      });
      // 4. Return the updated containers state
      return newContainers;
    })




    // ============= end function

  }

  return (



    <div className="mx-auto w-full">
      <h2 className="mb-4 text-xl font-bold dark:text-white">Kanban Board</h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors} collisionDetection={closestCorners}>
        <div className="grid gap-4 md:grid-cols-3">
          {containers.map((container) => (
            <DroppableContainer key={container.id} id={container.id} title={container.title} items={container.items} />
          ))}
        </div>
      </DndContext >
    </div >

  )
}