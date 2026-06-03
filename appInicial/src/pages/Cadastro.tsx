import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { ProdutoService } from '../service/Produtoservice';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const service = new ProdutoService();
  const history = useHistory();

  async function salvar() {
    const produto = {
      nome,
      preco: Number(preco),
      estoque: 0
    };

    await service.adicionar(produto);
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro de Produto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nome</IonLabel>
          <IonInput value={nome} onIonChange={e => setNome(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Preço</IonLabel>
          <IonInput value={preco} onIonChange={e => setPreco(e.detail.value ?? '')} type="number" />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={salvar}>
          Salvar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
