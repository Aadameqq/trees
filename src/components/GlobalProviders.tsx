import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { AuthContextProvider } from '@/components/AuthContext';

type GlobalProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
