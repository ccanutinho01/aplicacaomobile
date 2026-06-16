export class Tarefa {
    nome:string;
    descricao:string;
    concluida:boolean;

    constructor(nome:string, descricao:string){
        this.nome = nome;
        this.descricao = descricao;
        this.concluida = false;
    }

    concluir(){
        this.concluida = true;
    }
}
