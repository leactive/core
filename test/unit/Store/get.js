import test from 'ava'

import createStore from '@/createStore'
import { ROOT_KEY } from '@/constants'

test('returns correct value', t => {
  const store = createStore({
    state: {
      field: false,
    },
  })
  const state = store.getState()

  t.true(store.get(`${ROOT_KEY}/field`) === state.field)
})
