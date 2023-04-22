import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    token: "",
    role: ""
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.username = action.payload.username
      state.role = action.payload.role
    },
    clearUser: (state) => {
      state.userId = ""
      state.token = ""
      state.username = ""
      state.role = ""
    }
  },
})

export const selectIsLoggedIn = (state) => !!state.user.token
export const selectUser = (state) => {
  if(!!state.user.token) {
    return {
      userId: state.user.userId,
      username: state.user.username,
      token: state.user.token,
      role: state.user.role
    }
  } else {
    return null;
  }
}
// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer