import axios from 'axios'

import config from '../../config'
import * as T from '../types'

import { getToken } from './token'

export const getDeviceList = async (): T.R<T.DeviceInfo[]> => {
  const authToken = await getToken()

  const requestOptions = {
    headers: {
      'x-auth-token': authToken
    }
  }

  const deviceInfo = await T.wrapAxios<T.ApiResponse<T.DeviceInfo[]>>(axios.post(`${config.api.url}/app/get_devs_list`, {}, requestOptions))

  if (T.isAxiosError(deviceInfo)) {
    return deviceInfo
  }

  return deviceInfo.data.data
}
