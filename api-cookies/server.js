const express = require('express');
// Importa o módulo 'cookie-parser', que facilita o uso de cookies em uma aplicação Express;
const cookieParser = require('cookie-parser');
const api = express();

api.use(express.json());
// Adiciona o middleware 'cookieParser' para lidar com cookies na aplicação;
api.use(cookieParser()); 

api.post('/criar-cookie', (req, res) => {
  // Extrai os valores 'nome' e 'valor' do corpo da requisição.
  const { nome, valor } = req.body;

   // Define um cookie na resposta com o nome e valor recebidos. 
  res.cookie(nome, valor, { 
    maxAge: 900000, //O cookie terá uma duração de 900.000 milissegundos (15 minutos);
    httpOnly: true //Será acessível apenas via HTTP (não acessível via JavaScript).
  });

  res.status(201).json({
    mensagem: 'Cookie Criado Com Sucesso',
    cod_status: 201
  });
});

api.get('/cookie/:nomeDoCookie', (req, res) => {
  const nomeDoCookie = req.params.nomeDoCookie; // Obtém o nome do cookie da URL;
  const valorDoCookie = req.cookies[nomeDoCookie]; 

  if (valorDoCookie) {
    res.status(200).json({
      mensagem: `O nome Do Cookie Criado Foi ${nomeDoCookie} e valor ${valorDoCookie}`,
      cod_status: 200
    });
  } else {
    res.status(404).json({
      mensagem: 'Cookie não Encontrado',
      cod_status: 404
    });
  }
});

api.put('/atualizar-cookie/:nomeDoCookie', (req, res) => {
  const nomeDoCookie = req.params.nomeDoCookie; // Obtém o nome do cookie da URL;
  const { novoNome, novoValor } = req.body; // Extrai o novo nome e valor do corpo da requisição;

  // Se o novo nome for diferente do nome original, exclui o cookie antigo.
  if (novoNome && novoNome !== nomeDoCookie) {
    res.clearCookie(nomeDoCookie); // Remove o cookie antigo.
  }

  // Define o cookie com o novo nome e valor.
  res.cookie(novoNome || nomeDoCookie, novoValor, {
    maxAge: 900000, // O cookie terá uma duração de 900.000 milissegundos (15 minutos);
    httpOnly: true // Será acessível apenas via HTTP (não acessível via JavaScript).
  });

  res.status(201).json({
    mensagem: `O novo nome do cookie é ${novoNome || nomeDoCookie} e o novo valor é ${novoValor}`,
    cod_status: 201
  });
});

api.delete('/excluir-cookie/:nomeDoCookie', (req, res) => {
  const nomeDoCookie = req.params.nomeDoCookie; // Obtém o nome do cookie da URL;

  // Define o cookie com valor vazio e expiração imediata para excluí-lo;
  res.clearCookie(nomeDoCookie);

  res.status(201).json({
    mensagem: 'Cookie excluído com sucesso',
    cod_status: 201
  });
});

api.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});