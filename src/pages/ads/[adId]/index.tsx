import {
  Card,
  Center,
  createStyles,
  Divider,
  Group,
  Loader,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconClockHour3, IconMapPin, IconUser } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white,
    width: '100%',
  },

  btn: {
    maxWidth: 100,
  },

  title: {
    [theme.fn.smallerThan(680)]: {
      fontSize: 25,
    },
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
  },
}));

const formatDateNumber = (num: number) => {
  if (num < 10) return `0${num}`;
  return num.toString();
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${formatDateNumber(day)}.${formatDateNumber(month)}.${year}`;
};

const getAd = (adId: string) => {
  return new Promise<any>((resolve) => {
    const data = JSON.parse(localStorage.getItem('ads') || '[]');

    const parsedData = data.find((x: any) => x.id === adId);
    resolve({ ...parsedData, date: new Date(parsedData.date) });
  });
};

const useGetAd = (adId?: string) => {
  return useQuery<any>({
    queryKey: ['getAd', adId],
    queryFn: () => getAd(adId!),
    enabled: !!adId,
  });
};

export default function SingleAd() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const router = useRouter();
  const { adId } = router.query;

  const { data, isLoading, isError } = useGetAd(adId as string | undefined);

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

  return (
    <Card shadow={'sm'} padding="lg" className={classes.card}>
      <Group position="apart" noWrap>
        <Text fw={700} size={30} className={classes.title}>
          {data!.title}
        </Text>
      </Group>
      <div>
        <Group
          noWrap
          style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}
        >
          <span style={{ width: 24, marginTop: 4 }}>
            <IconMapPin stroke={1} />
          </span>

          <div>
            <Text fw={500} fz={'md'} color={theme.colors.dark[5]}>
              {data!.city}
            </Text>
            <Text fz="xs" c="dimmed">
              {data!.specificPlace}
            </Text>
          </div>
        </Group>
        <Group mt="md" mb={15} noWrap>
          <span style={{ width: 24, marginTop: 5 }}>
            <IconClockHour3 stroke={1} />
          </span>
          <Text fw={500} fz="sm" color={theme.colors.dark[5]}>
            {`${formatDate(data!.date)} ${data!.time}`}
          </Text>
        </Group>
        <Group mt="md" mb={15} noWrap>
          <span style={{ width: 24, marginTop: 5 }}>
            <IconUser stroke={1} />
          </span>
          <Text fw={500} fz="sm" color={theme.colors.dark[5]}>
            {data!.organisation}
          </Text>
        </Group>
        <Divider my={'md'} color={'#e8e7e7'} />
        <Text color={'#424242'}>{data.description}</Text>
      </div>
    </Card>
  );
}
