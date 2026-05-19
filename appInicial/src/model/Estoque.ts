export class Produto{
    nome:string;
    preco:number;

    constructor(nome:string, preco:number){
        this.nome = nome;
        this.preco = preco;
        this.estoque = 0;
    }

  adicionarEstoque(quantidade:number){
    this.estoque += qtd;
    }           
}
