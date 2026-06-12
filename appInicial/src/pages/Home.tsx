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
    setCarregando(true);
    setErro(null);
    try {
      const produtosCarregados = await service.listar();
      if (produtosCarregados && produtosCarregados.length > 0) {
        setProdutos(produtosCarregados);
      } else {
        setProdutos([]);
        setErro('Nenhum produto encontrado');
      }
    } catch (error) {
      setProdutos([]);
      setErro('Erro ao conectar ao servidor. Verifique se a API está rodando.');
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  }

  async function removerProdutoDireto(produto: Produto) {
    setDeletando(true);
    setErro(null);
    try {
      const result = await service.remover(produto.id!);
      if (result) {
        setProdutos((current) => current.filter((p) => p.id !== produto.id));
        presentAlert({
          header: 'Sucesso',
          message: 'Produto removido com sucesso.',
          buttons: ['OK'],
        });
      } else {
        throw new Error('Falha ao remover o produto.');
      }
    } catch (error) {
      setErro('Erro ao remover o produto. Tente novamente.');
      console.error('Erro ao remover produto:', error);
    } finally {
      setDeletando(false);
    }
  }

  function confirmarExclusao(produto: Produto) {
    presentAlert({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o produto "${produto.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => removerProdutoDireto(produto),
        },
      ],
    });
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
                <IonButton color="danger" fill="outline" slot="end" onClick={() => confirmarExclusao(produto)} disabled={deletando}>
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
