import React from "react";
import { Typography, Grid, IconButton, Divider, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import bookService from "../service/BookService";
import { useDispatch } from "react-redux";
import { setDeleteCart, setQuantity } from "../actions/bookActions";

const CartCard = ({ cart, item }) => {
  const dispatch = useDispatch();
  let count = item.quantity;
  const handleCounter = (type) => {
    let data = {
      book: item.book._id,
      quantity: item.quantity,
      cost: item.cost,
      counter: type,
    };
    bookService
      .addCartBooks(data)
      .then((res) => {
        if (type === "increment") {
          count++;
        } else {
          count--;
        }
        dispatch(setQuantity({ book: item.book._id, quantity: count }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    bookService
      .deleteCartBook(item.book._id)
      .then((res) => {
        dispatch(setDeleteCart(item.book._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid item container padding={1}>
      <Grid item xs={4}>
        <img
          className="bookImage"
          src={item.book.image}
          alt=""
          height="110px"
        />
      </Grid>
      <Grid item xs={8}>
        <div style={{ marginLeft: "10px" }}>
          <Typography align="left">{item.book.title}</Typography>
          <Typography
            align="left"
            color="text.secondary"
            style={{ fontSize: "14px" }}
          >
            by {item.book.author}
          </Typography>
          <Typography
            align="left"
            style={{ fontWeight: "bold", fontSize: "14px" }}
          >
            Rs {item.book.price}
          </Typography>
        </div>

        {cart && (
          <Typography
            align="left"
            style={{ marginTop: "5px", marginLeft: "0px" }}
          >
            <IconButton
              disabled={count <= 1 ? true : false}
              onClick={() => handleCounter("decrement")}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <button style={{ border: "1px solid black", width: "30px" }}>
              {count}
            </button>
            <IconButton onClick={() => handleCounter("increment")}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Button
              onClick={handleDelete}
              style={{ textTransform: "none", color: "black" }}
            >
              Remove
            </Button>
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default CartCard;
