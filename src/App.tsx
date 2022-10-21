import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "./contexts/UserContext";
import HomePageClient from "./pages/HomePageClient";
import SignUpPage from "./pages/SignUpPage";
import AppointmentPage from "./pages/AppointmentPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import HomePageAdmin from "./pages/HomePageAdmin";

const theme = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#000000",
    },
  },
});

function App() {
  const [userState] = useUserContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {userState.role !== "" ? (
            userState.role === "admin" ? (
              <Route path="/home-page-admin" element={<HomePageAdmin/>} />
            ) : userState.role === "client" ? (
              <Route path="/home-page" element={<HomePageClient />} />
              
            ) : (
              <>
                <Route path="/" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home-page" element={<HomePageClient />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/my-appointments" element={<MyAppointmentsPage />} />
                <Route path="/home-page-admin" element={<HomePageAdmin/>} />
              </>
            )
          ) : (
            <>
              <Route path="/" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/home-page" element={<HomePageClient />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/my-appointments" element={<MyAppointmentsPage />} />
              <Route path="/home-page-admin" element={<HomePageAdmin/>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
