import React from 'react';
import { withRouter } from 'react-router-dom';
// import { history } from '../App';

// Components
import { useFetchMovies } from '../useFetchMovie';

// Constants
import { URL_IMG, DETAIL } from '../../constants';

const SearchBar = (props) => {
   const { setSearch } = props;

   const handleOnChange = (e) => setSearch(e.currentTarget.value);

   return (
      <input onChange={handleOnChange} />
   );
}

const ButtonFetchMovie = (props) => {
   const { fetchSearch, setFetchSearch } = props;

   const handleOnClick = () => setFetchSearch(!fetchSearch);

   return (
      <div role="button" onClick={handleOnClick}>
         Search
      </div>
   );
};

const _Card = (props) => {
   const { title, poster_path, history } = props;
   
   const handleOnClick = () => {
      history.push(DETAIL);
   }

   return (
      <div onClick={handleOnClick}>
         {title}
         <img src={URL_IMG + poster_path} />
      </div>   
   );
}

const Card = withRouter(_Card);

const DisplayMovies = (props) => {
   const { movies, history } = props;

   if (!movies) return null;
   const { results } = movies;

   return (
      <div>
         {results.map(elem => {
            // const obj = {...elem, history}
            return (
            <React.Fragment key={elem.id}>
               <Card {...elem} />
            </React.Fragment>
         )})}
      </div>
   );
}

const SearchPage = () => {
   const [search, setSearch] = React.useState(null);
   const [fetchSearch, setFetchSearch] = React.useState(false);
   const movies = useFetchMovies({search, fetchSearch});

   console.log("Search :", search);
   console.log("Movies :", movies);
   return (
      <div>
         Movie Catalog
         <br />
         <SearchBar setSearch={setSearch} />
         <ButtonFetchMovie fetchSearch={fetchSearch} setFetchSearch={setFetchSearch} />
         <DisplayMovies movies={movies} />
      </div>
   )
}

export default SearchPage;