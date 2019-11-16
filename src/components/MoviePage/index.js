import React from 'react';
import { withRouter } from 'react-router-dom';

// Constants
import { SEARCH } from '../../constants';

const MoviePage = (props) => {
   const { history } = props;

   const handleOnClick = () => {
      history.push(SEARCH);
   }

   return (
      <div>
         MoviePage
         <div role="button" onClick={handleOnClick}>
            SearchPage
         </div>
      </div>
   );
};

export default withRouter(MoviePage);