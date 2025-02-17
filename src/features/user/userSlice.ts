import { RootState } from "@/redux/store";
import { IUser } from "./../../types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "askdfas",
      name: "Rahat",
    },
  ],
};

type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser) => {
  const result = { id: nanoid(), ...userData };
  return result;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const newUser = createUser(action.payload);
      state.users.push(newUser);
    },
  },
});

export const selectUser = (state: RootState) => {
  return state.user.users;
};

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
