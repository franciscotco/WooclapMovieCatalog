import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import SearchPage from '../SearchPage';
import MoviePage from '../MoviePage';

// Constants
import { SEARCH, ROOT, DETAIL } from '../../constants';

const HomePage = () => {
   return (
      <Switch>
         <Route exact={true} path={ROOT} component={SearchPage} />
         <Route exact={true} path={SEARCH} component={SearchPage} />
         <Route exact={true} path={DETAIL} component={MoviePage} />
      </Switch>
   );
};

export default HomePage;