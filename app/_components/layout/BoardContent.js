import { useBoard } from "@/app/_context/BoradContext";
import TaskCardItem from "./TaskCardItem";

function BoardContent() {
  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find(b => b.name === selectedBoardName);

  return (
    <div className="flex space-x-6">
      {selectedBoard.columns.map(column => (
        <div key={column.name} className=" ">


          <h3 className="heading-sm text-medium-grey mb-6 uppercase">{column.name} ({column.tasks.length}) </h3>

          {column.tasks.map(task => (
            <TaskCardItem task={task} />

          ))}
        </div>
      ))}

    </div>
  )
}

export default BoardContent
