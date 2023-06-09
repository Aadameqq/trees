import { Center, Flex, Loader, Text } from '@mantine/core';
import { ManagedAd } from '@/components/ManagedAd';
import { ManagedAdContent } from '@/components/ManagedAdContent';
import { CreateManagedAd } from '@/components/CreateManagedAd';
import { useQuery } from '@tanstack/react-query';
import { Authenticator } from '@/components/Authenticator';

const getManagedAds = () => {
  return new Promise<ManagedAd[]>((resolve) => {
    const data = JSON.parse(localStorage.getItem('ads') || '[]');

    const parsedData = data.map((x: any) => ({ ...x, date: new Date(x.date) }));
    resolve(parsedData);
  });
};

const useGetManagedAds = () => {
  return useQuery<ManagedAd[]>({
    queryKey: ['getManagedAds'],
    queryFn: getManagedAds,
  });
};

function ManageAdsPage() {
  const { isLoading, isError, data } = useGetManagedAds();

  if (isError) {
    return (
      <Center style={{ height: 'calc(100vh - 180px)' }}>
        <Text fw={500} fz={40} color={'red'} align={'center'}>
          Doszło do błędu podczas ładowania ogłoszeń
        </Text>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center style={{ height: 'calc(100vh - 180px)' }}>
        <Loader size={50} />
      </Center>
    );
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      gap={20}
      style={{ width: '100%' }}
      direction={'column'}
    >
      {data.map((ad) => (
        <ManagedAdContent key={ad.id} ad={ad} />
      ))}
      {data.length === 0 && (
        <>
          <Text fz={18} mb={0}>
            Brak ogłoszeń
          </Text>
          <Text fz={18}>Utwórz nowe ogłoszenie poniższym przyciskiem</Text>
        </>
      )}
      <CreateManagedAd />
    </Flex>
  );
}

export default function AuthManageAdsPage() {
  return (
    <Authenticator>
      <ManageAdsPage />
    </Authenticator>
  );
}
