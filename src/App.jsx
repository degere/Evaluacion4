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

      const platosHidratados = platos.map((plato) => ({
        ...plato,
        precio: 0,
        disponible: true,
      }));
      setMenu(platosHidratados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarPlato = (nuevoPlato) => {

    const precioNum = Number(nuevoPlato.precio);
    if (Number.isNaN(precioNum) || precioNum < 0) {
      alert('El precio debe ser un número positivo.');
      return;
    }

    const nuevoId = Date.now().toString();

    const platoConId = {
      ...nuevoPlato,
      idMeal: nuevoId,
      precio: precioNum,
      disponible: true,
    };

    setMenu((prev) => [...prev, platoConId]);
  };


  const actualizarPrecio = (id, nuevoPrecio) => {
    const precioNum = Number(nuevoPrecio);
    if (Number.isNaN(precioNum) || precioNum < 0) {
      alert('El precio debe ser un número positivo.');
      return;
    }

    setMenu((prev) =>
      prev.map((plato) =>
        plato.idMeal === id ? { ...plato, precio: precioNum } : plato
      )
    );
  };


  const eliminarPlato = (id) => {
    setMenu((prev) => prev.filter((plato) => plato.idMeal !== id));
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