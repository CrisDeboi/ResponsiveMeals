import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import Cart from "./Cart";
import { CartProvider } from "../../context/CartContext";
import { faker } from "@faker-js/faker";

describe("Test del componente Cart", () => {
  const mockCartItems = [
    {
      id: "1",
      cardImg: "../../assets/burgir.jpg",
      cardName: "Burgir",
      cardPrice: 10,
      count: 2,
    },
    {
      id: "2",
      cardImg: "../../assets/lasaña.jpg",
      cardName: "Lasaña",
      cardPrice: 15,
      count: 1,
    },
  ];

  test("si el carrito está vacío, el precio total debería ser 0 y no actualizarse al meter direccion de envio", async () => {
    render(
      <BrowserRouter>
        <CartProvider
          initialValue={{
            cartItems: [], // Carrito vacío
            addToCart: () => {},
          }}
        >
          <Cart />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("total-platos")).toHaveTextContent("0€");
    expect(screen.getByTestId("gastos-envio")).toHaveTextContent("0€");
    expect(screen.getByTestId("total-pedido")).toHaveTextContent("0€");

    const direccionEnvio = screen.getByLabelText(/Dirección de envío/i);

    fireEvent.change(direccionEnvio, {
      target: { value: faker.address.streetAddress() },
    });
    await waitFor(() =>
      expect(screen.getByTestId("gastos-envio")).toHaveTextContent("0€")
    );
    expect(screen.getByTestId("total-pedido")).toHaveTextContent("0€");


  });

  test("calcular precio total, sin y con direccion de envio", async () => {
    render(
      <BrowserRouter>
        <CartProvider
          initialValue={{
            cartItems: mockCartItems,
            addToCart: () => {},
          }}
        >
          <Cart />
        </CartProvider>
      </BrowserRouter>
    );

    // sin direccion
    expect(screen.getByTestId("total-platos")).toHaveTextContent("35.00€"); // Total = 20€ + 15€
    expect(screen.getByTestId("gastos-envio")).toHaveTextContent("0€");
    expect(screen.getByTestId("total-pedido")).toHaveTextContent("35.00€"); // Total con direccion vacia

    // con direccion
    const direccionEnvio = screen.getByLabelText(/Dirección de envío/i);

    fireEvent.change(direccionEnvio, {
      target: { value: faker.address.streetAddress() },
    });
    await waitFor(() =>
      expect(screen.getByTestId("gastos-envio")).toHaveTextContent("5.95€")
    );
    expect(screen.getByTestId("total-pedido")).toHaveTextContent("40.95€");
  });
});