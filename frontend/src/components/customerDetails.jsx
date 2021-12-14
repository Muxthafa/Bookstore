import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bookService from "../service/BookService";
import '../styles/home.scss'

const CustomerAddress = () => {
  const initialCustomerState = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    landmark: "",
    addressType: "",
  };
  const [details, setDetails] = useState(initialCustomerState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    bookService
      .getCustomerDetails()
      .then((res) => {
        setDetails(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = () => {
    bookService
      .addCustomerDetails(details)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid
      item
      container
      id="cartContainer"
    >
      <Grid item xs={12}>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Customer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item container xs={10} spacing={1.5}>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  label="Phone Number"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  label="Pincode"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.pincode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="locality"
                  name="locality"
                  placeholder="Locality"
                  label="Locality"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.locality}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  placeholder="Address"
                  label="Address"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="city"
                  name="city"
                  label="City/town"
                  placeholder="City/town"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="landmark"
                  name="landmark"
                  placeholder="Landmark"
                  label="Landmark"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={details.landmark}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} align="left">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    defaultValue="Home"
                  >
                    <FormControlLabel
                      value="Home"
                      control={<Radio />}
                      label="Home"
                      name="addressType"
                      onChange={handleInputChange}
                    />
                    <FormControlLabel
                      value="Work"
                      control={<Radio />}
                      label="Work"
                      name="addressType"
                      onChange={handleInputChange}
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                      name="addressType"
                      onChange={handleInputChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} align="right">
              <Button variant="contained" onClick={handleUpdate}>Continue</Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default CustomerAddress