import { useState, useEffect } from 'react';
import { fetchPlatosChilenos } from './services/api';
import Navbar from './components/Navbar';
import MenuPizarra from './components/MenuPizarra';
import './App.css';

function App() {
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('cocina_chilena_menu');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error cargando persistencia:', error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('cocina_chilena_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    if (menu.length === 0) {
      cargarMenu();
    }
  }, []);

  const cargarMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const platos = await fetchPlatosChilenos();
      const hidratados = platos.map((p) => ({
        ...p,
        precio: 0,
        disponible: true,
      }));
      setMenu(hidratados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarPlato = () => {
    const nombre = window.prompt('Nombre del plato:');
    if (!nombre) return;

    const imagen = window.prompt('URL de la imagen (opcional):');
    const precioInput = window.prompt('Precio del plato (número positivo):');

    const precioNum = Number(precioInput);
    if (Number.isNaN(precioNum) || precioNum < 0) {
      alert('Precio inválido (debe ser un número positivo)');
      return;
    }

    const nuevoId = Date.now().toString();
    const nuevoPlato = {
      idMeal: nuevoId,
      strMeal: nombre,
      strMealThumb: imagen || 'https://via.placeholder.com/150',
      precio: precioNum,
      disponible: true,
    };

    setMenu((prev) => [...prev, nuevoPlato]);
  };

  const actualizarPrecio = (id, nuevoPrecio) => {
    const num = Number(nuevoPrecio);
    if (Number.isNaN(num) || num < 0) {
      alert('Precio inválido (debe ser número positivo)');
      return;
    }
    setMenu((prev) =>
      prev.map((p) => (p.idMeal === id ? { ...p, precio: num } : p))
    );
  };

  const eliminarPlato = (id) => {
    setMenu((prev) => prev.filter((p) => p.idMeal !== id));
  };

  return (
    <div className="app">
      <Navbar onAgregar={agregarPlato} />
      {loading && <p className="mensaje-carga">Cargando menú...</p>}
      {error && (
        <div className="mensaje-error">
          <p>Error: {error}</p>
          <button onClick={cargarMenu}>Reintentar</button>
        </div>
      )}
      {!loading && !error && (
        <MenuPizarra
          menu={menu}
          onEditar={actualizarPrecio}
          onEliminar={eliminarPlato}
        />
      )}
    </div>
  );
}

export default App;