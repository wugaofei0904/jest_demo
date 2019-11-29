
import React from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from 'models/store';
import Home from 'pages/Home';
import Login from 'pages/Login';
import errorPage from 'pages/errorPage';
export default (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} ></Route>
        <Route path="/home" component={Home} ></Route>
        <Route path="/Login" component={Login} ></Route>
        <Route path="*" component={errorPage}></Route>
      </Switch>
    </HashRouter>
  </Provider>
);