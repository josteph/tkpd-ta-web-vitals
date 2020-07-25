export default function createScriptTag({ src }) {
  return `<link rel="stylesheet" media="screen" href="${src}" crossorigin="anonymous" />`;
}
