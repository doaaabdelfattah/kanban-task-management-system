export const boardActions = (setData, setSelectedBoardName, selectedBoardName, data) => (
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
    editBoard: (editedBoard) => {
      setData((prev) => {
        return {
          ...prev,
          boards: prev.boards.map((board) => {

            if (board.name !== selectedBoardName) return board;
            return {
              name: editedBoard.name,
              columns: editedBoard.columns.map((editedCol) => ({
                name: editedCol.name,
                tasks: board.columns.find(col => col.name === editedCol.name)?.tasks || []
              }))


            }
          })
        }

      })

      setSelectedBoardName(editedBoard.name);
    }


  })