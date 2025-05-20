// services/AuthService.ts
import axios from 'axios';

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
  } catch (error) {
    throw new Error("Error en el login");
  }
};

export const saveToken = (token: string) => {
  localStorage.setItem('authToken', token);  
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem('authToken');
};