import {
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartCard from "./cartCard";
import CustomerAddress from "./customerDetails";
import "../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import bookService from "../service/BookService";
import { useDispatch } from "react-redux";
import { setCartDetails } from "../actions/bookActions";

const AddCart = () => {
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState(false);

  let total = 0;
  let numberOfBooks = 0;
  const myBooks = useSelector((state) => state.allBooks.cart);

  const handleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleExpandedSummary = () => {
    setExpandedSummary((prev) => !prev);
  };

  const handleCheckout = () => {
    let data = {
      productList: [myBooks.map((item) => item.book._id)],
      totalPrice: total,
    };
    bookService
      .createOrder(data)
      .then((res) => {
        sessionStorage.setItem("orderId", res.data.orderId);
        bookService
          .removeCart()
          .then((res) => dispatch(setCartDetails()))
          .catch((err) => console.log(err));
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container>
      <Grid item container id="cartContainer">
        <Grid item xs={4}>
          <Typography style={{ marginBottom: "15px", fontSize: "20px" }}>
            My Cart({myBooks.length})
          </Typography>
        </Grid>
        <Grid item xs={8} />
        {myBooks.map((item, index) => {
          return <CartCard cart={true} item={item} key={index} />;
        })}

        <Grid item xs={12} align="right">
          {myBooks.length > 0 && (
            <Button variant="contained" onClick={handleExpanded}>
              Place order
            </Button>
          )}
        </Grid>
      </Grid>
      <CustomerAddress
        expanded={expanded}
        handleExpanded={handleExpanded}
        handleExpandedSummary={handleExpandedSummary}
      />

      <Grid
        item
        container
        style={{
          border: "1px solid #DCDCDC",
          width: "60%",
          margin: "0% auto 2% auto",
          padding: "1%",
        }}
      >
        <Grid item xs={12}>
          <Accordion
            elevation={0}
            expanded={expandedSummary}
            onChange={handleExpandedSummary}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Order Summary</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {myBooks.map((item, index) => {
                total += item.book.price * item.quantity;
                numberOfBooks += item.quantity;
                return <CartCard item={item} key={index} />;
              })}

              <Grid
                item
                xs={11}
                align="left"
                style={{ margin: "5% 0% 0% 35%" }}
              >
                <Typography variant="h6">
                  Number of books : {numberOfBooks}
                </Typography>
                <Typography variant="h6">Total Price : {total}</Typography>
              </Grid>
              <Grid item xs={12} align="right">
                {myBooks.length > 0 && (
                  <Button variant="contained" onClick={handleCheckout}>
                    checkout
                  </Button>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      {redirect && <Redirect to="/order" />}
    </Grid>
  );
};

export default AddCart;
