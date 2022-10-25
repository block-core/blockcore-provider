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
      <a href="https://github.com/block-core/blockcore-provider/actions/workflows/build.yml"><img src="https://github.com/block-core/blockcore-provider/actions/workflows/build.yml/badge.svg" /></a> <a href="https://github.com/block-core/blockcore-provider/actions/workflows/release.yml"><img src="https://github.com/block-core/blockcore-provider/actions/workflows/release.yml/badge.svg" /></a>
  </p>
  <p align="center"><em>Work-in-Progress - use with caution!</em></p>
</p>

# Blockcore Web Provider

Web (Web3/Web5) Provider for Blockcore.

The provider is how apps talks to the blockchains and wallet (extension). Providers take JSON-RPC requests and return the response. This is normally done by submitting the request to an HTTP or IPC socket based server.

The provider also allows connection to be made between web site / web app and the Blockcore Wallet (browser extension).

## Setup

Install:

```sh
npm install @blockcore/provider
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and does not provide a CommonJS export. If your project uses CommonJS, you'll have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function.

## Usage

```ts
import { WebProvider } from "@blockcore/provider";

// This will perform DNS lookup and indexer queries to check online statuses:
const webProvider = await WebProvider.Create();
webProvider.setNetwork('CITY');

const block = await provider.indexer.getBlockByIndex('1');
console.log('Block:', block);

// Without any key, user can pick any account they want:
const signing1 = await provider.request({ method: "signMessage", params: [{ key: "CdnpNqSeqaXBMVnY1e13Ksijgr6FyWPM9J", message: 'Hello World!' }] });
console.log('Signing1:', signing1);

// The key can be provided if user previously performed a signing request and the web app persisted the selected key.
const signing2 = await provider.request({ method: "signMessage", params: [{ message: 'Hello World!' }] });
console.log('Signing2:', signing2);

const supply: any = await webProvider.indexer.getCirculatingSupply();
console.log('Supply:', supply);
```

Screen recording demonstrating the use of the Blockcore Web Provider:

![](doc/blockcore-provider.gif)

 ## TODO

 The interaction with the wallet is currently done through the generic `request` API, this provider will add typed methods for all the supported features within the wallet provider (in-page provider loaded by the wallet extension).

## Development

### Build

Simply run `npm run build` to build the library. Also run `npm run lint` to verify the code syntax.

### Testing

The library is using `ava` for tests. Please refer to the documentation on how to write tests:

[https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md](https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md)
