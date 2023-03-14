import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Form = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const onSubmit = (data) => {
        if (props.type === "register") {
            console.log("hit register");
            props.handleClose();
            axios
                .post("/register", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } else {
            console.log(" hit login");
            props.handleClose();
            axios
                .post("/login", data)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                        setCookie("token", res.data.token);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col m-4 gap-4"
        >
            <TextField
                color="secondary"
                error={errors.username}
                label="Username"
                variant="outlined"
                {...register("username", { required: true })}
            />
            <TextField
                color="secondary"
                error={errors.password}
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: true })}
            />
            <Button color="secondary" variant="contained" type="submit">
                {props.type == "register" ? "Register" : "Login"}
            </Button>
        </form>
    );
};
