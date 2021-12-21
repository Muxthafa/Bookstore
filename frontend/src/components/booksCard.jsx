import React, { useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import bookService from "../service/BookService";

function BooksCard({ book }) {
  const [wishlist, setWishlist] = useState(false);
  const [cart, setCart] = useState(false);

  const handleCart = () => {
    let data = {
      book: book._id,
      cost: book.price,
      counter: "increment",
    };
    setWishlist(true);

    bookService
      .addCartBooks(data)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleWishlist = () => {
    setCart(true);
  };
  return (
    <Card sx={{ height: 345 }} elevation={3}>
      <div className="imageContainer">
        <img className="bookImage" src={book.image} alt="" />
      </div>
      <CardContent>
        <Typography align="left" id="bookTitle">
          {book.title}
        </Typography>
        <Typography
          align="left"
          color="text.secondary"
          style={{ fontSize: "14px" }}
        >
          by {book.author}
        </Typography>
        <Typography
          align="left"
          style={{ fontWeight: "bold", fontSize: "14px" }}
        >
          Rs. {book.price}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={handleCart}
          fullWidth="true"
          style={
            !cart && wishlist
                ? { background: "#3371B5", color: "white", width: "100%" }
                : !cart
                ? { backgroundColor: "#A03037", color: "white", width: "100%" }
                : { display: "none" }
          }
        >
          {!cart && wishlist ? "Added to bag" : "Add to bag"}
        </Button>
        <Button
          style={
            !wishlist
              ? { border: "1px solid black", color: "black" }
              : { display: "none" }
          }
          fullWidth="true"
          onClick={handleWishlist}
        >
          Wishlist
        </Button>
      </CardActions>
    </Card>
  );
}

export default BooksCard;
