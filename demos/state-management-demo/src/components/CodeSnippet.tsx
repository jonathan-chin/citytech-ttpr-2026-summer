import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import './CodeSnippet.css';

const CodeSnippet: React.FC<{ title: string; code: string }> = ({ title, code }) => (
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <pre className="code-snippet">
        <code>{code}</code>
      </pre>
    </IonCardContent>
  </IonCard>
);

export default CodeSnippet;
