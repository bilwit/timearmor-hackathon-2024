import { AppShell, Burger, Group, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from './assets/logo_timearmor.webp';
import Cameras from './Cameras';
import WsContext from './wsContext';
import useWebSocket from './useWebSocket';

function App() {
  const { isConnected, socket } = useWebSocket();
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
          <WsContext.Provider value={{ isConnected, socket }}>
            <Cameras />
          </WsContext.Provider>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
