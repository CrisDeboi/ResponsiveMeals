/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./List.css";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import Footer from "../../components/Footer/Footer";
import { fetchComida } from "../../services/Api";
const images = import.meta.glob("/src/assets/*", { eager: true });

const getImage = (imgName: string) => {
  return (images[`/src/assets/${imgName}`] as { default: string })?.default;
};

function List() {
  interface SelectedItems {
    [key: string]: { quantity: number };
  }
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [comidas, setComidas] = useState<any[]>([]); // Estado para almacenar los datos de la BD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  useEffect(() => {
    const getComidas = async () => {
      try {
        setLoading(true);
        const data = await fetchComida(); // Llama a la función que obtiene los datos de la BD
        setComidas(data);
        setError(null);
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    getComidas();
  }, []);

  const handleQuantityChange = (id: string | number, quantity: any) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: {
        ...(prevState[id] || {}),
        quantity,
      },
    }));
  };

  const handleAddSelection = () => {
    const itemsToAdd = Object.entries(selectedItems)
      .filter(([_, item]) => item.quantity > 0)
      .map(([id, item]) => {
        const comida = comidas.find((c) => c.idComida === Number(id));
        return {
          id: comida.idComida,
          ...comida,
          count: item.quantity,
        };
      });

    if (itemsToAdd.length === 0) {
      window.alert("Por favor, selecciona al menos un producto.");
      return;
    }

    itemsToAdd.forEach((item) => {
      addToCart(item);
    });

    setShowModal(true);
  };

  return (
    <>
      <Header />
      <Filter />
      <div className="cardContainer">
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          comidas.map((comida) => (
            <Card
              key={comida.id}
              id={comida.idComida}
              cardName={comida.nombre}
              cardPrice={comida.precio}
              cardDescription={comida.descripcion}
              cardServing={comida.racion}
              cardEnergy={comida.valenergetico}
              cardCarbohydrates={comida.carbohidratos}
              cardProteins={comida.proteinas}
              cardFats={comida.grasas}
              cardFiber={comida.fibra}
              cardImg={getImage(comida.img)}
              onQuantityChange={handleQuantityChange}
            />
          ))}
      </div>
      <div className="buttonListContainer">
        <Button
          variant="secondary"
          onClick={handleAddSelection}
          style={{
            backgroundColor: "#C65D1A",
            borderColor: "#C65D1A",
          }}
        >
          Añadir selección
        </Button>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#FDE1C1" }}>
            <p>Platos añadidos correctamente a tu carrito</p>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#FDE1C1" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ backgroundColor: "#C65D1A" }}
            >
              Seguir Eligiendo
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/cart")}
              style={{ backgroundColor: "#C65D1A" }}
            >
              Ir al carrito
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default List;
