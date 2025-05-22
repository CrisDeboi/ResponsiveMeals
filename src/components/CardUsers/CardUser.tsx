/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Modal, Form, Col } from "react-bootstrap";
import { useState } from "react";
import {
  createPedido,
  eliminarPedido,
  actualizarPedido,
  handleDelete,
  updateUser,
} from "../../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CardUser.css";

interface Pedido {
  id_pedido: string;
  direccion: string;
  metodo_pago: string;
  coste_total: string;  
}

interface CardProps {
  id: string;
  cardId: number;
  cardName: string;
  cardEmail: string;
  cardSuscription: string;
  cardPassword: string;
  cardPhone: string;
  cardDate: string;
  pedidos: Pedido[];

  onClick: () => void;
  onDeletePedido: (id: string) => void;
  deleteUser: (cardId: number) => void;
}

function CardUser(props: CardProps) {
  const {
    cardId,
    cardName,
    cardEmail,
    cardSuscription,
    cardPassword,
    cardPhone,
    cardDate,
    pedidos,
    onClick,
    onDeletePedido,
    deleteUser,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [costeTotal, setCosteTotal] = useState("");
  const [error, setError] = useState("");
  const [currentPedido, setCurrentPedido] = useState<Pedido | null>(null);
  const [showEditar, setEditarModal] = useState(false);
  const [editedName, setEditedName] = useState(cardName);
  const [editedEmail, setEditedEmail] = useState(cardEmail);
  const [editedPassword, setEditedPassword] = useState(cardPassword);
  const [editedPhone, setEditedPhone] = useState(cardPhone);
  // const [editedSuscription, setEditedSuscription] = useState(cardSuscription);

  const editUser = async () => {
    const updatedData = {
      nombre: editedName,
      email: editedEmail,
      contrasena: editedPassword,
      telefono: editedPhone,
      // suscripcion: editedSuscription,
    };

    try {
      const response = await updateUser(cardId, updatedData);
      if (response) {
        console.log("Usuario actualizado correctamente.");
        setEditarModal(false);
        window.location.reload();
      } else {
        console.log("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);

    }
  };
  const handleShow = () => {
    console.log("Id del Usuario mostrado:" + props.id);
    onClick();
    setShowModal(true);
  };
  const handleShowEdit = () => {
    onClick();
    setEditarModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setIsFormVisible(false);
    resetForm();
  };
  const handleCloseEditar = () => setEditarModal(false);
  const handleEliminarPedido = async (idPedido: string) => {
    try {
      const pedidoEliminado = await eliminarPedido(idPedido);
      onDeletePedido(idPedido);
      console.log("Pedido eliminado:", pedidoEliminado);
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
    }
  };
  const handleEliminarUsuario = async (idUsuario: number) => {
    try {
      const pedidoEliminado = await handleDelete(idUsuario);
      console.log("Pedido eliminado:", pedidoEliminado);
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
    }
  };
  const handleEditPedido = (pedido: Pedido) => {
    setCurrentPedido(pedido);
    setDireccion(pedido.direccion);
    setMetodoPago(pedido.metodo_pago);
    setCosteTotal(pedido.coste_total);
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!direccion || !metodoPago || !costeTotal) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const costeTotalNumber = parseFloat(costeTotal);

    if (isNaN(costeTotalNumber)) {
      setError("El coste total debe ser un número válido");
      return;
    }

    console.log(
      "Datos:" + direccion + metodoPago + costeTotalNumber + props.id
    );

    if (currentPedido) {
      const pedidoEditado = {
        ...currentPedido,
        direccion,
        metodo_pago: metodoPago,
        coste_total: costeTotalNumber,
        cliente: { idCliente: Number(props.id) },
      };

      try {
        const updatedPedido = await actualizarPedido(pedidoEditado);
        console.log("Pedido editado:", updatedPedido);

        const updatedPedidos = pedidos.map((p) =>
          p.id_pedido === updatedPedido.id_pedido ? updatedPedido : p
        );
        props.pedidos = updatedPedidos;
        resetForm();
        setError("");
        setShowModal(false);
        //window.location.reload();
      } catch (error) {
        //window.location.reload();
        // console.error("Error al editar el pedido:", error);
        // setError("Hubo un error al editar el pedido. Intenta de nuevo.");

      }
    } else {
      const nuevoPedido = {
        clienteId: Number(props.id),
        metodoPago: metodoPago,
        direccion,
        coste_total: costeTotalNumber,
        detalles: []
      };

      try {
        const creado = await createPedido(nuevoPedido);
        console.log("Pedido creado:", creado);
        props.pedidos = [...pedidos, creado];
        resetForm();
        setShowModal(false);
      } catch (error) {
        console.error("Error al crear el pedido:", error);
        setError("Hubo un error al crear el pedido. Intenta de nuevo.");
      }
    }
  };

  const resetForm = () => {
    setDireccion("");
    setMetodoPago("");
    setCosteTotal("");
    setError("");
    setCurrentPedido(null);
  };

  return (
    <>
      <div className="datosPeroMas">
        <div className="datos" >
          <ul className="columna1">
            <li onClick={handleShow}>{cardName}</li>
            <li onClick={handleShow}>{cardEmail}</li>
            <li onClick={handleShow}>{cardSuscription}</li>
            <Button
              onClick={handleShowEdit}
              style={{ backgroundColor: "#C65D1A", borderColor: "#C65D1A", width: "2.5em", height: "2.5em" }}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
          </ul>
          <ul className="columna2">
            <li onClick={handleShow}>{cardPassword}</li>
            <li onClick={handleShow}>{cardDate}</li>
            <li onClick={handleShow}>{cardPhone}</li>
            <Button
              style={{ backgroundColor: "#C65D1A", borderColor: "#C65D1A", width: "2.5em", height: "2.5em" }}
              onClick={() => props.deleteUser(props.cardId)}
            >
              X
            </Button>
          </ul>
        </div>
        <div className="botones">

        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#FDE1C1" }}>
          <Modal.Title>
            <strong>Pedidos de {cardName}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FDE1C1" }}>
          {pedidos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dirección</th>
                  <th>Método de pago</th>
                  <th>Coste total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id_pedido}>
                    <td>{pedido.id_pedido}</td>
                    <td>{pedido.direccion}</td>
                    <td>{pedido.metodo_pago}</td>
                    <td>{pedido.coste_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Este usuario no tiene pedidos.</p>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditar}
        onHide={handleCloseEditar}
        centered
        style={{ border: 0 }}
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          closeLabel="Cerrar"
          style={{ padding: 0, border: 0 }}
        ></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FDE1C1", border: "0px" }}>
          <p>
            <strong>Editar datos de </strong>
            {cardName}
          </p>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "#FDE1C1", border: "0px" }}>
          <Form
            style={{
              marginTop: "5vh",
            }}
          >
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="johnresponsive@gmail.com"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="formGridState">
              <Form.Label>Suscripción</Form.Label>
              <Form.Select
                value={editedSuscription}
                onChange={(e) => setEditedSuscription(e.target.value)}
              >
                <option>Elige...</option>
                <option>NO</option>
                <option>ESTANDAR</option>
                <option>PREMIUM</option>
              </Form.Select>
            </Form.Group> */}

            <Button
              variant="primary"
              type="button"
              onClick={editUser}
              style={{
                backgroundColor: "#C65D1A",
                borderColor: "#C65D1A",
                marginTop: "2vh",
              }}
            >
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Body style={{ backgroundColor: "#FDE1C1" }}>
          <p>
            <strong>Pedidos de </strong>
            {cardName}
          </p>
          {!isFormVisible ? (
            <>
              {pedidos.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Dirección</th>
                      <th>Método de pago</th>
                      <th>Coste total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id_pedido}>
                        <td>{pedido.id_pedido}</td>
                        <td>{pedido.direccion}</td>
                        <td>{pedido.metodo_pago}</td>
                        <td>{pedido.coste_total}</td>
                        <td>
                          <Button
                            style={{
                              backgroundColor: "#C65D1A",
                              borderColor: "#C65D1A",
                            }}
                            onClick={() => handleEditPedido(pedido)}
                          >
                            <FontAwesomeIcon
                              icon={faPencil}
                              style={{ fontSize: "0.8em", color: "#fde1c1" }}
                            />
                          </Button>
                          <Button
                            onClick={() =>
                              handleEliminarPedido(pedido.id_pedido)
                            }
                            style={{
                              backgroundColor: "#C65D1A",
                              borderColor: "#C65D1A",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              style={{ fontSize: "0.8em", color: "#fde1c1" }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Este usuario no tiene pedidos.</p>
              )}
              <Modal.Footer
                style={{
                  display: "flex",
                  backgroundColor: "#FDE1C1",
                  justifyContent: "flex-end",
                  border: "0px",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => setIsFormVisible(true)}
                  style={{
                    backgroundColor: "#C65D1A",
                    borderColor: "#C65D1A",
                  }}
                >
                  Añadir Pedido
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Método de pago</Form.Label>
                <Form.Control
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Coste Total</Form.Label>
                <Form.Control
                  value={costeTotal}
                  onChange={(e) => setCosteTotal(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#C65D1A",
                    borderColor: "#C65D1A",
                  }}
                  onClick={editUser}
                >
                  {currentPedido ? "Actualizar Pedido" : "Añadir Pedido"}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardUser;
