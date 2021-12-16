import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bookService from "../service/BookService";
import { setBooks } from "../actions/bookActions.js";
import "../styles/home.scss";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ul: {
    "& .Mui-selected": {
      backgroundColor: "#A03037",
      color: "white",
    },
  },
});

export default function Paginate({ page, sort }) {
  const classes = useStyles();

  const numberOfPages = useSelector((state) => state.allBooks.numberOfPages);
  const flag = useSelector((state) => state.allBooks.searchFlag);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) {
      bookService.getBooks(page, sort).then((res) => {
        console.log(res.data);
        dispatch(setBooks(res.data));
      });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page, sort]);

  return (
    <>
      {flag == "false" && (
        <div id="pagination">
          <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            shape="rounded"
            classes={{ ul: classes.ul }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                className={classes.btn}
                component={Link}
                to={
                  sort
                    ? `/books?page=${item.page}&sort=${sort}`
                    : `/books?page=${item.page}`
                }
              />
            )}
          />
        </div>
      )}
    </>
  );
}
