import { Plugin } from '@nuxt/types'

import { NAME } from './constants'
import Downloader from './downloader'
import { DownloadProgressCallback } from './types'

declare module '@nuxt/types' {
  interface Context {
    $download: (
      resourceUri: string,
      onDownloadProgress?: DownloadProgressCallback
    ) => void
  }
}

const downloadPlugin: Plugin = (ctx, inject) => {
  const { workerUrl } = ctx.$config?.[NAME] || {}
  const downloader = new Downloader({ workerUrl })
  inject('download', downloader.download.bind(downloader))
}

export default downloadPlugin
