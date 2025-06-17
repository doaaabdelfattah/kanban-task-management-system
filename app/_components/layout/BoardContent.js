import { useBoard } from "@/app/_context/BoradContext";
import TaskCardItem from "./TaskCardItem";
import Button from "../reusable/Button";



function BoardContent() {
  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find(b => b.name === selectedBoardName);

  return (
    <div className={`${selectedBoard.columns.length === 0 ? 'flex items-center justify-center h-full' : 'grid auto-cols-[17.5rem] grid-flow-col gap-6'}`}>
      {selectedBoard.columns.length === 0 ? (
        <div className="text-medium-grey heading-lg flex flex-col justify-center items-center gap-8 text-center">
          This board is empty. Create a new column to get started.
          <Button size='small' color='primary'>
            + Add new Column
          </Button>
        </div>
      ) : (
        <>
          {selectedBoard.columns.map((column, index) => (
            <div key={index}>
              <h3 className="heading-sm text-medium-grey mb-6 uppercase">
                {column.name} ({column.tasks.length})
              </h3>

              {column.tasks.map((task, taskIndex) => (
                <TaskCardItem key={`${column.name}-${taskIndex}`} task={task} />
              ))}
            </div>
          ))}
          <div className="bg-light-lines/50 dark:bg-[#2B2C37]/50 group rounded-md mt-10 cursor-pointer h-screen flex items-center justify-center">
            <button className="heading-xl group-hover:text-main-purple text-medium-grey">
              + New Column
            </button>
          </div>
        </>
      )}
    </div>

  )

}

export default BoardContent
