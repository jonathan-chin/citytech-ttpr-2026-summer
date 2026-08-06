import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import useCartStore from './useCartStore';

const CartSummary: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const reset = useCartStore((state) => state.reset);

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
