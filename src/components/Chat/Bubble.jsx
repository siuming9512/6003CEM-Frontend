import moment from "moment"
import "./Bubble.css"

const self = "A"
const Bubble = ({ msg }) => {
    const className = `bubble ${self == msg.sendBy? "bubble-right": "bubble-left"}`
    return <div className={className}>
        <div>{msg.message}</div>
        <div style={{ fontSize: "8px", textAlign: "right", marginTop: "5px" }}>
            {moment(msg.createdAt).format("HH:mm")}
        </div>
    </div>;
}

export default Bubble;
