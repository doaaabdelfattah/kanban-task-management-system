function ViewTaskModal({ task, onClose }) {


  return (
    <div>
      <h1>This is  task {task.title}</h1>
      <p>status: {task.status}</p>


      <button onClick={onClose} className="mt-4 text-red-500">Close</button>
    </div>
  )
}

export default ViewTaskModal
