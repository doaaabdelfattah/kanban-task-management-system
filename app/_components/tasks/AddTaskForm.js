import { useBoard } from '@/app/_context/BoradContext';
import { useState } from 'react';
import DropDownMenu from '../reusable/DropDownMenu';
import Image from 'next/image';
import Button from '../reusable/Button';

export default function AddTaskForm({ onClose, taskToEdit = null }) {
  const { data, selectedBoardName, addTask, editTask } = useBoard();

  const selectedBoard = data.boards.find((b) => b.name === selectedBoardName);

  const statuses = selectedBoard?.columns.map((col) => col.name) || [];


  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [status, setStatus] = useState(taskToEdit?.status || statuses[0] || '');
  const [subtasks, setSubtasks] = useState(taskToEdit ? taskToEdit.subtasks.map((s) => s.title) : ['', '']);
  const placeholderSuggestions = [
    "e.g. Make coffee",
    "e.g. Drink coffee & smile",
    "e.g. Set timer for 15 minutes",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();



    const newTask = {
      id: taskToEdit?.id || crypto.randomUUID(),
      title,
      description,
      status,
      subtasks: subtasks.filter((s) => s.trim() !== '').map((s) => ({
        id: crypto.randomUUID(),
        title: s,
        isCompleted: false,
      })),
    };

    if (taskToEdit) {
      editTask(newTask);
    } else {

      addTask(newTask);
    }

    onClose();

  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  return (
    <div className='bg-white dark:bg-dark-grey rounded-lg '>
      <h2 className="heading-lg mb-4 dark:text-white">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mx-auto dark:text-white">

        <div className="flex flex-col gap-2">
          <label className="font-bold text-medium-grey text-xs dark:text-white">Title</label>
          <input
            type="text"
            value={title}
            placeholder='e.g. Take coffee break'
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`outline-[#828FA3]/25 outline-1 rounded-sm py-2 pl-4 text-xs font-medium leading-6 focus:outline-main-purple`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-medium-grey text-xs dark:text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className={`outline-[#828FA3]/25 outline-1 focus:outline-main-purple rounded-sm py-2 pl-4 text-xs font-medium leading-6 w-full`}
            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little. '
          />
        </div>


        <div className="flex flex-col gap-2">
          <label className="font-bold dark:text-white placeholder:dark:text-white/25 text-medium-grey text-xs">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={placeholderSuggestions[index] || `Subtask ${index + 1}`}
                value={subtask}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="outline-[#828FA3]/25 outline-1 rounded-sm py-2 pl-4 text-xs font-medium leading-6 flex-1 focus:outline-main-purple"
              />
              <button
                type="button"
                onClick={() => handleRemoveSubtask(index)}
              >
                <Image
                  src="/assets/icon-cross.svg"
                  className="cursor-pointer hover:text-main-purple"
                  height={10}
                  width={10}
                  alt="Remove column"
                />
              </button>
            </div>
          ))}
          <div className="w-full flex-1 ">

            <Button size='small' onType="button" color='secondary' handleOnClick={handleAddSubtask}>
              + Add New Subtask
            </Button>
          </div>

        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold dark:text-white text-medium-grey text-xs">Status</label>
          <DropDownMenu options={statuses} onChange={(e) => setStatus(e.target.value)} value={status} />
        </div>

        <Button size='small' color='primary' onType='submit'>
          {taskToEdit ? 'Save Changes' : 'Create Task '}
        </Button>


      </form>

    </div>
  );
}
