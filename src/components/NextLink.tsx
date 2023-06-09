import { createStyles, rem } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.gray[8],
    paddingTop: rem(3),
    paddingBottom: rem(3),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

type NextLinkProps = {
  href: string;
  children: ReactNode;
};

export function NextLink({ href, children }: NextLinkProps) {
  const { classes } = useStyles();
  return (
    <Link className={classes.link} href={href}>
      {' '}
      {children}
    </Link>
  );
}
