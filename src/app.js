const express = require('express');
const cors = require('cors'); // Importa o cors
const app = express();

// Configurações do CORS
app.use(cors()); // Habilita CORS para todas as rotas

// Configurações para receber JSON no request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inclui a rota
const index = require('./routes/index');
app.use('/', index);

module.exports = app;
