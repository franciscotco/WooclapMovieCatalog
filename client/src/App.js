import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Component
import HomePage from './components/HomePage';

// Constant
import { HOME } from './constants';

export const NoMatch = () => (
  <div>
    NoMatch
    <br />
    <a href="/home">
      Back to Home
    </a>
  </div>
);

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={HOME} component={HomePage} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
