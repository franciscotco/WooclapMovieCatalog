import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import SearchPage from '../SearchPage';
import MoviePage from '../MoviePage';

// Constants
import { SEARCH, SEARCH_DB, HOME, MOVIE, MOVIE_DB } from '../../constants';

const HomePage = () => {
   return (
      <Switch>
         <Route exact={true} path={HOME} component={SearchPage} />
         <Route exact={true} path={SEARCH} component={SearchPage} />
         <Route exact={true} path={SEARCH_DB} component={SearchPage} />
         <Route exact={true} path={MOVIE} component={MoviePage} />
         <Route exact={true} path={MOVIE_DB} component={MoviePage} />
         <Route render={() => <Redirect to={SEARCH} />} />
      </Switch>
   );
};

export default HomePage;