import test from 'ava'
import sinon from 'sinon'

import createStore from '@/createStore'
import { ROOT_KEY } from '@/constants'

let store

test.beforeEach(() => {
  store = createStore({
    state: {
      a: false,
      b: NaN,
    },
  })
})

test('changes ref value if it is not the same as old value', t => {
  const state = store.getState()

  store.set(`${ROOT_KEY}/a`, true)

  t.is(state.a, true)
})

test('notifies listeners', t => {
  const handler = sinon.spy()
  const key = `${ROOT_KEY}/a`

  store.subscribe(handler, new Set([key]))
  store.set(key, true)

  t.true(handler.called)
})

// eslint-disable-next-line max-len
test('doesn`t notifies listeners if new value it is the same as old value', t => {
  const handlerA = sinon.spy()
  const handlerB = sinon.spy()
  const keyA = `${ROOT_KEY}/a`
  const keyB = `${ROOT_KEY}/b`

  store.subscribe(handlerA, new Set([keyA]))
  store.subscribe(handlerB, new Set([keyB]))
  store.set(keyA, false)

  t.false(handlerA.called)

  store.set(keyB, NaN)
  t.false(handlerB.called)
})

test('observes new value if it is an object', t => {
  const state = store.getState()

  store.set(`${ROOT_KEY}/a`, { c: false })

  const descriptor = Object.getOwnPropertyDescriptor(state.a, 'c')

  t.true(descriptor.get instanceof Function)
  t.true(descriptor.set instanceof Function)
})
