import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer, filterReducer, dateReducer } from './reducers';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    date: dateReducer,
  },
});

export default store;
