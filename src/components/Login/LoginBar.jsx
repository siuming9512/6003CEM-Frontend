import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectIsStaff, selectUser } from "../../store/userSlice";

const LoginBar = () => {
    const user = useSelector(selectUser)
    const isStaff = useSelector(selectIsStaff)
    const dispatch = useDispatch()
    const [isHover, sethoverState] = useState(false)
    const navigate = useNavigate()

    const onLogin = () => {
        navigate("/login")
    }

    const onLogout = () => {
        dispatch(clearUser())
        navigate("/login")
    }

    if (user == null) {
        return <Button icon={<UserOutlined />} type="primary" onClick={onLogin} onMouseEnter={() => { sethoverState(true) }} onMouseLeave={() => { sethoverState(false) }} >Login</Button>
    } else {
        let style = null
        let username = user.username
        // console.log(isStaff);
        if (isStaff) {
            if (!isHover) {
                style = {
                    backgroundColor: "#00cc66"
                }
            }

            username = `${user.username} (${user.staffNo})`
        }

        return <Button icon={<UserOutlined />} style={style} type="primary" onClick={onLogout} onMouseEnter={() => { sethoverState(true) }} onMouseLeave={() => { sethoverState(false) }} danger={isHover}>{isHover ? "Logout" : username}</Button>

    }

}

export default LoginBar;