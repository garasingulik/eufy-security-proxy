import test from 'ava'

import * as T from '../../../src/lib/types'
import { getToken } from '../../../src/lib/eufy'

test('Should return token', async (t) => {
  const token = await T.wrapPromise(getToken())
  if (T.isError(token)) {
    return t.fail('Error when getting token')
  }
  console.log(token)
  t.pass()
})
