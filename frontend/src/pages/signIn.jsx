import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";

import { Link, Redirect } from "react-router-dom";
import "../css/style.css";
import { makeStyles } from "@material-ui/styles";
import api from "../service/UserService";

const useStyles = makeStyles({
  btn: {
    color: "#A03037",
    marginTop: "20px",
    textTransform: "none",
    fontWeight: "550",
  },
  signInButton: {
    color: "#A03037",
    marginTop: "20px",
    textTransform: "none",
    marginRight: "200px",
    fontWeight: "550",
  },
  submitButton: {
    color: "#ffff",
    background: "#A03037",
    margin: "30px 0px 20px",
  },
});

const Signin = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("All details must be filled");
    } else {
      console.log("Valid");
      let data = {
        email,
        password,
      };
      api
        .userLogin(data)
        .then((res) => {
          console.log(res);
          // localStorage.setItem('token', res.data.token)
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("email", data.email);
          setRedirect(true);
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect credentials");
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={5} className="paperLogin">
        <Grid container className="gridPad">
          <Grid item container xs={12}>
            <div className="divTitleLogin">
              <span style={{ color: "#A03037", letterSpacing: "3px" }}>
                Bookstore
              </span>
            </div>
            <Typography variant="h5" style={{ margin: "17px 0px 0px 190px" }}>
              Sign In
            </Typography>

            <Typography
              variant="body1"
              style={{ margin: "17px 0px 0px 115px" }}
            >
              Use your FundooNotes Account
            </Typography>

            <TextField
              label="Username"
              variant="outlined"
              style={{ marginTop: "20px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">@gmail.com</InputAdornment>
                ),
              }}
              fullWidth
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="divPassword">
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <FormControlLabel
              control={<Checkbox />}
              label="Show password"
              style={{ marginTop: "20px" }}
              onClick={handleClickShowPassword}
            />

            <Button
              className={classes.signInButton}
              component={Link}
              to="/forgot-password"
            >
              Forgot password?
            </Button>

            <Button className={classes.signInButton} component={Link} to="/">
              Create Account
            </Button>

            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {redirect ? <Redirect to="/books" /> : null}
    </form>
  );
};

export default Signin;
