import React, { useRef, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonLabel,
  IonItem,
  useIonViewWillEnter,
  IonIcon,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonModal,
  useIonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { trashOutline } from 'ionicons/icons';
import { ProdutoService } from '../service/ProdutoService';
import { Produto } from '../model/Produto';

const Home: React.FC = () => {
  const history = useHistory();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [presentAlert] = useIonAlert();
  const service = new ProdutoService();
  const modal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(() => {
    carregarProdutos();
  });

  async function carregarProdutos() {
    const produtosCarregados = await service.listar();
    setProdutos(produtosCarregados);
  }

  async function removerProduto() {
    if (!produtoSelecionado) {
      return;
    }

    await service.remover(produtoSelecionado.id!);
    setShowModal(false);
    setProdutoSelecionado(null);
    carregarProdutos();
    presentAlert({
      header: 'Sucesso',
      message: 'Produto removido com sucesso.',
      buttons: ['OK'],
    });
  }

  function abrirModalRemocao(produto: Produto) {
    setProdutoSelecionado(produto);
    setShowModal(true);
  }

  function navegarParaCadastro() {
    history.push('/cadastro');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Bem-vindo ao Controle de Estoque</h2>
        <IonButton expand="block" onClick={navegarParaCadastro}>
          Cadastrar Produto
        </IonButton>
        <IonList>
          {produtos.map((produto) => (
            <IonItemSliding key={produto.id ?? produto.nome}>
              <IonItem>
                <IonLabel>
                  <h2>{produto.nome}</h2>
                  <p>R$ {produto.preco.toFixed(2)} | Estoque: {produto.estoque}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => abrirModalRemocao(produto)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonModal ref={modal} isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirmar remoção</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Tem certeza que deseja remover o produto abaixo?</p>
            <p>
              <strong>{produtoSelecionado?.nome}</strong>
            </p>
            <IonButton expand="block" color="danger" onClick={removerProduto}>
              Remover
            </IonButton>
            <IonButton expand="block" fill="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
