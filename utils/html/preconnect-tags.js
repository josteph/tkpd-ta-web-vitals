import createPreconnectTag from './create-preconnect-tag';

const preconnectSources = [
  'https://googleads.g.doubleclick.net',
  'https://www.google-analytics.com',
  'https://www.googleadservices.com',
  'https://www.googletagmanager.com',
  'https://connect.facebook.net',
];

const preconnectTags = preconnectSources.map(createPreconnectTag).join('\n');

export default preconnectTags;
