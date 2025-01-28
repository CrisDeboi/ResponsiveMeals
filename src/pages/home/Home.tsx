import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Home.css";
import tacosImage from "../../assets/tacos.jpg";
import espaguetisImage from "../../assets/espaguetis.jpg";
import tupperImage from "../../assets/tuppers.jpg";
import Footer from "../../components/Footer/Footer";
import CarouselX from "../../components/Carousel/Carousel";
import { Button } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container">
        <div className="welcome">
          <h2>¡Bienvenido a ResponsiveMeals!</h2>
        </div>

        <div className="buttonContainer">
          <Button style={{backgroundColor:"#C65D1A",borderColor:"#C65D1A", width:"10em"}} onClick={() => navigate("/list")}><strong>¡Planea tu Menú!</strong></Button>
          <Button style={{backgroundColor:"#C65D1A",borderColor:"#C65D1A", width:"10em"}} onClick={() => navigate("/subscription")}><strong>Gestionar Suscripción</strong></Button>          
          
        </div>

        <CarouselX />       

        <div className="offer">
          <p id="offer">
            Elige entre más de 50 platos con los que elaborar tus menús del día
            a día
          </p>
        </div>

        <div className="description">
          <div className="descriptionText">
            <p id="descriptionText">
              Podrás personalizar tu menú semanal con nuestros modelos de
              suscripción
            </p>
          </div>
          <div className="descriptionImg">
            <img src={tacosImage} alt="tacos" />
          </div>
        </div>
        <div className="description">
          <div className="descriptionImg">
            <img src={espaguetisImage} alt="espqguetis" />
          </div>
          <div className="descriptionText">
            <p id="descriptionText">
              También podrás elegir libremente platos sueltos
            </p>
          </div>
        </div>
        <div className="description">
          <div className="descriptionText">
            <p id="descriptionText">Recibirás tu comida en envases adaptados</p>
          </div>
          <div className="descriptionImg">
            <img src={tupperImage} alt="tuppers" />
          </div>
        </div>

        <div className="shipments1">
          <p>Envíos todos los lunes*</p>
        </div>

        <div className="shipments2">
          <p>*Para Gran Canaria y tenerife</p>
        </div>
        
      </div>
      <Footer/>
      
      
    </>
  );
}

export default Home;
