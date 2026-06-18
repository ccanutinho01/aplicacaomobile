import React, { useState } from 'react';
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
  useIonAlert,
  useIonActionSheet,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { trashOutline } from 'ionicons/icons';
import { ProdutoService } from '../service/ProdutoService';
import { Produto } from '../model/Produto';

const Home: React.FC = () => {
  const history = useHistory();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [deletando, setDeletando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [presentAlert] = useIonAlert();
  const service = new ProdutoService();

  useIonViewWillEnter(() => {
    carregarProdutos();
  });

  async function carregarProdutos() {
    const produtosCarregados = await service.listar();
    setProdutos(produtosCarregados);
  }

  async function removerProduto(id: number) {
    setDeletando(true);
    setErro(null);

    try {
      await service.remover(id);
      await carregarProdutos();
    } catch (err) {
      setErro('Falha ao excluir o produto. Tente novamente.');
    } finally {
      setDeletando(false);
    }
  }

  function navegarparaCadastro() {
    history.push('/cadastro');
  }

  async function deleteProduto(id: number) {
    presentAlert({
      header: 'Tem certeza que deseja excluir este produto?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => removerProduto(id),
        },
      ],
    });
  }

  async function editarProduto(id: number) {
    history.push(`/editar/${id}`);
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
        <IonButton expand="block" onClick={navegarparaCadastro}>
          Cadastrar Produto
        </IonButton>
        <IonButton expand="block" color="primary" onClick={carregarProdutos} disabled={carregando}>
          {carregando ? 'Carregando...' : 'Mostrar Produtos'}
        </IonButton>
        
        {erro && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>⚠️ {erro}</p>}
        {produtos.length > 0 && <h3 style={{ marginTop: '20px' }}>Produtos Cadastrados:</h3>}
        {produtos.length === 0 && !carregando && !erro && <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>Clique em "Mostrar Produtos" para carregar a lista</p>}
        <IonList>
          {produtos.map((produto) => (
            <IonItemSliding key={produto.id ?? produto.nome}>
              <IonItem>
                <IonLabel>
                  <h2>{produto.nome}</h2>
                  <p>R$ {produto.preco.toFixed(2)} | Estoque: {produto.estoque}</p>
                </IonLabel>
                <IonButton color="tertiary" fill="outline" slot="end" onClick={() => editarProduto(produto.id!)} style={{ marginRight: 8 }}>
                  Editar
                </IonButton>
                <IonButton color="danger" fill="outline" slot="end" onClick={() => deleteProduto(produto.id!)} disabled={deletando}>
                  Excluir
                </IonButton>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
