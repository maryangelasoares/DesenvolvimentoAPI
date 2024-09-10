const express = require('express');
const verificarToken = require('../authentication/auth'); 

const router = express.Router();

const produtos = [
  { id: 1, nome: 'escova de dente', preco: '10.00' },
  { id: 2, nome: 'shampoo', preco: '40.00' },
  { id: 3, nome: 'sabonete', preco: '5.50' },
  { id: 4, nome: 'condicionador', preco: '35.50' }
];

//Rota protegida para obter produtos;
router.get('/produtos', verificarToken, (req, res) => {
  res.json({ produtos });
});

module.exports = router;
