import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "./contexts/UserContext";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePageClient from "./pages/HomePageClient";
import AppointmentPage from "./pages/AppointmentPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import HomePageAdmin from "./pages/HomePageAdmin";
import NextAppointmentsPageAdmin from "./pages/NextAppointmentsPageAdmin";
import AppointmentHistoryPageAdmin from "./pages/AppointmentHistoryPageAdmin";

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
              <>
              <Route path="/admin/home-page" element={<HomePageAdmin/>} />
              <Route path="/admin/next-appointments" element={<NextAppointmentsPageAdmin/>} />
              <Route path="/admin/appointment-history" element={<AppointmentHistoryPageAdmin/>} />
              </>
            ) : userState.role === "client" ? (
              <>
              <Route path="/home-page" element={<HomePageClient />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/my-appointments" element={<MyAppointmentsPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
              </>
            )
          ) : (
            <>
              <Route path="/" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
