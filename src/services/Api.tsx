export const fetchData = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/clientes");   
  const data = await response.json();
  return data;
};
export const fetchComida = async () => {
  const response = await fetch("http://localhost:8080/responsivemeals/comidas");   
  const data = await response.json();
  return data;
};
