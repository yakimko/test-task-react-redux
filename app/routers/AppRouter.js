import React from 'react';
import { Router, Redirect, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from '../store/store';

import * as routes from '../constants/routes/routes';

import App from '../components/App';
import ScreenUsers from '../screens/ScreenUsers';

const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Redirect from={routes.ROOT_ROUTE} to={routes.USERS_ROUTE} />
            <Route path={routes.ROOT_ROUTE} component={App}>
                <Route path={routes.USERS_ROUTE} component={ScreenUsers} />
            </Route>
        </Router>
    </Provider>
);
