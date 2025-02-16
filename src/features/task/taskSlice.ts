import { RootState } from "@/redux/store";
import { IInitialState, ITask } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: IInitialState = {
  tasks: [
    {
      id: "hahaha123",
      title: "Initialize frontend",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "high",
    },
    {
      id: "haho123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "low",
    },
    {
      id: "hahso123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: true,
      priority: "medium",
    },
  ],
  filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  const result = { id: nanoid(), isCompleted: false, ...taskData };
  return result;
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state.todo.tasks;
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const { addTask, toggleCompleteState, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
