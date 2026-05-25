
import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonInput, IonItem, IonLabel } from '@ionic/react';
import { Produto } from '../model/Produto';

const Home: React.FC = () => {
  const [produto, setProduto] = useState<Produto[]>([]);

  
  console.log(produto);
  const [estoque, setEstoque] = useState<Produto[]>([]);
  const [prodNome, setProdNome] = useState<string>('');
  const [prodPreco, setProdPreco] = useState<string>('');
  const [prodQtd, setProdQtd] = useState<string>('');

  function adicionarProduto(){
    const nome = prodNome.trim();
    const preco = parseFloat(prodPreco);
    const qtd = parseInt(prodQtd, 10) || 0;

    if(!nome || isNaN(preco)){
      return;
    }

    const novoProduto = new Produto(nome, preco);
    if(qtd > 0) novoProduto.adicionarEstoque(qtd);
    setProduto([...produto, novoProduto]);

    setProdNome('');
    setProdPreco('');
    setProdQtd('');
  }

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={adicionarProduto}>
          Adicionar Produto
        </IonButton>
        
        <IonItem>
          <IonLabel position="stacked">Nome</IonLabel>
          <IonInput value={prodNome} placeholder="Nome do produto" onIonChange={e => setProdNome((e.target as any).value ?? (e.detail && e.detail.value) ?? '')} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Preço</IonLabel>
          <IonInput type="number" value={prodPreco} placeholder="0.00" onIonChange={e => setProdPreco((e.target as any).value ?? (e.detail && e.detail.value) ?? '')} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Quantidade</IonLabel>
          <IonInput type="number" value={prodQtd} placeholder="0" onIonChange={e => setProdQtd((e.target as any).value ?? (e.detail && e.detail.value) ?? '')} />
        </IonItem>

        <IonButton onClick={adicionarProduto}>
          Adicionar Produto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
