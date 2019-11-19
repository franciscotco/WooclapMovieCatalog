import React from 'react';

// Utils
import { initRequest, createRequest } from './utils';

// Constants
import { URI, FETCH_MOVIE, QUERY_REQ, ADULT_REQ } from '../constants';
import { MOVIE_DETAIL } from '../constants';

export const useLazyImage = ({ name, url }) => {
   const [image, setImage] = React.useState(null);

   React.useEffect(() => {
      const loadImage = new Image();
      loadImage.src = url + name;
      loadImage.onload = () => setImage(url + name);
   }, [name]);

   if (!name || !url) return null;

   return (image);
};

/*
**          TMDB_API
*/

export const fetchApi = async (uri) => {
   try {
      const response = await fetch(uri);
      const json = await response.json();
      return (json);
   } catch (err) {
      throw new Error("Invalid request TMDB API");
   }
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
      fetchApi(uri)
         .then(res => setMovies(res.results))
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
      fetchApi(uri)
         .then(res => setMovie(res))
         .catch(err => console.log(err));
   }, [id]);

   return (movie);
};

/*
**          LOCAL_API
*/

export const fetchLocalApi = async (url, query) => {
   try {
      const response = await fetch(url, {
         method: 'get',
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         query: {"search":"toto"}
      });
      const json = await response.json();
      return (json);
   } catch (err) {
      throw new Error("Invalid request LOCAL API");
   }
}

export const useFetchLocalMovies = (props) => {
   const { search, fetchSearch } = props;
   const [movies, setMovies] = React.useState(null);

   React.useEffect(() => {
      if (!search)
         return setMovies(null);
      const request = {
         "search": search,
      };
      const url = "http://localhost:5000/api/movies";
      const uri = createRequest(url, request);
      fetchLocalApi(uri)
         .then(res => setMovies(res))
         .catch(err => console.error(err));
   }, [fetchSearch]);

   return (movies);
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
      const url = "http://0.0.0.0:5000/api/movies" + '/' + id;
      const uri = createRequest(url, request);
      // console.log("URI :", uri);
      fetchLocalApi(uri)
         .then(res => setMovie(res))
         .catch(err => {console.log(err); setMovie(null)});
   }, [id]);

   return (movie);
}

export const deleteMovieById = async ({id}) => {
   const url = "http://localhost:5000/api/movies" + '/' + id;
   try {
      const response = await fetch(url, {
         method: 'delete',
         headers: {'Content-Type':'application/json'},
      });
      const json = await response.json();
      console.log("JSON: ", json);
      return (json);
   } catch (err) {
      throw new Error("Invalid delete request LOCAL DB");
   }
}

export const postMovie = async (props) => {
   const url = "http://0.0.0.0:5000/api/movies";
   const body = JSON.stringify(props);
   try {
      const response = await fetch(url, {
         method: 'post',
         headers: {'Content-Type':'application/json'},
         json:true,
         body
      });
      const json = await response.json();
      console.log("JSON: ", json);
      return (json);
   } catch (err) {
      throw new Error("Invalid post request LOCAL DB");
   }
}