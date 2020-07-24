import get from 'lodash/get';
import config from '@config';
import getClientAssets from './get-client-assets';

const publicPath = config.get('PUBLIC_PATH') || '/';

const mainCSS = [`${publicPath}static/css/client.css`, `${publicPath}static/css/vendor~client.css`];
const mainBundles = ['client', 'vendor~client'];

const appClientAssets = getClientAssets();

export const preloadedMainStyles = (tagFn = () => {}) =>
  mainCSS.map(src => tagFn({ as: 'script', href: src, src: src })).join('\n\t');

export const preloadedMainScripts = (tagFn = () => {}) =>
  mainBundles
    .map(bundleName => {
      const assetName = get(appClientAssets, `[${bundleName}].js`);

      return tagFn({ as: 'script', href: assetName, src: assetName });
    })
    .join('\n\t');
