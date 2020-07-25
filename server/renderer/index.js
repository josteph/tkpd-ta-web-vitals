import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor } from '@loadable/server';
import Routes from '@route-gateway';

import { DataProvider, createDataClient } from 'react-isomorphic-data';
import { getDataFromTree } from 'react-isomorphic-data/ssr';
import fetch from 'node-fetch';

import { getHeader, getFooter } from './html-template';

const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');

// react-isomorphic-data needs fetch to be available in the global scope
global.fetch = fetch;

const renderer = async (fastify, opts, next) => {
  fastify.get('/*', async (request, reply) => {
    const dataClient = createDataClient({
      initialCache: {},
      ssr: true,
      headers: {},
    });

    const httpRequest = request.raw;

    console.log(`Running SSR on ${httpRequest.url}`);

    let htmlStates = {};

    const hydrateOnClient = (status = 200) => {
      reply
        .code(status)
        .type('text/html; charset=utf-8')
        .send(`${getHeader(htmlStates)}${getFooter(htmlStates)}`);
    };

    const chunkExtractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

    const body = await reply.asyncMeasureHr(
      { name: 'ssr', description: `Total SSR time for ${httpRequest.url}` },
      async () => {
        const helmetContext = {};
        const routerContext = {};

        const App = chunkExtractor.collectChunks(
          <DataProvider client={dataClient}>
            <HelmetProvider context={helmetContext}>
              <StaticRouter location={httpRequest.url} context={routerContext}>
                <Routes />
              </StaticRouter>
            </HelmetProvider>
          </DataProvider>,
        );

        try {
          await getDataFromTree(App);
        } catch (err) {
          console.error('Error while trying to getDataFromTree', err);
        }

        try {
          const appBodyString = renderToString(App);

          htmlStates = {
            ...htmlStates,
            helmet: helmetContext.helmet,
            ssr: true,
            chunkExtractor,
            dataClient,
          };

          return `${getHeader(htmlStates)}${appBodyString}${getFooter(htmlStates)}`;
        } catch (e) {
          const errorMessage = e.message;

          console.error(`MOUNT ERROR ${request.raw.url}: ${errorMessage}`);

          hydrateOnClient();
        }
      },
    );

    if (body) {
      reply
        .code(200)
        .type('text/html; charset=utf-8')
        .header('Cache-Control', 'no-cache')
        .send(body);
    }

    return;
  });

  await next();
};

export default renderer;
