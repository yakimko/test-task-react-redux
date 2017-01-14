import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import apiServerMiddleware from '../middlewares/apiServer';
import rootReducer from '../reducers';

const store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(
            thunkMiddleware,
            apiServerMiddleware,
            apiMiddleware,
            routerMiddleware(browserHistory)
        )
    )
);

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;

        store.replaceReducer(nextRootReducer);
    });
}

export default store;
