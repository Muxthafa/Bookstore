import {
    Grid,
    Box,
    CardContent,
    Card,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Menu,
    MenuItem,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import BooksCard from './booksCard' 
  
  const Book = () => {
    const myBooks = useSelector((state) => state.allBooks.books);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDisplayOrder = (order) => {
      if (order === "low") {
        myBooks.sort((a, b) => a.price - b.price);
        handleClose();
      } else {
        myBooks.sort((a, b) => b.price - a.price);
        handleClose();
      }
    };

    return (
      <Box className="main-container">
        <Grid container>
          <Grid item xs={6} align="left">
            <Typography id="book-count">
              Books
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Button
              id="sort-by-btn"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Sort by price
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleDisplayOrder("low")}>price: low to high</MenuItem>
              <MenuItem onClick={() => handleDisplayOrder("high")}>price: high to low</MenuItem>
            </Menu>
          </Grid>
        </Grid>
  
        <Grid container spacing={4}>
          {myBooks.map((book, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={book._id}>
                <BooksCard book={book} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  export default Book;