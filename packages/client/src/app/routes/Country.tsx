import { useParams } from 'react-router';
import { useFetchEntity } from '@hooks';
import { Country as CountryType } from '@types';

export function Country() {
  const params = useParams();
  const { isLoading, data } = useFetchEntity<CountryType>('country', params.id!);

  if (isLoading) {
    return <section>Loading..</section>;
  }

  if (data == null) {
    return <section><h1>Country not found</h1></section>;
  }

  return <section><h1 data-testid="country-title">{data.country}</h1></section>;
}