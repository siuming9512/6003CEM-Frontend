import axios from "axios";
import Chatroom from "../Chatroom";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import { useEffect } from "react";
import { getChatroomByUserId } from "../../../apis/chatApi";

const UserChatroom = () => {
    const user = useSelector(selectUser)


    const { data, isLoading } = useQuery({ queryKey: ['chatroom', user.userId], queryFn: ({ queryKey }) => getChatroomByUserId(queryKey[1]), staleTime: Infinity })

    useEffect(() => {
        console.log('user chat init');
    }, [data])

    if (isLoading) return "Loading..."
    else return <Chatroom chatroomId={data.chatRoomId} />
}

export default UserChatroom;