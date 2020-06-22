const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');
const mongoose = require('mongoose');

module.exports = {
  //Rota de inserção (create)
  async store (request, response) {
  
    const {github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({github_username});
    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const {name = login, avatar_url, bio} = apiResponse.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return response.json(dev); 
  },

  //Rota de listagem (read)
  async index (request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  //Rota de atualização
  async update (request,response) {
    const {github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({github_username});

    if (!dev) {dev='Dev não encontrado.'} else {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const {name = login, bio, avatar_url} = apiResponse.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
      const filter = {github_username: github_username};
      const update = {$set: {name: name, github_username: github_username, bio: bio, avatar_url: avatar_url, techs: techsArray, location: location}};
      const showNew = {new:true};

      dev = await Dev.findOneAndUpdate(filter, update, showNew);
    }  
    return response.json(dev);
  },

  //Rota de exclusão
  async destroy (request, response) {       
    const id = request.params.id;

    try {
      console.log(id);
      let dev = await Dev.findByIdAndRemove(id, {useFindAndModify: false});      
      response.json(dev);
    } catch(e) {      
      response.json({Erro: e});
    }

    return response;
  }

}