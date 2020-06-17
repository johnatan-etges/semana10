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
        //Operador que diz: Buscar algo que esteja neste array
        $in: techsArray,
      },
      //Buscar as coordenadas dentro de 10Km
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({devs});
  }

}