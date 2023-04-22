import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/userSlice";
import { message } from "antd";
import { setRequireLogin } from "../store/loginSlice";

const RouteGuard = ({ children }) => {
    const [messageApi] = message.useMessage();
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('loggin', isLoggedIn);
        if (!isLoggedIn) {
            dispatch(setRequireLogin(true))
            navigate("/login")
        }
    }, [])

    return children
}

export default RouteGuard;