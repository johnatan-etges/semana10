//Informa que vai precisar apenas da classe/funcionalidade Router do pacote express
const {Router} = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();
//Chamada de rota com definição de arrow function async
routes.post('/devs', DevController.store);

//Informa que o módulo exporta as rotas
module.exports = routes;