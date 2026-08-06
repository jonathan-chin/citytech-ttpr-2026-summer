import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useCart } from './CartContext';

const CartSummary: React.FC = () => {
  const { cartItems, reset } = useCart();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Cart Summary</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Items in cart: {cartItems}</p>
        <IonButton fill="outline" size="small" onClick={reset}>
          Reset
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default CartSummary;
