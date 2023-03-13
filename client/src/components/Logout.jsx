import React from "react";
import { useCookies } from "react-cookie";

export const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token");
        console.log(cookies);
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
