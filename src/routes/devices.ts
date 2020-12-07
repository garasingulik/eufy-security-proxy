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
        const batteryPercentage = d.params.find((p) => p.param_type === 1101)
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
          wifi_mac: d.wifi_mac,
          charging_days: d.charging_days,
          // Typo here is from Eufy
          charing_total: d.charing_total,
          charging_reserve: d.charging_reserve,
          charging_missing: d.charging_missing,
          battery_usage_last_week: d.battery_usage_last_week,
          battery_percentage: parseInt(batteryPercentage?.param_value || "0")
        }
      })
      return res.json(miniList)
    })
  }
}
