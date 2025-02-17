import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Test del Footer", () => {
  test("renderiza los titulos y elementos de texto alternativo", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    // títulos
    expect(screen.getByText("Navegación")).toBeInTheDocument();
    expect(screen.getByText("Informacion")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Entidades colaboradoras:")).toBeInTheDocument();
    expect(screen.getByText("ResponsiveMeals")).toBeInTheDocument();

    // alts
    expect(screen.getByAltText("El Rincón")).toBeInTheDocument();
    expect(screen.getByAltText("Bootstrap")).toBeInTheDocument();
    expect(screen.getByAltText("instagram")).toBeInTheDocument();
    expect(screen.getByAltText("twitter")).toBeInTheDocument();
    expect(screen.getByAltText("github")).toBeInTheDocument();
  });

  test("los enlaces de navegación redirigen a las rutas correctas de la aplicación", () => {
    const mockNavigate = vi.fn();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Inicio"));
    expect(mockNavigate).toHaveBeenCalledWith("/");

    fireEvent.click(screen.getByText("Menú"));
    expect(mockNavigate).toHaveBeenCalledWith("/list");

    fireEvent.click(screen.getByText("Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    fireEvent.click(screen.getByText("Suscripciones"));
    expect(mockNavigate).toHaveBeenCalledWith("/subscription");

    fireEvent.click(screen.getByText("Carrito"));
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });

  test("los enlaces externos tienen las URLs correctas", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const elRinconLink = screen.getByAltText("El Rincón").closest("a");
    expect(elRinconLink).toHaveAttribute("href", "https://ieselrincon.es");
    expect(elRinconLink).toHaveAttribute("target", "_blank");

    const bootstrapLink = screen.getByAltText("Bootstrap").closest("a");
    expect(bootstrapLink).toHaveAttribute("href","https://react-bootstrap.netlify.app");
    expect(bootstrapLink).toHaveAttribute("target", "_blank");

    const instagramLink = screen.getByAltText("instagram").closest("a");
    expect(instagramLink).toHaveAttribute("href","https://www.instagram.com/cristian_sin_hxd/");
    expect(instagramLink).toHaveAttribute("target", "_blank");

    const twitterLink = screen.getByAltText("twitter").closest("a");
    expect(twitterLink).toHaveAttribute("href", "https://x.com/RinconGameDevs");
    expect(twitterLink).toHaveAttribute("target", "_blank");

    const githubLink = screen.getByAltText("github").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/CrisDeboi");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("simular carga de imágenes", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const error = vi.spyOn(console, "error");
    const load = vi.spyOn(console, "log");
    
    const instagramImage = screen.getByAltText("instagram");
    const twitterImage = screen.getByAltText("twitter");
    const rinconImage = screen.getByAltText("El Rincón");
    const githubImage = screen.getByAltText("github");
    const bootstrapImage = screen.getByAltText("Bootstrap");

    fireEvent.error(instagramImage);
    fireEvent.load(instagramImage);
    expect(error).toHaveBeenCalledWith("instagram-error");
    expect(load).toHaveBeenCalledWith("instagram-load");    
    
    fireEvent.error(twitterImage);
    fireEvent.load(twitterImage);
    expect(error).toHaveBeenCalledWith("twitter-error");
    expect(load).toHaveBeenCalledWith("twitter-load");   
    
    fireEvent.error(rinconImage);
    fireEvent.load(rinconImage);
    expect(error).toHaveBeenCalledWith("rincon-error");
    expect(load).toHaveBeenCalledWith("rincon-load");
    
    fireEvent.error(githubImage);
    fireEvent.load(githubImage);
    expect(error).toHaveBeenCalledWith("github-error");
    expect(load).toHaveBeenCalledWith("github-load");

    fireEvent.error(bootstrapImage);
    fireEvent.load(bootstrapImage);
    expect(error).toHaveBeenCalledWith("bootstrap-error");
    expect(load).toHaveBeenCalledWith("bootstrap-load");
  });

});
