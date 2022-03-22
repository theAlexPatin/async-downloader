import download from './download'
import { DownloadProgressCallback } from './types'
import { WorkerMessage } from './worker'

const PACKAGE_VERSION = '__WEBPACK_VERSION_STUB__'
const DEFAULT_WORKER_URL = `https://cdn.jsdelivr.net/npm/worker-download@${PACKAGE_VERSION}/workers/download.worker.js`

type ReturnTypeOption = 'blob' | 'uri'
type ReturnType = Blob | string

interface DownloaderOptions {
  returnType?: ReturnTypeOption
  workerUrl?: string
}

class Downloader {
  private readonly workerUrl: string
  private readonly hasWorkers: boolean
  private readonly returnType: ReturnTypeOption

  constructor({ returnType, workerUrl }: DownloaderOptions = {}) {
    this.workerUrl = workerUrl ?? DEFAULT_WORKER_URL
    this.returnType = returnType ?? 'uri'
    this.hasWorkers = this.checkWorkerAvailability()
  }

  async download(
    resourceUri: string,
    onDownloadProgress: DownloadProgressCallback = (progress: number) => null
  ): Promise<ReturnType> {
    if (!this.hasWorkers) {
      const result = await download(resourceUri, onDownloadProgress)
      return this.formatResult(result)
    }
    return await new Promise((resolve, reject) => {
      const worker = new window.Worker(this.workerUrl)
      worker.addEventListener(
        'message',
        ({ data: { message, progress, result, type } }: WorkerMessage) => {
          switch (type) {
            case 'error':
              return reject(new Error(message))
            case 'progress':
              return onDownloadProgress(progress as number)
            case 'result':
              return resolve(this.formatResult(result as Blob))
          }
        }
      )
      worker.postMessage(resourceUri)
    })
  }

  private formatResult(result: Blob): ReturnType {
    if (this.returnType === 'uri')
      return URL.createObjectURL(result)
    return result
  }

  private checkWorkerAvailability(): boolean {
    return !!window && !!window.Worker && !!document
  }
}

export default Downloader
