import {
  ActionIcon,
  Autocomplete,
  Badge,
  Input,
  Loader,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconPencil } from '@tabler/icons-react';
import axios from 'axios';

const searchCities = async (query: string) => {
  const result = await axios.get(`/api/cities?q=${query}`);
  return result.data;
};

const useGetCities = (query: string) => {
  return useQuery({
    queryKey: ['searchCities', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= 3,
  });
};

const useDebouncedState = (state: any) => {
  const [debouncedValue, setDebouncedValue] = useState(state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(state);
    }, 500);

    return () => clearTimeout(timeout);
  }, [state]);

  return debouncedValue;
};

type CitySearchInputType = {
  error?: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value: string;
};

export default function CitySearchInput({
  onChange,
  value,
  error,
  onFocus,
  ...props
}: CitySearchInputType) {
  const theme = useMantineTheme();

  const [query, setQuery] = useState('');
  const [currentError, setCurrentError] = useState<string | null>(null);
  const debouncedQuery = useDebouncedState(query);

  const [continousData, setContinousData] = useState<string[]>([]);

  const { isLoading, isError, data, isSuccess } = useGetCities(debouncedQuery);

  useEffect(() => {
    if (!isSuccess) return;

    setContinousData((data as string[]) || []);
  }, [data]);

  useEffect(() => {
    if (debouncedQuery.length < 3) setContinousData([]);
  }, [debouncedQuery]);

  const handleItemSubmit = (item: { value: string }) => {
    onChange(item.value as string);
  };

  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (isError || error) (searchBoxRef.current as any).blur();
    if (isError) {
      setCurrentError('Doszło do błędu podczas pobierania miejscowości');
      setQuery('');
    }
    if (error) setCurrentError(error);
  }, [isError, error]);

  const handleFocus = () => {
    setCurrentError(null);
    // eslint-disable-next-line no-unused-expressions
    onFocus && onFocus();
  };

  if (value) {
    return (
      <Input.Wrapper label={'Miejscowość'} withAsterisk>
        <Input
          component="button"
          rightSection={
            <ActionIcon onClick={() => onChange('')}>
              <IconPencil size={25} color={theme.colors.blue[7]} stroke={1.5} />
            </ActionIcon>
          }
        >
          <Text fw={500}>
            Wybrano: <Badge variant="filled">{value}</Badge>
          </Text>
        </Input>
      </Input.Wrapper>
    );
  }

  return (
    <Autocomplete
      ref={searchBoxRef}
      value={query}
      onChange={setQuery}
      onItemSubmit={handleItemSubmit}
      label={'Miejscowość'}
      placeholder="Zacznij wpisywać nazwę miejscowości"
      withAsterisk
      nothingFound={
        query.length < 3
          ? 'Wpisz przynajmniej trzy znaki, by zacząć wyszukiwać'
          : isLoading
          ? 'Ładowanie...'
          : 'Nie znaleziono takiej miejscowości'
      }
      rightSection={
        <div
          style={{
            ...(isLoading && query.length >= 3 ? {} : { opacity: 0 }),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader size={15} />
        </div>
      }
      onFocus={handleFocus}
      filter={() => true}
      data={continousData}
      error={currentError}
      {...props}
    />
  );
}
