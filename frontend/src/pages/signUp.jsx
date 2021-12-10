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

import { Link , Redirect} from "react-router-dom";
import image from "../assets/google_image.svg";
import "../css/style.css";
import { makeStyles } from "@material-ui/styles";
import api from "../service/UserService";

const useStyles = makeStyles({
  btn: {
    color: "#4285F4",
    marginTop: "20px",
    textTransform: "none",
  },
  signInButton: {
    color: "#4285F4",
    marginTop: "33px",
    textTransform: "none",
    marginRight: "200px",
    textDecoration: "none"
  },

  submitButton: {
    background: "#4285F4",
    margin: "30px 0px 20px",
  },
});

const Registration = () => {
  const classes = useStyles();

  let userDetails = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  let errorMessages = {
    firstNameErrorMsg: "",
    lastNameErrorMsg: "",
    emailErrorMsg: "Use 8 or more characters",
    passwordErrorMsg: "",
  };

  const [userState, setUserState] = useState(userDetails);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setPasswordConfirmError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessages)
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUserState = (event) => {
    let { name, value } = event.target;
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let flagError = false;
    const pattern = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    if (userState.firstName === "") {
      setFirstNameError(true);
      setErrorMessage((prev) => {
        return {...prev, firstNameErrorMsg:"First name cannot be empty"}
      })
      flagError = true;
    }
    if (userState.lastName === "") {
      setLastNameError(true);
      setErrorMessage((prev) => {
        return {...prev, lastNameErrorMsg:"Last name cannot be empty"}
      })
      flagError = true;
    }
    if (!pattern.test(userState.email)) {
      setEmailError(true);
      setErrorMessage((prev) => {
        return {...prev, emailErrorMsg:"Email format does not match"}
      })
      flagError = true;
    }
    if (userState.email === "") {
      setEmailError(true);
      setErrorMessage((prev) => {
        return {...prev, emailErrorMsg:"Email cannot be empty"}
      })
      flagError = true;
    }
    if (userState.password === "") {
      setPasswordError(true);
      setErrorMessage((prev) => {
        return {...prev, passwordErrorMsg:"password cannot be empty"}
      })
      flagError = true;
    }
    if (userState.password !== userState.confirmPass) {
      setPasswordConfirmError(true);
      setErrorMessage((prev) => {
        return {...prev, passwordErrorMsg:"password mismatch"}
      })
      flagError = true;
    }
    
    if (flagError) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);
    if (validate()) {  
      let data = {
        firstName: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        password: userState.password,
      };
      api.userRegister(data)
        .then((res) => {
          console.log(res);
          setRedirect(true)
        })
        .catch((err) => console.log(err));
    } else {
      console.log("There is an error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={10} className="paperReg">
        <Grid container className="gridPad">
          <Grid item container xs={8} spacing={2}>
            <div className="divTitle">
              <span style={{ color: "blue" }}>F</span>
              <span style={{ color: "red" }}>u</span>
              <span style={{ color: "yellow" }}>n</span>
              <span style={{ color: "blue" }}>d</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "red" }}>o</span>
              <span style={{ color: "blue" }}>N</span>
              <span style={{ color: "orange" }}>o</span>
              <span style={{ color: "indigo" }}>t</span>
              <span style={{ color: "red" }}>e</span>
              <span style={{ color: "yellow" }}>s</span>
            </div>
            <Typography variant="body1" style={{ marginTop: "17px" }}>
              Create your fundooNotes Account
            </Typography>

            <div className="divName">
              <TextField
                error={firstNameError}
                label="First name"
                variant="outlined"
                size="small"
                helperText={firstNameError && errorMessage.firstNameErrorMsg}
                name="firstName"
                value={userState.firstName}
                onChange={handleUserState}
              />
              <TextField
                error={lastNameError}
                label="Last name"
                variant="outlined"
                size="small"
                name="lastName"
                value={userState.lastName}
                onChange={handleUserState}
                helperText={lastNameError && errorMessage.lastNameErrorMsg}
              />
            </div>

            <TextField
              error={emailError}
              label="Username"
              variant="outlined"
              style={{ marginTop: "20px" }}
              placeholder="@gmail.com"
              fullWidth
              size="small"
              name="email"
              value={userState.email}
              onChange={handleUserState}
              helperText={emailError && errorMessage.emailErrorMsg}
            />
            <Button className={classes.btn}>
              Use my current email address instead
            </Button>

            <div className="divPassword">
              <TextField
                error={passwordError}
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? "text" : "password"}
                name="password"
                value={userState.password}
                onChange={handleUserState}
                helperText={
                  passwordError
                    && errorMessage.passwordErrorMsg
                }
              />
              <TextField
                error={confirmError}
                type={showPassword ? "text" : "password"}
                label="Confirm"
                variant="outlined"
                size="small"
                name="confirmPass"
                value={userState.confirmPass}
                onChange={handleUserState}
                helperText={confirmError && errorMessage.passwordErrorMsg}
              />
            </div>
            
            <FormControlLabel
              control={<Checkbox />}
              label="Show password"
              style={{ marginTop: "20px" }}
              onClick={handleClickShowPassword}
            ></FormControlLabel>
            
            <Link to="/login" className={classes.signInButton}>
            Sign in instead
            </Link>
            
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
          <Grid item container xs={4}>
            <img src={image} alt="" />
          </Grid>
        </Grid>
      </Paper>
      {redirect? <Redirect to="/login" /> : null}
    </form>
  );
};

export default Registration;
