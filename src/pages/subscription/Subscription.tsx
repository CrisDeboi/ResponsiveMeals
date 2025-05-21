import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubPlan from "../../components/SubPlan/SubPlan";
import "./Subscription.css";
import { fetchSuscripciones } from "../../services/Api";
import { getCurrentUser } from "../../services/AuthService";

interface Suscripcion {
  idSuscripcion: number;
  nombre: string;
  precio: number;
  descripcion: string;
  cantidadPlatos: number;
}

interface Cliente {
  idCliente: number;
  nombre: string;
  email: string;
  token: string; 
}

function Subscription() {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Cliente | null>(null);


  useEffect(() => {
  const fetchUser = async () => {
    const currentUser = await getCurrentUser();
    console.log("Usuario logeado:"+currentUser.nombre)
    setUser(currentUser);
  };
  fetchUser();
}, []);


  useEffect(() => {
    const getSuscripciones = async () => {
      try {
        setLoading(true);
        const suscripcionesData = await fetchSuscripciones();
        setSuscripciones(suscripcionesData);
        setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    getSuscripciones();
  }, []);
  
  const suscripcionesFiltradas = suscripciones.filter(
    (suscripcion) => suscripcion.nombre !== "NO"
  );

  if (loading) {
    return <div>Cargando suscripciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="subscription-subtitle">
          <strong>Elige el plan que mejor se adapte a tus necesidades</strong>
        </div>
        <div className="subplans-container">
          {suscripcionesFiltradas.map((suscripcion) => (
            <SubPlan
              key={suscripcion.idSuscripcion}
              title={suscripcion.nombre}
              price={suscripcion.precio}
              description={suscripcion.descripcion}
              id={suscripcion.idSuscripcion}             
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Subscription;