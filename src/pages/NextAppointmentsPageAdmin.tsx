import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NextAppointmentsPageAdmin() {
  const navigate = useNavigate();
  const handleHomePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/admin/home-page");
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
      <main></main>
    </Grid>
  );
}
