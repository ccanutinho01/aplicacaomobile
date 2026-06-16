import express from 'express';
import db from './servidormysql.js';

const app = express();
const port = 3000;

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
    console.log('Servidor iniciado na porta 3000');
});
