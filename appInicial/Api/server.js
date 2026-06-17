import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "controle_produto",
};

const PORT = process.env.PORT || 3000;

let connection;

async function startServer() {
  try {
    connection = await mysql.createConnection(DB_CONFIG);
    console.log("Conectado ao MySQL como:", connection.config.user);

    app.get("/produtos", async (req, res) => {
      try {
        const [rows] = await connection.query("SELECT * FROM produtos");
        res.json(rows);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).json({ error: err.message || err });
      }
    });

    app.post("/produtos", async (req, res) => {
      try {
        const { nome, preco, estoque } = req.body;
        const [result] = await connection.query(
          "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)",
          [nome, preco, estoque]
        );
        const insertedId = result.insertId;
        const [rows] = await connection.query("SELECT * FROM produtos WHERE id = ?", [insertedId]);
        res.status(201).json(rows[0] || { id: insertedId, nome, preco, estoque });
      } catch (err) {
        console.error("Erro ao adicionar produto:", err);
        res.status(500).json({ error: err.message || err });
      }
    });

    app.put("/produtos/:id", async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { nome, preco, estoque } = req.body;
        await connection.query(
          "UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?",
          [nome, preco, estoque, id]
        );
        const [rows] = await connection.query("SELECT * FROM produtos WHERE id = ?", [id]);
        res.json(rows[0] || { id, nome, preco, estoque });
      } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        res.status(500).json({ error: err.message || err });
      }
    });

    app.delete("/produtos/:id", async (req, res) => {
      try {
        const id = Number(req.params.id);
        await connection.query("DELETE FROM produtos WHERE id = ?", [id]);
        res.json({ message: "Produto deletado" });
      } catch (err) {
        console.error("Erro ao remover produto:", err);
        res.status(500).json({ error: err.message || err });
      }
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err.message || err);
    process.exit(1);
  }
}

startServer();     