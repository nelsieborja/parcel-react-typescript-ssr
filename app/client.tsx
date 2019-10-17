import 'react-hot-loader';
import { rehydrateMarks } from 'react-imported-component';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import chunk definition
import './imported-chunk';

import App from './App';

const appEl = document.getElementById('app');
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const TM = 1000;

// console.log('waiting');
// setTimeout(function() {
// rehydrate the bundle marks
console.log('loading');
rehydrateMarks().then(() => {
  // console.log('loaded...');
  // setTimeout(function() {
  console.log('rendering');
  // In production, we want to hydrate instead of render
  // because of the server-rendering
  if (1 || process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(app, appEl);
  } else {
    ReactDOM.render(app, appEl);
  }
  // }, TM);
});
// }, TM);

// Hot reload is that easy with Parcel
if (module.hot) {
  module.hot.accept();
}
