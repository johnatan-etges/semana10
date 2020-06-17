//www.omnistack.com/users <= Rota == o que está após a barra
//cria a constante que requer o framework express
const express = require('express');
//cria a constante app que vai criar o aplicativo
const app = express();
//Importa o módulo de rotas
const routes = require('./routes');

//Conecta ao banco de dados MongoDB através do framework mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://johnatantestes:testesmongodb@cluster0-phbgg.mongodb.net/omnistack10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//Informo ao express que quero utilizar o JSON
app.use(express.json());7
//Informa que o app utiliza o objeto routes, deve vir depois do use json
app.use(routes);

//Métodos HTTP:
//GET: Buscar informação - Único método que pode ser acessado pelo navegador de modo "simples"
//POST: Criar informação
//PUT: Atualizar informação
//Delete: Remover informação

//Tipos de Parâmetros
//Query params: Quase sempre utilizados no método GET req.query / Filtros, ordenação. paginação, etc.
//Route params: Usados com os métodos PUT e DELETE. Usado para informar qual informação alterar, ou excluir. req.params
//Body: Utilizado principalmente nos métodos POST e PUT para receber as informações da requisição request.body

//Define a rota padrão do app. Recebe uma segunda função
//"Arrow function", que não precisa ser declarada na definição
//Os parâmetros são sempre fixos req (request)  e res (response)
//Exemplo de uso do método GET
app.get('/users', (request, response) => {
  console.log(request.query);
  //Devolve a resposta utilizando o JSON
  return response.json({message: 'Hello World'}); 
});
//Exemplo de uso do método POST
app.post('/users', (request, response) => {
  console.log(request.body);
  //Devolve a resposta utilizando o JSON
  return response.json({message: 'Hello World'}); 
});
//Exemplo de uso do método DELETE
app.delete('/users/id:', (request, response) => {
  console.log(request.params);
  //Devolve a resposta utilizando o JSON
  return response.json({message: 'Hello World'}); 
});
//Exemplo de uso de método PUT
app.put('/users/id:', (request, response) => {
  console.log(request.params);
  //Devolve a resposta utilizando o JSON
  return response.json({message: 'Hello World'}); 
});
//inicia o app, escutando na porta específica
app.listen(3333);