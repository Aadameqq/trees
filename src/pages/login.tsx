import { useForm, zodResolver } from '@mantine/form';
import {
  Center,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import zod from 'zod';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@/components/LoadingButton';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import { useRouter } from 'next/router';

const validationSchema = zod.object({
  email: zod.string().min(3, { message: 'Nie podano maila' }),
  password: zod.string().min(3, { message: 'Nie podano hasła' }),
});

const useLogin = () => {
  return useMutation(({ credentials }: { credentials: any }) => {
    return new Promise<{ success: boolean; username: string; id: string }>(
      (resolve, reject) => {
        if (
          credentials.email !== 'testEmail@testDomain' ||
          credentials.password !== 'testPassword!'
        ) {
          reject(new AxiosError('Error', '401'));
        } else resolve({ success: true, username: 'Jan Kowalski', id: 'id' });
      },
    );
  });
};
const getErrorContent = (error: unknown) => {
  if (!error) return '';
  if (error instanceof AxiosError && error.code === '401') {
    return 'Podany email lub hasło są niepoprawne';
  }
  return 'Doszło do błędu podczas logowania. Spróbuj ponownie';
};

export default function LoginPage() {
  const { mutate, error, isLoading } = useLogin();
  const { createAuth } = useContext(AuthContext);
  const router = useRouter();

  const form = useForm({
    validate: zodResolver(validationSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: unknown) => {
    mutate(
      { credentials: values },
      {
        onSuccess: (value: any) => {
          createAuth(value.username, value.id);
          router.push('/ads/manage');
        },
      },
    );
  };

  return (
    <Center style={{ height: 'calc(100vh - 180px)' }}>
      <Paper radius="md" p="xl" withBorder style={{ width: '500px' }}>
        <Text size="lg" weight={500}>
          Logowanie
        </Text>
        <Divider my="sm" color="gray.1" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="Email"
              radius="md"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Hasło"
              radius="md"
              {...form.getInputProps('password')}
            />
          </Stack>

          <Text color={'red'} mt={15}>
            {getErrorContent(error)}
          </Text>
          <Group position="right" mt="xl">
            <LoadingButton type="submit" radius="xl" isLoading={isLoading}>
              Zaloguj się
            </LoadingButton>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
