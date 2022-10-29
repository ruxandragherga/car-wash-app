import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function AppointmentPage() {
  const navigate = useNavigate();
  const handleHomePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/home-page");
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
            width: 1265,
            height:300,
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/car-wash-black-car-active-foam-banner-copy-space-toned_114106-2438.jpg?w=1380)",
          }}
        >
          <Container maxWidth="sm" sx={{p: 8}}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="#000000"
              gutterBottom
              fontWeight={600}
              sx={{textTransform: 'uppercase', p: 8}}
            >
              Programarile mele
            </Typography>
          </Container>
        </Box>
        
      </main>
      
    </Grid>
  );
}