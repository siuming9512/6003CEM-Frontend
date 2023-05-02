import moment from "moment"
import "./Bubble.css"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/userSlice"
import { Col, Popover, Row } from "antd"
import HashLabel from "./HashLabel"
import { useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"


const replaceHashMsgs = (msg) => {
    return msg
        .split(/(\#\d+)/g)
        .map(splitedMsg => {
            if (/(\#\d+)/g.test(splitedMsg)) {
                const hashId = splitedMsg.replace("#", "")
                return <HashLabel hashId={hashId} />
            } else {
                return <span>{splitedMsg}</span>
            }
        })
}

const Bubble = ({ msg, onMessageDelete }) => {
    const user = useSelector(selectUser)
    const className = `bubble ${user.userId == msg.sendBy ? "bubble-right" : "bubble-left"}`
    const messages = replaceHashMsgs(msg.message)
    const [isHover, setIsHover] = useState(false)
    return <div className={className} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <div>
            {messages.map(c => c)}
        </div>
        <div style={{ fontSize: "8px", textAlign: "right", marginTop: "5px" }}>
            <Row justify="space-between">
                <Col>{isHover? <DeleteOutlined onClick={() => onMessageDelete(msg.id)} style={{cursor: "pointer"}} />: ""}</Col>
                <Col>
                    {moment(msg.createdAt).format("HH:mm")}
                </Col>
            </Row>
        </div>
    </div>;
}

export default Bubble;
