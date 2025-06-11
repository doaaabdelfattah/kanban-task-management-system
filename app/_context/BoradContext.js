'use client'
import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

function BoardProvider({ children, initialData }) {
  const [data, setData] = useState(initialData)
  const [selectedBoardName, setSelectedBoardName] = useState(initialData.boards[0]?.name);
  const value = { data, setData, selectedBoardName, setSelectedBoardName }
  return (

    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  )
}

export default BoardProvider

export const useBoard = () => useContext(BoardContext);