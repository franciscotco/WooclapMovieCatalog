import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Component
import Search from './Search';

// Constant
import { SEARCH, ROOT } from '../constant';

export default function Home() {

   return (
      <Switch>
         <Route exact={true} path={ROOT} component={Search} />
         <Route exact={true} path={SEARCH} component={Search} />
      </Switch>
   );
}