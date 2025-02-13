/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchData, fetchPedido } from "../../services/Api";
import Header from "../../components/Header/Header";
import "./Clientes.css";
import CardUser from "../../components/CardUsers/CardUser";

function Usuarios() {
  const [search, setSearch] = useState(""); 
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null); 

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        setLoading(true);
        const usuariosData = await fetchData();
        setUsuarios(usuariosData);
        setError(null);
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    getUsuarios();
  }, []);

  useEffect(() => {
    const getPedidos = async () => {
      try {
        setLoading(true);
        const pedidosData = await fetchPedido();
        setPedidos(pedidosData);
        setError(null);
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    getPedidos();
  }, []);

  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleDeletePedido = (idPedido: string) => {
    setPedidos((prevPedidos) => prevPedidos.filter(pedido => pedido.id_pedido !== idPedido))
  }

  // Filtrar usuarios según la búsqueda
  const listaUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="App">
        <h1>Usuarios</h1>
        <h2>Buscar en la lista</h2>
        <input
          type="text"
          placeholder="Escribe un nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Cargando usuarios...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="tablaUsuarios">
            {listaUsuarios.length > 0 ? (
              listaUsuarios.map((usuario) => {
                console.log("Usuario:", usuario); 
                return (
                  <CardUser
                    key={usuario.idCliente}
                    id={usuario.idCliente}
                    cardId={usuario.idCliente}
                    cardName={usuario.nombre}
                    cardEmail={usuario.email}
                    cardSuscription={usuario.suscripcion}
                    cardPassword={usuario.contrasena}
                    cardPhone={usuario.telefono}
                    cardDate={usuario.fechaRegistro}
                    pedidos={pedidos.filter((pedido) => pedido.id_cliente === usuario.idCliente)} 
                    onClick={() => handleUserClick(usuario.idCliente)}
                    onDeletePedido={handleDeletePedido}
                  />
                );
              })
            ) : (
              <p>No se encontraron usuarios</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Usuarios;
