/**
 *
 * EditPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findIndex, get, map, isEmpty } from 'lodash';
// Components
import Button from '../../components/Button';
import Input from '../../components/InputsIndex';

// Utils
import request from '../../utils/request';

// Layout
import layout from './layout.json';

import './styles.scss';

// Constant used to when to send the files on the `/upload` instand of `/:contentType` route.
const FILE_RELATIONS = {
  product: [{ name: 'pictures', multiple: true }],
};

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
      const requestURL = `http://localhost:1337/${params.contentType}/${params.id}`;
      const data = await request(requestURL, { method: 'GET' });

      this.setState({ inititalData: data, modifiedData: data });
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
      .then(resp => {
        // Send the upload request for each added file
        if (!isEmpty(FILE_RELATIONS[params.contentType])) {
          map(FILE_RELATIONS[params.contentType], (value, key) => {
            if (!isEmpty(modifiedData[value.name])) {
              const body = new FormData();
              const refId = method === 'POST' ? resp.id : params.id;
              body.append('refId', refId);
              body.append('ref', params.contentType);
              body.append('field', value.name);

              if (params.contentType === 'user') {
                body.apprend('source', 'users-permissions');
              }

              map(modifiedData[value.name], file => {
                if (file instanceof File) {
                  body.append('files', file);
                }
              });

              // Helper to visualize FormData
              // for(var pair of body.entries()) {
              //   console.log(pair[0]+ ', '+ pair[1]);
              // }

              return request('http://localhost:1337/upload', { method: 'POST', body, headers: {} }, false)
                .catch(err => {
                  console.log('error upload', err.response);
              });
            }
          });
        }

      })
      .catch(err => {
        console.log('err', err.response);
        //  TODO: Handle errors
      }).finally(() => {
        // TODO: make sure the redirection happens when all the files have been updated
        this.props.history.push(`/${params.contentType}`);
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
          <Link to={`/${params.contentType}`}>Back</Link>
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
