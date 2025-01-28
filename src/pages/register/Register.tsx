import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./Register.css";

function Register() {
  return (
    <>
      <Header />
      <div className="container">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
