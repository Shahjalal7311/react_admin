import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions'; 

class LogOut extends Component{

  componentWillMount () {
    this.props.logout();
  }
  render() {
    return null
  }

}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const mapDispatchToProps = {
  logout: userActions.logout
};

export default connect(mapState, mapDispatchToProps)(LogOut);