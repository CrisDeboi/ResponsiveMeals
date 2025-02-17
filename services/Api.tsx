/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Metodos para Clientes
export const fetchData = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/clientes");   
  const data = await response.json();
  return data;
};
export const handleAdd = async (
  nombre: string,
  suscripcion: string,
  email: string,
  contrasena: string,
  telefono: string
) => {
  try {
    const registerResponse = await fetch(
      "http://localhost:8080/responsivemeals/clientes",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          suscripcion,
          email,
          contrasena,
          telefono,
        }),
      }
    );

    if (registerResponse.ok) {
      return "Registro exitoso.";
    } else {
      return "Hubo un error al registrar el usuario.";
    }
  } catch (error) {
    return "Error de conexión con el servidor.";
  }
};

export const handleDelete = async (id: number) => {
  try {
    const deleteResponse = await fetch(
      `http://localhost:8080/responsivemeals/clientes/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (deleteResponse.ok) {
      return "Borrado exitoso.";
    } else {
      return "Hubo un error al borrar el usuario.";
    }
  } catch (error) {
    return "Error de conexión con el servidor.";
  }
};

//Métodos para Comidas
export const fetchComida = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/comidas");   
  const data = await response.json();
  return data;
};


//Métodos para Pedidos
export const fetchPedido = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/pedidos");   
  const data = await response.json();
  return data;
};

export const createPedido = async (pedido: any) => {
  const response = await fetch("http://localhost:8080/responsivemeals/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });
  if (!response.ok) {
    throw new Error("Error al crear el pedido");
  }
  return await response.json();
};

export const eliminarPedido = async (id: string) => {
  const url = `http://localhost:8080/responsivemeals/pedidos/${id}`; 

  try {
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el pedido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    throw error;  
  }
};

export const actualizarPedido = async (pedido: any) => {
  try {
    console.log("Enviando datos para actualizar:", pedido); 

    const response = await fetch(`http://localhost:8080/responsivemeals/pedidos/${pedido.id_pedido}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    console.log("Respuesta completa de la API:", response); 

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Error al actualizar el pedido: ${response.status} - ${errorText}`);
    }

    const updatedPedido = await response.json();
    console.log("Pedido actualizado correctamente:", updatedPedido); 
    return updatedPedido;
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    throw error;
  }
};

export const updateUser = async (id: number, updatedData: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/responsivemeals/clientes/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al actualizar el usuario.");
    }
  } catch (error) {
    console.error("Error en la actualización:", error);
    return null;
  }
};

//Métodos para Detalles

export const fetchDetalle = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/detallepedidos");   
  const data = await response.json();
  return data;
};
