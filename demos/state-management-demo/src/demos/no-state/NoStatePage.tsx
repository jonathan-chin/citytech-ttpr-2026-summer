import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import DemoColumns from '../../components/DemoColumns';
import CodeSnippet from '../../components/CodeSnippet';
import AddItemButton from './AddItemButton';
import CartSummary from './CartSummary';

const code = `// AddItemButton.tsx
const [timesClicked, setTimesClicked] = useState(0);

// CartSummary.tsx
const [cartItems] = useState(0);

// Two separate states -
// nothing connects them.`;

const NoStatePage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>No State Management</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <p>
        <strong>AddItemButton</strong> and <strong>CartSummary</strong> are siblings, each with
        its own local <code>useState</code>. Click Add to Cart - Cart Summary never updates,
        because it has no way to know the button was clicked.
      </p>
      <DemoColumns>
        <AddItemButton />
        <CartSummary />
        <CodeSnippet title="Code" code={code} />
      </DemoColumns>
    </IonContent>
  </IonPage>
);

export default NoStatePage;
