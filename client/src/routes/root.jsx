import { Form } from "../components/Form";
import { Logout } from "../components/Logout";

const Root = () => {
    return (
        <div>
            <Form type="register" />
            <Form type="login" />
            <Logout></Logout>
        </div>
    );
};

export default Root;
