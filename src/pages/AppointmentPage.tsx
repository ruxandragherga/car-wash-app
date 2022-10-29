import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Switch from "@mui/material/Switch";
import { Service } from "../models/Service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = [
  "Selectati serviciile dorite",
  "Alegeti data si ora",
  "Introduceti numarul de inmatriculare",
];

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function AppointmentPage() {
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
    event.preventDefault();
    navigate("/home-page");
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [valueD, setValueD] = React.useState<Dayjs | null>(
    dayjs().minute(0)
  );

  const [checked, setChecked] = React.useState(false);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container component="main" sx={{ justifyContent: "center" }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button variant="contained" onClick={(e) => handleHomePage(e)}>
            <LocalCarWashIcon />
          </Button>
          <Typography variant="h5" color="inherit" sx={{ ml: 4 }} noWrap>
            Car Wash Appointment Booking App
          </Typography>
          <Button variant="contained" href="/" sx={{ ml: 70 }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            width: 1262,
            height: 300,
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/car-wash-black-car-active-foam-banner-copy-space-toned_114106-2438.jpg?w=1380)",
          }}
        >
          <Container maxWidth="sm" sx={{ p: 8 }}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="#000000"
              gutterBottom
              fontWeight={600}
              sx={{ textTransform: "uppercase", p: 8 }}
            >
              Programare
            </Typography>
          </Container>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <TabContext value={value}>
            <Box sx={{ width: 600 }}>
              <Tabs
                value={value}
                sx={{ mt: 4, ml: 20 }}
                onChange={handleChangeTab}
              >
                <Tab value="1" label="Small" />
                <Tab value="2" label="Medium" />
                <Tab value="3" label="Large" />
              </Tabs>
              <TabPanel value="1">
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii spalatorie auto
                  </Typography>
                  <List>
                    {washingServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_1}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii polish auto
                  </Typography>
                  <List>
                    {polishServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_1}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii spalatorie auto
                  </Typography>
                  <List>
                    {washingServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_2}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii polish auto
                  </Typography>
                  <List>
                    {polishServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_2}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii spalatorie auto
                  </Typography>
                  <List>
                    {washingServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_3}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    Servicii polish auto
                  </Typography>
                  <List>
                    {polishServices.map((service: any) => (
                      <ListItem
                        secondaryAction={
                          <Switch
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      >
                        <ListItemText
                          primary={service.service_name}
                          secondary={service.service_price_3}
                        />
                      </ListItem>
                    ))}
                  </List>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          </TabContext>
        </Grid>
        <Grid sx={{ mx: 64 }} justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={valueD}
              shouldDisableDate={isWeekend}
              disablePast
              views={["day", "hours"]}
              minTime={dayjs("2022-02-14T08:00")}
              maxTime={dayjs("2022-02-14T18:00")}
              onChange={(newValueD) => {
                setValueD(newValueD);
              }}
            />
          </LocalizationProvider>
          <TextField
            sx={{ my: 6 }}
            margin="normal"
            required
            fullWidth
            id="inmatriculare"
            label="Numar de inmatriculare"
            name="Numar de inmatriculare"
            autoComplete="numar de inmatriculare"
            autoFocus
          />
          <Button sx={{ mb: 10 }} type="submit" fullWidth variant="contained">
            Finalizare
          </Button>
        </Grid>
      </main>
    </Grid>
  );
}
