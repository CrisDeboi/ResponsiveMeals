import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { BrowserRouter } from "react-router-dom";

describe("Test del formulario", () => {
  test("error si se envía el formulario con campos vacíos", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Crear cuenta"));

    expect(
      screen.getByText("Por favor, complete todos los campos.")
    ).toBeInTheDocument();
  });

  test("de inicio no debe haber mensaje de error", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    expect(
      screen.queryByText("Por favor, complete todos los campos.")
    ).not.toBeInTheDocument();
  });

  test("muestra alerta de éxito al completar el formulario correctamente usando datos generados por Faker", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password({ length: 6 });
    const fakeAddress = faker.address.streetAddress();
    const fakeCity = faker.address.city();
    const fakeZip = faker.address.zipCode("#####");
    const fakeProvince = "Las Palmas";

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: fakeEmail },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: fakePassword },
    });
    fireEvent.change(screen.getByLabelText(/Dirección/i), {
      target: { value: fakeAddress },
    });
    fireEvent.change(screen.getByLabelText(/Municipio/i), {
      target: { value: fakeCity },
    });
    fireEvent.change(screen.getByLabelText(/Código Postal/i), {
      target: { value: fakeZip },
    });
    fireEvent.change(screen.getByLabelText(/Provincia/i), {
      target: { value: fakeProvince },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(alertMock).toHaveBeenCalledWith("Cuenta creada con éxito");

    alertMock.mockRestore();
  });

  test("muestra mensaje de error al completar el formulario con datos erroneos generados por Faker", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    const fakeEmail = faker.internet.email();
    var fakePassword = faker.internet.password({ length: 4 });
    const fakeAddress = faker.address.streetAddress();
    const fakeCity = faker.address.city();
    var fakeZip = faker.address.zipCode("#######");
    

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: fakeEmail },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: fakePassword },
    });
    fireEvent.change(screen.getByLabelText(/Dirección/i), {
      target: { value: fakeAddress },
    });
    fireEvent.change(screen.getByLabelText(/Municipio/i), {
      target: { value: fakeCity },
    });
    fireEvent.change(screen.getByLabelText(/Código Postal/i), {
      target: { value: fakeZip },
    });
    

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      screen.getByText("La contraseña debe tener al menos 6 caracteres.")
    ).toBeInTheDocument();
    fakePassword = faker.internet.password({ length: 6 });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: fakePassword },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      screen.getByText("El código postal debe tener 5 dígitos numéricos.")
    ).toBeInTheDocument();
    fakeZip = faker.address.zipCode("#####");
    fireEvent.change(screen.getByLabelText(/Código Postal/i), {
      target: { value: fakeZip },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      screen.getByText("Por favor, seleccione una provincia.")
    ).toBeInTheDocument();
  });

  test("no permite escribir números en el campo Municipio", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    
    const municipioInput = screen.getByLabelText(/Municipio/i);
    
    fireEvent.change(municipioInput, { target: { value: "Las Palmas" } });
    expect(municipioInput).toHaveValue("Las Palmas");
   
    fireEvent.change(municipioInput, { target: { value: "12345" } });
    expect(municipioInput).toHaveValue("Las Palmas");
    
    fireEvent.change(municipioInput, { target: { value: "Palmas1100" } });
    expect(municipioInput).toHaveValue("Las Palmas"); 
  });

  test("no permite escribir letras en el campo Código Postal", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    
    const municipioInput = screen.getByLabelText(/Código Postal/i);
    
    fireEvent.change(municipioInput, { target: { value: "35400" } });
    expect(municipioInput).toHaveValue("35400");
   
    fireEvent.change(municipioInput, { target: { value: "Arucas" } });
    expect(municipioInput).toHaveValue("35400");
    
    fireEvent.change(municipioInput, { target: { value: "123Arucas" } });
    expect(municipioInput).toHaveValue("35400"); 
  });



});
