import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = [
  'discord',
  'facebook',
  'github',
  'google',
  'instagram',
  'linkedin',
  'reddit',
  'twitch',
  'twitter',
  'vk',
  'auth0',
];

const LoginButton = (props) => <a href={`${backendUrl}/api/connect/${props.providerName}`}>
    <button style={{ width: '150px' }}>Connect to {props.providerName}</button>
  </a>;

const LogoutButton = (props) => <button onClick={props.onClick}>Logout</button>;

const Home = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName, i) => <li key={providerName}>
        <LoginButton providerName={providerName}/>
        </li>)}
    </ul>;
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return <div>
    <p>{text}</p>
    {buttons}
  </div>;
}

export default Home;
