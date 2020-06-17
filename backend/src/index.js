const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes');

mongoose.connect('mongodb+srv://johnatantestes:testesmongodb@cluster0-phbgg.mongodb.net/omnistack10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//app.use(cors({origin:'http:localhost:3000'}));
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);