import React, { useState , useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './componets/DevItem';
import DevForm from './componets/DevForm';

function App() {

  const [devs, setDevs] = useState([]);
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {   
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDelete (dev) {
    const devsCopy = Array.from(devs);

    try {
    
      if (await api.delete(`/devs/${dev._id}`)) {

        for (var i = devsCopy.length - 1; i >=0; i--) {
          if (devsCopy[i] === dev) {
            devsCopy.splice(i, 1);
          }
        }
        setDevs(devsCopy);

      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  //Pesquisar sobre API de contexto
  //Criar possibilidades para editar e excluir o dev
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              onDelete={() => handleDelete(dev)}
            />
          ))}          
        </ul>

      </main>

    </div>
    
  );
}

export default App;
