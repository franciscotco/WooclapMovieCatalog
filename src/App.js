import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Component
import Home from './components/Home';

// Constant
import { ROOT } from './constant';

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

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROOT} component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
