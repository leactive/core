import test from 'ava'
import sinon from 'sinon'

import createStore from '@/createStore'

let store

test.beforeEach(() => {
  const initialState = {}

  store = createStore({ state: initialState })
})

test('properly replaces state', t => {
  const newState = {}

  store.replaceState(newState)

  t.is(store.getState(), newState)
})

test('observes state', t => {
  const field = 'a'
  const nextState = { [field]: 1 }

  store.replaceState(nextState)

  const descriptor = Object.getOwnPropertyDescriptor(nextState, field)

  t.true(descriptor.get instanceof Function)
})

test('notifies listeners', t => {
  const handler = sinon.spy()

  store.subscribe(handler)
  store.replaceState({})

  t.true(handler.called)
})

test('fires middlewares', t => {
  const handler = sinon.spy(mutation => mutation.value)
  const middleware = () => handler
  const store = createStore({ state: {}, middlewares: [middleware] })

  store.replaceState({})

  t.true(handler.called)
})
