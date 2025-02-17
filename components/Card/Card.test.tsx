import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import Card from "./Card";
import { CartProvider } from "../../context/CartContext";

describe("Test del componente Card", () => {
  const defaultProps = {
    id: "1",
    cardImg: "../../assets/burgir.jpg",
    cardName: "Burgir",
    cardDescription: "Test Description",
    cardPrice: 10,
    cardServing: 100,
    cardEnergy: 200,
    cardCarbohydrates: 30,
    cardProteins: 10,
    cardFats: 5,
    cardFiber: 2,
    onQuantityChange: vi.fn(),
  };

  
  test("mostrar la ventana modal al hacer clic en la imagen", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Card {...defaultProps} />
        </CartProvider>
      </BrowserRouter>
    );

    const image = screen.getByAltText(defaultProps.cardName);

    expect(
      screen.queryByText(/Descripción del plato/i)
    ).not.toBeInTheDocument();

    fireEvent.click(image);
    expect(screen.getByText(/Descripción del plato/i)).toBeInTheDocument();
  });

  test("no permitir valores negativos con el botón `-` y aumentar con el botón `+`", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Card {...defaultProps} />
        </CartProvider>
      </BrowserRouter>
    );

    const restar = screen.getByText("-");
    const sumar = screen.getByText("+");
    const counter = screen.getByText("0");

    // Intentar disminuir desde 0
    fireEvent.click(restar);
    expect(counter).toHaveTextContent("0");

    // Incrementar el contador
    fireEvent.click(sumar);
    expect(counter).toHaveTextContent("1");

    // Intentar disminuir desde 1
    fireEvent.click(restar);
    expect(counter).toHaveTextContent("0");
  });


  /*test("debería añadir el producto al contexto al hacer clic en `+`", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Card {...defaultProps} />
          <CartStateViewer /> 
        </CartProvider>
      </BrowserRouter>
    );

    
    const image = screen.getByAltText(defaultProps.cardName);

    // El carrito debería estar vacío inicialmente
    expect(screen.getByTestId("cart-state")).toHaveTextContent("[]");

    fireEvent.click(image);
    const sumar = screen.getByText("Añadir");
    
    fireEvent.click(sumar);    
    expect(screen.getByTestId("cart-state")).toHaveTextContent(
      JSON.stringify([
        {
          id: "1",
          cardName: "Burgir",
          cardImg: "../../assets/burgir.jpg",
          cardDescription: "Test Description",
          cardPrice: 10,
          count: 1,
        },
      ])
    );
  });*/
});
