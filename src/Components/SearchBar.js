import React from "react";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchedTerm = queryParams.get("query");

  return <div>Search:{searchedTerm}</div>;
};
export default SearchBar;
