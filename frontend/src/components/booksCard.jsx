import React, { useState } from "react";
import {
    CardContent,
    Card,
    CardMedia,
    Typography,
    CardActions,
    Button,
  } from "@mui/material";

function BooksCard({book}) {
    const [wishlist, setWishlist] = useState(false);
    const [cart, setCart] = useState(false);

    const handleCart = () => {
        setWishlist(true);
      };
      const handleWishlist = () => {
        setCart(true);
      };

    return (
        <Card sx={{ height: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="171"
                    image={book.image}
                  />
                  <CardContent>
                    <Typography align="left" style={{ fontSize: "16px" }}>
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
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      onClick={handleCart}
                      fullWidth="true"
                      style={
                        !cart
                          ? { backgroundColor: "#A03037", color: "white" }
                          : { display: "none" }
                      }
                    >
                      Add to bag
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
    )
}

export default BooksCard
