import { createSlice } from '@reduxjs/toolkit'

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: {
    messages: [],
    input: ""
  },
  reducers: {
    setInput: (state, action) => {
        state.input = action.payload
    },
    setMessages: (state, action) => {
        state.messages = [ ...action.payload]
    },
    setMessage: (state, action) => {
        state.messages = [...state.messages, action.payload]
    }
  },
})

export const selectMessages = (state) => state.chatroom.messages
export const selectInput = (state) => state.chatroom.input
// Action creators are generated for each case reducer function
export const { setInput, setMessages,setMessage } = chatroomSlice.actions

export default chatroomSlice.reducer