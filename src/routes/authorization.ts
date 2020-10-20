import * as express from 'express'

import config from '../config'

// Simple authentication middleware for express
export function authenticationMiddleware (req: express.Request, res: express.Response, next: express.NextFunction) {
  // No authorization on development
  if (!config.secret) {
    return next()
  }

  const authorization = req.get('authorization')

  if (!authorization) {
    return res.sendStatus(401)
  }

  const b = authorization.match(/Bearer (.+)/)

  if (!b) {
    return res.sendStatus(401)
  }

  // Validate the secret
  if (b[1] !== config.secret) {
    return res.sendStatus(401)
  }

  return next()
}
