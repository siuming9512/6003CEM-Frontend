import axios from "axios";
import Chatroom from "../Chatroom";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import { Col, Row } from "antd";
import UserChat from "../UserChat";
import { useEffect, useState } from "react";
import { selectCurrentChatroom, setCurrentChatroom } from "../../../store/chatroomSlice";
import { ws } from "../socket";

const AdminChatroom = () => {
    const dispatch = useDispatch()
    const currentChatroomId = useSelector(selectCurrentChatroom)
    const user = useSelector(selectUser)
    const getChatrooms = async () => {
        const { data } = await axios.get(`http://localhost:3000/chat/chatrooms`)

        return data
    }

    const { data: userChatrooms, isLoading, refetch } = useQuery({ queryKey: ['chatrooms'], queryFn: getChatrooms, initialData: [] })

    const chatroom = () => {
        if (currentChatroomId != null) {
            return <Chatroom chatroomId={currentChatroomId} />
        } else {
            return ""
        }
    }

    const onClickChatroom = (chatroomId) => {
        dispatch(setCurrentChatroom(chatroomId))
    }

    useEffect(() => {
        const socket = ws()
        console.log(socket);
        socket.on("hasNewMessage", () => {
            refetch()
        });
    }, [])

    if (isLoading) return "Loading..."
    else return (
        <Row style={{ height: "100%" }}>
            <Col span={6}>
                {
                    userChatrooms.map(room => <UserChat key={room.chatRoomId} currentChatroomId={currentChatroomId} userChatroom={room} staffUserId={user.userId} onClick={(chatroomId) => onClickChatroom(chatroomId)} />)
                }
            </Col>
            <Col span={18} style={{ padding: "20px 20px 0 20px", backgroundColor: "white", height: "100%" }}>
                {chatroom()}
            </Col>
        </Row>
    )
}

export default AdminChatroom;