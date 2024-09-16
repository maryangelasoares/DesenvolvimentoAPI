const http = require('http');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secreteKey-minhaSenha';

// Função para gerar o JWT;
function generateToken() {
    const payload = {
        user: 'mary-soares',
        exp: Math.floor(Date.now() / 1000) + (60 * 30) // Token expira em 30 minutos;
    };
    return jwt.sign(payload, SECRET_KEY);
}

// Função para verificar o JWT;
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}

// Função para retornar a lista de métodos HTTP;
function getHttpMethods() {
    return {
        get: {
            objetivo_principal: "Recuperar informações",
            limite_caracteres: "Nenhum",
            aceita_https: "Sim",
            aceita_http: "Sim"
        },
        put: {
            objetivo_principal: "Atualizar um recurso existente",
            limite_caracteres: "Variável",
            aceita_https: "Sim",
            aceita_http: "Sim"
        },
        post: {
            objetivo_principal: "Criar um novo recurso",
            limite_caracteres: "Variável",
            aceita_https: "Sim",
            aceita_http: "Sim"
        },
        patch: {
            objetivo_principal: "Modificar parcialmente um recurso",
            limite_caracteres: "Variável",
            aceita_https: "Sim",
            aceita_http: "Sim"
        },
        delete: {
            objetivo_principal: "Remover um recurso",
            limite_caracteres: "Nenhum",
            aceita_https: "Sim",
            aceita_http: "Sim"
        }
    };
}

// Função para extrair o token, removendo "Bearer " se estiver presente;
function getTokenFromHeader(authHeader) {
    if (!authHeader) {
        return null;
    }

    if (authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1]; //Remove 'Bearer ' e retorna o token;
    }

    return authHeader; //Se não houver "Bearer ", retorna o cabeçalho inteiro como token;
}

// Criar servidor HTTP;
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/jwt/auth') {
        // Gerar JWT quando a rota /jwt/auth for acessada;
        const token = generateToken();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token }));
    } else if (req.method === 'GET' && req.url === '/jwt/metodosHttp') {
        // Proteger a rota /jwt/metodosHttp com JWT;
        const authHeader = req.headers['authorization'];
        const token = getTokenFromHeader(authHeader);

        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Token is missing!' }));
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Invalid or expired token!' }));
        }

        // Retorna os métodos HTTP após a validação do token;
        const methods = getHttpMethods();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(methods));
    } else {
        // Se a rota não for encontrada, retorna 404;
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
