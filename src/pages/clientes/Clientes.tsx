import { useEffect, useState } from "react";
import { fetchData } from "../../services/Api";
import Header from "../../components/Header/Header";


function Usuarios() {
  const [search, setSearch] = useState(""); // Búsqueda del usuario
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value); // Actualiza la búsqueda

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        setLoading(true); // Inicia la carga
        const usuariosData = await fetchData(); // Llama a la función centralizada
        setUsuarios(usuariosData); // Guarda los datos
        setError(null); // Limpia errores
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    getUsuarios();
  }, []);

  // Filtrar usuarios según la búsqueda
  const listaUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Header/>
    <div className="App">
      <h1>Usuarios</h1>
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
          {listaUsuarios.length > 0 ? (
            listaUsuarios.map((usuario: { id: string; nombre: string; email: string }) => (
              <li key={usuario.id}>
                {usuario.nombre} - {usuario.email} {/* Ajusta según la estructura de tu API */}
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

export default Usuarios;
