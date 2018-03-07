/**
 *
 * EditPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

// Utils
import request from '../../utils/request';

class EditPage extends React.Component {
  state = { inititalData: {}, modifiedData: {} };

  async componentDidMount() {
    if (this.props.match.params.id !== 'create') {
      const { match: { params } } = this.props
      const requestURL = `http://localhost:1337/${params.contentType}/${params.id}`;
      const data = await request(requestURL, { method: 'GET' });

      this.setState({ inititalData: data, modifiedData: data });
    }
  }

  render() {
    return (
      <div>
        EditPage
      </div>
    );
  }
}

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;
