import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppointmentResponse } from "../models/AppointmentResponse";
import axios from "axios";
import { Appointment } from "../models/Appointment";
import dayjs, { Dayjs } from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function getTotal(appointment: AppointmentResponse) {
  const total = appointment.appointment_services.reduce(
    (total, service) => total + service.servicePrice,
    0
  );
  return total;
}

export default function NextAppointmentsPageAdmin() {
  const navigate = useNavigate();
  const handleHomePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/admin/home-page");
  };

  const [nextAppointments, setNextAppointments] = useState<
    AppointmentResponse[]
  >([]);

  React.useEffect(() => {
    async function getNextAppointmentsItems() {
      try {
        const res = await axios.get("http://localhost:3004/api/get");
        const { data } = await res;
        const allAppointments: Appointment[] = data;

        setNextAppointments(
          allAppointments
            .filter(
              (appointment) =>
                dayjs(appointment.appointment_date_time) > dayjs()
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
            .sort((app1, app2) => (dayjs(app1.appointment_date_time).isAfter(dayjs(app2.appointment_date_time)) ? 1 : -1))
        );
      } catch (err) {
        console.log(err);
      }
    }
    getNextAppointmentsItems();
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
        <Grid container justifyContent="center">
          <Typography variant="h4" sx={{ my: 4 }} fontWeight={600}>
            Programarile viitoare
          </Typography>
          <Card>
            {nextAppointments.map((appointment) => (
              <Paper elevation={3} sx={{ mx: 20, my: 2, px: 25, pr: 50 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {appointment.appointment_date_time.format("LLL")}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, px: 4 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {appointment.appointment_car_number}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, px: 4 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {appointment.appointment_user_first_name +
                      " " +
                      appointment.appointment_user_last_name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, px: 4 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {appointment.appointment_user_phone_number}
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
