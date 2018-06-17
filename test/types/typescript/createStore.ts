/* @flow */
import { Store, createStore } from 'package'

import { State, initialState } from './initials'

let store: Store<State> = createStore({ state: initialState })

export {
  initialState,
  store,
}
