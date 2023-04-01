import React from "react";
import {
  Routes,
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        </Routes>
  );
}

export default App;
