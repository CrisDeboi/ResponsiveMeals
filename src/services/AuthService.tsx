// services/AuthService.ts
import axios from 'axios';
import { fetchClientes } from './Api';

// AuthService.tsx
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/clientelogin",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Error en el login");
  }
};

export const saveToken = (token: string) => {
  localStorage.setItem('authToken', token);  
};

export const saveSubscription = (subscription: string) => {
  localStorage.setItem('subscription', subscription);  
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const getSubscription = () => {
  return localStorage.getItem('subscription');
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const isUnsub = (): boolean => {
  const sub = getSubscription();
  if(sub==="NO") return !!sub
  return !sub;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('subscription');
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return true;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentToken = getToken();
    if (!currentToken) {
      console.log("No hay token almacenado");
      return null;
    }

    const usuariosData = await fetchClientes();  
    const currentUser = usuariosData.find(
      (cliente: { token: string | null }) => cliente.token === currentToken
    );

    if (!currentUser) {
      console.log("Usuario no encontrado con el token actual");
      return null;
    }

    // console.log("Usuario actual encontrado:", currentUser.nombre);
    return currentUser;
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
};

export const isAdmin = async (): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser(); 
    return currentUser?.nombre?.toLowerCase() === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};