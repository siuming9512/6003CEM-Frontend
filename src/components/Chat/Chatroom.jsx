import { Button, Col, Layout, Row, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Bubble from "./Bubble";
import { SendOutlined } from "@ant-design/icons";
import { createRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../store/userSlice";
import { selectInput, selectMessages, setInput, setMessage, setMessages } from "../../store/chatroomSlice";
import moment from "moment";
import { ws } from "./socket"
const convertMessage = (message) => {
    return { sendBy: message.sendBy, message: message.message, createdAt: message.createdAt }
}

const getMessages = async (chatroomId) => {
    const { data } = await axios.get(`http://localhost:3000/chat/msgs/${chatroomId}`)
    console.log(chatroomId);
    return data.map(x => convertMessage(x))
}

const Chatroom = ({ chatroomId }) => {
    const dispatch = useDispatch()
    const input = useSelector(selectInput)
    const messages = useSelector(selectMessages)
    const user = useSelector(selectUser)
    const messagesEndRef = useRef(null)
    const [socket, setWs] = useState(null)

    const sendMessage = () => {
        if (!input) {
            return
        }

        const msg = {
            chatroomId: chatroomId,
            sendBy: user.userId,
            message: input,
            createdAt: moment().format()
        }
        socket.emit("pushMessage", msg)

        dispatch(setInput(""))
    }

    const onPressEnter = (e) => {
        console.log(e.key);
        if (e.key == "Enter") {
            sendMessage()
        }
    }

    useEffect(() => {
        setWs(ws(chatroomId))
        getMessages(chatroomId).then(data => dispatch(setMessages(data)))
    }, [chatroomId])

    useEffect(() => {
        if (socket != null) {
            socket.on("message", (msg) => {
                dispatch(setMessage(convertMessage(msg)))
            });
        }
    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight)
    }, [messages])


    return <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div style={{
            display: "flex",
            width: "100%",
            height: "calc(100% - 70px)",
            overflowY: "auto"
        }} ref={messagesEndRef}>
            <div style={{ width: "100%" }} >
                {
                    (messages ? messages : []).map((msg, i) => <Bubble key={i} msg={msg} />)
                }
            </div>
        </div>
        <div style={{ width: "100%", position: "absolute", bottom: "20px" }}>
            <Row justify="space-between">
                <Col span={22}>
                    <input type="text" style={{ width: "90%", border: "1px solid #EEEEEE", borderRadius: "50px", lineHeight: "32px", padding: "0 20px" }} value={input} onChange={(e) => dispatch(setInput(e.target.value))} onKeyDown={onPressEnter} />
                </Col>
                <Col>
                    <Button type="primary" icon={<SendOutlined />} shape="circle" onClick={sendMessage}></Button>
                </Col>
            </Row>
        </div>
    </div>
}

export default Chatroom;