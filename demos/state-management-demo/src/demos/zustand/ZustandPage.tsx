import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import DemoColumns from '../../components/DemoColumns';
import CodeSnippet from '../../components/CodeSnippet';
import AddItemButton from './AddItemButton';
import CartSummary from './CartSummary';

const code = `// useCartStore.ts
const useCartStore = create((set) => ({
  cartItems: 0,
  addItem: () =>
    set((state) => ({
      cartItems: state.cartItems + 1,
    })),
}));

// AddItemButton.tsx / CartSummary.tsx
const cartItems = useCartStore((s) => s.cartItems);
const addItem = useCartStore((s) => s.addItem);`;

const ZustandPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Zustand</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <p>
        No provider needed. Both components import <code>useCartStore</code> directly and select
        the slice they need - click Add to Cart and watch Cart Summary update.
      </p>
      <DemoColumns>
        <AddItemButton />
        <CartSummary />
        <CodeSnippet title="Code" code={code} />
      </DemoColumns>
    </IonContent>
  </IonPage>
);

export default ZustandPage;
