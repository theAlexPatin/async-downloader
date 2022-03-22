# worker-download [![](https://badge.fury.io/js/worker-download.svg)](https://npmjs.org/package/worker-download) [![](https://www.travis-ci.com/theAlexPatin/worker-download?branch=main)](https://travis-ci.com/theAlexPatin/worker-download)

A lightweight webworker-based download utility for asynchronously loading content in web applications

## Installing

Using npm:

```bash
$ npm install worker-download
```

Using bower:

```bash
$ bower install worker-download
```

Using yarn:

```bash
$ yarn add worker-download
```

## Usage

```javascript
import Downloader from 'worker-download'

const downloader = new Downloader()

const blobUri = await downloader.download('https://via.placeholder.com/150')
```

```html
<img src="{{blobUri}}" />
```

## Options

```javascript
new Downloader({
  returnType: 'blob | uri',
  workerUri: '/scripts/download.worker.js',
})
```

| Option           | Description                                                                | Default                                                                   |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`returnType`** | The desired return-type for the file being downloaded (`blob` or `uri`)    | `uri`                                                                     |
| **`workerUrl`**  | The path to the web worker script (modify if you want to use your own CDN) | `https://cdn.jsdelivr.net/npm/worker-download/workers/download.worker.js` |
