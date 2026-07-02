// @ts-nocheck

import {
  IonButton,
  IonInput
} from '@ionic/react';
import {
  useForm,
  Controller,
} from 'react-hook-form';

const Home = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      message: '',
    }
  });
  const onSubmit = (data) => {
    console.log(data);
    reset({
      name: data.name,
      message: ''
    });
  };

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <IonInput
            label="name"
            fill='outline'
            value={field.value}
            onIonChange={(e) => field.onChange(e.detail.value)}
          />
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <IonInput
            label="message"
            fill='outline'
            value={field.value}
            onIonChange={(e) => field.onChange(e.detail.value)}
          />
        )}
      />
      <IonButton type='submit'>
        Send
      </IonButton>
    </form>
  </>
};

export default Home;