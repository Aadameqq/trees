import { Button } from '@mantine/core';
import Link from 'next/link';

export function HeaderBtns() {
  return (
    <>
      <Link href="/login">
        <Button variant="default">Zaloguj się</Button>
      </Link>
      <Link href="/register">
        <Button>Zarejestruj się</Button>
      </Link>
    </>
  );
}
