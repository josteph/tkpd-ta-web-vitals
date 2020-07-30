import loadable from '@loadable/component';

const errorLoading = err => console.log('PDP page loading failed!', err);

const PDPComponent = loadable(() =>
  import(/* webpackChunkName: "pdp" */ './components').catch(errorLoading),
);

export default PDPComponent;
