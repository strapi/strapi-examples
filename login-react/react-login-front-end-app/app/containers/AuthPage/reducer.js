/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, List, Map } from 'immutable';
import {
  ON_CHANGE,
  SET_FORM,
} from './constants';

const initialState = fromJS({
  didCheckErrors: false,
  formErrors: List([]),
  formType: 'login',
  noErrorsDescription: false,
  modifiedData: Map({}),
  submitSuccess: false,
});

function authPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return state.updateIn(['modifiedData', action.key], () => action.value);
    case SET_FORM:
      return state
        .set('formErrors', List([]))
        .set('noErrorsDescription', false)
        .set('formType', action.formType)
        .set('submitSuccess', false)
        .set('modifiedData', Map(action.data));
    default:
      return state;
  }
}

export default authPageReducer;
