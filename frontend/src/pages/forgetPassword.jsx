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
import { Link } from "react-router-dom";
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
    marginTop: "20px",
    textTransform: "none",
    marginRight: "200px",
  },
  submitButton: {
    background: "#4285F4",
    margin: "30px 0px 20px",
  },
});

const ForgotPassword = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === ""){
      console.log("email must be filled");
    }else{
      console.log("Valid");
      let data = {
        email
      }
      api.forgetPassword(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={10} className="paperLogin">
        <Grid container className="gridPad">
          <Grid item container xs={12}>
            <div className="divTitleLogin">
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

            <Typography variant="h5" style={{ margin: "17px 0px 0px 126px" }}>
            Enter your email ID
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

            <Button className={classes.signInButton} component={Link} to="/">
              Create Account
            </Button>

            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ForgotPassword;