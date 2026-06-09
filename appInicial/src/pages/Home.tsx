
import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonPage, IonList, IonLabel, IonItem, IonIcon } from '@ionic/react';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/ProdutoService';
import { trashOutline } from 'ionicons/icons';


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
              <IonButton onClick={() => excluir(p.id)} color="danger">
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
