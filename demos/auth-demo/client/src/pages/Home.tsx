import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLogin, useMe, useRegister } from '../hooks/useAuth';
import useAuthStore from '../store/useAuthStore';

const Home: React.FC = () => {
  // Zustand makes this reactive: no manual re-render needed when login/logout
  // change the token, unlike reading localStorage directly.
  const token = useAuthStore((state) => state.token);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Auth Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {token ? <Profile /> : <AuthForm />}
      </IonContent>
    </IonPage>
  );
};

// Shown once a token is stored: GET /me proves the token still works.
const Profile: React.FC = () => {
  const { data, isLoading, error } = useMe();
  const clearToken = useAuthStore((state) => state.clearToken);

  return (
    <>
      <h2>Logged in</h2>
      {isLoading && <p>Loading your profile...</p>}
      {error && <p>Could not verify your token: {error.message}</p>}
      {data && (
        <IonItem>
          <IonLabel>
            <h3>User #{data.id}</h3>
            <p>{data.email}</p>
          </IonLabel>
        </IonItem>
      )}
      <IonButton expand="block" color="medium" onClick={clearToken}>
        Log out
      </IonButton>
    </>
  );
};

// Shown when there's no stored token: switch between register and login.
const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = useRegister();
  const login = useLogin();

  const submit = () => {
    if (mode === 'register') {
      register.mutate({ email, password }, { onSuccess: () => setMode('login') });
    } else {
      login.mutate({ email, password });
    }
  };

  const pending = register.isPending || login.isPending;
  const error = register.error ?? login.error;

  return (
    <>
      <h2>{mode === 'login' ? 'Log in' : 'Register'}</h2>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput type="email" value={email} onIonInput={(e) => setEmail(e.detail.value ?? '')} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Password</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value ?? '')}
        />
      </IonItem>
      {error && <p style={{ color: 'var(--ion-color-danger)' }}>{error.message}</p>}
      <IonButton expand="block" disabled={pending} onClick={submit}>
        {mode === 'login' ? 'Log in' : 'Register'}
      </IonButton>
      <IonButton
        expand="block"
        fill="clear"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login' ? "Need an account? Register" : 'Already have an account? Log in'}
      </IonButton>
    </>
  );
};

export default Home;
