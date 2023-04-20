import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const RouteGuard = ({ children }) => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    console.log(user);
    useEffect(() => {

        if (user == null) {
            navigate("/login")
            return
        }
    }, [])

    return children
}

export default RouteGuard;