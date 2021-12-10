import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import "../styles/home.scss";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#A03037",
}));

const Appbar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton style={{ marginLeft: "5%" }}>
          <ImportContactsIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" id="book-title">
          BookStore
        </Typography>
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
        <Typography variant="h6" id="cart-title">
          Cart
        </Typography>
        <IconButton style={{ color: "white", marginRight: "6%" }}>
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;