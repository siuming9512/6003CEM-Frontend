import { Col, Row } from "antd";
import moment from "moment";
import "./UserChat.css"
const UserChat = ({ currentChatroomId, userChatroom, staffUserId, onClick }) => {
    const selected = currentChatroomId == userChatroom.chatRoomId
    const latestMessage = userChatroom.chatRoom.chatMessages[0]
    return (
        <div className={`userChatList ${selected? "selected": ""}`} style={{ padding: "10px" }} onClick={() => { onClick(userChatroom.chatRoomId) }}>
            <Row justify="space-between" style={{ padding: "10px 0" }}>
                <Col><div style={{ fontSize: "20px", fontWeight: "bold" }}>{userChatroom.user.username}</div></Col>
                <Col style={{ fontSize: "8px" }}>{moment(latestMessage.createdAt).format("hh:MM")}</Col>
            </Row>
            <Row justify="space-between" style={{ lineHeight: "16px" }}>
                <Col>{latestMessage.message}</Col>
                <Col span={3}>{staffUserId != latestMessage.sendBy ? <div style={{ backgroundColor: "#cc0000", borderRadius: "50%", height: "7px", width: "7px" }}></div> : ""}</Col>
            </Row>
        </div>
    );
}

export default UserChat;