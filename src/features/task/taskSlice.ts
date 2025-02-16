import { RootState } from "@/redux/store";
import { IInitialState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialState = {
  tasks: [
    {
      id: "hahaha123",
      title: "Initialize frontend",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "haho123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "Low",
    },
    {
      id: "hahso123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "Medium",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state: RootState) => {
  return state.todo.tasks;
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export default taskSlice.reducer;
