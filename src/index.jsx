import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { SentryLoggingService } from '@reustleco/dojo-frontend-common';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from '@edx/frontend-platform';
import { ErrorPage } from '@edx/frontend-platform/react';
import { mergeConfig } from '@edx/frontend-platform/config';

import ReactDOM from 'react-dom';

import { messages as headerMessages } from '@reustleco/dojo-frontend-component-admin-header';

import App from './App';

import './assets/index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

initialize({
  messages: [headerMessages],
  requireAuthenticatedUser: true,
  loggingService: SentryLoggingService,
  handlers: {
    config() {
      mergeConfig({
        SENTRY_DSN: process.env.SENTRY_DSN || null,
        SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || '',
        SENTRY_PROJECT_ENV_PREFIX: 'dojo-frontend-admin',
      });
    },
  },
});
