import { Autocomplete, createStyles, Loader } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  search: {
    flexGrow: 1,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

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
  // eslint-disable-next-line react/require-default-props
  error?: string;
  // eslint-disable-next-line react/require-default-props
  onChange: (val: string) => void;
  // eslint-disable-next-line react/require-default-props
  onBlur?: () => void;
  // eslint-disable-next-line react/require-default-props
  onFocus?: () => void;
  value: string;
};

export default function CityQueryInput({
  onChange,
  value,
  error,
  onFocus,
  ...props
}: CitySearchInputType) {
  const { classes } = useStyles();
  const [currentError, setCurrentError] = useState<string | null>(null);
  const debouncedQuery = useDebouncedState(value);

  const [continousData, setContinousData] = useState<string[]>([]);

  const { isLoading, isError, data, isSuccess } = useGetCities(debouncedQuery);

  useEffect(() => {
    if (!isSuccess) return;

    setContinousData((data as string[]) || []);
  }, [data]);

  useEffect(() => {
    if (debouncedQuery.length < 3) setContinousData([]);
  }, [debouncedQuery]);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (isError || error) (searchBoxRef.current as any).blur();
    if (isError) {
      setCurrentError('Doszło do błędu podczas pobierania miejscowości');
      onChange('');
    }
    if (error) setCurrentError(error);
  }, [isError, error]);

  const handleFocus = () => {
    setCurrentError(null);
    // eslint-disable-next-line no-unused-expressions
    onFocus && onFocus();
  };

  return (
    <Autocomplete
      styles={{ input: { height: 45 } }}
      className={classes.search}
      radius={'xl'}
      ref={searchBoxRef}
      value={value}
      onChange={onChange}
      placeholder="Zacznij wpisywać nazwę miejscowości"
      withAsterisk
      nothingFound={
        value.length < 3
          ? 'Wpisz przynajmniej trzy znaki, by zacząć wyszukiwać'
          : isLoading
          ? 'Ładowanie...'
          : 'Nie znaleziono takiej miejscowości'
      }
      rightSection={
        <div
          style={{
            ...(isLoading && value.length >= 3 ? {} : { opacity: 0 }),
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
