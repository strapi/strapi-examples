/* hocs/defaultPage.js */

import React from "react";
import Router from "next/router";

import { getUserFromServerCookie, getUserFromLocalCookie } from "../lib/auth";

export default Page =>
  class DefaultPage extends React.Component {
    static async getInitialProps({ req }) {
      const loggedUser = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(req);
      const pageProps = Page.getInitialProps && Page.getInitialProps(req);
      console.log("is authenticated");
      console.log(loggedUser);
      let path = req ? req.pathname : "";
      path = "";
      return {
        ...pageProps,
        loggedUser,
        currentUrl: path,
        isAuthenticated: !!loggedUser
      };
    }

    logout = eve => {
      if (eve.key === "logout") {
        Router.push(`/?logout=${eve.newValue}`);
      }
    };

    componentDidMount() {
      window.addEventListener("storage", this.logout, false);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.logout, false);
    }

    render() {
      return <Page {...this.props} />;
    }
  };