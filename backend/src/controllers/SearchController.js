const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
  async index(request, response) {
    
    //Filtrar por techs
    const { latitude, longitude, techs } = request.query;
    const techsArray = parseStringAsArray(techs);

    //Buscar todos Dev em um raio de 10km
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },

      //Criar variáveis para o tipo de filtro?!
    });

    return response.json({devs});
  }

}