
import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonLabel, IonList, IonPage, IonItem, IonToast, IonAlert, IonText } from '@ionic/react';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/ProdutoService';


const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [indexParaRemover, setIndexParaRemover] = useState<number | null>(null);
  const produtoService = new ProdutoService();

  function carregar(){
    const lista = produtoService.listar();
    setProdutos(lista);
  }

  function confirmarRemocao(index: number) {
    setIndexParaRemover(index);
    setShowConfirm(true);
  }

  function remover(index: number){
    produtoService.removerProduto(index);
    carregar();
    setToastMessage('Produto removido com sucesso.');
    setShowToast(true);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Controle de produtos</h2>
        <IonButton expand="block" routerLink="/cadastro">
          Novo Produto
        </IonButton>

        {produtos.length === 0 ? (
          <IonText color="medium">Nenhum produto cadastrado. Adicione um produto para começar.</IonText>
        ) : (
          <IonList>
            {produtos.map((p: Produto, index: number) => (
              <IonItem key={index}>
                <IonLabel>
                  {p.nome} - R$ {p.preco.toFixed(2)} | Estoque: {p.estoque}
                </IonLabel>
                <IonButton slot="end" color="danger" onClick={() => confirmarRemocao(index)}>
                  Remover
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showConfirm}
          header="Remover produto"
          message="Tem certeza que deseja excluir este produto?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowConfirm(false),
            },
            {
              text: 'Sim, remover',
              handler: () => {
                if (indexParaRemover !== null) {
                  remover(indexParaRemover);
                }
                setShowConfirm(false);
              },
            },
          ]}
        />

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
