import { useParams } from 'react-router';
import { useFetchEntity } from '@hooks';
import { Hotel as HotelType } from '@types';

export function Hotel() {
  const params = useParams();
  const { isLoading, data } = useFetchEntity<HotelType>('hotel', params.id!);

  if (isLoading) {
    return <section>Loading..</section>;
  }

  if (data == null) {
    return <section><h1>Hotel not found</h1></section>;
  }

  return <section><h1 data-testid="hotel-title">{data.hotel_name}</h1></section>;
}