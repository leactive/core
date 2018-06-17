/* @flow */
import type { Listener, Subscription } from './utilityTypes'

export type Store<State: {}> = {
  // eslint-disable-next-line flowtype/no-weak-types
  set(key: string, newValue: any): void,

  // eslint-disable-next-line flowtype/no-weak-types
  get(key: string): any,

  getState(): State,

  replaceState(nextState: State): void,

  notifyListeners(dependency: string): void,

  recordDependencies(recorder: () => void): Set<string>,

  subscribe(listener: Listener<State>, dependencies: Set<string>): Subscription,
}
