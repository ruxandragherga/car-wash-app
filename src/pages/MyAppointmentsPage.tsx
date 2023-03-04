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
import { useNavigate } from "react-router-dom";
import { Appointment } from "../models/Appointment";
import { AppointmentResponse } from "../models/AppointmentResponse";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";

function getTotal(appointment: AppointmentResponse) {
  const total = appointment.appointment_services.reduce(
    (total, service) => total + service.servicePrice,
    0
  );
  return total;
}

export default function MyAppointmensPage() {
  const navigate = useNavigate();
  const handleHomePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/home-page");
  };

  const [userState, setUserState] = useUserContext();
  const [userAppointments, setUserAppointments] = useState<
    AppointmentResponse[]
  >([]);

  React.useEffect(() => {
    async function getUserAppointmentsItems() {
      try {
        const res = await axios.get("http://localhost:3004/api/get");
        const { data } = await res;
        const allAppointments: Appointment[] = data;

        setUserAppointments(
          allAppointments
            .filter(
              (appointment) => appointment.appointment_user_id === userState.id
            )
            .map((appointment) => ({
              appointment_id: appointment.appointment_id,
              appointment_user_id: appointment.appointment_user_id,
              appointment_services: JSON.parse(appointment.appointment_services)
                .items,
              appointment_date_time: dayjs(appointment.appointment_date_time),
              appointment_car_number: appointment.appointment_car_number,
              appointment_user_first_name:
                appointment.appointment_user_first_name,
              appointment_user_last_name:
                appointment.appointment_user_last_name,
              appointment_user_phone_number:
                appointment.appointment_user_phone_number,
            }))
            .sort((app1, app2) => (dayjs(app1.appointment_date_time).isAfter(dayjs(app2.appointment_date_time)) ? -1 : 1))
        );
      } catch (err) {
        console.log(err);
      }
    }
    getUserAppointmentsItems();
  }, []);

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
            width: 1265,
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
              Programarile mele
            </Typography>
          </Container>
        </Box>
        <Grid item xs={12} justifyContent="center">
          <Card>
            {userAppointments.map((appointment) => (
              <Paper elevation={3} sx={{ mx: 20, my: 2, px: 25, pr: 50 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {appointment.appointment_car_number}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {appointment.appointment_date_time.format("LLL")}
                  </Typography>
                  <List>
                    {appointment.appointment_services.map((service) => (
                      <ListItem>
                        <ListItemText
                          primary={service.serviceName}
                          secondary={service.servicePrice}
                        ></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                  <Typography sx={{ fontSize: 18, mr: 10 }} gutterBottom>
                    {"Total: " + getTotal(appointment) + " Lei"}
                  </Typography>
                </CardContent>
              </Paper>
            ))}
            <Divider />
          </Card>
        </Grid>
      </main>
    </Grid>
  );
}
