const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//Define o esquema da entidade, sendo a representação da entidade no BD
const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs:[String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

  //Aqui, eu exporto o modelo recém criado, como um modelo de banco
  module.exports = mongoose.model('Dev', DevSchema);