const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const api = express();
const PORT = 3005;

api.use(bodyParser.json());

// Chave secreta para assinar o JWT
const SECRET_KEY = 'key-secrety-12345';

// Função de verificação de credenciais (simulada para o exemplo)
const authenticateUser = (username, password) => {
  return username === 'mary@email.com' && password === '203040';
};

// Middleware para verificar o JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' });
    }
  
    // Remove o prefixo 'Bearer ' caso esteja presente
    const jwtToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  
    jwt.verify(jwtToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
  
      // Salva os dados do token decodificado na requisição
      req.user = decoded;
      next();
    });
  };
  
  // Endpoint de login
  api.post('/jwt/auth', (req, res) => {
    const { username, password } = req.body;
  
    if (!authenticateUser(username, password)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  
    const payload = { username };
  
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1h',
    });
  
    const decodedToken = jwt.decode(token);
  
    res.json({
      token_id: token,
      iat: decodedToken.iat,
      exp: decodedToken.exp
    });
  });
  
  // Endpoint protegido
  api.get('/jwt/produtos', verifyJWT, (req, res) => {
    const produtos = [
      { id: 1, nome: 'Smart TV', preco: 2500.00 },
      { id: 2, nome: 'Acer Nitro V', preco: 4820.00 },
      { id: 3, nome: 'Play Station 5', preco: 3800.00 }
    ];
  
    res.json({ produtos });
  });
  
  api.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });