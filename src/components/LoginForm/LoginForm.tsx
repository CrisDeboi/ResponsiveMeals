// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [error, setError] = useState("");

  const handleErrorAndGoToList = () => {
    if(!email.trim() || !password.trim()){
      setError("Datos introducidos incorrectos.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, introduzca un correo electrónico válido.");
      return;
    }
    setError("");
    navigate("/list");    
  };

  

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Form>
       {error && ( 
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      <Row className="mb-3">
        <Form.Group className="mb-3"  controlId="validationCustom01" style={{
            marginTop:"5vh"
        }}>
          <Form.Label style={{ color:"#C65D1A"}}><strong>Email:</strong></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="p.ej.: johnresponsive@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>               
      </Row>
      <Row>
      <Form.Group controlId="validationCustom02" style={{
            marginTop:"5vh"
        }}>
          <Form.Label style={{ color:"#C65D1A"}}><strong>Contraseña:</strong></Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group> </Row>     
      
      <div className='form-button-container'>
      <Button onClick={handleErrorAndGoToList}style={{
        backgroundColor: "#C65D1A",
        borderColor: "#C65D1A"
      }}>Iniciar Sesión</Button>
      <Button onClick={goToRegister}style={{
        backgroundColor: "#C65D1A",
        borderColor: "#C65D1A"
      }}>Registrarse</Button>
      </div>    


    </Form>
  );
}

export default LoginForm;