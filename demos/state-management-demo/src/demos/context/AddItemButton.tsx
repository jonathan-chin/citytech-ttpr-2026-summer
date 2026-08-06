import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useCart } from './CartContext';

const AddItemButton: React.FC = () => {
  const { addItem } = useCart();

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
