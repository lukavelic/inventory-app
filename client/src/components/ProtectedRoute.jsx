import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { LoadingScreen } from "./LoadingScreen";

const ProtectedRoute = ({ children, route }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        axios
            .get(route, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) setIsAuthorized(true);
            })
            .catch((err) => console.log(err));
    });

    return isAuthorized ? children : <LoadingScreen></LoadingScreen>;
};

export default ProtectedRoute;
