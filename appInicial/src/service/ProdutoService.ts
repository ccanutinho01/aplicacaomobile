import {Produto} from '../model/Produto';

export class ProdutoService {

    baseUrl= "http://localhost:3000";

    async listar(){
        const res = await fetch(`${this.baseUrl}/produtos`);
        return await res.json();
    }

    async adicionar(produto: any){
        await fetch(`${this.baseUrl}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
    }

    async remover(id: number){
        await fetch(`${this.baseUrl}/produtos/${id}`, {
            method: 'DELETE'
        });
    }
}
