import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import DemoColumns from '../../components/DemoColumns';
import CodeSnippet from '../../components/CodeSnippet';
import { CartProvider } from './CartContext';
import AddItemButton from './AddItemButton';
import CartSummary from './CartSummary';

const code = `// CartContext.tsx
const CartContext = createContext(...);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0);
  return (
    <CartContext.Provider value={{ cartItems, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

// AddItemButton.tsx / CartSummary.tsx
const { cartItems, addItem } = useCart();`;

const ContextPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Context</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <CartProvider>
        <p>
          A <code>CartProvider</code> wraps both components below. Each calls{' '}
          <code>useContext</code> to read and update the same <code>cartItems</code> - click Add
          to Cart and watch Cart Summary update.
        </p>
        <DemoColumns>
          <AddItemButton />
          <CartSummary />
          <CodeSnippet title="Code" code={code} />
        </DemoColumns>
      </CartProvider>
    </IonContent>
  </IonPage>
);

export default ContextPage;
