let whitelist = ['localhost', '127.0.0.1'];

const corsOptions = {
  origin: (origin, cb) => {
    if (process.env.NODE_ENV === 'production') {
      whitelist = ['\\.app.com(:[1-9][0-9]+)?/?$'];
    }

    cb(null, new RegExp(whitelist.join('|')).test(origin));
  },
  credentials: true,
};

export default corsOptions;
