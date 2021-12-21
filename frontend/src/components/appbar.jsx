import React from "react";
import { styled } from "@mui/material/styles";
import { Toolbar, Typography, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import "../styles/home.scss";
import Search from "./search";
import { Link } from "react-router-dom";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#A03037",
}));

const Appbar = ({ page }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton style={{ marginLeft: "5%" }} component={Link} to="/books">
          <ImportContactsIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" id="book-title">
          BookStore
        </Typography>
        <Search page={page} />
        <Typography variant="h6" id="cart-title">
          Cart
        </Typography>
        <IconButton
          style={{ color: "white", marginRight: "6%" }}
          component={Link}
          to="/cart"
        >
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
