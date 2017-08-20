import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/link" component={Link} />
        <Route path="*" component={NotFound} />
    </Router>
);

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    // console.log("In onAuthChange");
    if (isUnauthenticatedPage && isAuthenticated) {
        // console.log("isUnauthenticatedPage: ", isUnauthenticatedPage);
        // console.log("isAuthenticated: ", isAuthenticated);
        browserHistory.push('/link');
    }
    else if (isAuthenticatedPage && !isAuthenticated) {
        // console.log("isAuthenticatedPage: ", isAuthenticatedPage);
        // console.log("isAuthenticated: ", isAuthenticated);
        browserHistory.push('/');
    }
}