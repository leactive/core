import { Store } from './Store'
import { Options } from './utilityTypes'

declare function createStore<State extends {}>(options: Options<State>): Store<State>

export default createStore
