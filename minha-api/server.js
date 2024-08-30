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

api.post ('/client/novo', (req, res) => {
    const response = [
        {
        mensagem: 'Cliente criado com Sucesso!',
        status: 201
        }
    ]

    res.status(201);
    res.json(response);
});

api.put('/cliente/update/cpfcnpj/12345678901', (req, res) => {
    const response = [
        {
            mensagem: 'Cliente atualizado com sucesso!',
            status: 200
        }
    ];

    res.status(200);
    res.json(response);
});

api.delete('/cliente/delete/cpfcnpj/12345678901', (req, res) => {
    const response = [
        {
            mensagem: 'Cliente deletado com sucesso!',
            status: 201
        }
    ];

    res.status(201);
    res.json(response);
});

api.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`);
});

