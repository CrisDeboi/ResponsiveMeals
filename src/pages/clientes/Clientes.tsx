/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchClientes, fetchComida, fetchPedido, handleDelete } from "../../services/Api";
import Header from "../../components/Header/Header";
import "./Clientes.css";
import CardUser from "../../components/CardUsers/CardUser";


interface Comida {
  idComida: number;
  nombre: string;  
}

function Usuarios() {
  const [search, setSearch] = useState(""); 
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null); 
  const [comidas, setComidas] = useState<Comida[]>([]);

  useEffect(() => {
    const getComidas = async () => {
      try {
        const comidasData = await fetchComida();
        console.log("Datos de comidas recibidos:", comidasData);
        setComidas(comidasData); 
      } catch (err) {
        console.error("Error al cargar comidas:", err);
        setError("Hubo un problema al cargar los datos.");
        setComidas([]); 
      }
    };
    getComidas();
  }, []);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        setLoading(true);
        const usuariosData = await fetchClientes();
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
      console.log("Pedidos obtenidos:", pedidosData);
      setPedidos(pedidosData);
      setError(null);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
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
  const handleDeleteUsuario = async (idUsuario: number) => {
  try {
    const result = await handleDelete(idUsuario); 
    
    if (result === "Borrado exitoso.") {
      setUsuarios(prev => prev.filter(usuario => usuario.idCliente !== idUsuario));
    } else {
      setError("No se pudo eliminar el usuario");
    }
  } catch (error) {
    setError("Error al conectar con el servidor");
    console.error("Error al eliminar usuario:", error);
  }
}

 // Filtrar usuarios según la búsqueda y excluir el usuario 'admin'
const listaUsuarios = usuarios.filter((usuario) =>
  usuario.nombre.toLowerCase().includes(search.toLowerCase()) &&
  usuario.nombre.toLowerCase() !== 'admin'
);

  

  const refreshPedidos = async () => {
    try {
      const pedidosData = await fetchPedido();
      setPedidos(pedidosData);
    } catch (err) {
      setError("Hubo un problema al cargar los pedidos.");
    }
  };

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
          className="search-bar"
        />

        {loading && <p>Cargando usuarios...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="tablaUsuarios">
            {listaUsuarios.length > 0 ? (
              listaUsuarios.map((usuario) => {
                console.log("Usuario:", usuario.idCliente, usuario.nombre); 
                return (
                  <CardUser
                    key={usuario.idCliente}
                    id={usuario.idCliente}
                    cardId={usuario.idCliente}
                    cardName={usuario.nombre}
                    cardEmail={usuario.email}
                    cardSuscription={usuario.suscripcion.nombre}
                    cardPassword={usuario.contrasena}
                    cardPhone={usuario.telefono}
                    cardDate={usuario.fechaRegistro}
                    pedidos={pedidos.filter((pedido) => pedido.id_cliente === usuario.idCliente)} 
                    comidas={comidas}
                    onClick={() => handleUserClick(usuario.idCliente)}
                    onDeletePedido={handleDeletePedido}
                    deleteUser={handleDeleteUsuario}
                    
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
