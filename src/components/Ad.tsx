import {
  Card,
  createStyles,
  Group,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconClockHour3, IconMapPin, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

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
      fontSize: 15,
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

type AdProps = {
  id: string;
  title: string;
  date: Date;
  time: string;
  city: string;
  specificPlace: string;
  organisation: string;
};

export function Ad({ ad }: { ad: AdProps }) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      padding="md"
      radius="md"
      className={classes.card}
      shadow="md"
    >
      <Link
        href={`/ads/${ad.id}`}
        style={{ width: '100%', textDecoration: 'none' }}
      >
        <Group position="apart" noWrap>
          <Text fw={500} size="lg" className={classes.title} color={'black'}>
            {ad.title}
          </Text>
        </Group>
        <div>
          <Group
            noWrap
            style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}
          >
            <span style={{ width: 24, marginTop: 4 }}>
              <IconMapPin stroke={1} color={'black'} />
            </span>

            <div>
              <Text fw={500} fz={'md'} color={theme.colors.dark[5]}>
                {ad.city}
              </Text>
              <Text fz="xs" c="dimmed">
                {ad.specificPlace}
              </Text>
            </div>
          </Group>
          <Group mt="md" mb={15} noWrap>
            <span style={{ width: 24, marginTop: 5 }}>
              <IconClockHour3 color={'black'} stroke={1} />
            </span>
            <Text fw={500} fz="sm" color={theme.colors.dark[5]}>
              {`${formatDate(ad.date)} ${ad.time}`}
            </Text>
          </Group>
          <Group mt="md" mb={15} noWrap>
            <span style={{ width: 24, marginTop: 5 }}>
              <IconUser color={'black'} stroke={1} />
            </span>
            <Text fw={500} fz="sm" color={theme.colors.dark[5]}>
              {ad.organisation}
            </Text>
          </Group>
        </div>
      </Link>
    </Card>
  );
}
