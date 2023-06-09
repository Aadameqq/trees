import { createStyles, Group, rem, Text } from '@mantine/core';
import { NextLink } from '@/components/NextLink';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.colors.gray[0],
    height: '60px',
  },
  footerGroup: {
    height: '100%',
  },
}));

export function Footer() {
  const { classes } = useStyles();
  return (
    <footer className={classes.footer}>
      <Group position="center" spacing="lg" className={classes.footerGroup}>
        <Text size="lg">
          Autor:{' '}
          <NextLink href="https://github.com/Aadameqq">Adam Bryndza</NextLink>
        </Text>
      </Group>
    </footer>
  );
}
