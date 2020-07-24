import config from '@config';
import { isProd } from '@utils';
import appRootDir from 'app-root-dir';
import fastify from 'fastify';
import cors from 'fastify-cors';
import path from 'path';
import handleError from './middleware/handle-error';
import serverTiming from './middleware/server-timing';
import corsOptions from './options/cors';
import renderer from './renderer';

const debug = require('debug')('app');

debug('Starting...');

const HOST = config.get('HOST');
const PORT = process.env.PORT || 3000;

const app = fastify({
  logger: config.get('FLAGS.LOGGER') ? config.get('LOG_CONFIG') : false,
  trustProxy: __PROD__,
});

app.setErrorHandler(handleError);

app.register(serverTiming);

if (isProd) {
  app.register(require('fastify-helmet'));
}

app.register(require('fastify-static'), {
  root: path.resolve(appRootDir.get(), 'build'),
  wildcard: false,
});

app
  .register(cors, corsOptions)
  .register(renderer, { ssr: config.get('SSR_STATUS') });

(async () => {
  try {
    if (__PROD__) {
      const address = await app.listen(PORT, HOST);

      app.log.info(`server-side renderer is now listening at ${address}`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();

export default app;
