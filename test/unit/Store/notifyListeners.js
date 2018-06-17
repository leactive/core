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

test('fires listeners registered for specific key', t => {
  const handlerA = sinon.spy()
  const handlerB = sinon.spy()
  const key = 'state/field/nestedField'

  store.subscribe(handlerA, new Set([key]))
  store.subscribe(handlerB, new Set([key]))
  store.notifyListeners(key)

  t.true(handlerA.called)
  t.true(handlerB.called)
})

// eslint-disable-next-line max-len
test('doesn`t fire redundant listeners registered for another key', t => {
  const handler = sinon.spy()

  store.subscribe(handler, new Set(['a']))
  store.notifyListeners('b')

  t.false(handler.called)
})

test('doesn`t fire children listeners when parent changes', t => {
  const parentHandler = sinon.spy()
  const childHandler = sinon.spy()
  const state = store.getState()

  store.subscribe(parentHandler, new Set([`${ROOT_KEY}/field`]))
  store.subscribe(childHandler, new Set([`${ROOT_KEY}/field/nestedField`]))

  state.field = {}

  t.true(parentHandler.called)
  t.false(childHandler.called)
})
