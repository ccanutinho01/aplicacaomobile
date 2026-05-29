
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonText,
  IonToast,
  IonList,
} from '@ionic/react';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/ProdutoService';

const produtoService = new ProdutoService();

const Cadastro: React.FC = () => {
  const history = useHistory();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('0');
  const [errors, setErrors] = useState({ nome: '', preco: '', estoque: '' });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  function validarFormulario() {
    const novoErros = { nome: '', preco: '', estoque: '' };
    let valido = true;

    if (!nome.trim()) {
      novoErros.nome = 'O nome do produto é obrigatório.';
      valido = false;
    }

    const precoNumero = Number(preco.replace(',', '.'));
    if (!preco || Number.isNaN(precoNumero) || precoNumero <= 0) {
      novoErros.preco = 'Informe um preço válido maior que zero.';
      valido = false;
    }

    const estoqueNumero = Number(estoque);
    if (estoque === '' || Number.isNaN(estoqueNumero) || estoqueNumero < 0 || !Number.isInteger(estoqueNumero)) {
      novoErros.estoque = 'Quantidade em estoque deve ser um número inteiro positivo ou zero.';
      valido = false;
    }

    setErrors(novoErros);
    return valido;
  }

  function limparFormulario() {
    setNome('');
    setPreco('');
    setEstoque('0');
    setErrors({ nome: '', preco: '', estoque: '' });
  }

  function adicionarProduto() {
    if (!validarFormulario()) {
      setToastMessage('Corrija os campos em destaque para continuar.');
      setShowToast(true);
      return;
    }

    const precoNumero = Number(preco.replace(',', '.'));
    const estoqueNumero = Number(estoque);
    const novoProduto = new Produto(nome.trim(), precoNumero);
    novoProduto.adicionarEstoque(estoqueNumero);

    produtoService.adicionarProduto(novoProduto);
    limparFormulario();
    setToastMessage('Produto cadastrado com sucesso!');
    setShowToast(true);

    setTimeout(() => {
      history.push('/home');
    }, 1000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro de Produto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nome do produto</IonLabel>
            <IonInput
              value={nome}
              placeholder="Digite o nome"
              onIonChange={e => setNome(e.detail.value ?? '')}
              clearInput
            />
          </IonItem>
          {errors.nome && <IonText color="danger">{errors.nome}</IonText>}

          <IonItem>
            <IonLabel position="stacked">Preço</IonLabel>
            <IonInput
              value={preco}
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              onIonChange={e => setPreco(e.detail.value ?? '')}
              clearInput
            />
          </IonItem>
          {errors.preco && <IonText color="danger">{errors.preco}</IonText>}

          <IonItem>
            <IonLabel position="stacked">Quantidade em estoque</IonLabel>
            <IonInput
              value={estoque}
              type="number"
              inputMode="numeric"
              placeholder="0"
              onIonChange={e => setEstoque(e.detail.value ?? '0')}
              clearInput
            />
          </IonItem>
          {errors.estoque && <IonText color="danger">{errors.estoque}</IonText>}
        </IonList>

        <IonButton expand="block" onClick={adicionarProduto} className="ion-margin-top">
          Adicionar Produto
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={() => history.push('/home')}>
          Voltar para Home
        </IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          color={errors.nome || errors.preco || errors.estoque ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
