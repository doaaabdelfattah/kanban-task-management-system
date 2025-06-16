'use client'
import { createContext, useContext, useState } from "react";
import { boardActions } from "../_lib/boardActions";

const BoardContext = createContext();

function BoardProvider({ children, initialData }) {
  const [data, setData] = useState(initialData)
  const [selectedBoardName, setSelectedBoardName] = useState(initialData.boards[0]?.name);

  const actions = boardActions(setData, setSelectedBoardName);
  //  Function to add a new board
  const addBoard = (newBoard) => {
    setData(prev => ({
      ...prev,
      boards: [...prev.boards, newBoard]
    }));
    setSelectedBoardName(newBoard.name);
  }

  const value = { data, setData, selectedBoardName, setSelectedBoardName, ...actions }
  return (

    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  )
}

export default BoardProvider

export const useBoard = () => useContext(BoardContext);