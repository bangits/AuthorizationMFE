import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import './index';
import App from './view';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/authorization'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: App
});

export const { bootstrap, mount, unmount } = lifecycles;

export * from './adapter/react-context';
export * from './configs';
export * from './permittions';
export * from './services';
export * from './view';
