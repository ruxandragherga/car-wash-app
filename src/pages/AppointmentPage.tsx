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
import { useUserContext } from "../contexts/UserContext";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function AppointmentPage() {
  const [userState, setUserState] = useUserContext();
  const [washingServices, setWashingServices] = useState<Service[]>([]);
  const [polishServices, setPolishServices] = useState<Service[]>([]);
  const appointmentServices: {
    serviceName: string;
    servicePrice: number;
  }[] = [];
  const [isDateTimePickerErrorActive, setIsDateTimePickerErrorActive] =
    useState(true);

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

  const [valueTab, setValueTab] = React.useState("1");
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const [valueDate, setValueDate] = React.useState<Dayjs | null>(
    dayjs().minute(0)
  );

  const [checked, setChecked] = useState<any[]>([]);
  const handleChangeSwitch = (
    event: React.ChangeEvent<HTMLInputElement>,
    service: Service
  ) => {
    if (!checked.includes(service)) setChecked([...checked, service]);
    else setChecked(checked.filter((c) => service !== c));
  };

  const [appointmentTotal, setAppointmentTotal] = useState<number>(0);
  const [isErrorMessageAlertActive, setIsErrorMessageAlertActive] =
    useState(false);
  const [isSuccessMessageAlertActive, setIsSuccessMessageAlertActive] =
    useState(false);

  async function handleMakeAppointment(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await axios.get("http://localhost:3004/api/get");
    const { data } = await res;
    const totalNumberOfAppointments = data.length;

    if (!isDateTimePickerErrorActive && checked.length > 0) {
      checked.map((service) => {
        appointmentServices[appointmentServices.length] = {
          serviceName: service.service_name,
          servicePrice:
            valueTab === "1"
              ? service.service_price_1
              : valueTab === "2"
              ? service.service_price_2
              : service.service_price_1,
        };
      });

      const newAppointment = {
        appointmentId: totalNumberOfAppointments,
        appointmentUserId: userState.id,
        appointmentServices: JSON.stringify({
          items: appointmentServices,
        }),
        appointmentDateAndTime: valueDate?.format("LLL"),
        appointmentCarNumber: formData.get("carNumber"),
        appointmentUserFirstName: userState.firstName,
        appointmentUserLastName: userState.lastName,
        appointmentUserPhoneNumber: userState.phoneNumber,
      };

      axios.post("http://localhost:3004/api/create", newAppointment);

      if (isErrorMessageAlertActive) setIsErrorMessageAlertActive(false);
      if (!isSuccessMessageAlertActive) {
        setIsSuccessMessageAlertActive(true);
      }
    } else {
      if (isSuccessMessageAlertActive) setIsSuccessMessageAlertActive(false);
      if (!isErrorMessageAlertActive) setIsErrorMessageAlertActive(true);
    }
  }

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
        <Box component="form" onSubmit={(e) => handleMakeAppointment(e)}>
          <Grid container justifyContent="center" alignItems="center">
            <TabContext value={valueTab}>
              <Box sx={{ width: 800 }}>
                <Tabs
                  value={valueTab}
                  sx={{ mt: 4, mx: 28}}
                  onChange={handleChangeTab}
                >
                  <Tab value="1" label="Autoturisme" />
                  <Tab value="2" label="Clasa Lux" />
                  <Tab value="3" label="Clasa SUV" />
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
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                                key={service.service_id}
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                                key={service.service_id}
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                                key={service.service_id}
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                                key={service.service_id}
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                                key={service.service_id}
                                //checked={checked}
                                onChange={(e) => handleChangeSwitch(e, service)}
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
                value={valueDate}
                shouldDisableDate={isWeekend}
                disablePast
                views={["day", "hours"]}
                minTime={dayjs()}
                maxTime={dayjs("2022-02-14T18:00")}
                onChange={(newValueDate) => {
                  setValueDate(newValueDate);
                }}
                onError={(r, v) => {
                  if (r === null) {
                    setIsDateTimePickerErrorActive(false);
                  } else {
                    setIsDateTimePickerErrorActive(true);
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              sx={{ my: 6 }}
              margin="normal"
              required
              fullWidth
              id="carNumber"
              label="Numar de inmatriculare"
              name="carNumber"
              autoComplete="carNumber"
              autoFocus
            />
          </Grid>
          <Grid sx={{ mx: 40 }} justifyContent="center" alignItems="center">
            <Button sx={{ mb: 4 }} fullWidth variant="contained" type="submit">
              Finalizare
            </Button>
            <Box sx={{ width: "100%", mb: 4 }}>
              <Collapse
                in={isErrorMessageAlertActive || isSuccessMessageAlertActive}
              >
                <Alert
                  severity={isErrorMessageAlertActive ? "error" : "success"}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        if (isErrorMessageAlertActive)
                          setIsErrorMessageAlertActive(false);
                        if (isSuccessMessageAlertActive)
                          setIsSuccessMessageAlertActive(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {isErrorMessageAlertActive
                    ? "Data selectata trebuie sa fie valida si minim un serviciu trebuie selectat."
                    : "Programarea a fost efectuata cu succes."}
                </Alert>
              </Collapse>
            </Box>
          </Grid>
        </Box>
      </main>
    </Grid>
  );
}
