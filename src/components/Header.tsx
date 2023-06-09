import {
  Box,
  Burger,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header as H,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderLinks } from '@/components/HeaderLinks';
import { HeaderBtns } from '@/components/HeaderBtns';
import { HeaderUserData } from '@/components/HeaderUserData';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const TITLE = 'Drzewa to Przyszłość';

export function Header() {
  const { classes } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isAuth, getUser } = useContext(AuthContext);

  return (
    <Box>
      <H height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          {TITLE}
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Group sx={{ height: '100%' }} spacing={0} mr={30}>
              <HeaderLinks />
            </Group>
            <Group>
              {isAuth() ? (
                <HeaderUserData
                  username={getUser()?.username || ''}
                  id={getUser()?.id || ''}
                />
              ) : (
                <HeaderBtns />
              )}
            </Group>
          </Group>

          <Burger
            opened={false}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </H>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={TITLE}
        className={classes.hiddenDesktop}
        zIndex={1000000}
        style={{ paddingBottom: 0 }}
        onClick={closeDrawer}
      >
        <Divider color="gray.1" />

        <HeaderLinks />

        <Divider my="sm" color="gray.1" />

        <Group position="center" grow pb="xl" px="md">
          {isAuth() ? (
            <HeaderUserData
              username={getUser()?.username || ''}
              id={getUser()?.id || ''}
            />
          ) : (
            <HeaderBtns />
          )}
        </Group>
      </Drawer>
    </Box>
  );
}
