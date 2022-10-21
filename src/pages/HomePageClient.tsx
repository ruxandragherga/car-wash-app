import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';

export default function HomePageClient() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main" sx={{justifyContent:"center"}}>
      <CssBaseline />
      <AppBar position="relative" >
        <Toolbar>
          <Button variant="contained" href="/home-page">
          <HomeIcon />
          </Button>
          <Typography variant="h5" color="inherit" sx={{ml: 4}} noWrap>
            Car Wash Appointment Booking App
          </Typography>
          <Button variant="contained" href="/" sx={{ml:70}}>Log out</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            m:0,
            width: 1262,
            height:400,
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/car-wash-black-car-active-foam-banner-copy-space-toned_114106-2438.jpg?w=1380)",
          }}
        >
          <Container maxWidth="sm" sx={{p:8}}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#000000"
              gutterBottom
              fontWeight={600}
            >
              Programeaza-te Online!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/appointment">Programare online</Button>
              <Button variant="outlined"href="/my-appointments">Programarile mele</Button>
            </Stack>
          </Container>
        </Box>
        <Grid container spacing={2} px={40}>
        <Grid item xs={12} md={6} >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" fontWeight={600}>
            Servicii spalatorie auto
          </Typography>
            <List >
                <ListItem>
                  <ListItemText
                    primary="Spalat auto exterior"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Curatat auto interior"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Dezinfectie auto interior"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Spalat tapiterie"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Curatat jante"
                  />
                </ListItem>,
            </List>
        </Grid>
        <TabContext value={value}>
          <Box sx={{my: 5, height: 300 }}>
        <Tabs value={value} onChange={handleChange} >
        <Tab value="1" label="Small" />
        <Tab value="2" label="Medium" />
        <Tab value="3" label="Large" />
      </Tabs>
        <TabPanel sx={{height:10}} value="1">60 </TabPanel>
        <TabPanel sx={{height:10}} value="1">120 </TabPanel>
        <TabPanel sx={{height:10}} value="1">40 </TabPanel>
        <TabPanel sx={{height:10}} value="1">800 </TabPanel>
        <TabPanel sx={{height:10}} value="1">40 </TabPanel>

        <TabPanel sx={{height:10}} value="2">70 </TabPanel>
        <TabPanel sx={{height:10}} value="2">140 </TabPanel>
        <TabPanel sx={{height:10}} value="2">40 </TabPanel>
        <TabPanel sx={{height:10}} value="2">850 </TabPanel>
        <TabPanel sx={{height:10}} value="2">60 </TabPanel>

        <TabPanel sx={{height:10}} value="3">80 </TabPanel>
        <TabPanel sx={{height:10}} value="3">160 </TabPanel>
        <TabPanel sx={{height:10}} value="3">40 </TabPanel>
        <TabPanel sx={{height:10}} value="3">900 </TabPanel>
        <TabPanel sx={{height:10}} value="3">80 </TabPanel>
        </Box>
      </TabContext>
        <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" fontWeight={600}>
            Servicii de polish
          </Typography>
            <List >
                <ListItem>
                  <ListItemText
                    primary="Polish auto exterior"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Polish faruri"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Detailing motor"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Igenizare instalatie A/C"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Curatare parbrize"
                  />
                </ListItem>,
            </List>
        </Grid>
        <TabContext value={value}>
          <Box sx={{my: 5, height: 300 }}>
        <Tabs value={value} onChange={handleChange} >
        <Tab value="1" label="Small" />
        <Tab value="2" label="Medium" />
        <Tab value="3" label="Large" />
      </Tabs>
        <TabPanel sx={{height:10}} value="1">700 </TabPanel>
        <TabPanel sx={{height:10}} value="1">50 </TabPanel>
        <TabPanel sx={{height:10}} value="1">200 </TabPanel>
        <TabPanel sx={{height:10}} value="1">100 </TabPanel>
        <TabPanel sx={{height:10}} value="1">80 </TabPanel>

        <TabPanel sx={{height:10}} value="2">800 </TabPanel>
        <TabPanel sx={{height:10}} value="2">50 </TabPanel>
        <TabPanel sx={{height:10}} value="2">250 </TabPanel>
        <TabPanel sx={{height:10}} value="2">100 </TabPanel>
        <TabPanel sx={{height:10}} value="2">100 </TabPanel>

        <TabPanel sx={{height:10}} value="3">900 </TabPanel>
        <TabPanel sx={{height:10}} value="3">50 </TabPanel>
        <TabPanel sx={{height:10}} value="3">300 </TabPanel>
        <TabPanel sx={{height:10}} value="3">100 </TabPanel>
        <TabPanel sx={{height:10}} value="3">120 </TabPanel>
        </Box>
      </TabContext>
      </Grid>
      </main>
      {/* Footer */}
      <Box sx={{p: 4}} component="footer">
      <Divider/>
        <Typography variant="h6" align="center">
          Telefon
        </Typography>
        <Typography mb={4}
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          +40269218197
        </Typography>
        <Typography variant="h6" align="center">
          Adresa
        </Typography>
        <Typography mb={4}
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Calea Sagului nr. 100, Timisoara
        </Typography>
        <Typography variant="h6" align="center">
          Program
        </Typography>
        <Typography 
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Luni - Vineri: 8:00 - 18:00
        </Typography>
        <Divider/>
      </Box>
      
      {/* End footer */}
    </Grid>
  );
}