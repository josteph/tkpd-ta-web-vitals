import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';

let resultCache;

export default function getClientAssets() {
  const baseDir = `./build`;

  // Return the assets json cache if it exists.
  // In development mode we always read the assets json file from disk to avoid
  // any cases where an older version gets cached.
  if (process.env.NODE_ENV !== 'development' && resultCache) {
    return resultCache;
  }

  const assetsPath = path.resolve(appRootDir.get(), baseDir, './assets.json');

  if (!fs.existsSync(assetsPath)) {
    throw new Error(
      `We could not find the "${assetsPath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`,
    );
  }

  const readAssetsFile = () => JSON.parse(fs.readFileSync(assetsPath, 'utf8'));
  const assetsJson = readAssetsFile();

  if (typeof assetsJson === 'undefined') {
    throw new Error('No asset data found for client bundle.');
  }

  resultCache = assetsJson;

  return resultCache;
}
