import { DEFAULT_WORKER_URL } from './constants'
import download from './download'
import { DownloadProgressCallback } from './types'
import { WorkerMessage } from './worker'

interface DownloaderOptions {
  workerUrl?: string
}

class Downloader {
  private readonly workerUrl: string
  private readonly hasWorker: boolean

  constructor({ workerUrl }: DownloaderOptions = {}) {
    this.workerUrl = workerUrl ?? DEFAULT_WORKER_URL
    this.hasWorker = this.checkWorkerAvailability()
  }

  async download(
    resourceUri: string,
    onDownloadProgress: DownloadProgressCallback = (progress: number) => null
  ): Promise<string> {
    if (!this.hasWorker) return await download(resourceUri, onDownloadProgress)
    return await new Promise((resolve, reject) => {
      const worker = new Worker(this.workerUrl)
      worker.addEventListener(
        'message',
        ({ data: { blobUri, message, progress, type } }: WorkerMessage) => {
          switch (type) {
            case 'error':
              return reject(new Error(message))
            case 'progress':
              return onDownloadProgress(progress as number)
            case 'result':
              return resolve(blobUri as string)
          }
        }
      )
      worker.postMessage(resourceUri)
    })
  }

  private checkWorkerAvailability(): boolean {
    if (!window || !window.Worker || !document) return false

    const scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === this.workerUrl) return true
    }
    return false
  }
}

export default Downloader
