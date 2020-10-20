import { Config } from './index'

const config: Config = {
  port: 80,
  secret: 'c84f0949-b329-45e9-9138-e1a41fc82c51',
  api: {
    url: 'https://mysecurity.eufylife.com/api/v1',
    username: process.env.API_USERNAME || '',
    password: process.env.API_PASSWORD || ''
  }
}

export default config
