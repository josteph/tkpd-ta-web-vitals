export default function createPreloadTag({ as, href }) {
  if (href) {
    return `<link rel="preload" as="${as}" crossorigin="anonymous" href="${href}">`;
  }

  return '';
}
