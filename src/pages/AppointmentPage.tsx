import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function AppointmentPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [valueD, setValueD] = React.useState<Dayjs | null>(dayjs('2022-10-22T08:00'));

  return (
    <Grid container component="main" sx={{justifyContent:"center"}}>
      <CssBaseline />
      <AppBar position="relative" >
        <Toolbar>
          <Button variant="contained" href="/home-page">
          <HomeIcon href="/home-page"/>
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
            width: 1262,
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
              Programare
            </Typography>
          </Container>
        </Box>
        <Grid container justifyContent="center">
            <TabContext value={value} >
                <Box sx={{height: 300, width:600 }}>
                    <Tabs value={value} sx={{mt:4, ml:20}} onChange={handleChange} >
                        <Tab value="1" label="Small" />
                        <Tab value="2" label="Medium" />
                        <Tab value="3" label="Large" />
                    </Tabs>
                    <TabPanel value="1">
                        <Grid item xs={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" fontWeight={600}>
                                Servicii spalatorie auto
                            </Typography>
                            <List >
                              <ListItem
                              secondaryAction={
                                <>
                                <FormControlLabel control={<Switch />} label="" />
                                <IconButton aria-label="edit">
                                  <AddIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                                </>
                              }
                                >
                                <ListItemText
                                  primary="Spalat auto exterior"
                                />
                              </ListItem>
                            </List>
                        </Grid>
                    </TabPanel>
                </Box>
            </TabContext>
        </Grid>
        <Grid sx={{mx:64}} justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={valueD}
        shouldDisableDate={isWeekend}
        disablePast
        views={['day','hours']}
        minTime={dayjs('2022-02-14T08:00')}
        maxTime={dayjs('2022-02-14T18:00')}
        onChange={(newValueD) => {
          setValueD(newValueD);
        }}
      />
    </LocalizationProvider>
    <TextField sx={{my:6}}
                margin="normal"
                required
                fullWidth
                id="inmatriculare"
                label="Numar de inmatriculare"
                name="Numar de inmatriculare"
                autoComplete="numar de inmatriculare"
                autoFocus
              />
              <Button sx={{mb:10}} 
                type="submit"
                fullWidth
                variant="contained">
                  Finalizare
              </Button>
    </Grid>
      </main>
      
    </Grid>
  );
}