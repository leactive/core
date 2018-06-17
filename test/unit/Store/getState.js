import test from 'ava'

import createStore from '@/createStore'

test('returns state', t => {
  const initialState = {}
  const store = createStore({ state: initialState })

  t.is(store.getState(), initialState)
})
