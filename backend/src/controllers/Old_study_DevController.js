const axios = require('axios');
const Dev = require('../models/Dev');

//As 5 funções básicas de um controller:
//index: Lista informações
//show/search: encontrar informações com base em filtros
//store: adicionar informações
//update: alterar informações
//destroy: eliminar informações

module.exports = {
  //Toda esta seção foi transferida para cá com o objetivo de abstração
  //Foi removida a seta, pois não é mais uma arrow function, agora 
  //é uma named fuction
  async store (request, response) {
  //Deconstrução do request em variáveis
  const {github_username, techs, latitude, longitude} = request.body;

  //Chamada dos dados na API utilizando o axios, utilizando o await
  const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  //Apenas continua após finalizar o código acima
  //Desconstroi o retorno em variáveis com os dados que eu quero buscar
  //Em "name = login", caso não haja nada em "name", este vai assumir o valor de "login"
  const {name = login, avatar_url, bio} = apiResponse.data;

  const techsArray = techs.split(',').map(tech => tech.trim());

  //Cria a constante para inclusão dos dados de geoposicionamento no BD
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
    };

  const dev = await Dev.create({
    //Short sintax quando variável e valor têm o mesmo nome
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location,
    });

  console.log(name, avatar_url, bio, github_username);
  return response.json(dev); 
  },

  //Rota de listagem (read)
  async index (request, response) {
    //Traz a listagem de todos os registros encontrados.
    const devs = await Dev.find();
    return response.json(devs);
  },

  //Rota de atualização
  async update (request,response) {
    const {github_username, techs, latitude, longitude} = request.body;
    //Busca no banco algum registro que siga o critério estabelecido
    let dev = await Dev.findOne({github_username});

    if (!dev) {dev='Dev não encontrado.'} else {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const {name = login, bio, avatar_url} = apiResponse.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
      //Define os parâmetros para atualizar do registro
      const filter = {github_username: github_username};
      const update = {$set: {name: name, github_username: github_username, bio: bio, avatar_url: avatar_url, techs: techsArray, location: location}};
      const showNew = {new:true};

      const dev = await Dev.findOneAndUpdate(filter, update, showNew);
    }  
    return response.json(dev);
  }
};