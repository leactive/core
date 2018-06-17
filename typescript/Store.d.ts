import { Listener, Subscription } from './utilityTypes'

export interface Store<State extends {}> {
  set(key: string, newValue: any): void;

  get(key: string): any;

  getState(): State

  replaceState(nextState: State): void

  notifyListeners(dependency: string): void

  recordDependencies(recorder: () => void): Set<string>

  subscribe(listener: Listener<State>, dependencies: Set<string>): Subscription
}
