const express = require ('express');
const api = express();
const porta = 3000;

// Chave de API predefinida;
const key = 'minha-chave-secreta';

// Middleware para autenticação por chave de API
api.use((req, res, next) => {
    const apiKey = req.header('api-key');
    
    if (apiKey && apiKey === key) {
        next(); // Chave válida, continua para o próximo middleware ou rota;
    } else {
        res.status(401).json({
            mensagem: "acesso nao autorizado",
            cod_status: 401
        });
    }
});

api.get('/', (req, res) => {
    res.status(200).json({
        mensagem: "acesso autorizado",
        cod_status: 200
    });
});

api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`);
});
