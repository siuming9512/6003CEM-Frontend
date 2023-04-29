import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    token: "",
    username: "",
    staffNo: "",
    chatroomId: ""
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
      state.staffNo = action.payload.staffNo
      state.chatroomId = action.payload.chatroomId
    },
    clearUser: (state) => {
      state.token = ""
      state.userId = ""
      state.username = ""
      state.staffNo = ""
      state.chatroomId = ""
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
      staffNo: state.user.staffNo,
      chatroomId: state.user.chatroomId
    }
  } else {
    return null;
  }
}
// Action creators are generated for each case reducer function
export const { setUser, clearUser, setToken} = userSlice.actions

export default userSlice.reducer