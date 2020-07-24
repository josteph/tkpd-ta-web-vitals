# Ejected React App

![React App](https://i.imgur.com/ghC9fIF.png)

A customized SSR boilerplate in inspired from CRA structure, but using React v16.9.0.

## Features

- [x] Hybrid Rendering - SSR with fallback to CSR
- [x] Multiple Environments
- [x] Unit Testing (with Jest)
- [x] Bundle Analyzer
- [x] Custom Babel configuration
- [x] Husky & Lint-Staged
- [x] Code-splitting
- [x] PWA ready

## Setup

```sh
yarn setup
```

## Scripts

| `yarn <script>`  | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `dev:client`     | To start develop the app client, integrated with hot reload.    |
| `dev:server`     | To start develop the SSR, integrated with hot reload.           |
| `build:client`   | To build the app client. Can be used for static hosting.        |
| `build:server`   | To build the server app, as entrypoint for Node environment.    |
| `build`          | To build and minify the app. App will use `prod` API.           |
| `build:static`   | Build client side only for static deployment purpose.           |
| `build-staging`  | To build and minify the app. App will use `staging` API.        |
| `setup`          | To setup the initial app dependencies & env                     |
| `analyze:client` | To analyze the app bundle sizes. Will open in `127.0.0.1:8888`. |
| `client:test`    | To test the app client with testing library react.              |

---
