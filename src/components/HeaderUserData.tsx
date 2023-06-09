import {
  Avatar,
  createStyles,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    color: theme.black,
    margin: 0,
    padding: ' 0 20px',
    height: '100%',
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));

export function HeaderUserData({
  username,
  id,
}: {
  username: string;
  id: string;
}) {
  const { classes } = useStyles();

  const { destroyAuth } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    destroyAuth();
    router.push('/');
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group style={{ height: '60px' }}>
            <Avatar radius="xl" />

            <Text size="sm" weight={500}>
              {username}
            </Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Ogłoszenia</Menu.Label>
        <Link href={'/ads/create'} style={{ textDecoration: 'none' }}>
          <Menu.Item>Utwórz</Menu.Item>
        </Link>
        <Link href={'/ads/manage'} style={{ textDecoration: 'none' }}>
          <Menu.Item>Zarządzaj</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Label>Konto</Menu.Label>
        <Menu.Item color="red" onClick={handleLogout}>
          Wyloguj się
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
