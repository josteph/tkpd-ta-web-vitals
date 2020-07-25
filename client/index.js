import './polyfills/promise';
import { registerServiceWorker } from './serviceWorker';

try {
  (async () => {
    await import(/* webpackMode: "eager" */ './bootstrap.js');
  })();
} catch (error) {
  console.log('Client Starting Error:', error.toString());
  console.log(error.stack);
} finally {
  registerServiceWorker();
}
