import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header.tsx";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {  
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Header test", () => {
  test("se renderiza el titulo", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titulo = screen.getByText("ResponsiveMeals");
    expect(titulo).toBeInTheDocument();
  });

  test("el Offcanvas se abre y cierra correctamente, cargan sus iconos", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menuButton = screen.getByTestId("icon-bars");
    fireEvent.click(menuButton);
    
    const offCanvas = await screen.findByRole("dialog");
    expect(offCanvas).toBeInTheDocument();

    // iconos
    const menuIcon = screen.getByTestId("icon-bars");
    const homeIcon = screen.getByTestId("icon-home");
    const listIcon = screen.getByTestId("icon-list");
    const loginIcon = screen.getByTestId("icon-login");
    const subIcon = screen.getByTestId("icon-sub");
    const cartIcon = screen.getByTestId("icon-cart");
    const closeIcon = screen.getByTestId("icon-close");

    expect(menuIcon).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
    expect(listIcon).toBeInTheDocument();
    expect(loginIcon).toBeInTheDocument();
    expect(subIcon).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
    
    const closeButton = screen.getByTestId("icon-close");
    fireEvent.click(closeButton);    
    await screen.findByRole("dialog", { hidden: true });
  });

  test("los botones del menú navegan a las rutas correctas", async () => {   
    const mockNavigate = vi.fn();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menuButton = screen.getByTestId("icon-bars");
    fireEvent.click(menuButton);
    
    const offCanvas = await screen.findByRole("dialog");
    expect(offCanvas).toBeInTheDocument();

    
    screen.getByText(/inicio/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    
    screen.getByText(/lista de platos/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/list");
    
    screen.getByText(/login/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    
    screen.getByText(/suscripciones/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/subscription");
    
    screen.getByText(/carrito/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
