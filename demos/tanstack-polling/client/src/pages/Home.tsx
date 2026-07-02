import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useQuery } from '@tanstack/react-query';

// Base URL of the polling server (see .env.example). Falls back to localhost.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface Message {
  name: string;
  message: string;
}

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: () =>
      fetch(`${API_URL}/`, { cache: 'no-store' }).then((res) => res.json()),
    refetchInterval: 1500, // re-fetch every 1.5s so new posts appear
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Polling Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {isLoading && <p>Loading...</p>}
        {error && <p>Could not reach the server.</p>}
        <IonList>
          {data?.map((m, i) => (
            <IonItem key={i}>
              <IonLabel>
                <h2>{m.name}</h2>
                <p>{m.message}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        {data?.length === 0 && <p>No messages yet. Post one with Insomnia!</p>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
