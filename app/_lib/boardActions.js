export const boardActions = (setData, setSelectedBoardName, data) => (
  {
    addBoard: (newBoard) => {
      setData(prev => ({
        ...prev, boards: [...prev.boards, newBoard]
      }))
      setSelectedBoardName(newBoard.name);
    },
    deleteBoard: (boardName) => {
      setData((prev) => {
        const updatedBoards = prev.boards.filter((b) => b.name !== boardName);

        // Automatically set new selected board if any boards remain
        if (updatedBoards.length > 0) {
          setSelectedBoardName(updatedBoards[0].name);
        } else {
          setSelectedBoardName('');
        }

        return {
          ...prev,
          boards: updatedBoards,
        };
      });
    },


  })