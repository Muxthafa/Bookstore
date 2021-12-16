import React, { useState, useEffect } from "react";
import { IconButton, TextField, InputAdornment, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import bookService from "../service/BookService";
import { setSearchedBooks, setSearchFlag } from "../actions/bookActions.js";
import { useHistory } from "react-router-dom";
import "../styles/home.scss";

function Search({ page }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState("");
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  useEffect(() => {
    if (search.trim()) {
      history.push("/books");
      bookService
        .getSearchedBooks(search)
        .then((res) => dispatch(setSearchedBooks(res.data)));
      dispatch(setSearchFlag("true"));
    } else {
      if (page) {
        dispatch(setSearchFlag("false"));
        history.push(`/books?page=${page}`);
      }
    }
  }, [search]);

  return (
    <TextField
      placeholder="Search…"
      id="search-bar"
      variant="outlined"
      onChange={(e) => handleSearch(e.target.value)}
      style={{ margin: "0px 25% 0px 5%" }}
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon id="search-icon" />
            </IconButton>
          </InputAdornment>
        ),
        style: { height: "40px", backgroundColor: "white" },
      }}
    />
  );
}

export default Search;
