import { Card as BootstrapCard } from "react-bootstrap";
import "./CardCart.css";

interface CardProps {
  cardImg: string;
  cardName: string;
<<<<<<<<< Temporary merge branch 1
=========
  cardPrice: number;
>>>>>>>>> Temporary merge branch 2
  cardQuantity: number;
}

function CardCart(props: CardProps) {
<<<<<<<<< Temporary merge branch 1
  const { cardImg, cardName, cardQuantity } = props;
=========
    const { cardImg, cardName, cardPrice, cardQuantity } = props;
>>>>>>>>> Temporary merge branch 2

  return (
    <>
      <div className="cardcart-layout">
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
              height: "5vh",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>{cardQuantity}</div>
            </div>
          </BootstrapCard.Body>
        </BootstrapCard>
      </div>
    </>
  );
}

export default CardCart;
