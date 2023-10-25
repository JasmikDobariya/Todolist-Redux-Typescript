import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Task  {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState  {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      
      
    },
    toggleTask: (state, action: PayloadAction<{ id: number }>) => {
      const taskToToggle = state.tasks.find((task) => task.id === action.payload.id);
      if (taskToToggle) {
        taskToToggle.completed = !taskToToggle.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setTasks } = todoSlice.actions;

export default todoSlice.reducer;