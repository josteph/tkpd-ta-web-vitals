const fp = require('fastify-plugin');

const symbolRequestTime = Symbol('RequestTimer');
const symbolServerTiming = Symbol('ServerTiming');

/**
 *
 * @param {string} name
 * @param {number|string} duration
 * @param {string} description
 * @return {string}
 */
const genTick = (name, duration, description) => {
  let val = name;
  // Parse duration. If could not be converted to float, does not add it
  duration = parseFloat(duration);
  if (!isNaN(duration)) {
    val += `;dur=${duration}ms`;
  }
  // Parse the description. If empty, doest not add it. If string with space, double quote value
  if ('string' === typeof description) {
    val += `;desc=${description.includes(' ') ? `"${description}"` : description}`;
  }

  return val;
};

/**
 * Decorators
 *
 * @param {fastify} instance
 * @param {function} instance.decorateReply
 * @param {Object} opts
 * @param {function} next
 */
export default fp((instance, opts, next) => {
  // Check the options, and corrects with the default values if inadequate
  if (isNaN(opts.digits) || 0 > opts.digits) {
    opts.digits = 2;
  }
  opts.header = opts.header || 'X-Response-Time';

  // Hook to be triggered on request (start time)
  instance.addHook('onRequest', (request, reply, next) => {
    // Store the start timer in nanoseconds resolution
    // istanbul ignore next
    request[symbolRequestTime] = process.hrtime();
    reply[symbolServerTiming] = {};

    next();
  });

  // Hook to be triggered just before response to be send
  instance.addHook('onSend', (request, reply, payload, next) => {
    // check if Server-Timing need to be added
    const serverTiming = reply[symbolServerTiming];
    const headers = [];
    // eslint-disable-next-line no-unused-vars
    for (const name of Object.keys(serverTiming)) {
      headers.push(serverTiming[name]);
    }
    if (headers.length) {
      reply.header('Server-Timing', headers.join(','));
    }

    // Calculate the duration, in nanoseconds …
    const hrDuration = process.hrtime(request[symbolRequestTime]);
    // … convert it to milliseconds …
    const duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6).toFixed(opts.digits);
    // … add the header to the response
    reply.header(opts.header, duration);

    next();
  });

  // Can be used to add custom timing information
  instance.decorateReply('setServerTiming', function(name, duration, description) {
    // Reference to the res object storing values …
    const serverTiming = this[symbolServerTiming];
    // … return if value already exists (all subsequent occurrences MUST be ignored without signaling an error) …
    if (serverTiming.hasOwnProperty(name)) {
      return false;
    }
    // … add the value the the list to send later
    serverTiming[name] = genTick(name, duration, description);
    // … return true, the value was added to the list
    return true;
  });

  instance.decorateReply('asyncMeasureHr', async function({ name, description } = {}, cb) {
    const start = process.hrtime();

    let result, error;
    try {
      result = await cb();
    } catch (err) {
      error = err;
    }

    let finish = process.hrtime(start);
    finish = (finish[0] + finish[1] / 1e9) * 1e3;

    this.setServerTiming(name, finish, description);

    if (error) {
      throw error;
    }

    return result;
  });

  instance.decorateReply('syncMeasureHr', function({ name, description } = {}, cb) {
    const start = process.hrtime();

    let result, error;
    try {
      result = cb();
    } catch (err) {
      error = err;
    }

    let finish = process.hrtime(start);
    finish = (finish[0] + finish[1] / 1e9) * 1e3;

    this.setServerTiming(name, finish, description);

    if (error) {
      throw error;
    }

    return result;
  });

  next();
}, '>= 2.0');
