const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3005;

// Lista de JWT claims e suas definições
const jwtClaims = {
    iss: "Identifies the principal that issued the JWT.",
    sub: "Identifies the subject of the JWT. It's intended to be a unique identifier of the user.",
    aud: "Identifies the recipients that the JWT is intended for.",
    exp: "Expiration time of the JWT. After this time, the JWT will no longer be valid.",
    nbf: "Identifies the time before which the JWT must not be accepted for processing.",
    iat: "Issued at time, identifies the time at which the JWT was issued.",
    jti: "JWT ID, a unique identifier for the JWT, to prevent the token from being replayed."
};



// Rota para listar todas as JWT claims
app.get('/jwt/claims', (req, res) => {
    res.json({
        claims: jwtClaims
    });
});


// Chave secreta para assinar o JWT (normalmente, isso seria mais complexo e seguro)
const SECRET_KEY = 'chave-secreta';

// Rota para gerar um JWT com ID, data de geração e expiração
app.get('/generate/token', (req, res) => {
    // Dados de reivindicação
    const payload = {
        jti: 'unique-id-12345', // Um identificador único para o token (você pode gerar dinamicamente)
        iat: Math.floor(Date.now() / 1000), // Data de geração (em segundos)
    };

    // Opções do JWT, como tempo de expiração
    const options = {
        expiresIn: '1h' // Token expira em 1 hora
    };

    // Gera o JWT
    const token = jwt.sign(payload, SECRET_KEY, options);

    // Retorna o token gerado
    res.json({
        token: token,
        message: "Token JWT gerado com sucesso!",
    });
});

// Rota para verificar um JWT (opcional, caso queira verificar o token gerado)
app.get('/verify/token', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token, removendo o "Bearer"

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }

        res.json({
            message: 'Token válido!',
            decoded: decoded
        });
    });
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
