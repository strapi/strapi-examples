/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  ON_CHANGE,
  SET_FORM,
} from './constants';

const initialState = fromJS({
  formType: 'login',
  modifiedData: Map({}),
});

function authPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return state.updateIn(['modifiedData', action.key], () => action.value);
    case SET_FORM:
      return state
        .set('formType', action.formType)
        .set('submitSuccess', false)
        .set('modifiedData', Map(action.data));
    default:
      return state;
  }
}

export default authPageReducer;
