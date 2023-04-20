import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LoginBar = () => {
    const { user, setUser } = useContext(UserContext)
    const [ logoutHover, setLogoutHover ] = useState(false)
    const navigate = useNavigate()

    const onLogin = () => {
        navigate("/login")
    }

    const onLogout = () => {
        setUser(null)
    }

    if (user == null) {
        return <Button icon={<UserOutlined />} type="primary" onClick={onLogin}>Login</Button>
    } else {
        return <Button icon={<UserOutlined />} type="primary" onClick={onLogout} onMouseEnter={() => { setLogoutHover(true) }} onMouseLeave={() => { setLogoutHover(false) }} danger={logoutHover}>{logoutHover ? "Logout" : user.username}</Button>
    }

}

export default LoginBar;