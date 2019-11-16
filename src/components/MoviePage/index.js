import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import { useFetchMovieById } from '../useFetchMovie';

// Constants
import { SEARCH, ID_MOVIE } from '../../constants';

const DisplayGenres = (props) => {
   const { movie: {genres} } = props;

   return (
      <div>
         {genres.map(genre => {
            return (
               <>
                  {genre}
               </>
            )
         })}
      </div>
   )
}

const DetailMovie = (props) => {
   const { movie } = props;
   if (!movie)
      return (null);
   console.log("props :", props);
   console.log("movie :", movie);
   const { original_title, release_date } = movie;

   return (
      <>
         <div>
            {original_title}
         </div>
         <div>
            {release_date}
         </div>
         <DisplayGenres movie={movie} />
      </>
   );
}

const MoviePage = (props) => {
   const { history, match } = props;
   const { params: { [ID_MOVIE]: id } } = match;
   console.log("id", id);
   console.log("Match :", match);
   const movie = useFetchMovieById({id});

   const handleOnClick = () => {
      history.push(SEARCH);
   }

   console.log("Movie :", movie);
   return (
      <div>
         MoviePage
         <DetailMovie movie={movie} />
         <div role="button" onClick={handleOnClick}>
            SearchPage
         </div>
      </div>
   );
};

export default withRouter(MoviePage);