import 'dotenv/config'

import development from './development'
import production from './production'
import staging from './staging'

export interface Config {
  port: number,
  secret: string,
  api: {
    url: string,
    username: string,
    password: string
  }
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

function getConfig (): Config {
  switch (NODE_ENV) {
    case 'production': {
      return production
    }
    case 'staging': {
      return staging
    }
    case 'development': {
      return development
    }

    default: {
      return development
    }
  }
}

const config = getConfig()

export default config
