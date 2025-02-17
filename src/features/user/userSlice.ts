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
  },
});

export const selectUser = (state: RootState) => {
  return state.user.users;
};

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
