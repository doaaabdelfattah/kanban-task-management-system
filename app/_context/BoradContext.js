'use client'
import { createContext, useContext, useState } from "react";
import { boardActions } from "../_lib/boardActions";
import { taskActions } from "../_lib/taskActions";

const BoardContext = createContext();

function BoardProvider({ children, initialData }) {
  const [data, setData] = useState(initialData)
  const [selectedBoardName, setSelectedBoardName] = useState(initialData.boards[0]?.name);

  const allBoardActions = boardActions(setData, setSelectedBoardName, data);
  const allTaskActions = taskActions(setData, selectedBoardName);

  const value = { data, setData, selectedBoardName, setSelectedBoardName, ...allBoardActions, ...allTaskActions }
  return (

    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  )
}

export default BoardProvider

export const useBoard = () => useContext(BoardContext);