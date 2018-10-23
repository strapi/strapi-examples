/* components/hocs/securePage.js */

import React from "react";
import PropTypes from "prop-types";

import defaultPage from "./defaultPage";

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
    };

    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated ? <Page {...this.props} /> : "Not Authorized";
    }
  };

export default Page => defaultPage(securePageHoc(Page));
