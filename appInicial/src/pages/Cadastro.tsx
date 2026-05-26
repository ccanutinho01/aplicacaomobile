
import React, { useState, useRef } from 'react';
import { IonButton, IonContent, IonPage, IonInput, IonToolbar, IonTitle, IonHeader } from '@ionic/react';
import { Produto } from '../model/Produto';

const Cadastro: React.FC = () => {
const [produtos, setProdutos] = useState<Produto[]>([]);
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);

  function adicionarProduto(){
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0) {
      const novoProduto = new Produto(nome, preco);
      novoProduto.adicionarEstoque(estoque);
      
      setProdutos([...produtos, novoProduto]);
      
      console.log("Produto adicionado:", novoProduto);
      console.log("Produtos:", produtos);

      
      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";
    }
    }   
    return (
    <IonPage>
        <IonHeader> 
        <IonToolbar>            
            <IonTitle>Cadastro de Produto</IonTitle>        
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <br />
        <IonInput ref={nomeRef} label="Nome do produto" labelPlacement="floating" />    
        <br />  
        <IonInput ref={precoRef} label="Preço" labelPlacement="floating" placeholder="0.00" />
        <br /> 
        <IonInput ref={estoqueRef} label="Quantidade em estoque" labelPlacement="floating" placeholder="0" />
        <br />
        <IonButton onClick={adicionarProduto} expand="block">Adicionar Produto</IonButton>
        </IonContent>
    </IonPage>
  );
};
export default Cadastro;
