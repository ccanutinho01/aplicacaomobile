
import React, { useState } from 'react';
import { IonButton, IonContent, IonLabel, IonList, IonPage, IonItem } from '@ionic/react';
import { Produto } from '../models/Produto';

const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Controle de produtos</h2>
        <IonButton expand="block" routerLink="/cadastro">
          Novo Produto
        </IonButton>

        <IonList>
          {produtos.map((p: Produto, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                {p.nome} - R$ {p.preco} | Estoque: {p.estoque}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
