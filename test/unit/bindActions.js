import test from 'ava'

import createStore from '@/createStore'
import bindActions from '@/bindActions'

let store
const actions = {
  increase: (state, count) => state.count += count,
  decrease: (state, count) => state.count -= count,
}

test.beforeEach(() => {
  store = createStore({ state: {} })
})

test('should return the same set of actions', t => {
  const bindedActions = bindActions(actions, store.getState())

  t.deepEqual(
    Object.keys(actions).sort(),
    Object.keys(bindedActions).sort(),
  )
})

test('binded actions should receive state as first argument', t => {
  const bindedActions = bindActions({
    action(state) {
      t.is(state, store.getState())
    }
  }, store.getState())

  bindedActions.action()
})

test('binded actions should receive payload arguments', t => {
  const args = [1, 'string', true]
  const bindedActions = bindActions({
    action(state, ...rest) {
      t.deepEqual(rest, args)
    }
  }, store.getState())

  bindedActions.action(...args)
})
