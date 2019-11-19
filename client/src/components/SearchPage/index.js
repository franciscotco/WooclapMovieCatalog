import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import ButtonSwitchDb from '../Base/ButtonSwitchDB';
import { useFetchMovies, useFetchLocalMovies, useLazyImage } from '../useFetchMovie';

// Constants
import Button from '../Base/Button';
import { URL_IMG_180, MOVIE, ID_DB, LOCAL_DB, TM_DB } from '../../constants';

// Styles
import './SearchPage.css'

const SearchBar = (props) => {
   const { setSearch } = props;

   const handleOnChange = (e) => setSearch(e.currentTarget.value);

   return ( <input onChange={handleOnChange} /> );
}

const ButtonFetchMovie = (props) => {
   const { fetchSearch, setFetchSearch, search } = props;

   React.useEffect(() => {
      if (!search) return ;
   
      const timer = setInterval(() => setFetchSearch(!fetchSearch), 500);
      return () => clearInterval(timer);
   }, [search]);

   const handleOnClick = () => setFetchSearch(!fetchSearch);

   return ( <Button text="Search" onClick={handleOnClick}/> );
};

const _Card = (props) => {
   const { title, poster_path, history } = props;
   const image = useLazyImage({name: poster_path, url: URL_IMG_180});

   const handleOnClick = () => {
      const { id, _id, match: {params: {[ID_DB]: id_db}} } = props;
      history.push(MOVIE + '/' + (id || _id) + '/' + (id_db || TM_DB));
   };

   return (
      <div onClick={handleOnClick} className="card-movie-search-page" style={{backgroundImage: `url(${image})`}}>
         <div className="title-card-movie-search-page">
            {title}
         </div>
      </div>
   );
}
const Card = withRouter(_Card);

const DisplayMovies = (props) => {
   const { movies } = props;

   if (!movies || !Array.isArray(movies)) return null;

   return (
      <div className="layer-card-movie-search-page">
         <div className="container-card-movie-search-page">
            {movies.map(movie => {
               const { id, _id } = movie;
               return (
               <React.Fragment key={id || _id}>
                  <Card {...movie} />
               </React.Fragment>
            )})}
         </div>
      </div>
   );
};

const HeaderSearchPage = (props) => {
   return (
      <div className="container-header-search-page">
         <div className="title-search-page">
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
   const headerProps = { fetchSearch, setFetchSearch, setSearch, search };

   return (
      <>
         <ButtonSwitchDb />
         <HeaderSearchPage {...headerProps} />
         <DisplayMovies movies={movies} />
      </>
   );
};

function switchDb(WrappedComponent) {
   return class extends React.Component {
      render() {
         const { match: {params: {[ID_DB]: id}} } = this.props;
         const fetch = id !== LOCAL_DB ? useFetchMovies : useFetchLocalMovies

         return (<WrappedComponent fetchMovie={fetch} />);
      };
   };
};
export default withRouter(switchDb(SearchPage));