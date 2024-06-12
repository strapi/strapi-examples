'use client'
import { useState } from 'react';

export default function ({
  backendUrl
}) {

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
    <button type="button" 
      class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Connect to { props.providerName }
      </button>
    </a>;

  const LogoutButton = (props) => 
    <button type="button" 
      class="flex w-full justify-center rounded-md bg-red-600"
      onClick={props.onClick}
    >
      Logout
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
      </svg>
    </button>;


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
    buttons = <>
      {providersNames.map((providerName, i) => 
        <LoginButton providerName={providerName} key={providerName} />
      )}
    </>
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return <div className="bg-gray">

  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <p className='text-center text-gray-900'>{text}</p>

        <div className='flex flex-col gap-3'>
          {buttons}
        </div>

      </form>

    </div>
  </div>

  </div>;
}