import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import LoginRedirect from './pages/LoginRedirect';
import config from './config';

const App = () => {
  if (!config.BACKEND_URL) {
    return <p>Please configure your backend url in ./src/config.js</p>;
  }

  return (
    <Router>
        <Switch>
          <Route path="/connect/:providerName/redirect" component={LoginRedirect} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
