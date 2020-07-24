export default function createPreconnectTag(src) {
  return `<link rel="preconnect" href="${src}" crossorigin><link rel="dns-prefetch" href="${src}">`;
}
