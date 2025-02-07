import { Modal } from "react-bootstrap";
import "./CardUser.css";
import { useState } from "react";

interface Pedido {
  id_pedido: string;
  direccion: string;
  metodo_pago: string;
  coste_total: string;
}

interface CardProps {
  id: string;
  cardName: string;
  cardEmail: string;
  cardSuscription: string;
  pedidos: Pedido[];
  onClick: () => void;
}

function CardUser(props: CardProps) {
  const { cardName, cardEmail, cardSuscription, pedidos, onClick } = props;
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    onClick(); 
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <ul onClick={handleShow}>
        <li>{cardName}</li>
        <li>{cardEmail}</li>
        <li>{cardSuscription}</li>
      </ul>
      <Modal show={showModal} onHide={handleClose} centered style={{ border: 0 }}>
        <Modal.Header closeButton closeVariant="" closeLabel="Cerrar" style={{ padding: 0, border: 0 }}></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FDE1C1", border: "0px" }}>
          <p>
            <strong>Pedidos de </strong>
            {cardName}
          </p>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "#FDE1C1", border: "0px" }}>
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
    </>
  );
}

export default CardUser;
