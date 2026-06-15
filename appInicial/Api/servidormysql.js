import mysql from "mysql2";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:   "root",
    password: "root",
    database: "controle_estoque"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados MySQL");
});

const PORT = 3000;

app.get("/produtos", (req, res) => {
    db.query("SELECT * FROM produtos", (err, results) => {
        res.json(results);
    });
});

