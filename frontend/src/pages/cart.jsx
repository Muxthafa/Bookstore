import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import AddCart from "../components/addCart";
import Appbar from "../components/appbar";
import { Box } from "@mui/system";
import bookService from "../service/BookService";
import { setCartBooks } from "../actions/bookActions";
import { useDispatch } from "react-redux";


/**
 * @description cart page where we have cart related components
 * @returns 
 */
const Cart = () => {
  const dispatch = useDispatch();
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    bookService
      .getCartBooks(token)
      .then((res) => {
        dispatch(setCartBooks(res.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (token == null) {
    return <>{<Redirect to="/login" />}</>;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <Appbar />
        <Box component="main" className="book-container">
          <AddCart />
        </Box>
      </Box>
    );
  }
};

export default Cart;
