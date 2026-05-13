import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Auto eletrica</IonCardTitle>
            <IonCardSubtitle>Explore</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Bem vindo a autoeletrica, aqui seu carro fica ligadão
          </IonCardContent>
        </IonCard>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
      <IonButton expand="block" color="primary">Salvar</IonButton>
    </IonPage>
  );
};

export default Home;
