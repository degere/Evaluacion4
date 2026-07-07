import PlatoCard from './PlatoCard';

export default function MenuPizarra({ menu, onEditar, onEliminar }) {
  return (
    <div className="menu-pizarra">
      {menu.map(plato => (
        <PlatoCard
          key={plato.idMeal}
          plato={plato}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}