
export default function Navbar({ onAgregar }) {
  return (
    <nav className="navbar">
      <h1>Cocina Chilena</h1>
      <button className="btn-agregar" onClick={onAgregar}>
        + Agregar Plato
      </button>
    </nav>
  );
}