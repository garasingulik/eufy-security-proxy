import test from 'ava'

import * as T from '../../../src/lib/types'
import { getDeviceList } from '../../../src/lib/eufy'

test('Should return device list', async (t) => {
  const deviceList = await T.wrapPromise(getDeviceList())
  if (T.isError(deviceList)) {
    return t.fail('Error when getting device list')
  }
  console.log(deviceList)
  t.pass()
})
