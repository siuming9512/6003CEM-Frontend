import { Button, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Bubble from "./Bubble";
import { SendOutlined } from "@ant-design/icons";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/userSlice";
import { selectInput, selectMessages, setInput, setMessage, setMessages } from "../../store/chatroomSlice";
import moment from "moment";

const convertMessage = (message) => {
    return { sendBy: message.sendBy, message: message.message, createdAt: message.createdAt }
}

const getMessages = async (userId) => {
    const { data } = await axios.get(`http://localhost:3000/chat/msgs?userId=${userId}`)

    return data.map(x => convertMessage(x))
}

const Chatroom = () => {
    const self = "836a83d4-0f83-4076-afad-0a17b5ba5303"
    const dispatch = useDispatch()
    const input = useSelector(selectInput)
    const messages = useSelector(selectMessages)

    const sendMessage = () => {
        if (!input) {
            return
        }

        const msg = {
            sendBy: self,
            message: input,
            createdAt: moment().format()
        }
        socket.emit("pushMessage", msg)

        // dispatch(setMessage(convertMessage(msg)))
        dispatch(setInput(""))
    }

    const onPressEnter = (e) => {
        console.log(e.key);
        if(e.key == "Enter") {
            sendMessage()
        }
    }

    useEffect(() => {
        getMessages(self).then(data => dispatch(setMessages(data)))

        socket.on("message", (msg) => {
            dispatch(setMessage(convertMessage(msg)))
        });
    }, [])

    return <>
        <div style={{
            display: "flex",
            flexDirection: "column-reverse",
            width: "100%",
            height: "90%",
            overflowY: "auto"
        }}>
            <div>
                {
                    (messages ? messages : []).map((msg, i) => <Bubble key={i} msg={msg} />)
                }
            </div>
        </div>
        <div style={{ width: "100%" }}>
            <Row justify="space-between">
                <Col span={22}>
                    <input type="text" style={{ width: "100%", border: "1px solid #EEEEEE", borderRadius: "50px", lineHeight: "32px", padding: "0 20px" }} value={input} onChange={(e) => dispatch(setInput(e.target.value))}  onKeyDown={onPressEnter} />
                </Col>
                <Col>
                    <Button type="primary" icon={<SendOutlined />} shape="circle" onClick={sendMessage}></Button>
                </Col>
            </Row>
        </div>
    </>
}

export default Chatroom;