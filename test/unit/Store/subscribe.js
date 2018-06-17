import test from 'ava'
import sinon from 'sinon'

import createStore from '@/createStore'
import { ROOT_KEY } from '@/constants'

let store
const getInitialState = () => ({
  field: {
    nestedField: false,
  },
})

test.beforeEach(() => {
  store = createStore({ state: getInitialState() })
})

test('throws an error when argument is not a function', t => {
  t.throws(() => store.subscribe('not a function'))
})

test('subscribes listener for each recorded dependency', t => {
  const handler = sinon.spy()
  const state = store.getState()
  const dependencies = new Set([
    `${ROOT_KEY}/field`,
    `${ROOT_KEY}/field/nestedField`,
  ])

  store.subscribe(handler, dependencies)

  state.field.nestedField = true
  t.true(handler.calledOnce)

  state.field = {}
  t.true(handler.calledTwice)
})

test('returns subscription with one `unsubscribe` method', t => {
  const subscription = store.subscribe(sinon.stub(), new Set())

  t.is(Object.keys(subscription).length, 1)
  t.true(subscription.unsubscribe instanceof Function)
})

test('subscription.unsubscribe unsubscribes from subscribed listeners', t => {
  const handler = sinon.spy()
  const state = store.getState()
  const subscription = store.subscribe(handler, new Set(['/field']))

  subscription.unsubscribe()
  state.field = {}

  t.false(handler.called)
})
