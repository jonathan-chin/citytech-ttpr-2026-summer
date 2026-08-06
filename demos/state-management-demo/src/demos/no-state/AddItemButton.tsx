import { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

const AddItemButton: React.FC = () => {
  const [timesClicked, setTimesClicked] = useState(0);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Add Item</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton onClick={() => setTimesClicked((count) => count + 1)}>Add to Cart</IonButton>
        <p>
          Clicked {timesClicked} times - but this count lives only inside{' '}
          <strong>AddItemButton</strong>.
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default AddItemButton;
