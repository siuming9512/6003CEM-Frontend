import moment from "moment"
import "./Bubble.css"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/userSlice"

const Bubble = ({ msg }) => {
    const user = useSelector(selectUser)
    const className = `bubble ${user.userId == msg.sendBy? "bubble-right": "bubble-left"}`
    return <div className={className}>
        <div>{msg.message}</div>
        <div style={{ fontSize: "8px", textAlign: "right", marginTop: "5px" }}>
            {moment(msg.createdAt).format("HH:mm")}
        </div>
    </div>;
}

export default Bubble;
