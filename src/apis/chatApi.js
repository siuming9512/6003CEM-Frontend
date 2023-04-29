import axios from "axios"
import { host } from "."
import moment from "moment"

export const getMessagesByChatroomId = async (chatroomId) => {
    const { data } = await axios.get(`${host}/chat/msgs/${chatroomId}`)
    return data
}

export const getChatrooms = async () => {
    const { data } = await axios.get(`${host}/chat/chatrooms`)

    return data
}

export const getChatroomByUserId = async (userId) => {
    const { data } = await axios.get(`${host}/chat/chatroom/${userId}`)
    return data
}

export const chat = async (chatroomId, userId, message) => {
    const body = {
        chatroomId: chatroomId,
        sendBy: userId,
        message: message,
        createdAt: moment().format()
    }
    return await axios.post(`${host}/chat`, body)
}