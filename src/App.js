import React, { useState, useEffect } from 'react';

const App = () => {
  const [mascotas, setMascotas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://18.217.210.136/mascotas')
      .then(response => response.json())
      .then(data => {
        console.log("Datos recibidos:", data); // 👈 Agregado para depurar
        setMascotas(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const filteredMascotas = search
    ? mascotas.filter(mascota => mascota.nombre.toLowerCase().includes(search.toLowerCase()))
    : mascotas;

  return (
    <div style={styles.container}>
      <input 
        style={styles.searchBar}
        type="text" 
        placeholder="Buscar mascota..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <ul style={styles.list}>
        {filteredMascotas.map((mascota) => (
          <li key={mascota.id} style={styles.item}>
            <strong>{mascota.nombre}</strong> - {mascota.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  searchBar: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    marginBottom: '10px',
    borderRadius: '5px'
  }
};

export default App;
