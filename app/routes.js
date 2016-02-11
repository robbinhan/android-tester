import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TestOrderPage from './containers/TestOrderPage';
import DevicesPage from './containers/DevicesPage';

import history from './history'

export default (
  <Route path="/" component={App} history={history}>
    <IndexRoute component={HomePage} />
    <Route path="/testorder/:method" component={TestOrderPage} />
    <Route path="/testorder/:method/:id" component={TestOrderPage} />
    <Route path="/devices/:method" component={DevicesPage} />
    <Route path="/devices/:method/:id" component={DevicesPage} />
  </Route>
);
