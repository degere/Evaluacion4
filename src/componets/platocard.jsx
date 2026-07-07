// src/components/PlatoCard.jsx
export default function PlatoCard({ plato, onEditar, onEliminar }) {
  return (
    <div className="plato-card">
      <img src={plato.strMealThumb} alt={plato.strMeal} />
      <h3>{plato.strMeal}</h3>
      <p>Precio: ${plato.precio}</p>
      <p>Disponible: {plato.disponible ? '✅' : '❌'}</p>
      <button onClick={() => onEditar(plato.idMeal)}>Editar</button>
      <button onClick={() => onEliminar(plato.idMeal)}>Eliminar</button>
    </div>
  );
}