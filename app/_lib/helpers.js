import { nanoid } from 'nanoid';

export function normalizeData(data) {
  return {
    boards: data.boards.map(board => ({
      ...board,
      id: nanoid(),
      columns: board.columns.map(column => ({
        ...column,
        id: nanoid(),
        tasks: column.tasks.map(task => ({
          ...task,
          id: nanoid(),
          subtasks: task.subtasks.map(subtask => ({
            ...subtask,
            id: nanoid(),
          }))
        }))
      }))
    }))
  };
}
