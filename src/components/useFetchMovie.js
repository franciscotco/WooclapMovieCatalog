import React from 'react';

// Utils
import { initRequest, createRequest } from './utils';

// Constants
import { URI, FETCH_MOVIE, QUERY_REQ, ADULT_REQ } from '../constants';
import { MOVIE_DETAIL } from '../constants';

export const fetchApi = async (uri, setResponse) => {
   // console.log("URI", uri);
   const response = await fetch(uri);
   if (!response.ok) {
      setResponse(null)
      // console.error(response);
      return response;
   }
   // console.warn("Response :", response);
   const json = await response.json();
   // console.log("JSON: ", json);
   setResponse(json);
   return response;
}

export const useFetchMovies = (props) => {
   const { search, fetchSearch } = props;
   const [movies, setMovies] = React.useState(null);

   React.useEffect(() => {
      if (!search)
         return setMovies(null);
      const request = {
         ...initRequest,
         [QUERY_REQ]: search,
         [ADULT_REQ]: false,
      };
      const url = URI + FETCH_MOVIE;
      const uri = createRequest(url, request);
      // console.log("Response :", fetchMovie());
      fetchApi(uri, setMovies)
         .catch(err => console.error(err));
   }, [fetchSearch]);

   return (movies);
};

export const useFetchMovieById = (props) => {
   const { id } = props;
   const [movie, setMovie] = React.useState(null);

   React.useEffect(() => {
      if (!id)
         setMovie(null);
      const request = {
         ...initRequest,
      }
      const url = URI + MOVIE_DETAIL + '/' + id;
      const uri = createRequest(url, request);
      console.log("URI :", uri);
      fetchApi(uri, setMovie)
         .catch(err => console.log(err));
   }, [id]);

   return (movie);
};

