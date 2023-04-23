import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    token: "",
    username: "",
    staffNo: ""
  },
  reducers: {
    setUser: (state, action) => {
      console.log('action', action.payload);
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.username = action.payload.username
      state.staffNo = action.payload.staffNo
    },
    clearUser: (state) => {
      state.userId = ""
      state.token = ""
      state.username = ""
      state.staffNo = ""
    }
  },
})

export const selectIsStaff = (state) => !!state.user.staffNo
export const selectIsLoggedIn = (state) => !!state.user.token
export const selectUser = (state) => {
  if(!!state.user.token) {
    return {
      userId: state.user.userId,
      username: state.user.username,
      token: state.user.token,
      staffNo: state.user.staffNo
    }
  } else {
    return null;
  }
}
// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer