import * as express from 'express'
import { getDeviceList } from '../lib/eufy'

import * as T from '../lib/types'
import { authenticationMiddleware } from './authorization'

export const DevicesRoutes = {
  register: (app: express.Application) => {

    app.get('/devices', authenticationMiddleware, async (req, res) => {
      const data = await getDeviceList()
      if (T.isError(data)) {
        return res.status(500).json({
          message: 'Error when getting device list'
        })
      }
      const miniList: T.MiniDeviceInfo[] = data.map(d => {
        return {
          device_id: d.device_id,
          device_name: d.device_name,
          device_model: d.device_model,
          device_sn: d.device_sn,
          station_sn: d.station_sn,
          main_hw_version: d.main_hw_version,
          main_sw_version: d.main_sw_version,
          sec_hw_version: d.sec_hw_version,
          sec_sw_version: d.sec_sw_version,
          wifi_mac: d.wifi_mac
        }
      })
      return res.json(miniList)
    })
  }
}
