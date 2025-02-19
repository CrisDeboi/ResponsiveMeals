import Header from "../../components/Header/Header";
import "./Login.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Login() {

    return (
        <>
            <Header />
            <div className="container">
                <div className="login-logo-container">
                    <div className="login-logo">
                        <FontAwesomeIcon icon={faUser} fontSize="10em" />
                    </div>
                </div>                
                    <div className="login-form-container">
                        <LoginForm />
                    </div>
                
            </div>
        </>
    )
}

export default Login;