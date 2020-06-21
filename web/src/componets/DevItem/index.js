import React from 'react';
//import api from '../../services/api';


import './styles.css';

const DevItem = ({onDelete, dev}) => { 

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
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
      <button
        onClick={onDelete}
      >
        Remover
      </button>
    </li>
  )  
}

export default DevItem;