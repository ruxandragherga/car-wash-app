import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useLogin } from "../hooks/login_hooks";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function SignInPage() {
  const { doLogin } = useLogin();
  const navigate = useNavigate();
  const [userState, setUserState] = useUserContext();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    doLogin({
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    })
      .then((loginResult) => {
        if (loginResult !== undefined) {
          setUserState({
            id: loginResult.user_id,
            email: loginResult.user_email,
            password: loginResult.user_password,
            role: loginResult.user_role,
            firstName: loginResult.user_first_name,
            lastName: loginResult.user_last_name,
            phoneNumber: loginResult.user_phone_number,
          });
          if (loginResult.user_role === "client") {
            navigate("/home-page");
          } else if (loginResult.user_role === "admin") {
            navigate("/admin/home-page");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://magicwash.ro/wp-content/uploads/2020/04/info-3.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 14,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h4" fontWeight={600}>
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
