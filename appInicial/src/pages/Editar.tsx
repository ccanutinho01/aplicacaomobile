import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useIonAlert } from '@ionic/react';
import { ProdutoService } from '../service/ProdutoService';

interface RouteParams {
  id: string;
}

const Editar: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const service = new ProdutoService();
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function carregarProduto() {
    setCarregando(true);
    const produto = await service.buscar(Number(id));
    if (produto) {
      if (nomeRef.current) nomeRef.current.value = produto.nome;
      if (precoRef.current) precoRef.current.value = String(produto.preco);
      if (estoqueRef.current) estoqueRef.current.value = String(produto.estoque);
    } else {
      presentAlert({
        header: 'Erro',
        message: 'Não foi possível carregar o produto.',
        buttons: ['OK']
      });
      history.push('/home');
    }
    setCarregando(false);
  }

  async function salvar() {
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0 && estoque >= 0) {
      await service.atualizar(Number(id), { nome, preco, estoque });
      presentAlert({
        header: 'Sucesso',
        message: 'Produto atualizado com sucesso!',
        buttons: ['OK']
      });
      history.push('/home');
    } else {
      presentAlert({
        header: 'Erro',
        message: 'Por favor, verifique os campos.',
        buttons: ['OK']
      });
    }
  }

  function navegarParaHome(){
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();
    history.push('/home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Produto</IonTitle>
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
        <IonButton onClick={salvar} disabled={carregando}> Salvar Alterações</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Editar;
