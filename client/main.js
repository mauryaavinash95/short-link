import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
// If using react-router >= 4.0.0 use react-router-dom
// import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/link" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  // console.log("Current user is: ", Meteor.user());
  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("isAuthenticatedPage: ", isAuthenticatedPage);
  // console.log("isUnauthenticatedPage: ", isUnauthenticatedPage);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/link');
  }
  else if (isAuthenticated && !isAuthenticated) {
    browserHistory.push('/');
  }

});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});