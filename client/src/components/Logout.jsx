import React from "react";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";

export const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = (event) => {
        console.log(event);
        removeCookie("token");
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={logout}>
                Logout
            </Button>
        </div>
    );
};
