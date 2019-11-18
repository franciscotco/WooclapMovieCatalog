import React from 'react';
import { withRouter } from 'react-router-dom';
// import { history } from '../App';

// Components
import SwitchDb from '../Base/SwitchDB';
import { useFetchMovies, useFetchLocalMovies } from '../useFetchMovie';

// Constants
import Button from '../Base/Button';
import { URL_IMG_180, MOVIE, ID_DB } from '../../constants';

// Styles
import './SearchPage.css'

const SearchBar = (props) => {
   const { setSearch } = props;

   const handleOnChange = (e) => setSearch(e.currentTarget.value);

   return (
      <input onChange={handleOnChange} />
   );
}

const ButtonFetchMovie = (props) => {
   const { fetchSearch, setFetchSearch, search } = props;
   // let test = null;
   // const [time, setTime] = React.useState(10);
   // const tick = () => {

      // This function is called every 50 ms. It updates the
      // elapsed counter. Calling setState causes the component to be re-rendered

      // this.setState({elapsed: new Date() - this.props.start});
//       setTime(new Date() - time);
//   };
// console.log(time);
   // const timer = () => {
   //    setFetchSearch(search);
   // };
   React.useEffect(() => {
      if (!search) return ;
      console.error("search :", search);
      console.log("Search :", search);
      // const test = async () => {
      // const tutu = setInterval(() => {
      //    console.log("Hey");
      //    clearInterval(tutu);
      // }, 500);
      const timer = setInterval(() => setFetchSearch(!fetchSearch), 500);
      return () => clearInterval(timer);
      // }
      // test()
      //    .then(() => {})
      //    .catch(() => {});
      // setTest();
   //    test = setInterval(() => {
   //       console.log("Hey");
   //       // This function is called every 50 ms. It updates the
   //       // elapsed counter. Calling setState causes the component to be re-rendered

   //       // this.setState({elapsed: new Date() - this.props.start});
   //       // setTime(new Date() - time);
   //       setFetchSearch(!fetchSearch)
   //       return ;
   //   }, 500);
   //   clearInterval(test);
     // setTest()
      // return () => {
      //    clearInterval(test);
      // }
   }, [search]);

   const handleOnClick = () => setFetchSearch(!fetchSearch);

   return (
      // <div role="button" onClick={handleOnClick}>
      <Button text="Search" onClick={handleOnClick}/>
      // </div>
   );
};

const _Card = (props) => {
   const { title, poster_path } = props;
   const [poster, setPoster] = React.useState(null);
   // const image = `background-image: url(${URL_IMG}${poster_path})`;
   // console.log("ID :", props);
   React.useEffect(() => {
      const loadPoster = new Image();
      loadPoster.src = URL_IMG_180 + poster_path;

      loadPoster.onload = () => setPoster(URL_IMG_180 + poster_path);
   }, [poster_path]);

   const handleOnClick = () => {
      const { id, _id, history, match: {params: {[ID_DB]: id_db}} } = props;
      history.push(MOVIE + '/' + (id || _id) + '/' + (id_db || "tmdb"));
   };

   return (
      <div onClick={handleOnClick} className="card-movie-search-page" style={{backgroundImage: `url(${poster || ""})`}}>
         <div className="title-card-movie-search-page">{title}</div>
         {/* <img src={URL_IMG + poster_path} className="poster-movie-search-page"/> */}
      </div>
   );
}
const Card = withRouter(_Card);

const DisplayMovies = (props) => {
   const { movies, history } = props;

   if (!movies) return null;
   // const { results } = movies;
   // if (!results) return null;

   return (
      <div className="layer-card-movie-search-page">
         <div className="container-card-movie-search-page">
            {movies.map(movie => {
               // const obj = {...elem, history}
               return (
               <React.Fragment key={movie.id}>
                  <Card {...movie} />
               </React.Fragment>
            )})}
         </div>
      </div>
   );
};

const HeaderSearchPage = (props) => {
   // const { fetchSearch, setFetchSearch, setSearch, search } = props;

   return (
      <div className="container-header-search-page">
         <div>
            Movie Catalog
         </div>
         <div className="container-search-bar">
            <SearchBar {...props}/>
            <ButtonFetchMovie {...props} />
         </div>
      </div>
   );
}

const SearchPage = (props) => {
   const { fetchMovie } = props;
   const [fetchSearch, setFetchSearch] = React.useState(false);
   const [search, setSearch] = React.useState(null);
   const movies = fetchMovie({search, fetchSearch});

   console.log("Search :", search);
   console.log("Movies :", movies);
   const headerProps = {fetchSearch, setFetchSearch ,setSearch, search };
   return (
      <>
         <SwitchDb />
         <HeaderSearchPage {...headerProps} />
         <DisplayMovies movies={movies} />
      </>
   );
};

function wrap(WrappedComponent) {
   return class extends React.Component {
      render() {
         const { match, match: {params: {[ID_DB]: id}} } = this.props;
         const fetch = id !== 'local' ? useFetchMovies : useFetchLocalMovies

         return (
            <WrappedComponent fetchMovie={fetch} />
         );
      };
   };
};
export default withRouter(wrap(SearchPage));