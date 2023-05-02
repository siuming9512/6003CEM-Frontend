import axios from "axios"
import { host } from "."

export const login = async (username, password) => {
    const { data } = await axios.post(`${host}/auth/login`, {
        username: username,
        password: password
    })

    return data
}

export const loginExternal = async (token) => {
    const { data } = await axios.post(`${host}/auth/external`, {
        token: token
    })

    return data
}

export const register = async (username, password, staffRegisterCode) => {
    const { data } = await axios.post(`${host}/users`, {
        username: username,
        password: password,
        staffRegisterCode: staffRegisterCode
    })

    return data
}

export const getProfile = async () => {
    const { data } = await axios.get(`${host}/auth/profile`)

    return data
}

