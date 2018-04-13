/**
 *
 * EditPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findIndex, get } from 'lodash';
// Components
import Button from '../../components/Button';
import Input from '../../components/InputsIndex';

import client from '../../apollo-client';
import { GET_PRODUCT } from '../../queries';
// Utils
import request from '../../utils/request';

// Layout
import layout from './layout.json';

import './styles.scss';

// Constant used to when to send the files on the `/upload` instand of `/:contentType` route.
const FILE_RELATIONS = {
  product: [{ name: 'pictures', multiple: true }],
};

/* eslint-disable  array-callback-return */
class EditPage extends React.Component {
  state = {
    didCheckErrors: false,
    errors: [],
    inititalData: {},
    modifiedData: {},
  };

  async componentDidMount() {
    if (this.props.match.params.id !== 'create') {
      const { match: { params } } = this.props

      // FETCH data using graphql
      const { data } = await client.query({
        query: GET_PRODUCT,
        variables: { id: params.id }
      });

      this.setState({ inititalData: data[params.contentType], modifiedData: data[params.contentType] });
    }
  }

  // Reset form to its inital value
  cancel = () => this.setState({ modifiedData: this.state.inititalData });

  handleChange = (e) => {
    const name = e.target.name;

    this.setState({
      modifiedData: { ...this.state.modifiedData, [name]: e.target.value },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO handle errors
    const { match: { params } } = this.props;
    const { modifiedData } = this.state;
    const body = Object.keys(modifiedData).reduce((acc, current) => {
      if (findIndex(FILE_RELATIONS[params.contentType], ['name', current]) === -1) {
        acc[current] = modifiedData[current];
      } else {
        const alreadyUploadedFiles = modifiedData[current].filter(file =>  {
          if (file instanceof File === false) {
            return file;
          }
        });
        acc[current] = alreadyUploadedFiles;
      }
      return acc;
    }, {});

    const method = params.id === 'create' ? 'POST' : 'PUT';
    const requestURL =  params.id === 'create' ? `http://localhost:1337/${params.contentType}`: `http://localhost:1337/${params.contentType}/${params.id}`;
    return request(requestURL, { method, body: body })
      .catch(err => {
        console.log('err', err.response);
        //  TODO: Handle errors
      }).finally(() => {
        // TODO: make sure the redirection happens when all the files have been updated
        this.props.history.push(`/${params.contentType}s`);
      });
  }

  render() {
    const { match: { params } } = this.props;
    const title = params.id === 'create' ? `Create a new ${params.contentType}` : `Edit ${params.id}`;
    const display = layout[params.contentType];

    return (
      <div className="editPageWrapper">
        <div className="container-fluid">
          <h1>{title}</h1>
          <Link to={`/${params.contentType}s`}>Back</Link>
          <form className="formWrapper" onSubmit={this.handleSubmit}>
            <div className="row">
              {display.map((input) => (
                <Input
                  didCheckErrors={this.state.didCheckErrors}
                  errors={get(
                    this.state.errors,
                    [
                      findIndex(this.state.errors, ['name', input.name]),
                      'errors',
                    ],
                    []
                  )}
                  key={input.name}
                  label={input.name}
                  name={input.name}
                  onChange={this.handleChange}
                  type={input.type}
                  value={get(this.state.modifiedData, input.name, input.type === 'file' ? [] : '')}
                  multiple
                />
              ))}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Button type="button" onClick={this.cancel}>Cancel</Button>
                <Button type="submit" primary>Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;
