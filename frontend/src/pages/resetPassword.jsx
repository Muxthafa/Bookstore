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
import { Link, useParams } from "react-router-dom";
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


const ResetPassword = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  let {token} = useParams()
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === ""){
      console.log("password must be filled");
    }else{
      console.log("Valid");
      let data = {
        password
      }
      
      api.resetPassword(data,token)
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

            <Typography variant="h5" style={{margin: "17px 0px 0px 100px"}}>
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
    </form>
  );
};

export default ResetPassword;