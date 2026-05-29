import {Produto} from '../model/Produto';

export class ProdutoService {

    private chave = "produtos";

    salvar(produtos: Produto[]) {
        localStorage.setItem(this.chave, JSON.stringify(produtos));
    }

    listar(): Produto[] {
        const dados = localStorage.getItem(this.chave);
        if (!dados) return [];
        return JSON.parse(dados) as Produto[];
    }

    adicionarProduto(produto: Produto) {
        const produtos = this.listar();
        produtos.push(produto);
        this.salvar(produtos);
    }

    removerProduto(index: number) {
        const produtos = this.listar();
        produtos.splice(index, 1);
        this.salvar(produtos);
    }
}
