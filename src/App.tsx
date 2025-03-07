import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Subscription from "./pages/subscription/Subscription";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./context/CartContext";
import Clientes from "./pages/clientes/Clientes";
import Report from "./pages/reports/Report";
import RegisterReal from "./pages/register/RegisterReal";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerReal" element={<RegisterReal />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/help" element={<Navigate to="./pages/Help/ResumendelaAplicacion.html" />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;