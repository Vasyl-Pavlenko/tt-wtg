export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    payload: task,
  };
};

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  payload: {
    id,
  },
});

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  payload: {
    id,
  },
});

export const selectAllTasks = () => ({
  type: 'SELECT_ALL_TASKS',
});

export const deleteCompletedTasks = () => ({
  type: 'DELETE_COMPLETED_TASKS',
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});

export const setSelectedDate = (date) => ({
  type: 'SET_SELECTED_DATE',
  payload: date,
});

export const resetSelectedDate = () => ({
  type: 'RESET_SELECTED_DATE',
});
