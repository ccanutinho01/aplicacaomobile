import React, { useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import { useIonAlert } from '@ionic/react';
import { ProdutoService } from '../service/ProdutoService';

const Cadastro: React.FC = () => {
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);
  const history = useHistory();

  const [presentAlert] = useIonAlert();
  const service = new ProdutoService();

  async function salvar() {
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0 && estoque > 0) {
      await service.adicionar({ nome, preco, estoque });
      presentAlert({
        header: 'Sucesso',
        message: 'Produto cadastrado com sucesso!',
        buttons: ['OK']
      });

      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";

      history.push('/home');
    } else {
      presentAlert({
        header: 'Erro',
        message: 'Por favor, preencha o nome, preço e estoque corretamente.',
        buttons: ['OK']
      });
    }
  }

  function navegarParaHome(){
    history.push('/home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={navegarParaHome}> Voltar para Home</IonButton>
        <br />
        <IonInput ref={nomeRef} label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
        <br />
        <IonInput ref={precoRef} label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
        <br />
        <IonInput ref={estoqueRef} label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
        <IonButton onClick={salvar}> Cadastrar Produto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
