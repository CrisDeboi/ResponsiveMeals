import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAdmin } from '../../services/AuthService';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsAdminUser(adminStatus);
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) return null ;
  if (!isAdminUser) return <Navigate to="/" replace />;
  
  return children;
};

export default AdminRoute;