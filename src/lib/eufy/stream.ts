import axios from 'axios'

import config from '../../config'
import * as T from '../types'

import { getToken } from './token'

export const startStream = async (streamRequest: T.StreamRequestType): T.R<T.StreamUrl> => {
  const authToken = await getToken()

  const requestOptions = {
    headers: {
      'x-auth-token': authToken
    }
  }

  const deviceInfo = await T.wrapAxios<T.ApiResponse<T.StreamUrl>>(axios.post(`${config.api.url}/web/equipment/start_stream`, streamRequest, requestOptions))

  if (T.isAxiosError(deviceInfo)) {
    return deviceInfo
  }

  return deviceInfo.data.data
}

export const stopStream = async (streamRequest: T.StreamRequestType): T.R<T.ApiResponse<string | undefined>> => {
  const authToken = await getToken()

  const requestOptions = {
    headers: {
      'x-auth-token': authToken
    }
  }

  const deviceInfo = await T.wrapAxios<T.ApiResponse<string | undefined>>(axios.post(`${config.api.url}/web/equipment/stop_stream`, streamRequest, requestOptions))

  if (T.isAxiosError(deviceInfo)) {
    return deviceInfo
  }

  return deviceInfo.data
}
