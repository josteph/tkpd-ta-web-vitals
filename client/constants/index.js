import transformConstants from './transform';

const transformedClientConstants = transformConstants(process.env);

const constants = {
  ...transformedClientConstants,
};

export const { COOKIE } = constants;
