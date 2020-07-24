import serialize from 'serialize-javascript';
import config from '@config';
import { createLinkTag, createPreloadTag, createScriptTag, preconnectTags } from '@utils/html';
import { ifProd } from '@utils';
import { normalizeCSS } from '@utils/html/critical-css';
import { preloadedMainStyles, preloadedMainScripts } from './get-main-assets';

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
      ${ifProd(preconnectTags, '')}
      ${helmet.link.toString()}
      ${chunkExtractor?.getLinkTags({ crossorigin: 'anonymous' }) || preloadedMainScripts(createPreloadTag)}
      <link rel="manifest" href="/manifest.json">
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="description" content="My App" />
      <meta name="keywords" content="My App" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="My App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#23246c" />
      <style type="text/css">${normalizeCSS}</style>
      ${helmet.meta.toString()}
      ${helmet.style.toString()}
      ${helmet.script.toString()}
      ${chunkExtractor?.getStyleTags({ crossorigin: 'anonymous' }) || ifProd(preloadedMainStyles(createLinkTag), '')}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <noscript>This website needs to enable Javascript to view.</noscript>
      <div id="root">`;
};

export const getFooter = ({ chunkExtractor, initialState = {}, ssr = false }) => {
  return `</div>
      <script type="text/javascript">
        window.__INITIAL_STATE__=${serialize(initialState)};
        window.ssr=${ssr};
        window.ENV="${config.get('ENV')}";
      </script>
      ${chunkExtractor?.getScriptTags({ crossorigin: 'anonymous' })?.replace(/\<script async/g, '<script defer') ||
        preloadedMainScripts(createScriptTag)}
    </body>
  </html>`;
};
