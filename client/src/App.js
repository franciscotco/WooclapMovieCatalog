import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Component
import HomePage from './components/HomePage';
// import SwitchDB from './components/Base/SwitchDB';

// Constant
import { ROOT } from './constants';

// import logo from './logo.svg';
// import './App.css';

const NoMatch = () => (
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
    // <>
      <Router history={history}>
        <Switch>
          <Route path={ROOT} component={HomePage} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    // </>
  );
}

export default App;
