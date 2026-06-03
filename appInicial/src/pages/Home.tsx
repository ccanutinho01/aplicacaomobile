
import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonLabel, IonList, IonPage, IonItem, IonToast, IonAlert, IonText } from '@ionic/react';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/Produtoservice';


const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const service = new ProdutoService();

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await service.listar();
    setProdutos(dados);
  }

  async function excluir(id: number) {
    await service.remover(id);
    carregar();
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonList>
          {produtos.map((p:any) => (
            <IonItem key={p.id}>
              <IonLabel>
                {p.nome} - R$ {p.preco}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
