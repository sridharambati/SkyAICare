import React from 'react';
<<<<<<< HEAD
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './reducers';
import routes from './routes';
import epics from './epics';

// this is for the middleware to make HTTP calls
const epicMiddleware = createEpicMiddleware(epics);
=======
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import routes from './routes';
>>>>>>> parent of d01f52a... Cleaned old files

// This allows us to use Redux dev tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

<<<<<<< HEAD
if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger());
=======
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
>>>>>>> parent of d01f52a... Cleaned old files
}

// With server rendering, we can grab the preloaded state.
const preloadedState = window.__PRELOADED_STATE__ || {}; // eslint-disable-line

const store = createStore(
<<<<<<< HEAD
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(epicMiddleware))
);

render(
    (<Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>),
    document.getElementById('app') // eslint-disable-line no-undef
);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers').default); // eslint-disable-line global-require
    });
=======
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app') // eslint-disable-line no-undef
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default); // eslint-disable-line global-require
  });
>>>>>>> parent of d01f52a... Cleaned old files
}
