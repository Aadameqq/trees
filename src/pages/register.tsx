import { Center, Divider, Paper, Text } from '@mantine/core';

export default function RegisterPage() {
  return (
    <Center style={{ height: 'calc(100vh - 180px)' }}>
      <Paper withBorder shadow="sm" p="xl" style={{ maxWidth: 800 }}>
        <Text weight={500} size="lg">
          Rejestracja niedostępna
        </Text>
        <Divider my="sm" color="gray.1" />
        <Text mt="xs" color="dimmed" size="sm">
          <Text pb={15}>
            By przetestować funkcjonalności wymagające bycia zalogowanym
            skorzystaj z poniższego konta testowego
          </Text>
          <Text>
            <span style={{ fontWeight: 700 }}>Email:</span> testEmail@testDomain
          </Text>
          <Text>
            <span style={{ fontWeight: 700 }}>Hasło:</span> testPassword!
          </Text>
        </Text>
      </Paper>
    </Center>
  );
}
