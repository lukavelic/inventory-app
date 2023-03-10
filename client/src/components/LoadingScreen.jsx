import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const LoadingScreen = () => {
    const [isTimeoutDone, setIsTimeoutDone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsTimeoutDone(true);
        }, 1000);
    }, []);

    return isTimeoutDone ? (
        <Navigate to="/"></Navigate>
    ) : (
        <div>Loadinggggg</div>
    );
};
