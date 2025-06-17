'use client'
import { useState } from 'react'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'


function SortableItem({ id, content }) {
  const { setNodeRef, attributes, listeners, transform, isDragging, transition } = useSortable({ id })
  const style = {
    transform:
      transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    transition
  }

  return (
    <li
      ref={setNodeRef}
      key={id}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-md border p-3 bg-blue-900 dark:border-gray-700 dark:bg-gray-800 ${isDragging ? 'z-10 opacity-50  shadow-md' : 'bg-white'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">⋮⋮</span>
        <span className="dark:text-gray-200">{content}</span>
      </div>
    </li>)
}





export default function SortableList() {
  const [activeId, setActiveId] = useState(null); //track which item is beign dragged

  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
  ])



  function handleDragStart(event) {

    setActiveId(event.active.id)

  }


  function handleDragEnd(event) {
    setActiveId(null) // reset activeId when drag ends

    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }


  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0
      }
    }), useSensor(KeyboardSensor)
  )
  return (


    <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold dark:text-white">Sortable List</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>


          <ul className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.id} />
            ))}
          </ul>
        </SortableContext>
        <DragOverlay dropAnimation={{
          duration: 500,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }} adjustScale={true} >
          {
            activeId ? (
              <div className=" cursor-grabbing bg-red-300 p-3 shadow-md ">
                <div className='flex items-center gap-3'>

                  <span className="text-gray-500 dark:text-gray-400">⋮⋮</span>
                  <span className="dark:text-gray-200">{items.find((item) => item.id === activeId)?.content}</span>
                </div>
              </div>) : null
          }
        </DragOverlay>
      </DndContext>
    </div >

  )
}