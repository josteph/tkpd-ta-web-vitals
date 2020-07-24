export default function createScript(script = {}) {
  const { id, src, callback, async = true, defer = false } = script;
  const ref = document.getElementsByTagName('script')[0];
  const el = document.createElement('script');

  el.id = id;
  el.src = src;
  el.async = async;
  el.defer = defer;
  ref.parentNode.insertBefore(el, ref);

  if (callback && typeof callback === 'function') {
    el.onload = callback;
  }

  return script;
}
