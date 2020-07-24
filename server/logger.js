import pino from 'pino';

const mainLogger = pino();
const redisLogger = mainLogger.child({ errType: 'redis' });
const apiLogger = mainLogger.child({ errType: 'api' });
const uncaughtExceptionLogger = mainLogger.child({ errType: 'uncaughtException' });
const unhandledRejectionLogger = mainLogger.child({ errType: 'unhandledRejection' });

module.exports = {
  redisLogger,
  apiLogger,
  uncaughtExceptionLogger,
  unhandledRejectionLogger,
};
