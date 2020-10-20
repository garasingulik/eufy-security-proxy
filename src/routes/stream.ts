import * as express from 'express'
import * as iotsReporters from 'io-ts-reporters'

import { startStream, stopStream } from '../lib/eufy'

import * as T from '../lib/types'
import { authenticationMiddleware } from './authorization'

export const StreamRoutes = {
  register: (app: express.Application) => {

    app.post('/stream/start', authenticationMiddleware, async (req, res) => {
      const data = T.parseData<T.StreamRequestType>(req.body, T.StreamRequest)
      if (T.isParseError(data)) {
        return res.status(400).json({
          errors: iotsReporters.default.report(data)
        })
      }

      // default stream protocol
      if (!data.proto) {
        data.proto = 2
      }

      const streamUrl = await startStream(data)
      if (T.isError(streamUrl)) {
        return res.status(500).json({
          message: 'Error getting stream url'
        })
      }

      return res.json(streamUrl)
    })

    app.post('/stream/stop', authenticationMiddleware, async (req, res) => {
      const data = T.parseData<T.StreamRequestType>(req.body, T.StreamRequest)
      if (T.isParseError(data)) {
        return res.status(400).json({
          errors: iotsReporters.default.report(data)
        })
      }

      // default stream protocol
      if (!data.proto) {
        data.proto = 2
      }

      const stopResult = await stopStream(data)
      if (T.isError(stopResult)) {
        return res.status(500).json({
          message: 'Error stopping stream'
        })
      }

      return res.json({
        message: 'OK'
      })
    })

  }
}
