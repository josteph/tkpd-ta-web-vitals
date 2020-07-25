import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './App';
import './styles/index.scss';

const rootElement = document.getElementById('root');

const bootstrap = window.ssr ? hydrate : render;

loadableReady(() => {
  bootstrap(<App />, rootElement);
});
