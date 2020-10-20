import test from 'ava'

import * as T from '../../src/lib/types'

test('Should return OK', async (t) => {
  t.is(T.echo(), 'OK')
})
