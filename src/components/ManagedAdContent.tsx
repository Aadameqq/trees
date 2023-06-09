import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Menu,
  Modal,
  rem,
  Text,
} from '@mantine/core';
import {
  IconCheck,
  IconClockHour3,
  IconDotsVertical,
  IconMapPin,
  IconTrashX,
  IconX,
} from '@tabler/icons-react';
import { ManagedAd } from '@/components/ManagedAd';
import { useDisclosure } from '@mantine/hooks';
import { LoadingButton } from '@/components/LoadingButton';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white,
    width: '1000px',
    [theme.fn.smallerThan(1100)]: {
      width: '100%',
    },
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

const getDateColor = (date: Date) => {
  if (date.getTime() < Date.now()) {
    return 'red';
  }
  const FOUR_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 4;
  if (date.getTime() < Date.now() + FOUR_DAYS_IN_MILLISECONDS) {
    return 'yellow';
  }
  return 'green';
};

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

const useDeleteAd = () => {
  return useMutation(({ id }: { id: string }) => {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      try {
        const current = JSON.parse(localStorage.getItem('ads') || '[]');
        const filtered = current.filter((x: any) => x.id !== id);
        localStorage.setItem('ads', JSON.stringify(filtered));
        resolve({ success: true });
      } catch (err) {
        reject(err);
      }
    });
  });
};

export function ManagedAdContent({ ad }: { ad: ManagedAd }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isLoading } = useDeleteAd();

  const { classes } = useStyles();

  const handleDelete = () => {
    mutate(
      { id: ad.id },
      {
        onSuccess: () => {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: 'Usunięto',
            message: 'Ogłoszenie zostało usunięte',
            color: 'green',
            withBorder: true,
            icon: <IconCheck />,
          });
          close();
        },
        onError: () => {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            withBorder: true,
            title: 'Doszło do błędu podczas usuwania',
            message: 'Spróbuj ponownie',
            color: 'red',
            icon: <IconX />,
          });
          close();
        },
      },
    );
  };

  return (
    <>
      <Card
        withBorder
        padding="lg"
        radius="md"
        className={classes.card}
        shadow="md"
      >
        <Group position="apart" noWrap>
          <Text fw={500} size="lg" className={classes.title}>
            {ad.title}
          </Text>
          <Menu shadow="md" width={200} withinPortal>
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical color="grey" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Zarządzanie</Menu.Label>
              <Link
                href={`/ads/${ad.id}/edit`}
                style={{ textDecoration: 'none' }}
              >
                <Menu.Item>Edytuj</Menu.Item>
              </Link>
              <Link href={`/ads/${ad.id}`} style={{ textDecoration: 'none' }}>
                <Menu.Item>Podgląd</Menu.Item>
              </Link>
              <Menu.Divider />
              <Menu.Label>Nieodwracalne działania</Menu.Label>
              <Menu.Item color="red" onClick={open}>
                Usuń
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group mt="lg" noWrap>
          <span style={{ width: 24, marginTop: 4 }}>
            <IconMapPin stroke={1} />
          </span>

          <div>
            <Text fw={500}>{ad.city}</Text>
            <Text fz="xs" c="dimmed">
              {ad.specificPlace}
            </Text>
          </div>
        </Group>
        <Group mt="md" mb={15} noWrap>
          <span style={{ width: 24, marginTop: 5 }}>
            <IconClockHour3 stroke={1} />
          </span>
          <Text fw={700} color={`${getDateColor(ad.date)}.9`} fz="sm">
            {`${formatDate(ad.date)} ${ad.time}`}
          </Text>
        </Group>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title="Czy na pewno chcesz usunąć poniższe ogłoszenie?"
      >
        <Group noWrap style={{ alignItems: 'center' }}>
          <span style={{ width: 30, paddingTop: 4 }}>
            <IconTrashX stroke={1.25} size={30} />
          </span>
          <Text fw={500} fz={14}>
            {ad.title}
          </Text>
        </Group>

        <Group position="right" mt={30}>
          <LoadingButton
            isLoading={isLoading}
            onClick={handleDelete}
            color={'red'}
          >
            Usuń
          </LoadingButton>
        </Group>
      </Modal>
    </>
  );
}
