import {
  createStyles,
  Flex,
  Loader,
  Pagination,
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import CityQueryInput from '@/components/CityQueryInput';
import { Ad } from '@/components/Ad';
import { useQuery } from '@tanstack/react-query';
import { LoadingButton } from '@/components/LoadingButton';

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  search: {
    flexGrow: 1.5,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  btn: {
    width: 150,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

const getAds = (parameters: any) => {
  return new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem('ads') || '[]');

    let parsedData = data.map((x: any) => ({
      ...x,
      date: new Date(x.date),
    }));

    parsedData = parsedData.reduce((total: any[], x: any) => {
      if (
        x.title.toLowerCase().includes(parameters.query.toLowerCase()) ||
        !parameters.query
      ) {
        return [...total, x];
      }
      return total;
    }, []);

    parsedData = parsedData.reduce((total: any[], x: any) => {
      if (
        !parameters.city ||
        x.city.toLowerCase().includes(parameters.city.toLowerCase())
      ) {
        return [...total, x];
      }
      return total;
    }, []);

    const { length } = parsedData;

    parsedData = parsedData.splice((parameters.page - 1) * 10, 10);

    const final = {
      pages: Math.ceil(length / 10),
      content: parsedData,
    };
    resolve(final);
  });
};

const useGetAds = (parameters: any) => {
  return useQuery({
    queryKey: ['getAds', parameters],
    queryFn: () => getAds(parameters),
  });
};

export default function AdsPage() {
  const { classes } = useStyles();

  const [parameters, setParameters] = useState({
    query: '',
    city: '',
    page: 1,
  });

  const { isLoading, data, isError, isSuccess } = useGetAds(parameters);

  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');

  const handlePageChange = (value: number) => {
    setParameters((prev) => ({ ...prev, page: value }));
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = () => {
    setParameters((prev) => ({ ...prev, query, city }));
  };

  return (
    <Flex justify={'center'}>
      <Flex
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 180px)',
          paddingTop: 100,
          maxWidth: 1300,
        }}
        align={'center'}
        direction={'column'}
        gap={50}
      >
        <Flex
          style={{
            width: '100%',
          }}
          justify={'center'}
          gap={10}
          className={classes.container}
        >
          <TextInput
            placeholder="Wpisz szukaną frazę"
            radius={'xl'}
            className={classes.search}
            styles={{ input: { height: 45 } }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CityQueryInput onChange={setCity} value={city} />
          <LoadingButton
            isLoading={isLoading}
            radius={'xl'}
            style={{ height: 45 }}
            rightIcon={!isLoading && <IconSearch size="1.1rem" stroke={1.5} />}
            className={classes.btn}
            onClick={handleSearchSubmit}
          >
            Szukaj
          </LoadingButton>
        </Flex>
        <Flex
          direction={'column'}
          gap={20}
          style={{
            width: '100%',
          }}
          align={'center'}
        >
          {isLoading && <Loader size={40} />}
          {isError && (
            <Text color={'red'} fz={'md'}>
              Doszło do błędu podczas pobierania ogłoszeń
            </Text>
          )}

          {isSuccess &&
            (data as any).content.map((ad: any) => <Ad ad={ad} key={ad.id} />)}

          {isSuccess && (data as any).content.length === 0 && (
            <Text fz={'md'}>Nie znaleziono żadnych ogłoszeń</Text>
          )}
        </Flex>
        {isSuccess && (
          <Pagination
            value={parameters.page}
            total={(data as any).pages}
            style={{ marginBottom: 50 }}
            onChange={handlePageChange}
            boundaries={0}
            siblings={0}
            withEdges
            styles={{ dots: { display: 'none' } }}
          />
        )}
      </Flex>
    </Flex>
  );
}
