'use client'
import Image from "next/image"
import Button from "../reusable/Button"
import { useState } from "react";
import { useBoard } from "@/app/_context/BoradContext";

const status = {
  normal: ' outline-[#828FA3]/25',
  error: 'outline-main-red'
}
function AddBoardForm({ onClose, boardToEdited = null }) {
  const { addBoard, editBoard } = useBoard();
  const [error, setError] = useState("");
  const [boardName, setBoardName] = useState(boardToEdited?.name || "");
  const [columns, setColumns] = useState(
    boardToEdited
      ? boardToEdited.columns.map(col => ({
        id: col.id || Date.now() + Math.random(),
        name: col.name
      }))
      : [
        { id: Date.now(), name: "Todo" },
        { id: Date.now() + 1, name: "Doing" }
      ]
  );


  const handleInput = (e) => {
    setBoardName(e.target.value);
    if (error) setError("");

  }
  const handleAddColumn = () => {
    setColumns([...columns, { id: Date.now(), name: "" }]);
  };
  const handleRemoveColumn = (id) => {
    setColumns(columns.filter(col => col.id !== id));
  };
  const handleChangeColumnName = (id, value) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, name: value } : col
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }

    const hasEmptyColumn = columns.some(col => !col.name.trim())

    const newBoard = {
      name: boardName,
      columns: columns.map(col => ({ name: col.name, tasks: [] }))
    };


    if (boardToEdited) {
      editBoard(newBoard)
    } else {

      addBoard(newBoard);
    }
    setError('');
    onClose();
  };



  return (
    <div className="bg-white dark:bg-dark-grey rounded-lg">
      <h2 className="heading-lg mb-4 dark:text-white">{boardToEdited ? 'Edit Board' : 'Add New Board'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="font-bold dark:text-white text-medium-grey text-xs">
            Board Name
          </label>
          <input type="text" className={`outline-[#828FA3]/25 outline-1 rounded-sm py-2 pl-4 text-xs dark:text-white font-medium leading-6 focus:outline-main-purple`} placeholder="e.g Web Design"
            value={boardName}
            onChange={handleInput} />
          {
            error &&
            <span>{error}</span>
          }
        </div>

        <div className="flex flex-col gap-2 mt-6 mb-6 w-full">
          <label className="font-bold text-medium-grey text-xs dark:text-white">
            Board Columns
          </label>
          {columns.map((col, index) => (
            <div key={col.id} className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={col.name}
                onChange={(e) => handleChangeColumnName(col.id, e.target.value)}
                className="outline-[#828FA3]/25 outline-1 rounded-sm py-2 pl-4 text-xs font-medium leading-6 flex-1 focus:outline-main-purple dark:text-white placeholder:dark:text-white/25"
                placeholder="new column"
              />
              <Image
                src="/assets/icon-cross.svg"
                className="cursor-pointer"
                height={10}
                width={10}
                alt="Remove column"
                onClick={() => handleRemoveColumn(col.id)}
              />
            </div>
          ))}

          <div className="w-full flex-1 ">

            <Button size='small' onType="button" color='secondary' handleOnClick={handleAddColumn}>
              + Add new Column
            </Button>
          </div>
        </div>
        <Button size='small' color='primary' onType='submit'>
          {boardToEdited ? 'Save Changes' : 'Create New Board'}
        </Button>

      </form>

    </div>
  )
}

export default AddBoardForm
