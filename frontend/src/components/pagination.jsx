import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material/";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bookService from "../service/BookService";
import {setBooks} from "../actions/bookActions.js"

export default function Paginate({ page }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      bookService.getBooks(page)
              .then((res) => dispatch(setBooks(res.data)));
    }
  }, [dispatch, page]);

  return (
      <Pagination
        count={5}
        style={{margin:"10px 0px 20px 40%"}}
        page={Number(page) || 1}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/books?page=${item.page}`}
          />
        )}
      />
  );
}
