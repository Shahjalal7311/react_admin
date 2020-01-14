import React, { Component } from 'react';
import { HashRouter, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { userActions } from './_actions';
import Auth from '../src/Auth/auth';
import { emptyStatement } from '@babel/types';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  //check authentication
  componentDidMount () {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user ==null){
      history.push('/login');
    }
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Router history={history}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              </Switch>
            </Router>
          </React.Suspense>
      </HashRouter>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const mapDispatchToProps = {
  
};

export default connect(mapState, mapDispatchToProps)(App);
