import { useState } from "react";
import "./RegisterForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("Elige...");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !address.trim() || !city.trim() || !zip.trim()) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, introduzca un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      setError("El código postal debe tener 5 dígitos numéricos.");
      return;
    }

    const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!cityRegex.test(city)) {
      setError("El municipio solo puede contener letras.");
      return;
    }

    if (province === "Elige...") {
      setError("Por favor, seleccione una provincia.");
      return;
    }

    setError("");
    alert("Cuenta creada con éxito");
    navigate("/");
  };

  const handleZipChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setZip(value);
    }
  };

  const handleCityChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      setCity(value);
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

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGridState">
        <Form.Label>Provincia</Form.Label>
        <Form.Select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option>Elige...</option>
          <option>Las Palmas</option>
          <option>SC de Tenerife</option>
        </Form.Select>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Municipio</Form.Label>
          <Form.Control
            value={city}
            onChange={handleCityChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            value={zip}
            onChange={handleZipChange}
          />
        </Form.Group>
      </Row>

      <div className="register-button-container">
        <Button
          variant="primary"
          type="submit"
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

export default RegisterForm;
