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
  import { useSelector, useDispatch } from "react-redux";
  import BooksCard from './booksCard'
  import {setSort} from "../actions/bookActions.js"
  import { useHistory } from 'react-router-dom';
  
  const Book = ({page}) => {
    const dispatch = useDispatch()
    const myBooks = useSelector((state) => state.allBooks.books);
    const history = useHistory();

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
        history.push(`/books?page=${page}&sort=${order}`);
        // myBooks.sort((a, b) => a.price - b.price);
        handleClose();
      } else if (order === "high"){
        history.push(`/books?page=${page}&sort=${order}`);
        // myBooks.sort((a, b) => b.price - a.price);
        handleClose();
      }else{
        history.push(`/books?page=${page}`);
        handleClose();
      }
    };

    return (
      <Box className="book-item" >
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
              Sort by relevance
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
              <MenuItem onClick={() => handleDisplayOrder("")}>Sort by relevance</MenuItem>
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