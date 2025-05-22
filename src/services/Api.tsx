/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { getToken } from "./AuthService";

//Autenticación
const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
// Metodos para Clientes
export const fetchClientes = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/responsivemeals/clientes", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};

export const handleAdd = async (
  nombre: string,
  // suscripcion: string,
  email: string,
  contrasena: string,
  telefono: string
) => {
  try {
    const registerResponse = await fetch(
      "http://localhost:8080/responsivemeals/clientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          nombre,
          // suscripcion,
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
    const token = getToken(); // Verifica que esto no sea `null` o `undefined`
    console.log("Token usado para DELETE:", token); // ← Añade este log para depuración

    const deleteResponse = await fetch(
      `http://localhost:8080/responsivemeals/clientes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log("Respuesta del servidor:", deleteResponse.status); // ← Verifica el código de estado HTTP

    if (deleteResponse.ok) {
      return "Borrado exitoso.";
    } else {
      const errorData = await deleteResponse.json().catch(() => null);
      return errorData?.message || "Hubo un error al borrar el usuario.";
    }
  } catch (error) {
    console.error("Error en handleDelete:", error); // ← Esto te dará más detalles del error
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
  const response = await fetch("http://localhost:8080/responsivemeals/pedidos", {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    }
  });
  const data = await response.json();  
  return data;
};

export interface DetallePedidoDTO {
  idComida: number;
  cantidad: number;
}

export interface PedidoRequest {
  clienteId: number;
  direccion: string;
  metodoPago: string;
  detalles: DetallePedidoDTO[];
}

export const createPedido = async (pedidoRequest: PedidoRequest) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/responsivemeals/pedidos",
      pedidoRequest,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creando el pedido");
  }
};

export const eliminarPedido = async (id: string) => {
  const url = `http://localhost:8080/responsivemeals/pedidos/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
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
        'Authorization': `Bearer ${getToken()}`,
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
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getToken()}`,
        },
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
  const response = await fetch("http://localhost:8080/responsivemeals/detallepedidos", {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    }
  });
  const data = await response.json();
  return data;
};

export const createDetallePedido = async (detalle: any) => {
  const response = await fetch("http://localhost:8080/responsivemeals/detallepedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(detalle),
  });
  
  if (!response.ok) {
    throw new Error("Error al crear el detalle del pedido");
  }
  return await response.json();
};



//Métodos para Suscripciones

export const fetchSuscripciones = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/suscripciones");
  const data = await response.json();
  return data;
};

export const getSuscripcion = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/suscripciones/");
  const data = await response.json();
  return data;
};




// export const getClientId = async (id: number) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/clientes/${id}`, {
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     return response.data.idCliente;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     throw new Error("Error obteniendo el ID del cliente");
//   }
// };