/* @flow */
import { type Subscription } from 'package'

import { type State, initialState } from './initials'
import { store } from './createStore'

store.get('key')
store.set('key', true)
store.notifyListeners('state')
store.replaceState(initialState)

const state: State = store.getState()
const dependencies: Set<string> = store.recordDependencies(() => {})
const subscription: Subscription = store.subscribe(
  (state: $ReadOnly<State>) => {
    state.number === 1
  },
  dependencies,
)

subscription.unsubscribe()

export { store, state }
