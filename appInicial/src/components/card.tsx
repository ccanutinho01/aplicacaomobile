import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

const Card: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Auto Elétrica</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Aqui vai o conteúdo do card. Substitua pelo texto ou componentes desejados.
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
