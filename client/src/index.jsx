import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.css";
import Root from "./routes/root";
import { Dashboard } from "./routes/dashboard";
import ErrorPage from "./error-page";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute route="/dashboard">
                <Dashboard></Dashboard>
            </ProtectedRoute>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
