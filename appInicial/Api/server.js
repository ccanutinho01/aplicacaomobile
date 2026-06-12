import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const arquivo = "produtos.json";
app.get("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    const produtos = JSON.parse(dados);
    res.json(produtos);
});

app.post("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    const produtos = JSON.parse(dados);

    const novoProduto = {
        id: Date.now(),
        ...req.body
    };

    produtos.push(novoProduto);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));

    res.json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    let produtos = JSON.parse(dados);

    produtos = produtos.map(p => 
        p.id == req.params.id ? { ...p, ...req.body } : p
    );

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));

    res.json({ msg: "Atualizado" });
});

app.delete("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo);
    let produtos = JSON.parse(dados);

    produtos = produtos.filter(p => p.id != req.params.id);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));

    res.json({ msg: "Removido" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
