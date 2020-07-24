const { execSync } = require('child_process');
const appRootDir = require('app-root-dir');

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}

/**
 * Bump semantic version (SemVer) number in VERSION according to MASKS. MASKS
 * is an array composed of three digits, e.g. [0, 1, 0]. The topmost
 * (left-most) nonzero bit of SemVer number is bumped (incremented) and the
 * lower bits are set to zeros.
 */

/**
 * Call this function directly by requiring in Node.js runtime.
 *
 * @method main
 * @param {Array} masks
 * @param {String} version
 * @return {String}
 */
function incrementVersion(masks, version) {
  if (typeof masks === 'string') {
    version = masks;
    masks = [0, 0, 0];
  }

  let bitMap = ['major', 'minor', 'patch'];
  let bumpAt = 'patch';
  let oldVer = version.match(/\d+/g);

  for (let i = 0; i < masks.length; ++i) {
    if (masks[i] === 1) {
      bumpAt = bitMap[i];
      break;
    }
  }

  let bumpIdx = bitMap.indexOf(bumpAt);
  let newVersion = [];
  for (let i = 0; i < oldVer.length; ++i) {
    if (i < bumpIdx) {
      newVersion[i] = +oldVer[i];
    } else if (i === bumpIdx) {
      newVersion[i] = +oldVer[i] + 1;
    } else {
      newVersion[i] = 0;
    }
  }

  return newVersion.join('.');
}

module.exports = {
  exec,
  incrementVersion,
};
