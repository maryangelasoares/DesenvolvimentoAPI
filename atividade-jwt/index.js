require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const produtosRoutes = require('./routes/produtos');

const api = express();

// Middleware para processar JSON
api.use(bodyParser.json());

api.use('/api/auth', authRoutes);
api.use('/api', produtosRoutes);

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
