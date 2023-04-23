import { io } from 'socket.io-client';

export const ws = (chatroomId) => {
    let URL = `http://localhost:81/messages`;

    if(chatroomId) {
        URL += `?room=${chatroomId}`
    }
    return io(URL);
} 