import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/AuthService";

export const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiresIn = payload.exp * 1000 - Date.now();

    if (expiresIn <= 0) {
      logout();
      navigate('/login');
      return;
    }

    const warningTime = Math.min(expiresIn - 60000, 300000);
    const warningTimeout = warningTime > 0 ? setTimeout(() => {
      alert('Tu sesión expirará en 1 minuto');
    }, warningTime) : null;

    const timeout = setTimeout(() => {
      logout();
      alert('Tu sesión ha expirado');
      navigate('/login');
    }, expiresIn);

    return () => {
      clearTimeout(timeout);
      warningTimeout && clearTimeout(warningTimeout);
    };
  }, [navigate]);
};