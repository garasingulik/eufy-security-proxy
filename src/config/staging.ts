import { Config } from './index'

const config: Config = {
  port: 80,
  secret: '54a8736b-7608-40f4-8a49-13db1f25a74e',
  api: {
    url: 'https://mysecurity.eufylife.com/api/v1',
    username: process.env.API_USERNAME || '',
    password: process.env.API_PASSWORD || ''
  }
}

export default config
