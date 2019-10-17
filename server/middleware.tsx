// Middleware for the server-rendering

import { printDrainHydrateMarks } from 'react-imported-component';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';

import App from '../app/App';
import generateHtml from './generateHtml';

interface context {
  url?: string;
}

export default function middleware(
  req: { originalUrl: string },
  res: { redirect: (arg0: number, arg1: String) => void; send: (arg0: string) => void }
) {
  // Generate the server-rendered HTML using the appropriate router
  const context: context = {};

  const markup =
    renderStylesToString(
      renderToString(
        <StaticRouter location={req.originalUrl} context={context}>
          <App />
        </StaticRouter>
      )
    ) + printDrainHydrateMarks();

  // If react-router is redirecting, do it on the server side
  if (context.url) {
    return res.redirect(301, context.url);
  }

  // Format the HTML using the template and send the result
  const html = generateHtml('JS will start in ~2s<br/>' + markup);
  res.send(html);
}
