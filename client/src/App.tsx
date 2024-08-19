import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { AppShell, Burger, Grid, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
            <Grid>
              <Grid.Col span={1} hiddenFrom="sm">
                <Burger 
                  opened={opened} 
                  onClick={toggle} 
                  hiddenFrom="sm" size="sm" 
                />
              </Grid.Col>
              <Grid.Col span={11}>
                <h2>Health Bar Overlay</h2>
              </Grid.Col>
            </Grid>          
          </AppShell.Header>

          <AppShell.Navbar 
            p="md"
          >
            <NavLink 
              label="Settings" 
              active={true}
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            />
          </AppShell.Navbar>

          <AppShell.Main>
            <Routes>
              <Route
                path="/*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </AppShell.Main>
        </AppShell>
    </MantineProvider>
  );
}

export default App
