import React, { Component } from 'react';
class Auth extends Component {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
  */
  static authenticateUser(token) {
    localStorage.setItem("token", token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
  */
  isUserAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
  */
  static deauthenticateUser() {
    localStorage.removeItem("token");
  }

  /**
   * Get a token value.
   *
   * @returns {string}
  */

  static getToken() {
    return localStorage.getItem("token");
  }
}

export default Auth;