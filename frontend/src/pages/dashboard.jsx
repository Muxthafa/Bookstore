import React from "react";
import Book from "../components/books";
import Appbar from "../components/appbar";
import { Box } from "@mui/system";
import { useLocation, Redirect } from "react-router-dom";
import Paginate from "../components/pagination.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * @description main page which is divided into appbar, book, paginate component
 * @returns 
 */
const Dashboard = () => {
  let token = sessionStorage.getItem("token");
  const query = useQuery();
  const page = query.get("page") || 1;
  const sort = query.get("sort");

  if (token == null) {
    return <>{<Redirect to="/login" />}</>;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <Appbar page={page} />
        <Box component="main" className="book-container">
          <Book page={page} />
          <Paginate page={page} sort={sort} />
        </Box>
      </Box>
    );
  }
};

export default Dashboard;
