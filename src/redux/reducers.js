const data = localStorage.getItem('tasks');
const savedTasks = data ? JSON.parse(data) : [];
const initialState = savedTasks;
export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const existingTask = state.find((task) => task.id === action.payload.id);

      if (existingTask) {
        return state.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        );
      } else {
        return [...state, action.payload];
      }

    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, completed: !task.completed } : task,
      );

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload.id);

    case 'SELECT_ALL_TASKS':
      const allTasksSelected = state.every((task) => task.completed);

      return state.map((task) => ({
        ...task,
        completed: !allTasksSelected,
      }));

    case 'DELETE_COMPLETED_TASKS':
      return state.filter((task) => !task.completed);

    case 'SET_TASK_DATE':
      const newTask = state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, taskDate: new Date(action.payload.taskDate) }
          : task
      );
      return newTask;

    case 'SET_FILTER':
      return state;

    default:
      return state;
  }
};

export const filterReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

const initialStateDate = {
  selectedDate: null,
};

export const dateReducer = (state = initialStateDate, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'RESET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: null,
      };
    default:
      return state;
  }
};
