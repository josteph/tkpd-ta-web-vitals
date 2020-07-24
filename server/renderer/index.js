import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor } from '@loadable/server';
import ContextProvider from '@context';
import Routes from '@route-gateway';
import { getHeader, getFooter } from './html-template';

const debug = require('debug')('app:render');

const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');

const renderer = async (fastify, opts, next) => {
  const glb = global;

  fastify.get('/*', async (request, reply) => {
    glb.webpSupport = false;

    const httpRequest = request.raw;
    const reqHeaders = request?.headers || {};

    console.log(`Running SSR on ${httpRequest.url}`);

    const initialState = {};

    let htmlStates = {
      initialState,
      xdevice: reqHeaders['x-device'] || false,
    };

    const hydrateOnClient = (status = 200) => {
      reply
        .code(status)
        .type('text/html; charset=utf-8')
        .send(`${getHeader(htmlStates)}${getFooter(htmlStates)}`);
    };

    if (!opts.ssr) {
      debug('SSR are disabled, hydrating on client.');

      hydrateOnClient();

      return;
    }

    const chunkExtractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

    const body = await reply.asyncMeasureHr(
      { name: 'ssr', description: `Total SSR time for ${httpRequest.url}` },
      async () => {
        const helmetContext = {};
        const routerContext = {};

        const App = chunkExtractor.collectChunks(
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={httpRequest.url} context={routerContext}>
              <ContextProvider initialState={initialState}>
                <Routes />
              </ContextProvider>
            </StaticRouter>
          </HelmetProvider>,
        );

        try {
          const appBodyString = renderToString(App);

          htmlStates = {
            ...htmlStates,
            helmet: helmetContext.helmet,
            ssr: opts.ssr,
            chunkExtractor,
          };

          glb.navigator = {
            userAgent: reqHeaders['user-agent'] || '',
            referer: reqHeaders.referer || '',
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
