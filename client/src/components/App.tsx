import { AppShell, Burger, Group, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../assets/logo_timearmor.webp';
import Cameras from './cameras/Cameras';
// import WsContext from './wsContext';
// import useWebSocket from './useWebSocket';
import '../index.css';

function App() {
  // const { isConnected, socket } = useWebSocket();
  const [opened, { toggle }] = useDisclosure();
  
  return (
    <MantineProvider defaultColorScheme="auto">
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              <img src={logo} height={60} />
              <b>Hackathon 2024</b>
              <Group ml="xl" gap={0} visibleFrom="sm">
                <NavLink label="IP Cameras" />
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavLink label="IP Cameras" />
      </AppShell.Navbar>

        <AppShell.Main>
          {/* <WsContext.Provider value={{ isConnected, socket }}> */}
            <Cameras />
          {/* </WsContext.Provider> */}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
