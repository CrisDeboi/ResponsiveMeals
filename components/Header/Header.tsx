import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faBars, faCartShopping, faEuroSign, faHome, faQuestion, faUser, faUtensils, } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const navigate = useNavigate();  
  const goToHome = () => {
    navigate("/");
  };
  const goToList = () => {
    navigate("/list");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToSub = () => {
    navigate("/subscription");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const goToHelp = () => {
    window.open("src/pages/Help/Introduccion.html");
  };
  return (
    <>
      <div className="header">
        <div className="header-title"><h1 id="title">ResponsiveMeals</h1></div>
        <div className="header-icon" onClick={toggleShow}><FontAwesomeIcon data-testid="icon-bars" icon={faBars} style={{ fontSize: "2em", color: "#fde1c1", }} /></div>
        <div className="offcanvas-container">
        <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true} placement="end" style={{
          height: "40vh",
          width: "auto",
          backgroundColor: "#f47521",
        }}>
          <Offcanvas.Header data-testid="icon-close" closeButton style={{
            overflow:"hidden",
          }}>
          </Offcanvas.Header>
          <Offcanvas.Body style={{
            padding: "0",
            margin: "0",
          }}>
            <Navbar.Brand onClick={goToHome} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-home" icon={faHome} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "30px", }} />
              Inicio
            </Navbar.Brand>
            <Navbar.Brand onClick={goToList} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-list" icon={faUtensils} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "35px", }} />
              Lista de platos
            </Navbar.Brand>
            <Navbar.Brand onClick={goToLogin} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-login" icon={faUser} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "35px", }} />
              Login
            </Navbar.Brand>
            <Navbar.Brand onClick={goToSub} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-sub" icon={faEuroSign} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "40px", }} />
              Suscripciones
            </Navbar.Brand>
            <Navbar.Brand onClick={goToCart} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-cart" icon={faCartShopping} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "30px", }} />
              Carrito
            </Navbar.Brand>
            <Navbar.Brand onClick={goToHelp} style={{ color: "#fde1c1", width: "100%",cursor:"pointer", display: "block", borderTop: "solid", borderBottom: "solid", margin: "0", padding: "5px" }}>
              <FontAwesomeIcon data-testid="icon-question" icon={faQuestion} style={{ fontSize: "1.2em", color: "fde1c1", marginRight: "30px", }} />
              Ayuda
            </Navbar.Brand>
          </Offcanvas.Body>
        </Offcanvas>

        </div>
        



      </div>
    </>
  );
}

export default Header;
