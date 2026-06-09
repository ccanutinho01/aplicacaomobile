export class Produto {
  id?: number;
  nome: string;
  preco: number;
  estoque: number;

  constructor(nome: string, preco: number, estoque = 0) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  adicionarEstoque(qtd: number) {
    this.estoque += qtd;
  }
}
