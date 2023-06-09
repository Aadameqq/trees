import { Button, ButtonProps, useMantineTheme } from '@mantine/core';
import React, { ReactNode } from 'react';

export type LoadingButtonProps = {
  children: ReactNode;
  isLoading: boolean;
  onClick?: any;
} & ButtonProps;

export function LoadingButton({
  children,
  isLoading = false,
  disabled,
  ...props
}: LoadingButtonProps) {
  const theme = useMantineTheme();
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      sx={{
        ':disabled': {
          color: theme.colors.dark[3],
          backgroundColor: theme.colors.gray[3],
        },
      }}
    >
      {isLoading ? 'Ładowanie...' : children}
    </Button>
  );
}
