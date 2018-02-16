/*
 *
 * ConnectPage actions
 *
 */

import {
  LOG_USER,
} from './constants';


/**
 * Actions that fires the request to retrieve the user's credentials
 * Since we don't provide an SDK we have to manually code this step
 * @param  {String} provider the provider we want to use
 * @param  {String} search   The URL's search params returned by the provider
 * @return {Object}
 */

// NOTE: You can remove the function's args but it will involves to create an action
// that sets those values in your reducer so you can use a selector in your withSaga
export function logUser(provider, search) {
  return {
    type: LOG_USER,
    provider,
    search
  };
}
