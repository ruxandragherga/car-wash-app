import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import DeleteIcon from "@mui/icons-material/Delete";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Service } from "../models/Service";
import { useState } from "react";
import { useService } from "../hooks/service_hooks";
import { useNavigate } from "react-router-dom";

export default function HomePageAdmin() {
  const navigate = useNavigate();
  const handleNextAppointments = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/admin/next-appointments");
  };
  const handleAppointmentHistory = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate("/admin/appointment-history");
  };

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
  }, [washingServices, polishServices]);

  async function handleAddService(
    event: React.FormEvent<HTMLFormElement>,
    category: string
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await axios.get("http://localhost:3003/api/get");
    const { data } = await res;
    const totalNumberOfServices = data.length;
    const allServices: Service[] = data;
    const newServiceId = (allServices[totalNumberOfServices-1].service_id ) + 1;
    console.log(newServiceId);

    const newService = {
      serviceId: newServiceId,
      serviceCategory: category,
      serviceName: formData.get(
        category === "spalare" ? "service_1" : "service_2"
      ),
      servicePrice1: formData.get(
        category === "spalare" ? "price1_1" : "price1_2"
      ),
      servicePrice2: formData.get(
        category === "spalare" ? "price2_1" : "price2_2"
      ),
      servicePrice3: formData.get(
        category === "spalare" ? "price3_1" : "price3_2"
      ),
    };

    const postResponseData = await axios.post(
      "http://localhost:3003/api/create",
      newService
    );

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
  }

  const { findService } = useService();
  const [serviceDeleteId, setServiceDeleteId] = useState();
  async function handleDeleteService(
    event: React.MouseEvent<HTMLElement>,
    serviceName: string
  ) {
    event.preventDefault();
    findService({
      serviceName,
    })
      .then((serviceResult) => {
        if (serviceResult !== undefined) {
          setServiceDeleteId(serviceResult.service_id);
        }
      })
      .catch((err:any) => console.log(err));
      
        console.log(serviceDeleteId);
        console.log(serviceName);
        const postResponseData = await axios.delete(
          "http://localhost:3003/api/delete/" + serviceDeleteId 
        );
        
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
  }

  return (
    <Grid container component="main" sx={{ justifyContent: "center" }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button variant="contained" >
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
        <Stack
          sx={{ py: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" onClick={(e) => handleNextAppointments(e)}>
            Programarile viitoare
          </Button>
          <Button variant="outlined" onClick={(e) => handleAppointmentHistory(e)}>
            Istoric clienti
          </Button>
        </Stack>
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          direction="column"
        >
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            fontWeight={600}
          >
            Servicii spalatorie auto
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleAddService(e, "spalare")}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="flex-start"
              direction="row"
            >
              <TextField
                sx={{ width: 1 / 3 }}
                margin="normal"
                required
                id="service_1"
                label="Denumire Serviciu"
                name="service_1"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price1_1"
                label="Pret Small"
                name="price1_1"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price2_1"
                label="Pret Medium"
                name="price2_1"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price3_1"
                label="Pret Large"
                name="price3_1"
                type="number"
                variant="standard"
              />
              <Button variant="contained" type="submit" sx={{ my: 4 }}>
                Adauga
              </Button>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {washingServices.map((service: any) => (
                  <TableRow key={service.service_name}>
                    <TableCell component="th" scope="row">
                      {service.service_name}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_1}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_2}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_3}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        onClick={(e) =>
                          handleDeleteService(e, service.service_name)
                        }
                      >
                        {" "}
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            fontWeight={600}
          >
            Servicii polish auto
          </Typography>
          <Box component="form" onSubmit={(e) => handleAddService(e, "polish")}>
            <Grid
              container
              justifyContent="center"
              alignItems="flex-start"
              direction="row"
            >
              <TextField
                sx={{ width: 1 / 3 }}
                margin="normal"
                required
                id="service_2"
                label="Denumire Serviciu"
                name="service_2"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price1_2"
                label="Pret Small"
                name="price1_2"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price2_2"
                label="Pret Medium"
                name="price2_2"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ width: 1 / 8, mx: 2 }}
                margin="normal"
                required
                id="price3_2"
                label="Pret Large"
                name="price3_2"
                type="number"
                variant="standard"
              />
              <Button variant="contained" type="submit" sx={{ my: 4 }}>
                Adauga
              </Button>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {polishServices.map((service: any) => (
                  <TableRow key={service.service_name}>
                    <TableCell component="th" scope="row">
                      {service.service_name}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_1}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_2}
                    </TableCell>
                    <TableCell align="right">
                      {service.service_price_3}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        onClick={(e) =>
                          handleDeleteService(e, service.service_name)
                        }
                      >
                        {" "}
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </main>
    </Grid>
  );
}
function findServiceId(arg0: { email: any; password: any }) {
  throw new Error("Function not implemented.");
}
