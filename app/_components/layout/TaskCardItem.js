

function TaskCardItem({ task }) {
  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
  const allSubTasks = task.subtasks.length;
  return (
    <div key={task.title} className="bg-white dark:bg-dark-grey group min-h-[5.5rem] px-4 py-6 mb-2 rounded-lg cursor-pointer [box-shadow:0px_4px_6px_0px_rgba(54,78,126,0.1)]">
      <h4 className="heading-md dark:text-primary-white group-hover:text-main-purple">{task.title}</h4>
      <p className="body-md text-medium-grey mt-2">
        {completedSubtasks} of {allSubTasks} subtasks
      </p>
    </div>
  )
}

export default TaskCardItem
