import React from "react";
import { Logout } from "./Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCookies } from "react-cookie";

export const UserDetails = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    return (
        <div className="flex gap-4 m-4 mt-2 mb-2 w-80 justify-end items-center">
            <AccountCircleIcon fontSize="large" />
            <div>{cookies.username}</div>
            <Logout />
        </div>
    );
};
