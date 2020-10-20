import axios from 'axios'

import config from '../../config'
import * as T from '../types'

let token = ''
let tokenExpiry = new Date()

export const getToken = async (): T.R<string> => {
  if (token === '' || isTokenExpired()) {
    const loginInfo = await T.wrapAxios<T.ApiResponse<T.LoginInfo>>(axios.post(`${config.api.url}/passport/login`, {
      email: config.api.username,
      password: config.api.password
    }))

    if (T.isAxiosError(loginInfo)) {
      return loginInfo
    }

    token = loginInfo.data.data.auth_token
    tokenExpiry = new Date(loginInfo.data.data.token_expires_at * 1000)
  }
  return token
}

const isTokenExpired = () => {
  return tokenExpiry < new Date()
}