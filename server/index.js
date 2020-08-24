import appRootDir from 'app-root-dir';
import fastify from 'fastify';
import cors from 'fastify-cors';
import path from 'path';
import handleError from './middleware/handle-error';
import serverTiming from './middleware/server-timing';
import renderer from './renderer';
import footerData from './data/footer';
import productsData from './data/products';
import productData from './data/product';

const fastifyStatic = require('fastify-static');
const debug = require('debug')('app');

debug('Starting...');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = fastify({
  trustProxy: __PROD__,
});

app.setErrorHandler(handleError);

app.register(serverTiming);

if (__PROD__) {
  app.register(require('fastify-helmet'));
}

app.register(fastifyStatic, {
  root: path.resolve(appRootDir.get(), 'build'),
  wildcard: false,
});

app.get('/ping', (request, reply) => {
  reply.type('application/json').code(200);
  reply.send({ reply: 'pong' });
});

// API for get dynamic content in footer
app.get('/api/footer', (request, reply) => {
  reply.type('application/json').code(200);
  reply.send({
    success: true,
    data: footerData,
  });
});

// API for get product list
app.get('/api/products', (request, reply) => {
  reply.type('application/json').code(200);
  reply.send({
    success: true,
    data: productsData,
  });
});

// API for get product detail
app.get('/api/product/:id', (request, reply) => {
  reply.type('application/json').code(200);
  const id = request.params.id;
  reply.send(productData(id));
});

app.register(cors).register(renderer);

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
