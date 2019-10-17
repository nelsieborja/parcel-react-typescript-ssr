// Middleware for the server-rendering
import { Readable } from 'stream';
import fs from 'fs';
import MultiStream from 'multistream';
import { printDrainHydrateMarks, ImportedStream } from 'react-imported-component';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToNodeStream } from 'react-dom/server';
import { renderStylesToNodeStream } from 'emotion-server';

import App from '../app/App';

const readableString = (string: string) => {
  const s = new Readable();
  s.push(string);
  s.push(null);
  s._read = () => true;
  return s;
};

const manifect = JSON.parse(fs.readFileSync(__dirname + '/../client/parcel-manifest.json'));

interface context {
  url?: string;
}

export default function middleware(
  req: { originalUrl: any },
  res: {
    redirect: (arg0: number, arg1: string) => void;
    write: (arg0: string) => void;
    end: () => void;
  }
) {
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

  // create a style steam
  const styledStream = renderStylesToNodeStream();

  // allow client to start loading js bundle
  res.write(
    `<!DOCTYPE html><html><head><script defer src="${
      manifect['client.tsx']
    }"></script></head><body><div id="app">`
  );

  const endStream = readableString('');

  const streams = [styledStream, endStream];

  MultiStream(streams).pipe(res);

  // start by piping react and styled transform stream
  htmlStream.pipe(styledStream);
  styledStream.on('end', () => {
    res.write('</div>');
    // push loaded chunks information
    res.write(printDrainHydrateMarks(streamUID));
    res.write('</body></html>');
    res.end();
  });
}
