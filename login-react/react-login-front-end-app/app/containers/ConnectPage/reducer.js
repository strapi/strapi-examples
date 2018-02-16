/*
 *
 * ConnectPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOG_USER,
} from './constants';

const initialState = fromJS({});

function connectPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_USER:
      return state;
    default:
      return state;
  }
}

export default connectPageReducer;
