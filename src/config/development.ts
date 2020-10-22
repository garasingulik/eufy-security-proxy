import { Config } from './index'

const config: Config = {
  port: 3006,
  secret: process.env.API_SECRET || '',
  api: {
    url: 'https://mysecurity.eufylife.com/api/v1',
    username: process.env.API_USERNAME || '',
    password: process.env.API_PASSWORD || ''
  }
}

export default config
