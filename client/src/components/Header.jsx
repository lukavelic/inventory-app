import React, { useState } from "react";
import { UserDetails } from "./UserDetails";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Form } from "./Form";

export const Header = (props) => {
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
    const [buttonId, setButtonId] = useState();

    const handleClick = (event) => {
        console.log("handle click");
        setPopoverAnchorEl(event.currentTarget);
        setButtonId(event.target.id);
    };

    const handleClose = () => {
        console.log("handle.close");
        setPopoverAnchorEl(null);
    };

    const popoverOpen = Boolean(popoverAnchorEl);
    const popoverId = popoverOpen ? "simple-popover" : undefined;

    console.log(popoverOpen);

    return (
        <header className="flex w-screen items-center justify-between">
            <div className="w-80"></div>
            <div className=" text-4xl font-semibold">W-WEAR</div>
            {props.isAuthorized ? (
                <UserDetails />
            ) : (
                <div className=" flex gap-4 m-4 mt-2 mb-2 w-80 justify-end">
                    <Button
                        color="secondary"
                        variant="contained"
                        id="register"
                        onClick={handleClick}
                    >
                        Register
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        id="login"
                        onClick={handleClick}
                    >
                        Login
                    </Button>
                    <Popover
                        className={"w-full" + " " + props.className}
                        id={popoverId}
                        open={popoverOpen}
                        anchorEl={popoverAnchorEl}
                        onClose={handleClose}
                        anchorReference="anchorEl"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Form type={buttonId} handleClose={handleClose}></Form>
                    </Popover>
                </div>
            )}
        </header>
    );
};
