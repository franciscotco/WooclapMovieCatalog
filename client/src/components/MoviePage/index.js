import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../Base/Button';
import SwitchDB from '../Base/SwitchDB';
import { useFetchMovieById, postMovie, useFetchLocalMovieById } from '../useFetchMovie';

// Constants
import { SEARCH_MOVIE, ID_MOVIE, URL_IMG_300, ID_DB } from '../../constants';

// Styles
import './MoviePage.css';

const DisplayGenres = (props) => {
   const { genres } = props;
   console.log("GENRES :", genres);
   if (!genres) return null;

   return (
      <div className="text-information-movie-page">
         <div className="genre-movie-page">
            Genres:
         </div>
         {genres.map(genre => {
            const { id, name, _id } = genre;
            console.log("Genre :", genre);
            return (
               <div key={id || _id} className="genre-movie-page">
                  {name}
               </div>
            )
         })}
      </div>
   )
}

const Ratings = (props) => {
   const { vote_average } = props;
   if (!vote_average) return null;

   console.log("Rating :", vote_average);
   return (
      <div className="text-information-movie-page">
         Ratings: {vote_average}
      </div>
   );
}

const PosterMovie = (props) => {
   const { poster_path } = props;

   if (!poster_path) return null;

   console.log("url :", URL_IMG_300 + poster_path);

   return (
      <>
         <img src={URL_IMG_300 + poster_path} className="poster-movie-page"/>
      </>
   )
}

const TitleMovie = (props) => {
   const { original_title } = props;

   if (!original_title) return null;

   return (
      <div className="title-movie-page">
         {original_title}
      </div>
   );
}

const DetailMovie = (props) => {
   const { movie } = props;
   if (!movie) return (null);
   console.log("props :", props);
   console.log("movie :", movie);
   const { original_title, release_date } = movie;

   return (
      <>
         <TitleMovie {...movie} />
         <PosterMovie {...movie} />
         {/* <div>
            {original_title}
         </div> */}
         <div className="text-information-movie-page">
            Release: {release_date}
         </div>
         <Ratings {...movie} />
         <DisplayGenres {...movie} />
      </>
   );
}

const AddMovie = (props) => {
   const { movie } = props;


   if (!movie) return null;

   const handleOnClick = async () => {
      const res = await postMovie(movie);
      console.log("Movie :", res);
   }

   return (
      <Button text="Download" onClick={handleOnClick} />
   );
};

const MoviePage = (props) => {
   const { history, match, fetchMovie } = props;
   const { params: { [ID_MOVIE]: id, [ID_DB]: id_db } } = match;
   console.log("id", id);
   console.log("Match :", match);
   const movie = fetchMovie({id});

   const handleOnClick = () => {
      history.push(SEARCH_MOVIE + '/' + (id_db || "tmdb"));
   }

   console.log("Movie :", movie);
   return (
      <>
      <SwitchDB />
      <div className="layer-movie-page">
         <div className="container-movie-page">
            {/* MoviePage */}
            <DetailMovie movie={movie} />
            <Button 
               text="Back to search result"
               onClick={handleOnClick}
            />
            <AddMovie movie={movie}/>
            {/* <div role="button" onClick={handleOnClick}>
               SearchPage
            </div> */}
         </div>
      </div>
      </>
   );
};


function wrap(WrappedComponent) {
   return class extends React.Component {
      render() {
         const { match, match: {params: {[ID_DB]: id}} } = this.props;
         const fetch = id !== 'local' ? useFetchMovieById : useFetchLocalMovieById
         console.log("match :", match);
         console.log("ID :", id);
         return (
            <WrappedComponent fetchMovie={fetch} {...this.props}/>
         );
      };
   };
};
export default withRouter(wrap(MoviePage));