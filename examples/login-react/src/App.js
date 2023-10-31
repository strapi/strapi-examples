import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import LoginRedirect from './pages/LoginRedirect';

const App = () => {
  if (!process.env.REACT_APP_BACKEND_URL) {
    return <p>
        Please specify your backend url with the <a href="https://create-react-app.dev/docs/adding-custom-environment-variables/" target="_blank" rel="noopener noreferrer">environment variable</a>:<br />
        <b>REACT_APP_BACKEND_URL</b>.<br />
        <br />
        For example launch this app with:<br />
        <b>REACT_APP_BACKEND_URL=http://localhost:1337 yarn start</b>
      </p>;
  }

  return (
    <Router>
        <Switch>
          <Route exact path="/connect/:providerName/redirect" component={LoginRedirect} />
          <Route exact path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
