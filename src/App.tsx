import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
import Subscription from "./pages/subscription/Subscription";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./context/CartContext";
import Clientes from "./pages/clientes/Clientes";
import Report from "./pages/reports/Report";
import RegisterReal from "./pages/register/RegisterReal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectecRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import UnprotectedRoute from "./components/UnprotectedRoute/UnprotectedRoute";

function App() {  
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />          
          <Route path="/login" element={
            <UnprotectedRoute><Login /></UnprotectedRoute>} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/registerReal" element={<RegisterReal />} />
          <Route path="/subscription" element={
            <Subscription />} />
          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/clientes" element={
            <ProtectedRoute>
              <AdminRoute><Clientes /></AdminRoute>
            </ProtectedRoute>} />
          <Route path="/help" element={<Navigate to="./pages/Help/ResumendelaAplicacion.html" />} />
          <Route path="/report" element={
            <AdminRoute><Report /></AdminRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;