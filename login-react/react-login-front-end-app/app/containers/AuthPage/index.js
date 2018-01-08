/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { findIndex, get, map, replace } from 'lodash';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Input from 'components/Input';
import Logo from 'images/logo_strapi.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { onChange, setForm, submit } from './actions';

import form from './form.json';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

export class AuthPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.authType !== this.props.match.params.authType) {
      this.setForm(nextProps);
    }

    if (nextProps.submitSuccess) {
      switch (this.props.match.params.authType) {
        case 'login':
        case 'reset-password':
        case 'register':
          this.props.history.push('/');
          break;
        default:
      }
    }
  }

  setForm = (props) => {
    const params = props.location.search ? replace(props.location.search, '?code=', '') : props.match.params.id;
    this.props.setForm(props.match.params.authType, params);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit();
  }

  renderLink = () => {

  if (this.props.match.params.authType === 'login') {
    return (
      <div>
        <Link to="/auth/forgot-password">
          Forgot Password
        </Link>
        &nbsp;or&nbsp;
        <Link to="/auth/register">
          register
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/auth/login">
        Ready to signin
      </Link>
    </div>
  );
}

  render() {
    const divStyle = this.props.match.params.authType === 'register' ? { marginTop: '3.2rem' } : { marginTop: '.9rem' };
    const inputs = get(form, this.props.match.params.authType) || [];
    console.log(this.props);
    return (
      <div className="authPage">
        <div className="wrapper">
          <div className="headerContainer">
            {this.props.match.params.authType === 'register' ? (
              <span>Welcome !</span>
            ) : (
              <img src={Logo} alt="logo" />
            )}
          </div>
          <div className="headerDescription">
            {this.props.match.params.authType === 'register' ? (
              <span>
                Please register to access the app.
              </span>
            ) : ''}
          </div>
          <div className="formContainer" style={divStyle}>
            <form onSubmit={this.handleSubmit}>
              <div className="container-fluid">
                {this.props.match.params.authType === 'login' ? (
                  <div className="errorsContainer">
                    Errors to display
                  </div>
                ) : ''}
                <div className="row" style={{ textAlign: 'start' }}>
                  {map(inputs, (input, key) => (
                    <Input
                      autoFocus={key === 0}
                      customBootstrapClass={get(input, 'customBootstrapClass')}
                      didCheckErrors={this.props.didCheckErrors}
                      errors={get(this.props.formErrors, [findIndex(this.props.formErrors, ['name', input.name]), 'errors'])}
                      key={get(input, 'name')}
                      label={get(input, 'label')}
                      name={get(input, 'name')}
                      onChange={this.props.onChange}
                      placeholder={get(input, 'placeholder')}
                      type={get(input, 'type')}
                      validations={{ required: true }}
                      value={get(this.props.modifiedData, get(input, 'name'))}
                      noErrorsDescription={this.props.noErrorsDescription}
                    />
                  ))}
                  <div className="col-md-12 buttonContainer">
                    <Button
                      label="Submit"
                      style={{ width: '100%' }}
                      primary
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="linkContainer">
          {this.renderLink()}
        </div>
        </div>
      </div>
    );
  }
}

AuthPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectAuthPage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onChange,
      setForm,
      submit,
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'authPage', reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
