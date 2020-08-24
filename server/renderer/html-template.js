import { createLinkTag, createPreloadTag, createScriptTag, preconnectTags } from '@utils/html';
import { isProd } from '@utils';
import { normalizeCSS } from '@utils/html/critical-css';
import { preloadedMainStyles, preloadedMainScripts } from './get-main-assets';
import { hotjarScript } from './thirdparty';

export const getHeader = ({
  chunkExtractor,
  helmet = {
    base: [],
    bodyAttributes: [],
    htmlAttributes: [],
    link: [],
    meta: [],
    script: [],
    style: [],
    title: [],
  },
}) => {
  return `<!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.base.toString()}${helmet.title.toString()}
      <meta charset="UTF-8">
      <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width">
      ${isProd ? preconnectTags : ''}
      ${helmet.link.toString()}
      ${chunkExtractor?.getLinkTags({ crossorigin: 'anonymous' }) || preloadedMainScripts(createPreloadTag)}
      <link rel="manifest" href="/manifest.json">
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="description" content="My App" />
      <meta name="keywords" content="My App" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="React App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

			<style type="text/css">${normalizeCSS}</style>
			<style>
				:focus{outline:0}html{box-sizing:border-box;font-size:14px;}*,::after,::before{box-sizing:inherit}a{color:rgba(0,0,0,.7);text-decoration:none}
			</style>
      ${helmet.meta.toString()}
      ${helmet.style.toString()}
      ${helmet.script.toString()}
      ${chunkExtractor?.getStyleTags({ crossorigin: 'anonymous' }) || isProd ? preloadedMainStyles(createLinkTag) : ''}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <noscript>This website needs to enable Javascript to view.</noscript>
      <div id="root">`;
};

export const getFooter = ({ chunkExtractor, initialState = {}, ssr = false, dataClient = {} }) => {
  return `</div>
      <script type="text/javascript">
        window.ssr=${ssr};
        window.__cache=${JSON.stringify(dataClient?.cache)};
        window.ENV="${process.env.ENV}";
			</script>
			${hotjarScript}
      ${chunkExtractor?.getScriptTags({ crossorigin: 'anonymous' })?.replace(/\<script async/g, '<script defer') ||
        preloadedMainScripts(createScriptTag)}
    </body>
  </html>`;
};
