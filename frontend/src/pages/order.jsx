import { Button, Grid } from "@mui/material";
import React from "react";
import orderImage from "../assets/order.svg";
import { Link } from "react-router-dom";
const Order = () => {
  return (
    <Grid container>
      <Grid item xs={12} mt={2}>
        <div className="image">
          <img alt="" src={orderImage} style={{ height: "190px" }} />
          <div class="centered">
            <h2>Order placed successfully</h2>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <p style={{ margin: "0px" }}>hurray!!! your order is confirmed</p>
        <p style={{ margin: "0px" }}>
          the order id is #123456 save the order id for
        </p>
        <p style={{ margin: "0px" }}>further communication..</p>
      </Grid>
      <Grid item xs={12}>
        <table border="1" cellpadding="15" cellspacing="0" align="center">
          <tr>
            <th>Email us</th>
            <th>Contact us</th>
            <th>Address</th>
          </tr>
          <tr>
            <td>admin@bookstore.com</td>
            <td>8163475881</td>
            <td>
              42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near
              Kumarakom restaurant, HSR Layout, Bangalore 560034
            </td>
          </tr>
        </table>
      </Grid>
      <Grid item xs={12} style={{ margin: "20px auto" }}>
        <Button style={{ backgroundColor: "#3371B5", color: "white" }} component={Link} to="/dashboard">
          Continue Shopping
        </Button>
      </Grid>
    </Grid>
  );
};

export default Order;