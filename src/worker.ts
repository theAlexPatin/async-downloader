import download from './download'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any

// eslint-disable-next-line @typescript-eslint/no-misused-promises
ctx.addEventListener('message', async ({ data: url }): Promise<void> => {
  try {
    const result = await download(url, (progress: number) => {
      ctx.postMessage({
        type: 'progress',
        progress,
      })
    })
    ctx.postMessage({
      type: 'result',
      result,
    })
  } catch (error) {
    if (!(error instanceof Error)) return
    ctx.postMessage({
      type: 'error',
      message: error.message,
    })
  }
})
