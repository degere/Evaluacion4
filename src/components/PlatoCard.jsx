export default function PlatoCard({ plato, onEditar, onEliminar }) {
  const handleEditar = () => {
    const nuevoPrecio = window.prompt('Ingrese el nuevo precio:', plato.precio);
    if (nuevoPrecio !== null) {
      onEditar(plato.idMeal, nuevoPrecio);
    }
  };

  return (
    <div className="plato-card">
      <img src={plato.strMealThumb} alt={plato.strMeal} />
      <h3>{plato.strMeal}</h3>
      <p>Precio: ${plato.precio}</p>
      <button onClick={handleEditar}>Editar</button>
      <button onClick={() => onEliminar(plato.idMeal)}>Eliminar</button>
    </div>
  );
}