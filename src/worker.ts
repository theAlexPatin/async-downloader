import download from './download'

export interface WorkerMessage {
  data: {
    type: 'progress' | 'result' | 'error'
    progress?: number
    blobUri?: string
    message?: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
self.addEventListener('message', async ({ data: url }): Promise<void> => {
  try {
    const blobUri = await download(url, (progress: number) => {
      self.postMessage(
        {
          type: 'progress',
          progress,
        },
        '/'
      )
    })
    self.postMessage(
      {
        type: 'result',
        blobUri,
      },
      '/'
    )
  } catch (error) {
    if (!(error instanceof Error)) return
    self.postMessage(
      {
        type: 'error',
        message: error.message,
      },
      '/'
    )
  }
})
