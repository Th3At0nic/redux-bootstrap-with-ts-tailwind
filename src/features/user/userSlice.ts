import { RootState } from "@/redux/store";
import { IUser } from "./../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "askdfas",
      name: "Rahat",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const selectUser = (state: RootState) => {
  return state.user.users;
};

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
