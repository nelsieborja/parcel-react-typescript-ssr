// Middleware for the server-rendering
import fs from 'fs';
import { Readable } from 'stream';
import MultiStream from 'multistream';
import { printDrainHydrateMarks, ImportedStream } from 'react-imported-component';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToNodeStream } from 'react-dom/server';
import { renderStylesToNodeStream } from 'emotion-server';

import App from '../app/App';

const readable = () => {
  const s = new Readable();
  s._read = () => true;
  return s;
};

const readableString = string => {
  const s = new Readable();
  s.push(string);
  s.push(null);
  s._read = () => true;
  return s;
};

interface context {
  url?: string;
}

const manifect = JSON.parse(fs.readFileSync(__dirname + '/../client/parcel-manifest.json'));

export default function middleware(req, res) {
  // Generate the server-rendered HTML using the appropriate router
  const context: context = {};

  let streamUID = 0;
  const htmlStream = renderToNodeStream(
    <ImportedStream takeUID={uid => (streamUID = uid)}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App />
      </StaticRouter>
    </ImportedStream>
  );

  // If react-router is redirecting, do it on the server side
  if (context.url) {
    return res.redirect(301, context.url);
  }

  // create a "header" stream
  const headerStream = readable();

  // create a style steam
  const styledStream = renderStylesToNodeStream();

  // allow client to start loading js bundle
  res.write(`<!DOCTYPE html><html><head><script defer src="${manifect['client.tsx']}"></script>`);

  const middleStream = readableString('</head><body><div id="app">');
  const endStream = readableString('</div></body></html>');

  const streams = [headerStream, middleStream, styledStream, endStream];

  MultiStream(streams).pipe(res);

  // start by piping react and styled transform stream
  htmlStream.pipe(
    styledStream,
    { end: false }
  );

  htmlStream.on('end', () => {
    // push loaded chunks information
    headerStream.push(printDrainHydrateMarks(streamUID));
    // kill header stream on the main stream end
    headerStream.push(null);
    styledStream.end();
  });
}
