
import React, { useState } from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { Tarefa } from '../model/Tarefa';
import { c } from 'vitest/dist/reporters-5f784f42';



const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  function adicionar(){
    const novaTarefa = new Tarefa('Estudar', 'POO no ionic');

    setTarefa([...tarefas, nova]);
  }
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
