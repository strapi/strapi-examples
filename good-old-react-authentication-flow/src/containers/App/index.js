/**
 *
 *
 * App
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import AuthPage from '../../containers/AuthPage';
import ConnectPage from '../../containers/ConnectPage';
import EditPage from '../../containers/EditPage';
import HomePage from '../../containers/HomePage';
import NotFoundPage from '../../containers/NotFoundPage';
import ProductPage from '../../containers/ProductPage';

// This component ios HoC that prevents the user from accessing a route if he's not logged in
import PrivateRoute from '../../containers/PrivateRoute';

// Design
import './styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* A user can't go to the HomePage if is not authenticated */}
            <Route path="/auth/:authType/:id?" component={AuthPage} />
            <PrivateRoute path="/" component={HomePage} exact />
            <PrivateRoute exact path="/product" component={ProductPage} />
            <PrivateRoute path="/:contentType/:id" component={EditPage} />
            <Route exact path="/connect/:provider" component={ConnectPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
