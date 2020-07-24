import './promise';

/**
 * We only load the polyfills if it's NOT chrome version >= 61 and version <= 999
 */
const validations = [/Chrome\/([1-9][0-9][0-9]|[7-9][0-9]|6[1-9])/];

export default async () => {
  if (!validations.some(validation => validation.test(navigator.userAgent))) {
    await import(/* webpackChunkName: "polyfills" */ './customPolyfills');
  }
};
