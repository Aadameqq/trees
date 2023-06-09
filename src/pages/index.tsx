import {
  Button,
  Container,
  createStyles,
  Group,
  Image,
  rem,
  Text,
  Title,
} from '@mantine/core';
import image from '../../public/trees.svg';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      textAlign: 'center',
      marginRight: 0,
    },
  },

  title: {
    color: theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  controlGroup: {
    [theme.fn.smallerThan('md')]: {
      justifyContent: 'center',
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title} mt={60}>
              Zasadź drzewa <br /> w swojej okolicy
            </Title>
            <Text color="dimmed" mt="md">
              Znajdź akcję sadzenia drzew w swojej okolicy i dbaj o środowisko.
              Nasza strona internetowa pozwoli ci przeglądać akcje sadzenia
              drzew. Dzięki filtrom będziesz mógł wybrać pasujący ci termin.
            </Text>

            <Group mt={30} className={classes.controlGroup}>
              <Link href={'/ads'}>
                <Button radius="xl" size="md" className={classes.control}>
                  Przeglądaj ogłoszenia
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Zarejestruj się
                </Button>
              </Link>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
