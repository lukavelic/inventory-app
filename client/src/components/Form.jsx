import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// TO BE CHANGED FOR PROD

axios.defaults.baseURL = "http://localhost:5000/";

export const Form = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if (props.type === "register") {
            console.log("hit register");
            axios
                .post("/register", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } else {
            console.log(" hit login");
            axios
                .post("/login", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input
                defaultValue="test"
                {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
};
