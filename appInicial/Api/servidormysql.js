import mysql from 'mysql2';
import express from 'express';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'controle_produto'
});

const port = 3000;

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL!');
});

app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        } else {
            res.json(results);
        }

    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
