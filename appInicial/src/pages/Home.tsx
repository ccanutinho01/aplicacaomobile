
import React, { useState } from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { Tarefa } from '../model/Tarefa';
import { c } from 'vitest/dist/reporters-5f784f42';
import {Estoque} from '../model/Estoque';



const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [estoque, setEstoque] = useState<Estoque[]>([]);
  
  function adicionar(){
    const nova = new Tarefa('Estudar', 'POO no ionic');
    nova.concluir();
    setTarefas([...tarefas, nova]);
  };

  console.log(tarefas);

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={adicionar}>
          Adicionar Tarefa
          </IonButton>
      </IonContent>
    </IonPage>
  );
};



export default Home;
