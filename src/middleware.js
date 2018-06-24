import React from 'react';
<<<<<<< HEAD
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {match, Router} from 'react-router';
=======
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
>>>>>>> parent of d01f52a... Cleaned old files
import Meta from 'react-helmet';
import reducers from './reducers';
import routes from './routes';
import api from './lib/api';

export default (req, res) => {
<<<<<<< HEAD
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        }
        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            if (process.env.NODE_ENV === 'development') {
                res.status(200).send(`
=======
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      if (process.env.NODE_ENV === 'development') {
        res.status(200).send(`
>>>>>>> parent of d01f52a... Cleaned old files
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
            </head>
            <body>
              <div id='app'></div>
              <script src='/bundle.js'></script>
            </body>
          </html>
        `);
<<<<<<< HEAD
            }
            else if (process.env.NODE_ENV === 'production') {
                const store = createStore(reducers);
                api('https://apiendpoint.com/dataitem')
                    .then(
                        // TODO store.dispatch(receiveAlerts(json)),
                    )
                    .then(() => {
                        const preloadedState = store.getState();
                        const html = renderToString(
                            <Provider store={store}>
                                <Router {...renderProps} />
                            </Provider>
                        );
                        const head = Meta.rewind(); // eslint-disable-line
                        res.status(200).send(`
=======
      }
      else if (process.env.NODE_ENV === 'production') {
        const store = createStore(reducers);
        api('https://apiendpoint.com/dataitem')
          .then(
            // TODO store.dispatch(receiveAlerts(json)),
          )
          .then(() => {
            const preloadedState = store.getState();
            const html = renderToString(
              <Provider store={store}>
                <Router {...renderProps} />
              </Provider>
            );
            const head = Meta.rewind(); // eslint-disable-line
            res.status(200).send(`
>>>>>>> parent of d01f52a... Cleaned old files
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width">
                  ${head.title.toString()}
                  ${head.meta.toString()}
                  ${head.link.toString()}
                  <link type='text/css' rel='stylesheet' href='/bundle.css'>
                </head>
                <body>
                  <div id='app'>${html}
                  </div>
                  <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                  </script>
                  <script src='/bundle.js'></script>
                </body>
              </html>
            `);
<<<<<<< HEAD
                        return;
                    });
            }
        }
        else {
            res.status(404).send('Not found');
        }
    });
=======
            return;
          });
      }
    }
    else {
      res.status(404).send('Not found');
    }
  });
>>>>>>> parent of d01f52a... Cleaned old files
};
