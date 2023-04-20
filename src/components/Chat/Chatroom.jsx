import { Button, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Bubble from "./Bubble";
import { SendOutlined } from "@ant-design/icons";
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { socket } from "./socket";
import UserContext from "../../contexts/UserContext";

const Chatroom = () => {
    const { user } = useContext(UserContext)
    const self = "836a83d4-0f83-4076-afad-0a17b5ba5303"

    const getMessages = async () => {
        const { data } = await axios.get(`http://localhost:3000/chat/msgs?userId=${self}`)

        return data.map(x => ({sendBy: x.sendBy, message: x.message, createdAt: x.createdAt}))
    }

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    const sendMessage = () => {
        console.log('send');
        const msg = {
            sendBy: self,
            message: input,
            createdAt: new Date()
        }
        socket.emit("pushMessage", msg)
        setMessages((prev) => [...prev, msg])
        setInput("")
    }

    useEffect(() => {
        getMessages().then(data => setMessages(data))

        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg])
        });
    }, [])

    return <Layout className="layout" style={{ height: "100vh" }}>
        <Header>
            <div style={{ color: "white", fontSize: "24px" }}>Chatroom</div>
        </Header>
        <Content
            style={{
                padding: '0 50px',
                height: '100%'
            }}
        >
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
                        <input type="text" style={{ width: "100%", border: "1px solid #EEEEEE", borderRadius: "50px", lineHeight: "32px", padding: "0 20px" }} value={input} onChange={(e) => setInput(e.target.value)} />
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SendOutlined />} shape="circle" onClick={sendMessage}></Button>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
}

export default Chatroom;