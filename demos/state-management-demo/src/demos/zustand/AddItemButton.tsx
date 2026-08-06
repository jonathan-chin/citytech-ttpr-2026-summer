import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import useCartStore from './useCartStore';

const AddItemButton: React.FC = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Add Item</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton onClick={addItem}>Add to Cart</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default AddItemButton;
