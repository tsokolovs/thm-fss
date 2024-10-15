import { useQuery } from '@tanstack/react-query';
import { API_URL, STALE_TIME } from '@constants';
import { City, Country, Hotel } from '@types';

type EntityDTO = {
  data: Hotel & Country & City;
  status: string;
};

export function useFetchEntity<T>(entity: 'hotel' | 'country' | 'city', id: string) {
  const { isLoading, data } = useQuery<EntityDTO>({
    queryKey: [entity, id],
    retry: false,
    staleTime: STALE_TIME,
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${entity}/${id}`);

      return await response.json();
    }
  });

  return { isLoading, data: data != null ? data.data as T : null };

}