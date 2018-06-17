import test from 'ava'

import createStore from '@/createStore'

test('creates Store instance when options argument is valid', t => {
  t.notThrows(() => createStore({ state: {} }))
  t.notThrows(() => createStore({ state: {}, middlewares: [] }))
})

test('throws an error when options.state is not valid', t => {
  t.throws(() => createStore({}))
  t.throws(() => createStore({ state: false }))
})

test('throws an error when options.middlewares is not valid', t => {
  t.throws(() => createStore({ state: {}, middlewares: false }))
})
