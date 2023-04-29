import axios from "axios";


let store

export const injectStore = _store => {
    store = _store
}

axios.interceptors.request.use(config => {
    const state = store.getState()
    config.headers.authorization = `Bearer ${state.user.token}` 
    return config
})