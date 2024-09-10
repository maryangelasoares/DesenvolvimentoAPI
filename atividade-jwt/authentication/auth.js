const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Extrair o token do cabeçalho da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // O token deve estar após 'Bearer'

  // Se o token não for encontrado, retornar erro 403 (Acesso negado)
  if (!token) {
    return res.status(403).json({ error: 'Nenhum token fornecido!' });
  }

  // Verificar o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido!' });
    }

    // Se o token for válido, adicionar os dados do usuário ao request
    req.userId = decoded.id;
    next(); 
  });
};

module.exports = verificarToken;
