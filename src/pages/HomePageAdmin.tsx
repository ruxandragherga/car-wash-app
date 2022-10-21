import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function HomePageAdmin() {    

  return (
    <Grid container component="main" sx={{justifyContent:"center"}}>
      <CssBaseline />
      <AppBar position="relative" >
        <Toolbar>
          <Button variant="contained" href="/home-page">
          <LocalCarWashIcon />
          </Button>
          <Typography variant="h5" color="inherit" sx={{ml: 4}} noWrap>
            Car Wash Appointment Booking App
          </Typography>
          <Button variant="contained" href="/" sx={{ml:70}}>Log out</Button>
        </Toolbar>
      </AppBar>
      <main>
      <Stack
          sx={{py: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" href="/appointment">Programarile viitoare</Button>
          <Button variant="outlined"href="/my-appointments">Istoric clienti</Button>
      </Stack>
      <Grid container justifyContent="center" alignItems="flex-start" direction="column">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" fontWeight={600}>
            Servicii spalatorie auto
          </Typography>
          <Grid container justifyContent="center" alignItems="flex-start" direction="row" >
          <TextField
                sx={{width:1/3}}
                margin="normal"
                required
                id="serviciu"
                label="Denumire Serviciu"
                name="serviciu"
           />
           <TextField
            	sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret"
                label="Pret Small"
                name="pret1"
                type="number"
                variant="standard"
           />
           <TextField
                sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret2"
                label="Pret Medium"
                name="pret2"
                type="number"
                variant="standard"
           />
           <TextField
                sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret3"
                label="Pret Large"
                name="pret3"
                type="number"
                variant="standard"
           />
           <Button variant="contained" type="submit" sx={{my: 4}}>Adauga</Button>
           </Grid>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" fontWeight={600}>
            Servicii polish auto
          </Typography>
          <Grid container justifyContent="center" alignItems="flex-start" direction="row" >
          <TextField
                sx={{width:1/3}}
                margin="normal"
                required
                id="serviciu"
                label="Denumire Serviciu"
                name="serviciu"
           />
           <TextField
            	sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret"
                label="Pret Small"
                name="pret1"
                type="number"
                variant="standard"
           />
           <TextField
                sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret2"
                label="Pret Medium"
                name="pret2"
                type="number"
                variant="standard"
           />
           <TextField
                sx={{width:1/8, mx:2}}
                margin="normal"
                required
                id="pret3"
                label="Pret Large"
                name="pret3"
                type="number"
                variant="standard"
           />
           <Button variant="contained" type="submit" sx={{my: 4}}>Adauga</Button>
           </Grid>
      </Grid>
      </main>
    </Grid>
  );
  
}