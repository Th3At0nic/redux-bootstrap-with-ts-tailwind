import { RootState } from "@/redux/store";
import { IInitialState, ITask } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { removeUser } from "../user/userSlice";

const initialState: IInitialState = {
  tasks: [
    {
      id: "hahaha123",
      title: "Initialize frontend",
      description: "Create homepage and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "high",
      assignedTo: "askdf",
    },
    {
      id: "haho123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-05-06T18:00:00.000Z",
      isCompleted: false,
      priority: "low",
      assignedTo: "",
    },
    {
      id: "hahso123",
      title: "Create Github Repo",
      description: "Create homepage and routing",
      dueDate: "2025-02-06T18:00:00.000Z",
      isCompleted: true,
      priority: "medium",
      assignedTo: "",
    },
  ],
  filter: "all",
};

type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority" | "assignedTo"
>;

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
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      state.tasks.forEach((task) =>
        task.assignedTo === action.payload ? (task.assignedTo = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;

  if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const {
  addTask,
  toggleCompleteState,
  deleteTask,
  updateTask,
  updateFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
