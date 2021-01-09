import React from 'react';
//import api from '../../services/api';


import './styles.css';

const DevItem = ({onDelete, onchange, dev}) => { 

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>          
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <p>{dev.techs.join(', ')}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
      <div className="options">
        <button
          className="deleteDev"
          onClick={onDelete}
        >
          Remover
        </button>
        <button
          className="updateDev"
          onClick={onchange}
        >
          Editar
        </button>
      </div>
    </li>
  )  
}

export default DevItem;