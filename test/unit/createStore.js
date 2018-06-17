import test from 'ava'

import createStore from '@/createStore'

test('creates store with passed state', t => {
  const initialState = {}
  const store = createStore({ state: initialState })

  t.is(store.getState(), initialState)
})

test('throws error when options don\'t include state', t => {
  t.throws(() => {
    createStore()
  })
})
