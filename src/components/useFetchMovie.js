import React from 'react';

// Utils
import { initRequest, createRequest } from './utils';

// Constants
import { URI, FETCH_MOVIE, QUERY_REQ } from '../constants';

export const useFetchMovies = (props) => {
   const { search, fetchSearch } = props;
   const [movies, setMovies] = React.useState(null);

   React.useEffect(() => {
      const fetchMovie = async () => {
         if (!search)
            return setMovies(null);
         const request = {
            ...initRequest,
            [QUERY_REQ]: search
         }
         const uri = createRequest(URI + FETCH_MOVIE, request);
         console.log("URI", uri);
         const response = await fetch(uri);
         // console.warn("Response :", response);
         const json = await response.json();
         // console.log("JSON: ", json);
         setMovies(json);
      }
      // console.log("Response :", fetchMovie());
      fetchMovie();
   }, [fetchSearch]);

   return (movies);
}