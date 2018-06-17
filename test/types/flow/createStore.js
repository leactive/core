/* @flow */
import { type Store, createStore } from 'package'

import { type State, initialState } from './initials'

let store: Store<State> = createStore({ state: initialState })

export {
  initialState,
  store,
}
