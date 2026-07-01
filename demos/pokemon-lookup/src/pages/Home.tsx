// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import {
  IonButton,
  IonInput
} from '@ionic/react';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import {
  useState
} from 'react';

const PokemonWeight = ({name}: {name: string}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return <p>{data.name} weighs {data.weight}</p>;
}

const Home = () => {
  const [name, setName] = useState('pikachu');
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setName(data.name);
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
      <PokemonWeight name={name} />
      </form>
  </>;
}

export default Home;