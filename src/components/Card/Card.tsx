import { useState } from "react";
import { Card as BootstrapCard, Button, Modal } from "react-bootstrap";
import "./Card.css";

interface CardProps {
  id: string;
  cardImg: string;
  cardName: string;
  cardDescription?: string;
  cardPrice?: number;
  cardServing?: number;
  cardEnergy?: number;
  cardCarbohydrates?: number;
  cardProteins?: number;
  cardFats?: number;
  cardFiber?: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

function Card(props: CardProps) {
  const {
    id,
    cardImg,
    cardName,
    cardDescription,
    cardPrice,
    cardServing,
    cardEnergy,
    cardCarbohydrates,
    cardProteins,
    cardFats,
    cardFiber,
  } = props;
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const increment = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    props.onQuantityChange(id, newCount);
  };

  const decrease = () => {
    const newCount = Math.max(0, counter - 1);
    setCounter(newCount);
    props.onQuantityChange(id, newCount);
  };

  const handleCloseAndAdd = () => {
    increment();
    handleClose();
  };

  return (
    <>
      <div className="card-layout">
        <BootstrapCard
          style={{
            width: "auto",
            height: "25vh",
            borderRadius: "10px",
            marginTop: "20px",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <BootstrapCard.Img
            variant="top"
            src={cardImg}
            alt={cardName}
            onClick={handleShow}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <BootstrapCard.Body
            style={{
              backgroundColor: "#F89D53",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              height: "8vh",
              overflowY: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="counterButton" onClick={() => decrease()}>
                -
              </div>
              <div>{counter}</div>
              <div className="counterButton" onClick={() => increment()}>
                +
              </div>
            </div>
          </BootstrapCard.Body>
        </BootstrapCard>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        style={{ border: 0 }}
      >
        <Modal.Header
          closeButton
          closeLabel="Cerrar"
          style={{ padding: 0, border: 0 , margin:0, backgroundColor: "#FDE1C1"}}
        >
          <img
            src={cardImg}
            alt={cardName}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#FDE1C1",
            border: "0px",
          }}
        >
          <p>
            <strong>Descripción del plato: </strong>
            {cardDescription}
          </p>
        </Modal.Body>
        <Modal.Body
          style={{
            backgroundColor: "#FDE1C1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: "0px",
          }}
        >
          <div className="nutrition-container">
            <div>Ración:</div>
            <div>Valor energético:</div>
            <div>Carbohidratos:</div>
            <div>Proteinas:</div>
            <div>Grasas:</div>
            <div>Fibra:</div>
          </div>
          <div className="values-container">
            <div>{cardServing}g</div>
            <div>{cardEnergy}kcal</div>
            <div>{cardCarbohydrates}g</div>
            <div>{cardProteins}g</div>
            <div>{cardFats}g</div>
            <div>{cardFiber}g</div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            backgroundColor: "#FDE1C1",
            justifyContent: "space-between",
            border: "0px",
          }}
        >
          <div>
            <strong>Precio:{cardPrice}€</strong>
          </div>
          <Button
            variant="secondary"
            onClick={handleCloseAndAdd}
            style={{
              backgroundColor: "#C65D1A",
              borderColor: "#C65D1A",
            }}
          >
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Card;
