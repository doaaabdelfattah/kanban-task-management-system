export const taskActions = (setData, selectedBoardName) => (
  {
    addTask: (newTask) => {
      setData((prev) => (
        {
          ...prev,
          boards: prev.boards.map((board) => {
            // If this is not the selected board, return it as is
            if (board.name !== selectedBoardName) return board;

            // If it's the selected board, update its columns
            return {
              ...board,
              columns: board.columns.map(col => {
                // If this is not the target column, return it as is
                if (col.name !== newTask.status) return col;

                // If it's the correct column, add the new task to its tasks array
                return {
                  ...col, // Keep other column properties
                  tasks: [...col.tasks, newTask] // append the new task
                }
              })
            }
          })
        }
      ))
    },
    deleteTask: (task) => {
      setData((prev) => {
        return {
          ...prev,
          boards: prev.boards.map((board) => {
            if (board.name !== selectedBoardName) return board
            return {
              ...board,
              columns: board.columns.map((col) => ({
                ...col,
                tasks: col.tasks.filter((t) => t.id !== task.id)
              }))

            }


          })
        }
      })
    }
  })