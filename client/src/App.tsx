import { AppShell, Burger, Group, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from './assets/logo_timearmor.webp';

function App() {
  const [opened, { toggle }] = useDisclosure();
  
  return (
    <MantineProvider defaultColorScheme="auto">
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <img src={logo} height={60} />
            Hackathon 2024
          </Group>         
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavLink 
            label="IP Cameras" 
            active={true}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          hello world
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App
