import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../Base/Button';
import ButtonSwitchDB from '../Base/ButtonSwitchDB';
import { useFetchMovieById, postMovie, useFetchLocalMovieById, useLazyImage, deleteMovieById } from '../useFetchMovie';

// Constants
import { ID_MOVIE, URL_IMG_300, ID_DB, TM_DB, LOCAL_DB, SEARCH } from '../../constants';

// Styles
import './MoviePage.css';

const GenresMovie = (props) => {
   const { genres } = props;

   if (!genres || !Array.isArray(genres)) return null;

   return (
      <div className="text-information-movie-page">
         <div className="genre-movie-page">
            Genres:
         </div>
         {genres.map(genre => {
            const { id, name, _id } = genre;
            return (
               <div key={id || _id} className="genre-movie-page">
                  {name}
               </div>
         )})}
      </div>
   );
};

const RatingsMovie = (props) => {
   const { vote_average } = props;

   return (
      <div className="text-information-movie-page">
         Ratings: {vote_average || "none"}
      </div>
   );
};

const PosterMovie = (props) => {
   const { poster_path } = props;
   const image = useLazyImage({name: poster_path, url: URL_IMG_300});

   return (
      <div className="poster-movie-page">
         <img src={image} alt="poster of movie the movie" />
      </div>
   )
}

const TitleMovie = (props) => {
   const { original_title } = props;

   return (
      <div className="title-movie-page">
         {original_title || "none"}
      </div>
   );
};

const ReleaseMovie = ({release_date}) => (
   <div className="text-information-movie-page">
      Release: {release_date || "none"}
   </div>
);

const DetailMovie = (props) => {
   const { movie } = props;

   if (!movie) return (null);

   return (
      <>
         <TitleMovie {...movie} />
         <PosterMovie {...movie} />
         <ReleaseMovie {...movie} />
         <RatingsMovie {...movie} />
         <GenresMovie {...movie} />
      </>
   );
};

const AddMovie = (props) => {
   const { movie, match } = props;

   if (!movie) return null;
   const { params: {[ID_DB]: id_db}} = match;

   const handleOnClick = async () => {
      try {
         await postMovie(movie);
         console.log("success");
      } catch (err) {
         console.error(err);
      }
   }

   if (id_db !== TM_DB) return null;

   return ( <Button text="Download" onClick={handleOnClick} /> );
};

const RemoveMovie = (props) => {
   const { movie, match } = props;

   if (!movie) return null;
   const { params: {[ID_DB]: id_db}} = match;

   const handleOnClick = async () => {
      const { _id } = movie;
      console.log("movie :", movie);
      try {
         await deleteMovieById({id: _id});
         console.log("success");
      } catch (err) {
         console.error(err);
      }
   }

   if (id_db !== LOCAL_DB) return null;

   return ( <Button text="Remove" onClick={handleOnClick} /> );
}

const MoviePage = (props) => {
   const { history, match, fetchMovie } = props;
   const { params: { [ID_MOVIE]: id, [ID_DB]: id_db } } = match;
   const movie = fetchMovie({id});

   const handleOnClick = () => {
      history.push(SEARCH + '/'+ (id_db || TM_DB));
   }

   return (
      <>
         <ButtonSwitchDB />
         <div className="layer-movie-page">
            <div className="container-movie-page">
               <DetailMovie movie={movie} />
               <Button 
                  text="Back to search result"
                  onClick={handleOnClick}
               />
               <AddMovie movie={movie} {...props} />
               <RemoveMovie movie={movie} {...props} />
            </div>
         </div>
      </>
   );
};

function switchDb(WrappedComponent) {
   return class extends React.Component {
      render() {
         const { match: {params: {[ID_DB]: id}} } = this.props;
         const fetch = id !== LOCAL_DB ? useFetchMovieById : useFetchLocalMovieById
         return (
            <WrappedComponent fetchMovie={fetch} {...this.props}/>
         );
      };
   };
};
export default withRouter(switchDb(MoviePage));