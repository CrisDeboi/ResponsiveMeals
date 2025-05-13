/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./RegisterForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { handleAdd } from "../../services/Api";

function RegisterFormReal() {
  const navigate = useNavigate();

  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [suscripcion, setSuscripcion] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    const message = await handleAdd(nombre, email, contrasena, telefono);
    setMessage(message);
  };
  
  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !email.trim() ||
      !nombre.trim() ||
      !telefono.trim() ||
      !contrasena.trim() ||
      !suscripcion.trim()
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, introduzca un correo electrónico válido.");
      return;
    }

    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const cityRegex = /^[1234567890]+$/;
    if (!cityRegex.test(telefono)) {
      setError("El teléfono solo puede contener números.");
      return;
    }

    if (suscripcion === "Elige...") {
      setError("Por favor, seleccione una suscripción.");
      return;
    }

    setError("");
    alert("Cuenta creada con éxito");
    navigate("/");
  };

  const handleZipChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setZip(value);
    }
  };

  return (
    <Form
      onSubmit={handleRegister}
      style={{
        marginTop: "5vh",
      }}
    >
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="johnresponsive@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Form.Group>
      </Row>

      {/* <Form.Group controlId="formGridState">
        <Form.Label>Suscripción</Form.Label>
        <Form.Select
          value={suscripcion}
          onChange={(e) => setSuscripcion(e.target.value)}
        >
          <option>Elige...</option>
          <option>NO</option>
          <option>ESTANDAR</option>
          <option>PREMIUM</option>
        </Form.Select>
      </Form.Group> */}

      <div className="register-button-container">
        <Button
          variant="primary"
          type="submit"
          onClick={registerUser}
          style={{
            backgroundColor: "#C65D1A",
            borderColor: "#C65D1A",
            marginTop: "2vh",
          }}
        >
          Crear cuenta
        </Button>
      </div>
    </Form>
  );
}

export default RegisterFormReal;
