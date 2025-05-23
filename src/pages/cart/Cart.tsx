import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Cart.css";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CardCart from "../../components/CardCart/CardCart";
import { SetStateAction, useEffect, useState } from "react";
import {
  createPedido,
  DetallePedidoDTO,
  PedidoRequest
} from "../../services/Api";
import { getCurrentUser, isUnsub } from "../../services/AuthService";

interface User {
  idCliente: number;
  nombre: string;
  email: string;
  suscripcion: {
    idSuscripcion: number;
    nombre: string;
    descripcion: string;
    cantidadPlatos: number;
    precio: number;
  };
}

function Cart() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddres] = useState("");
  const [debounceAddress, setDebounceAddress] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceAddress(address);
    }, 800);
    return () => clearTimeout(timer);
  }, [address]);

  const handleAddressChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAddres(e.target.value);
  };

  const handlePurchase = async () => {
    try {
      if (totalPlatos === 0) {
        setError(
          "El carrito está vacío. Seleccione primero platos de la lista."
        );
        return;
      }

      if (debounceAddress.trim() === "") {
        setError("Especifique una dirección de envío válida por favor.");
        return;
      }

      // Obtener ID del cliente
      const currentCliente = await getCurrentUser();
      const idCliente = currentCliente.idCliente;

      // Mapear los items del carrito a DTOs
      const detalles: DetallePedidoDTO[] = cartItems.map((item) => ({
        idComida: Number(item.id),
        cantidad: item.count,
      }));

      // Crear el objeto de pedido
      const pedidoRequest: PedidoRequest = {
        clienteId: idCliente,
        direccion: debounceAddress,
        metodoPago: "Tarjeta",
        detalles: detalles,
      };

      // Enviar el pedido al backend
      await createPedido(pedidoRequest);

      // Limpiar el carrito
      clearCart();

      setError("");
      alert("Compra realizada con éxito. Buen provecho 😋");
      navigate("/");
    } catch (error) {
      setError("Error al procesar el pedido. Por favor, inténtelo de nuevo.");
      console.error("Error en la compra:", error);
    }
  };

  const goToSub = () => {
    navigate("/subscription");
  };

  const totalPlatos = cartItems.reduce(
    (acc, item) => acc + item.cardPrice * item.count,
    0
  );
  const gastosEnvio =
    debounceAddress.trim() === "" || totalPlatos === 0 ? 0 : 5.95;
  const totalPrecio =
    totalPlatos + gastosEnvio === gastosEnvio ? 0 : totalPlatos + gastosEnvio;
  const totalPlatosFormateado = totalPlatos.toFixed(2);
  const totalPrecioFormateado = totalPrecio.toFixed(2);
  return (
    <>
      <Header />
      <div className="container">
        <div className="cart-container">
          <div className="cart-orders">
            {cartItems.map((item) => (
              <CardCart
                key={`${item.id}-${item.count}`}
                cardName={item.cardName}
                cardImg={item.cardImg}
                cardPrice={item.cardPrice}
                cardQuantity={item.count}
              />
            ))}
          </div>
          <div className="cart-summary">
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Form>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label
                  style={{
                    color: "#C65D1A",
                  }}
                >
                  <strong>Dirección de envío:</strong>
                </Form.Label>
                <Form.Control value={address} onChange={handleAddressChange} />
              </Form.Group>
            </Form>
            <div className="cart-subtitle">
              <strong>Resumen:</strong>
            </div>
            {isUnsub() && (
              <div className="cart-summary-description">
                <div className="cart-summary-text">
                  <div>
                    <strong>Platos:</strong>
                  </div>
                  <div>
                    <strong>Gastos de envío:</strong>
                  </div>
                  <div>
                    <strong>Total:</strong>
                  </div>
                </div>
                <div className="cart-summary-prices">
                  <div data-testid="total-platos">
                    <strong>{totalPlatosFormateado}€</strong>
                  </div>
                  <div data-testid="gastos-envio">
                    <strong>{gastosEnvio}€</strong>
                  </div>
                  <div data-testid="total-pedido">
                    <strong>{totalPrecioFormateado}€</strong>
                  </div>
                </div>
              </div>
            )}
            {!isUnsub() && (
              <div className="cart-summary-description">
                <div className="cart-summary-text">                  
                  <div>
                    <strong>Total:</strong>
                  </div>
                </div>
                <div className="cart-summary-prices">
                  <div data-testid="total-platos">
                    <strong>Incluido en la suscripcion</strong>
                  </div>                 
                </div>
              </div>
            )}

            <div className="cart-summary-button-container">
              <Button
                variant="primary"
                onClick={handlePurchase}
                style={{ backgroundColor: "#C65D1A", borderColor: "#C65D1A" }}
              >
                Comprar
              </Button>
            </div>
            {isUnsub() && (
              <div className="cart-summary-advertisement">
                ¿Aún no tienes una suscripción activa?
              </div>)}
            {isUnsub() && (
              <div className="cart-summary-button-container">
                <Button
                  variant="primary"
                  onClick={goToSub}
                  style={{
                    backgroundColor: "#C65D1A",
                    borderColor: "#C65D1A",
                    width: "35vw",
                  }}
                >
                  Gestionar suscripción
                </Button>
              </div>)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
