import { useState } from 'react';
import {
  Button,
  createStyles,
  Group,
  Paper,
  Stepper,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { LoadingButton } from '@/components/LoadingButton';
import Link from 'next/link';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import zod from 'zod';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import CitySearchInput from '@/components/CitySearchInput';
import { Authenticator } from '@/components/Authenticator';
import { v4 as uuidv4 } from 'uuid';

const useStyles = createStyles((theme) => ({
  btn: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

const validations = [
  zod.object({
    title: zod
      .string()
      .min(5, { message: 'Długość tytułu musi wynosić minimalnie 5 znaków' })
      .max(100, {
        message: 'Długość tytułu może wynosić maksymalnie 100 znaków',
      }),
    organisation: zod
      .string()
      .min(3, {
        message: 'Długość nazwy organizacji musi wynosić minimalnie 3 znaki',
      })
      .max(60, {
        message: 'Długość nazwy organizacji może wynosić maksymalnie 60 znaków',
      }),
  }),
  zod.object({
    date: zod
      .date({
        required_error: 'Nie podano daty',
        invalid_type_error: 'Nie podano daty',
      })
      .min(new Date(), {
        message: 'Podana data musi być późniejsza niż dzień dzisiejszy',
      }),
    time: zod.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Podany czas jest niepoprawny',
    }),
  }),
  zod.object({
    city: zod.string().min(3, {
      message: 'Nie podano nazwy miejscowości',
    }),
    specificPlace: zod
      .string()
      .min(3, {
        message:
          'Długość dokładnej lokalizacji musi wynosić minimalnie 3 znaki',
      })
      .max(100, {
        message:
          'Długość dokładnej lokalizacji może wynosić maksymalnie 100 znaków',
      }),
  }),
  zod.object({
    description: zod
      .string()
      .min(10, { message: 'Długość opisu musi wynosić minimalnie 10 znaków' })
      .max(10000, {
        message: 'Długość opisu może wynosić maksymalnie 10000 znaków',
      }),
  }),
];

type Ad = {
  title: string;
  organisation: string;
  date: Date;
  time: string;
  city: string;
  specificPlace: string;
  description: string;
};

const useCreateAd = () => {
  return useMutation(({ ad }: { ad: Ad }) => {
    return new Promise<{ success: boolean; id: string }>((resolve, reject) => {
      try {
        const currentData = JSON.parse(localStorage.getItem('ads') || '[]');
        const id = uuidv4();
        const newData = [
          ...currentData,
          { ...ad, date: ad.date.toDateString(), id },
        ];
        localStorage.setItem('ads', JSON.stringify(newData));
        resolve({ success: true, id });
      } catch (err) {
        reject(err);
      }
    });
  });
};

function Create() {
  const { classes } = useStyles();
  const [currentStep, setCurrentStep] = useState(0);

  const { mutate, isLoading } = useCreateAd();

  const [id, setId] = useState('');

  const nextStep = () =>
    setCurrentStep((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setCurrentStep((current) => (current > 0 ? current - 1 : current));

  const form = useForm<Ad>({
    validate: (values: any) => {
      if (currentStep >= 4) return {};

      const validation = validations[currentStep];

      return zodResolver(validation)(values);
    },
    initialValues: {
      title: '',
      organisation: '',
      date: new Date(),
      time: '',
      city: '',
      specificPlace: '',
      description: '',
    },
  });

  const nextStepIfNoErrors = () => !form.validate().hasErrors && nextStep();

  const handleSubmit = (values: Ad) => {
    mutate(
      { ad: values },
      {
        onSuccess: (valuesData: any) => {
          setId(valuesData.id);
          nextStepIfNoErrors();
        },
        onError: () => {
          notifications.show({
            withCloseButton: true,
            autoClose: 10000,
            withBorder: true,
            title: 'Doszło do błędu podczas tworzenia ogłoszenia',
            message: 'Spróbuj ponownie',
            color: 'red',
            icon: <IconX />,
          });
        },
      },
    );
  };

  return (
    <Group position={'center'}>
      <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: 1000 }}>
        <Stepper active={currentStep} breakpoint="sm" style={{ width: '100%' }}>
          <Stepper.Step label="Krok pierwszy" description="Główne informacje">
            <TextInput
              label="Tytuł ogłoszenia"
              withAsterisk
              placeholder={'Tytuł ogłoszenia'}
              {...form.getInputProps('title')}
            />

            <TextInput
              withAsterisk
              label="Nazwa organizacji organizującej wydarzenie"
              mt={15}
              placeholder={'Nazwa organizacji'}
              {...form.getInputProps('organisation')}
            />
          </Stepper.Step>
          <Stepper.Step label="Krok drugi" description="Czas">
            <DateInput
              withAsterisk
              label="Data wydarzenia"
              placeholder="Data wydarzenia"
              mx="auto"
              {...form.getInputProps('date')}
            />
            <TimeInput
              withAsterisk
              mt={15}
              label="Czas wydarzenia"
              {...form.getInputProps('time')}
            />
          </Stepper.Step>
          <Stepper.Step label="Krok trzeci" description="Miejsce">
            <CitySearchInput {...form.getInputProps('city')} />
            <TextInput
              label="Szczegółowa lokalizacja"
              mt={15}
              withAsterisk
              placeholder={'Opis lokalizacji'}
              {...form.getInputProps('specificPlace')}
            />
          </Stepper.Step>
          <Stepper.Step label="Krok czwarty" description="Opis">
            <Textarea
              withAsterisk
              placeholder="Opis wydarzenia"
              label="Opis wydarzenia"
              {...form.getInputProps('description')}
              styles={{ input: { height: 500 } }}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <Paper p="xl">
              <Text fw={500} fz={30} align={'center'}>
                Twoje ogłoszenie zostało pomyślnie utworzone!
              </Text>
            </Paper>
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt={30}>
          {![0, 4].includes(currentStep) && (
            <Button
              className={classes.btn}
              variant="default"
              onClick={prevStep}
            >
              Poprzedni krok
            </Button>
          )}
          {currentStep === 3 ? (
            <LoadingButton
              className={classes.btn}
              isLoading={isLoading}
              color="green"
              type={'submit'}
            >
              Utwórz ogłoszenie
            </LoadingButton>
          ) : currentStep === 4 ? (
            <>
              <Link href="/" className={classes.btn}>
                <Button className={classes.btn} variant="default">
                  Zamknij
                </Button>
              </Link>
              <Link href={`/ads/${id}`} className={classes.btn}>
                <Button className={classes.btn}>Przejdź do ogłoszenia</Button>
              </Link>
            </>
          ) : (
            <Button className={classes.btn} onClick={nextStepIfNoErrors}>
              Następny krok
            </Button>
          )}
        </Group>
      </form>
    </Group>
  );
}

export default function AuthCreatePage() {
  return (
    <Authenticator>
      <Create />
    </Authenticator>
  );
}
