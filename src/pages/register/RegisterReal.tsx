import Header from "../../components/Header/Header";
import RegisterFormReal from "../../components/RegisterForm/RegisterFormReal";
import "./Register.css";

function RegisterReal() {
  return (
    <>
      <Header />
      <div className="container">
        <RegisterFormReal />
      </div>
    </>
  );
}

export default RegisterReal;
