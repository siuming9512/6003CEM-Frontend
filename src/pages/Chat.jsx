import { Col, Layout, Row } from "antd";
import Chatroom from "../components/Chat/Chatroom";
import { useSelector } from "react-redux";
import { selectIsStaff } from "../store/userSlice";
import axios from "axios";
import UserChatroom from "../components/Chat/Theme/UserChatroom";
import AdminChatroom from "../components/Chat/Theme/AdminChatroom";
import { useEffect } from "react";


const ChatPage = () => {
    const isStaff = useSelector(selectIsStaff)

    // const { data: chatrooms } = useQuery({ queryKey: ['chatrooms'], queryFn: getChatrooms })

    // return (
    //     <Row style={{width: "100%"}}>
    //         <Col span={4}>
    //             {

    //             }
    //         </Col>
    //         <Col span={20}><Chatroom /></Col>
    //     </Row>
    // )

    useEffect(() => {
        console.log('page');
    }, [])
    if(isStaff) {
        return <AdminChatroom />
    } else {
        // return <UserChatroom />
    }
}

export default ChatPage;