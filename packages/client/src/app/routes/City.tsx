import { useParams } from 'react-router';
import { useFetchEntity } from '@hooks';
import { City as CityType } from '@types';

export function City() {
  const params = useParams();
  const { isLoading, data } = useFetchEntity<CityType>('city', params.id!);

  if (isLoading) {
    return <section>Loading..</section>;
  }

  if (data == null) {
    return <section><h1>City not found</h1></section>;
  }

  return <section><h1 data-testid="city-title">{data.name}</h1></section>;
}