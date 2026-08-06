import { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

const CartSummary: React.FC = () => {
  const [cartItems] = useState(0);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Cart Summary</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Items in cart: {cartItems}</p>
        <p>
          No matter how many times you click Add to Cart, this never changes - it has no way to
          hear about it.
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default CartSummary;
