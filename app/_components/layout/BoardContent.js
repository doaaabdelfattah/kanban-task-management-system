import { useBoard } from "@/app/_context/BoradContext";
import Button from "../reusable/Button";
import DnDBoard from "@/app/_components/DragAndDrop/DnDBoard";



function BoardContent() {
  const { data, selectedBoardName } = useBoard();
  const selectedBoard = data.boards.find(b => b.name === selectedBoardName);

  if (!selectedBoard) return <p className="text-center mt-10">Board not found</p>;
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
        <DnDBoard />
      )}
    </div>

  )

}

export default BoardContent
