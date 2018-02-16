import { createSelector } from 'reselect';

/**
 * Direct selector to the connectPage state domain
 */
const selectConnectPageDomain = (state) => state.get('connectPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ConnectPage
 */

const makeSelectConnectPage = () => createSelector(
  selectConnectPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectConnectPage;
export {
  selectConnectPageDomain,
};
