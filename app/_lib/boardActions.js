export const boardActions = (setData, setSelectedBoardName) => (
  {
    addBoard: (newBoard) => {
      setData(prev => ({
        ...prev, boards: [...prev.boards, newBoard]
      }))
      setSelectedBoardName(newBoard.name);
    },



  })