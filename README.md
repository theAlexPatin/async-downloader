# async-downloader [![](https://badge.fury.io/js/async-downloader.svg)](https://npmjs.org/package/async-downloader) [![](https://www.travis-ci.com/theAlexPatin/async-downloader?branch=main)](https://travis-ci.com/theAlexPatin/async-downloader)

A lightweight webworker-based download utility for asynchronously loading content in web applications

## Installing

Using npm:

```bash
$ npm install async-downloader
```

Using bower:

```bash
$ bower install async-downloader
```

Using yarn:

```bash
$ yarn add async-downloader
```

## Usage

```javascript
import Downloader from 'async-downloader'

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

| Option           | Description                                                                | Default                                                                    |
| ---------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **`returnType`** | The desired return-type for the file being downloaded (`blob` or `uri`)    | `uri`                                                                      |
| **`workerUrl`**  | The path to the web worker script (modify if you want to use your own CDN) | `https://cdn.jsdelivr.net/npm/async-downloader/workers/download.worker.js` |
