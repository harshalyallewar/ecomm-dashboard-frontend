import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Avatar,
  Checkbox,
  Link,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { server_address } from "../variables";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();

  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const navigate = useNavigate();

  const showdata = async (e) => {
      e.preventDefault();

      // if (!name || !email || !password) {
      //     setErrmsg("Enter all details");
      //     setErr(true);
      //     return;
      // }

      // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      // if (!email.match(mailformat)) {
      //   setErrmsg("Enter valid email");
      //   setErr(true);

      //   return;
      // }

      if (!name || !email || !password) {
        toast.error("Enter all details");
        return;
      }

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const passFormat =
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

      if (!email.match(mailformat)) {
        toast.error("Please enter valid email");
        return;
      }

      if (password.length < 8) {
        toast.error("Password should be atleast 8 characters");
        return;
      }

      if (!password.match(passFormat)) {
        toast.error(
          "Password should contain small, capital letter, special character and number"
        );
        return;
      }

      if (name.length > 25) {
        toast.error("Please enter name under 25 characters");
        return;
      }

      dispatch(showLoading())

      let result = await fetch(`${server_address}/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      dispatch(hideLoading())

      let final = await result.json();
      if (final.success == "true") {
        localStorage.setItem("user", JSON.stringify(final.result));
        localStorage.setItem("token", JSON.stringify(final.auth));
        navigate("/");
      } else {
        setErr(true);
        setErrmsg(final.result);
      }
    }

    const handleClose = ()=>{
      setErr(false);
    }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "82vh",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        elevation={10}
        sx={{
          maxWidth: "350px",
          maxHeight: "500px",
          p: 4,
          pt: 2,
          borderRadius: 4,
        }}
      >
        <Grid container sx={{ mt: 2, mb: 3 }}>
          <Grid item xs={12} sx={{ m: 1, mb: 0 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#434A54",
                fontSize: 30,
                fontWeight: "700",
                letterSpacing: 1,
                mb: 3,
              }}
            >
              Register
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              label="Enter Username"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              type="email"
              label="Enter Email"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              type="password"
              size="small"
              required
              label="Enter Password"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1, mt: 3 }}>
            <Button onClick={showdata} variant="contained" size="large">
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={err}
        onClose={handleClose}
      >
        <Alert severity="error">{errmsg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
