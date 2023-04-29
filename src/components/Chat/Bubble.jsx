import moment from "moment"
import "./Bubble.css"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/userSlice"
import { Popover } from "antd"
import HashLabel from "./HashLabel"


const replaceHashMsgs = (msg) => {
    return msg
        .split(/(\#\d+)/g)
        .map(splitedMsg => {
            console.log(splitedMsg);
            if (/(\#\d+)/g.test(splitedMsg)) {
                const hashId = splitedMsg.replace("#", "")
                return <HashLabel hashId={hashId}/>
            } else {
                return <span>{splitedMsg}</span>
            }
        })
}

const Bubble = ({ msg }) => {
    const user = useSelector(selectUser)
    const className = `bubble ${user.userId == msg.sendBy ? "bubble-right" : "bubble-left"}`
    const messages = replaceHashMsgs(msg.message)
    return <div className={className}>
        <div>
            {messages.map(c => c)}
        </div>
        <div style={{ fontSize: "8px", textAlign: "right", marginTop: "5px" }}>
            {moment(msg.createdAt).format("HH:mm")}
        </div>
    </div>;
}

export default Bubble;
