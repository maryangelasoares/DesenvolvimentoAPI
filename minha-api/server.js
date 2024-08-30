const express = require ('express');
const api = express();
const porta = 3000;


api.get('/', (req, res) => {
    const rotaPadrao = 
    {
        nome_rota: '/',
        codigo_status: '200',
        metodo: 'GET'
    }

    res.status(200);
    res.json(rotaPadrao);
});

api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`);
});

