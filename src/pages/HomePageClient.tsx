import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import { Service } from "../models/Service";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';

export default function HomePageClient() {
  const [userState, setUserState] = useUserContext();
  console.log(userState);
  const [washingServices, setWashingServices] = useState<Service[]>([]);
  const [polishServices, setPolishServices] = useState<Service[]>([]);

  React.useEffect(() => {
    async function getWashingServiceItems() {
      try {
        const res = await axios.get("http://localhost:3003/api/get");
        const { data } = await res;
        const allServices: Service[] = data;

        setWashingServices(
          allServices.filter(
            (service) => service.service_category === "spalare"
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
    getWashingServiceItems();
    async function getPolishServiceItems() {
      try {
        const res = await axios.get("http://localhost:3003/api/get");
        const { data } = await res;
        const allServices: Service[] = data;

        setPolishServices(
          allServices.filter((service) => service.service_category === "polish")
        );
      } catch (err) {
        console.log(err);
      }
    }
    getPolishServiceItems();
  }, []);
  const navigate = useNavigate();
  const handleHomePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/home-page");
  };
  const handleAppointment = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/appointment");
  };
  const handleMyAppointments = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/my-appointments");
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main" sx={{justifyContent:"center"}}>
      <CssBaseline />
      <AppBar position="relative" >
        <Toolbar>
          <Button variant="contained" onClick={(e) => handleHomePage(e)}>
          <LocalCarWashIcon />
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
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={(e) => handleAppointment(e)}>Programare online</Button>
              <Button variant="outlined" onClick={(e) => handleMyAppointments(e)}>Programarile mele</Button>
            </Stack>
          </Container>
        </Box>
        <Grid container spacing={2} sx={{mt:4, px: 30}}>
        <Grid item xs={6} >
          <Typography sx={{ mt: 4, mb: 3 }} variant="h6" component="div" fontWeight={600}>
            Servicii spalatorie auto
          </Typography>
            <List >
            {washingServices.map((service: any) => (
                <ListItem key={service.service_id}>
                <ListItemText
                  primary={service.service_name}
                />
                </ListItem>
            ))}
            </List>
        </Grid>
        <TabContext value={value}>
          <Box sx={{my: 4 }}>
        <Tabs value={value} onChange={handleChange} >
        <Tab value="1" label="Autoturisme" />
        <Tab value="2" label="Clasa Lux" />
        <Tab value="3" label="Clasa SUV" />
      </Tabs>
        <TabPanel value="1" ><List >
            {washingServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_1}>
                <ListItemText
                  primary={service.service_price_1}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
            <TabPanel value="2" ><List >
            {washingServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_2 * 2}>
                <ListItemText
                  primary={service.service_price_2}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
            <TabPanel value="3" ><List >
            {washingServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_3 * 3}>
                <ListItemText
                  primary={service.service_price_3}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
        </Box>
      </TabContext>
        <Grid item xs={6}>
        <Typography sx={{ mt: 4, mb: 3 }} variant="h6" component="div" fontWeight={600}>
            Servicii de polish
          </Typography>
          <List >
            {polishServices.map((service: any) => (
                <ListItem key={service.service_id}>
                <ListItemText
                  primary={service.service_name}
                />
                </ListItem>
            ))}
            </List>
        </Grid>
        <TabContext value={value}>
          <Box sx={{my: 4 }}>
        <Tabs value={value} onChange={handleChange} >
        <Tab value="1" label="Autoturisme" />
        <Tab value="2" label="Clasa Lux" />
        <Tab value="3" label="Clasa SUV" />
      </Tabs>
        <TabPanel value="1" ><List >
            {polishServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_1}>
                <ListItemText
                  primary={service.service_price_1}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
            <TabPanel value="2" ><List >
            {polishServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_2 * 2}>
                <ListItemText
                  primary={service.service_price_2}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
            <TabPanel value="3" ><List >
            {polishServices.map((service: any) => (
                <ListItem key={service.service_id + service.service_price_3 * 3}>
                <ListItemText
                  primary={service.service_price_3}
                />
                </ListItem>
            ))}
            </List> </TabPanel>
            <Typography align="right" color="text.secondary" > *Preturile sunt afisate in lei</Typography>
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