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
        state.userId = action.userId
        state.token = action.token
        state.role = action.role
    }
  },
})

export const selectIsLoggedIn = (state) => !!state.user.token

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer