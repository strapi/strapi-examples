import React, { useState } from 'react';
import config from '../config';

const providersNames = [
  'github',
  'facebook',
  'google',
  'twitter',
  'discord',
  'twitch',
  'instagram',
  'vk',
];

const LoginButton = (props) => <a href={`${config.BACKEND_URL}/connect/${props.providerName}`}>
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
      {providersNames.map((providerName, i) => <li key={`login-button-${i}`}>
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
