/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  ON_CHANGE,
  SET_FORM,
  SUBMIT_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  formType: 'login',
  modifiedData: Map({}),
  submitSuccess: false,
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
    case SUBMIT_SUCCEEDED:
      return state
        .update('submitSuccess', (v) => !v);
    default:
      return state;
  }
}

export default authPageReducer;
