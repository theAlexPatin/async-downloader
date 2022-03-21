import { Module } from '@nuxt/types'

import { DEFAULT_WORKER_URL, NAME, VERSION } from './constants'

interface Options {
  workerUrl?: string
}

const downloadModule: Module<Options> = function (moduleOptions) {
  const options = {
    workerUrl: DEFAULT_WORKER_URL,
    ...this.nuxt.options[NAME],
    ...moduleOptions,
  }

  this.addPlugin({
    src: require.resolve('./plugin'),
    fileName: 'plugin.ts',
    options,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(downloadModule as any).meta = { name: NAME, version: VERSION }

declare module '@nuxt/types' {
  interface NuxtConfig {
    [NAME]?: Partial<Options>
  } // Nuxt 2.14+
  interface Configuration {
    [NAME]?: Partial<Options>
  } // Nuxt 2.9 - 2.13
}

export default downloadModule
