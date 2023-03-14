import { Header } from "../components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fafafa",
            dark: "#bdbdbd",
            contrastText: "#000",
        },
        secondary: {
            main: "#00aba0",
            dark: "#007e70",
            light: "#e86f6d",
            contrastText: "#fff",
        },
    },
});

const Root = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (cookies.token) setIsAuthorized(true);
        else setIsAuthorized(false);
    });

    return (
        <ThemeProvider theme={theme}>
            <div className=" bg-stone-300 h-screen">
                <Header isAuthorized={isAuthorized} />
                <main className=""></main>
            </div>
        </ThemeProvider>
    );
};

export default Root;
