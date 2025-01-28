import { useEffect, useState } from "react";
import { fetchData } from "../../services/Api";
import Header from "../../components/Header/Header";


function Clientes() {
  const [search, setSearch] = useState(""); // Búsqueda del usuario
  const [clientes, setClientes] = useState([]); // Lista de usuarios
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value); // Actualiza la búsqueda

  useEffect(() => {
    const getClientes = async () => {
      try {
        setLoading(true); // Inicia la carga
        const clientesData = await fetchData(); // Llama a la función centralizada
        setClientes(clientesData); // Guarda los datos
        setError(null); // Limpia errores
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    getClientes();
  }, []);

  // Filtrar usuarios según la búsqueda
  const listaClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Header/>
    <div className="App">
      <h1>Clientes</h1>
      <h2>Buscar en la lista</h2>
      <input
        type="text"
        placeholder="Escribe un nombre"
        value={search}
        onInput={change}
      />

      {/* Mostrar estados de carga o error */}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Renderizar la lista de usuarios */}
      {!loading && !error && (
        <ul>
          {listaClientes.length > 0 ? (
            listaClientes.map((cliente: { id: string; nombre: string; email: string }) => (
              <li key={cliente.id}>
                {cliente.nombre} - {cliente.email} {/* Ajusta según la estructura de tu API */}
              </li>
            ))
          ) : (
            <p>No se encontraron usuarios</p>
          )}
        </ul>
      )}
    </div>
    
    </>
  );
}

export default Clientes;
