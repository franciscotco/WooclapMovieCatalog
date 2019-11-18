import React from 'react';

// Utils
import { initRequest, createRequest } from './utils';

// Constants
import { URI, FETCH_MOVIE, QUERY_REQ, ADULT_REQ } from '../constants';
import { MOVIE_DETAIL } from '../constants';

export const fetchApi = async (uri) => {
   // console.log("URI", uri);
   const response = await fetch(uri);
   if (!response.ok) {
      return (null);
      // console.error(response);
   }
   // console.warn("Response :", response);
   const json = await response.json();
   try {
      console.log("JSON: ", json);
      // console.log("JSON.parse :", JSON.stringify(json));
      return (json);
   } catch (err) {
      // console.log("Error");
      // setResponse(null);
      throw "Error";
   }
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
      fetchApi(uri)
         .then(res => setMovies(res.results))
         .catch(err => console.error(err));
   }, [fetchSearch]);

   return (movies);
};


export const fetchLocalApi = async (url, query) => {
   // const { movie } = props;
   // console.log("PROPS:", props);
   // console.log("MOVIE :", movie);
   // const url = "http://localhost:5000/api/movies";
   // console.log("req :", createRequest(null, props));
   // const uri = createRequest(url, request);
   const response = await fetch(url, {
         method: 'get',
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         query: {"search":"toto"}
      });
   if (!response.ok) {
      // setResponse(null);
      // console.error(response);
      throw "Error";
   }
   // console.warn("Response :", response);
   const json = await response.json();
   try {
      console.log("JSON: ", json);
      // console.log("JSON.parse :", JSON.stringify(json));
      // setResponse(json);
      return (json);
   } catch (err) {
      // console.log("Error");
      // setResponse(null);
      throw "Error";
   }
}

export const useFetchLocalMovies = (props) => {
   const { search, fetchSearch } = props;
   const [movies, setMovies] = React.useState(null);

   React.useEffect(() => {
      if (!search)
         return setMovies(null);
      const request = {
         // ...initRequest,
         "search": search,
         // [ADULT_REQ]: false,
      };
      const url = "http://localhost:5000/api/movies"
      const uri = createRequest(url, request);
      // console.log("Response :", fetchMovie());
      fetchLocalApi(uri)
         .then(res => setMovies(res))
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
      fetchApi(uri)
         .then(res => setMovie(res))
         .catch(err => console.log(err));
   }, [id]);

   return (movie);
};

export const useFetchLocalMovieById = (props) => {
   const { id } = props;
   const [movie, setMovie] = React.useState(null);

   React.useEffect(() => {
      if (!id)
         setMovie(null);
      const request = {
         ...initRequest,
      }
      const url = "http://localhost:5000/api/movies" + '/' + id;
      const uri = createRequest(url, request);
      console.log("URI :", uri);
      fetchLocalApi(uri)
         .then(res => setMovie(res))
         .catch(err => console.log(err));
   }, [id]);

   return (movie);
}

export const postMovie = async (props) => {
   // const request = {
   //    id
   // };
   const { movie } = props;
   console.log("PROPS:", props);
   console.log("MOVIE :", movie);
   const url = "http://localhost:5000/api/movies";
   console.log("req :", createRequest(null, props));
   // const uri = createRequest(url, request);
   const body = JSON.stringify(props);
   console.error("Body :", body);
   const response = await fetch(url, {
         method: 'post',
         headers: {'Content-Type':'application/json'},
         // body: createRequest(null, props)
         json:true,
         body
      });
   if (!response.ok) {
      // setResponse(null);
      // console.error(response);
      return null;
   }
   // console.warn("Response :", response);
   const json = await response.json();
   try {
      console.log("JSON: ", json);
      // console.log("JSON.parse :", JSON.stringify(json));
      // setResponse(json);
      return (json);
   } catch (err) {
      // console.log("Error");
      // setResponse(null);
      throw "Error";
   }
   return response;
}