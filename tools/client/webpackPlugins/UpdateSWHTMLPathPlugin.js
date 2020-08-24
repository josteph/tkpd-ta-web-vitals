const fs = require('fs');
const path = require('path');

export default class UpdateSWHTMLPathPlugin {
  apply(compiler) {
    compiler.plugin('done', () => {
      const { outputPath } = compiler;

      try {
        const swFile = fs.readdirSync(outputPath).find(v => v === 'service-worker.js');

        console.log('[UpdateSWHTMLPathPlugin]', { outputPath, swFile });

        const swPath = path.join(outputPath, swFile);
        const swContent = fs.readFileSync(swPath, 'utf-8');
        let temp = swContent;

        temp = temp.replace('/index.html', '/index.client.html');

        fs.writeFileSync(swPath, temp);
      } catch (err) {
        console.log(
          '[UpdateSWHTMLPathPlugin] Error when trying to replace final path for HTML service worker path',
          err,
          '\n',
          err.stack,
        );
        console.error(
          `[UpdateSWHTMLPathPlugin] Error when trying to replace final path for HTML service worker path ${err}\n${err.stack}`,
        );
      }
    });
  }
}
