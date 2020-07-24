import loadable from '@loadable/component';

const errorLoading = err => console.log('Home page loading failed!', err);

const HomeComponent = loadable(() =>
  import(/* webpackChunkName: "home" */ '@routes/Home/components').catch(errorLoading),
);

export default HomeComponent;
