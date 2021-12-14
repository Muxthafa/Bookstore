import React,{useEffect} from "react";
import Book from "../components/books";
import Appbar from "../components/appbar";
import { Box } from "@mui/system";
import bookService from "../service/BookService";
import {setBooks} from "../actions/bookActions.js"
import Pagination from '../components/pagination.jsx'
import { useHistory, useLocation } from 'react-router-dom';
import Paginate from "../components/pagination.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const sort = query.get('sort');
    return (
      <Box sx={{ display: "flex" }}>
        <Appbar page={page}/>
        <Box component="main" className="book-container">
          <Book page={page}/>
          <Paginate page={page} sort={sort} />
        </Box>
      </Box>
    );
};

export default Dashboard;