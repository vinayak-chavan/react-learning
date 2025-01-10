import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./data";

const userSlice = createSlice({
  name: "users",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },

    updateUser: (state, action) => {
      const {id, name, email, phone} = action.payload;
      const user = state.find(user => user.id == id)
      if(user) {
        user.name = name;
        user.email = email;
        user.phone = phone;
      }
    },

    deleteUser: (state, action) => {
      const {id} = action.payload;
      const user = state.find(user => user.id == id)
      if(user) {
        return state.filter(f => f.id !== id);
      }
    }
  }
})

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;