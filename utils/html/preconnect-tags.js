import createPreconnectTag from './create-preconnect-tag';

const preconnectSources = [
  'https://res.cloudinary.com',
];

const preconnectTags = preconnectSources.map(createPreconnectTag).join('\n');

export default preconnectTags;
