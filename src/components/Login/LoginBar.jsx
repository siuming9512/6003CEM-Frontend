import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../../store/userSlice";

const LoginBar = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [ logoutHover, setLogoutHover ] = useState(false)
    const navigate = useNavigate()

    const onLogin = () => {
        navigate("/login")
    }

    const onLogout = () => {
        dispatch(clearUser)
    }

    if (user == null) {
        return <Button icon={<UserOutlined />} type="primary" onClick={onLogin}>Login</Button>
    } else {
        return <Button icon={<UserOutlined />} type="primary" onClick={onLogout} onMouseEnter={() => { setLogoutHover(true) }} onMouseLeave={() => { setLogoutHover(false) }} danger={logoutHover}>{logoutHover ? "Logout" : user.username}</Button>
    }

}

export default LoginBar;