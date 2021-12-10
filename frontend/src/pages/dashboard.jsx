import React,{useEffect} from "react";
import Book from "../components/books";
import Appbar from "../components/appbar";
import { Box } from "@mui/system";
import bookService from "../service/BookService";
import {setBooks} from "../actions/bookActions.js"
import { useDispatch } from "react-redux";
import Pagination from '../components/pagination.jsx'
import { useHistory, useLocation } from 'react-router-dom';
import Paginate from "../components/pagination.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {

  const query = useQuery();
  const page = query.get('page') || 1;

    return (
      <Box sx={{ display: "flex" }}>
        <Appbar />
        <Box component="main" className="book-container">
          <Book />
          <Paginate page={page} />
        </Box>
      </Box>
    );
};

export default Dashboard;