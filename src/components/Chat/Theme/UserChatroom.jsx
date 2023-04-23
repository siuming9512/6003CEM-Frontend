import axios from "axios";
import Chatroom from "../Chatroom";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";

const UserChatroom = () => {
    const user = useSelector(selectUser)

    const getChatroom = async () => {
        const { data } = await axios.get(`http://localhost:3000/chat/chatroom/${user.userId}`)

        return data
    }

    const { data, isLoading } = useQuery({ queryKey: ['chatroom'], queryFn: getChatroom, staleTime: Infinity })

    if (isLoading) return "Loading..."
    else return <div style={{ height: "100%", padding: "20px"}} ><Chatroom chatroomId={data.chatRoomId}/></div>
}

export default UserChatroom;