import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Edit } from '@/components/Edit';
import { Center, Loader, Text } from '@mantine/core';
import { Authenticator } from '@/components/Authenticator';

type Ad = {
  title: string;
  organisation: string;
  date: Date;
  time: string;
  city: string;
  specificPlace: string;
  description: string;
};

const readAdById = (id: string): Promise<Ad> => {
  return new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem('ads') || '[]');

    const parsedData = data.map((x: any) => ({ ...x, date: new Date(x.date) }));
    const ad = parsedData.find((x: any) => x.id === id);
    resolve(ad);
  });
};

const useReadAdById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['readAdById', id],
    queryFn: () => readAdById(id!),
    enabled: !!id,
  });
};

function EditPage() {
  const router = useRouter();
  const { adId } = router.query;

  const { data, isError, isLoading } = useReadAdById(adId as string);

  if (isError) {
    return (
      <Center style={{ height: 'calc(100vh - 180px)' }}>
        <Text fw={500} fz={40} color={'red'} align={'center'}>
          Doszło do błędu podczas ładowania ogłoszenia
        </Text>
      </Center>
    );
  }

  if (isLoading || !adId) {
    return (
      <Center style={{ height: 'calc(100vh - 180px)' }}>
        <Loader size={50} />
      </Center>
    );
  }
  return <Edit initialAd={data} adId={adId as string} />;
}

export default function AuthEditPage() {
  return (
    <Authenticator>
      <EditPage />
    </Authenticator>
  );
}
