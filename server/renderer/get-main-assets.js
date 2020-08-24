import get from 'lodash/get';
import getClientAssets from './get-client-assets';

const mainCSS = ['client'];
const mainBundles = ['client', 'vendor~client'];

const appClientAssets = getClientAssets();

export const preloadedMainStyles = (tagFn = () => {}) =>
  mainCSS.map(src => {
    const assetName = get(appClientAssets, `[${src}].css`);

    return tagFn({ as: 'script', href: assetName, src: assetName });
  }).join('\n\t');

export const preloadedMainScripts = (tagFn = () => {}) =>
  mainBundles
    .map(bundleName => {
      const assetName = get(appClientAssets, `[${bundleName}].js`);

      return tagFn({ as: 'script', href: assetName, src: assetName });
    })
    .join('\n\t');
