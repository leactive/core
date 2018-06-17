/* @flow */
import { type Store } from './Store'
import { type Options } from './utilityTypes'

declare function createStore<State: {}>(options: Options<State>): Store<State>

export default createStore
