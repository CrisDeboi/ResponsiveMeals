import Carousel from "react-bootstrap/Carousel";
import BurgerImg from "../../assets/burgirImg.jpg";
import PaellaImg from "../../assets/PaellaImg.jpg";
import PotatoesImg from "../../assets/PotatoesImg.jpg";
import "./Carousel.css";

function CarouselX() {
  return (
    <Carousel
      touch={true}
      style={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Carousel.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <img
            src={BurgerImg}
            alt="Hamburguesa"
            style={{ height: "170px", width: "400px", objectFit: "cover" }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <img
            src={PotatoesImg}
            alt="Papas"
            style={{ height: "170px", width: "400px", objectFit: "cover" }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <img
            src={PaellaImg}
            alt="Paella"
            style={{ height: "170px", width: "400px", objectFit: "cover" }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselX;
