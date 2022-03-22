import { DownloadProgressCallback } from './types'

const PROGRESS_INTERVAL = 100 // 0.1 seconds

const download = async (
  resourceUri: string,
  onDownloadProgress: DownloadProgressCallback
): Promise<Blob> =>
  await new Promise((resolve, reject) => {
    let time = new Date().getTime()

    const req = new XMLHttpRequest()

    req.open('GET', resourceUri, true)
    req.responseType = 'blob'

    req.addEventListener('progress', ({ lengthComputable, loaded, total }) => {
      if (new Date().getTime() < time + PROGRESS_INTERVAL || !lengthComputable)
        return
      onDownloadProgress(Math.floor((loaded / total) * 100))
      time = new Date().getTime()
    })

    req.onload = () => {
      if (req.readyState !== 4 || req.status !== 200)
        return reject(new Error('Download failed'))
      return resolve(req.response)
    }

    req.send()
  })

export default download
