import 'dayjs/locale/pl';
import { ReactNode, useEffect } from 'react';
import { Container } from '@mantine/core';
import { GlobalProviders } from '@/components/GlobalProviders';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';

type LayoutProps = {
  children: ReactNode;
};

const testData = [
  {
    id: '0',
    title: 'Sadzenie drzew z okazji Dnia Pracy',
    date: new Date('2023-06-28'),
    time: '19:30',
    city: 'Białystok',
    specificPlace: 'Przy wejściu do parku w centrum miasta',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '1',
    title: 'Sadzenie sadzonek wierzb',
    date: new Date('2023-07-13'),
    time: '12:20',
    city: 'Wrocław',
    specificPlace: 'Na rynku miejskim przy ratuszu',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '2',
    title: 'Sadzimy drzewa',
    date: new Date('2023-08-20'),
    time: '07:13',
    city: 'Łódź',
    specificPlace: 'Przy lodowisku miejskim na ulicy Ulica',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '3',
    title: 'Sadzimy drzewa 2',
    date: new Date('2023-07-20'),
    time: '08:13',
    city: 'Białystok',
    specificPlace: 'Przy lodowisku miejskim na ulicy Ulica2',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '4',
    title: 'Sadzimy drzewa 3. Kolejne miasto!',
    date: new Date('2023-09-14'),
    time: '09:20',
    city: 'Wrocław',
    specificPlace: 'W parku koło centrum miasta',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '5',
    title: 'Sadzimy drzewa 4',
    date: new Date('2023-06-13'),
    time: '11:11',
    city: 'Warszawa',
    specificPlace: 'W Łazienkach Królewskich',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },

  {
    id: '6',
    title: 'Drzewa to nasza przyszłość',
    date: new Date('2023-06-20'),
    time: '20:20',
    city: 'Radom',
    specificPlace: 'Przy lotnisku',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },

  {
    id: '7',
    title: 'Drzewa to nasza przyszłość 2',
    date: new Date('2023-07-20'),
    time: '17:10',
    city: 'Radom',
    specificPlace: 'Przy lotnisku',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '8',
    title: 'Drzewa to nasza przyszłość 3',
    date: new Date('2023-10-20'),
    time: '13:00',
    city: 'Rzeszów',
    specificPlace: 'Na rynku koło ratusza',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },

  {
    id: '9',
    title: 'Drzewa to nasza przyszłość 4',
    date: new Date('2023-11-13'),
    time: '10:30',
    city: 'Łódź',
    specificPlace: 'Przy wejściu do basenu miejskiego na ulicy Ulica3',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },

  {
    id: '10',
    title: 'Sadzenie brzóz',
    date: new Date('2023-05-12'),
    time: '11:00',
    city: 'Warszawa',
    specificPlace: 'Przy ratuszu na rynku miejskim',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
  {
    id: '11',
    title: 'Sadzimy drzewa',
    date: new Date('2023-06-11'),
    time: '13:00',
    city: 'Białystok',
    specificPlace: 'Przy ratuszu na rynku miejskim',
    organisation: 'Fundacja 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam neque eros, tempor eu enim et, porta luctus metus. Cras facilisis luctus varius. Integer consectetur ante in enim auctor, ut aliquet dolor dictum. Sed massa justo, vehicula sed ultrices vel, venenatis sit amet diam. Quisque sit amet diam vel elit blandit lobortis quis id urna. Nam quis ex quis nisi rutrum vulputate ac ut tellus. Morbi scelerisque aliquet urna.\n' +
      '\n' +
      'Mauris eget fermentum mi. In vestibulum metus augue, quis molestie est imperdiet vitae. Praesent vehicula vitae velit et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare ligula dictum ipsum viverra blandit. Etiam et erat tristique, porttitor nibh id, convallis ex. Aliquam ornare libero a nisl sollicitudin pulvinar id in purus. Praesent volutpat elementum massa ut condimentum. Etiam interdum pharetra sollicitudin. Duis ultricies libero id nulla placerat, sed ornare erat faucibus. Nam sed placerat nunc. Mauris tempor orci quis est lacinia mollis.\n' +
      '\n' +
      'Sed scelerisque in orci quis gravida. Integer tempus, eros vel dignissim venenatis, ante velit malesuada tortor, eu blandit velit mi eget nisl. Sed a augue dignissim, placerat dui quis, pulvinar dolor. Integer non rutrum sem. Pellentesque venenatis scelerisque massa eu venenatis. Praesent ultricies.',
  },
];

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    if (!localStorage.getItem('ads')) {
      localStorage.setItem('ads', JSON.stringify(testData));
    }
  }, []);

  return (
    <GlobalProviders>
      <DatesProvider settings={{ locale: 'pl' }}>
        <Notifications />
        <Header />
        <Container
          fluid
          style={{ minHeight: 'calc(100vh - 120px)', padding: '30px 40px' }}
        >
          {children}
        </Container>
        <Footer />
      </DatesProvider>
    </GlobalProviders>
  );
}
