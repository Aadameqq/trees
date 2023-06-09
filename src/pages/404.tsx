import { Button, createStyles, Flex, rem, Title } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    marginBottom: 20,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      wrap={'nowrap'}
      style={{ height: 'calc(100vh - 180px)', paddingBottom: rem(80) }}
    >
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Ta podstrona nie istnieje</Title>
      <Link href={'/'}>
        <Button variant="outline" size="md" radius={30}>
          Przejdź na stronę główną
        </Button>
      </Link>
    </Flex>
  );
}
