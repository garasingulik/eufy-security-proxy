import test from 'ava'

import * as T from '../../../src/lib/types'
import { getDeviceList, startStream, stopStream } from '../../../src/lib/eufy'

test('Should pass all stream testing', async (t) => {
  const deviceList = await getDeviceList()
  if (T.isError(deviceList)) {
    return t.fail('Error when getting device list')
  }

  const firstDevice = deviceList[0]
  const streamRequest = {
    device_sn: firstDevice.device_sn,
    proto: 2,
    station_sn: firstDevice.station_sn
  }

  const streamUrl = await startStream(streamRequest)
  if (T.isError(streamUrl) || !streamUrl || !streamUrl.url) {
    return t.fail('Error when getting stream url')
  }
  console.log(`Stream URL for device ${firstDevice.device_id}: ${streamUrl.url}`)

  const stopResponse = await stopStream(streamRequest)
  if (T.isError(stopResponse)) {
    return t.fail('Error when stopping stream')
  }
  console.log(`Stopping stream for ${firstDevice.device_id}: ${stopResponse.msg}`)

  t.pass()
})
