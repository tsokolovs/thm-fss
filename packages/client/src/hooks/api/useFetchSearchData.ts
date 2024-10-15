import { useQuery } from '@tanstack/react-query';
import { API_URL, STALE_TIME } from '@constants';
import { City, Country, Hotel } from '@types';

type SearchDTO = {
  status: string;
  data: {
    hotels: Pick<Hotel, '_id' | 'hotel_name' | 'country'>[],
    countries: Pick<Country, '_id' | 'country'>[],
    cities: Pick<City, '_id' | 'name'>[],
  }
}

export type SearchData = SearchDTO['data'][keyof SearchDTO['data']];

export const useFetchSearchData = (searchTerm: string) => {
  const { isLoading, data } = useQuery<SearchDTO>({
    queryKey: ['search', searchTerm],
    retry: false,
    staleTime: STALE_TIME,
    queryFn: async () => {
      const response = await fetch(`${API_URL}/search/${searchTerm}`);

      return await response.json();
    },
    // Author-comment: in prod this would be 2 and a message informing users that it needs to be more than 2
    enabled: searchTerm.length > 0
  });

  return { isLoading, data: data != null ? data.data : { hotels: [], countries: [], cities: [] } };
};