import React, { useEffect, useState } from "react";
import { searchMovies } from "../../services/getData";
import getQueryParams from "../../utils/getQueryParams";
import MoviesItem from "../moviesItem/MoviesItem";

import SearchBox from "../searchBox/SearchBox";

const Movievs = ({ history, location }) => {
  const [Movies, setMovies] = useState("");

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    console.log("queryParams", queryParams);
    queryParams.query &&
      searchMovies(queryParams.query).then((data) => setMovies(data));
  }, [location.search]);

  const hendleChangeQuery = (query) => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <div>
      <h2>Movievs</h2>
      <SearchBox onSubmit={hendleChangeQuery} />
      <ul>
        {Movies &&
          Movies.map((item) => (
            <MoviesItem key={item.id} itemData={item} location={location} />
          ))}
      </ul>
    </div>
  );
};

export default Movievs;
