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
import { Link, useParams, Redirect } from "react-router-dom";
import "../css/style.css";
import { makeStyles } from "@material-ui/styles";
import api from "../service/UserService";

const useStyles = makeStyles({
  btn: {
    color: "#A03037",
    marginTop: "20px",
    textTransform: "none",
  },
  signInButton: {
    color: "#A03037",
    marginTop: "20px",
    textTransform: "none",
    marginRight: "200px",
  },
  submitButton: {
    color: "#ffff",
    background: "#A03037",
    margin: "30px 0px 20px",
  },
});

const ResetPassword = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  let { token } = useParams();
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      console.log("password must be filled");
    } else {
      let data = {
        password,
      };

      api
        .resetPassword(data, token)
        .then((res) => {
          setRedirect(true);
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
              <span style={{ color: "#A03037", letterSpacing: "3px" }}>
                Bookstore
              </span>
            </div>

            <Typography variant="h5" style={{ margin: "17px 0px 0px 100px" }}>
              Enter the new password
            </Typography>

            <div className="divPassword">
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className={classes.signInButton} component={Link} to="/">
              Create Account
            </Button>

            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {redirect ? <Redirect to="/login" /> : null}
    </form>
  );
};

export default ResetPassword;
