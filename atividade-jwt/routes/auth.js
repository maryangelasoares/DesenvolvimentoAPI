const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = [
  {
    id: 1,
    usuario: 'admin',
    senha: bcrypt.hashSync('admin', 8)  // Senha criptografada
  }
];


router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Verificar se o usuário existe
  const user = users.find(u => u.usuario === usuario);
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado!' });
  }

  // Verificar se a senha está correta
  const isPasswordValid = bcrypt.compareSync(senha, user.senha);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Senha inválida!' });
  }

  // Gerar o token JWT
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, {
    expiresIn: 86400  // Token expira em 24 horas
  });

  // Retornar o token no formato JSON
  res.json({ token });
});

module.exports = router;
