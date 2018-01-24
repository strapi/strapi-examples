/*
 *
 * ConnectPage actions
 *
 */

import {
  LOG_USER,
} from './constants';

export function logUser(provider, search) {
  return {
    type: LOG_USER,
    provider,
    search
  };
}
