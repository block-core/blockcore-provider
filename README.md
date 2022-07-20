<p align="center">
  <p align="center">
    <img src="https://avatars3.githubusercontent.com/u/53176002?s=200&v=4" height="100" alt="Blockcore" />
  </p>
  <h3 align="center">
    Blockcore Web Provider
  </h3>
  <p align="center">
    Multi-Chain Web Provider for Blockcore
  </p>
  <p align="center">
      <a href="https://github.com/block-core/blockcore-provider/actions/workflows/test.yml"><img src="https://github.com/block-core/blockcore-provider/actions/workflows/test.yml/badge.svg" /></a>
  </p>
  <p align="center"><em>Work-in-Progress - use with caution!</em></p>
</p>

# Blockcore Web Provider

Web (Web3/Web5) Provider for Blockcore.

The provider is how apps talks to the blockchains. Providers take JSON-RPC requests and return the response. This is normally done by submitting the request to an HTTP or IPC socket based server.

The provider also allows connection to be made between web site / web app and the Blockcore Wallet (browser extension).

## Setup

Install:

```sh
npm install @blockcore/provider
```

Example:

```js
var provider = require("@blockcore/provider");
var api = new provider.Provider();

api.getCirculatingSupply().then(function (data) {
    console.log(data);
});
```

## Example

Screen recording demonstrating the use of the Blockcore Web3 Provider:

![](doc/blockcore-provider.gif)

## Interactive editor

You can start testing the provider using this ready made Stackblitz:

https://stackblitz.com/edit/angular-ivy-a6yead?file=src/app/app.component.ts

