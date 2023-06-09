import { createStyles, rem } from '@mantine/core';
import { ReactNode } from 'react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colors.gray[0],
    }),
  },
}));

type HeaderLinkProps = {
  children: ReactNode;
  href: string;
};

export function HeaderLink({ children, href }: HeaderLinkProps) {
  const { classes } = useStyles();
  return (
    <Link className={classes.link} href={href}>
      {children}
    </Link>
  );
}
