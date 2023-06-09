import { Card, Center, createStyles } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white[4],
    width: '1000px',
    [theme.fn.smallerThan(1100)]: {
      width: '100%',
    },
  },
}));

export function CreateManagedAd() {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={classes.card}
      shadow="md"
    >
      <Link href="/ads/create" style={{ width: '100%' }}>
        <Center style={{ width: '100%' }}>
          <IconPlus size={50} color={'grey'} />
        </Center>
      </Link>
    </Card>
  );
}
