/* @flow */

import { isFunc, isPlainObject } from './utils'
import { WILDCARD, ROOT_KEY } from './constants'
import composeMiddlewares from './composeMiddlewares'

import type { Store, Options, Listener, Subscribers, Subscription } from './'

const _defineProperty = Object.defineProperty
const defaultDependencies = new Set()

defaultDependencies.add(WILDCARD)

function createStore<State: {}>({
  state: initialState,
  middlewares = [],
}: Options<State>) {
  if (!isPlainObject(initialState)) {
    throw new TypeError(
      // eslint-disable-next-line max-len
      `[@leactive/core]: options.state should be a plain object, you passed: ${typeof initialState}`,
    )
  }

  if (!Array.isArray(middlewares)) {
    throw new TypeError(
      // eslint-disable-next-line max-len
      `[@leactive/core]: options.middlewares should be an array, you passed: ${typeof middlewares}`,
    )
  }

  let state: State
  let isRecording: boolean = false
  let recordedDependencies: Set<string> = new Set()

  const globalListeners = new Set()
  const $state = Object.create(null)
  // eslint-disable-next-line flowtype/no-weak-types
  const subscribers: Subscribers<State> = (Object.create(null): Object)
  const store: Store<State> = {
    set: setter,
    get,
    getState,
    subscribe,
    replaceState,
    notifyListeners,
    recordDependencies,
  }
  const rootMiddleware = composeMiddlewares(middlewares)
  const middlewaresChain = rootMiddleware(store)

  subscribers[WILDCARD] = globalListeners

  replaceState(initialState)

  function get(key: string): mixed {
    return $state[key]
  }

  function setter(key: string, value: mixed) {
    const prevValue = $state[key]
    const nextValue = middlewaresChain({ key, value })
    // eslint-disable-next-line no-self-compare
    if (
      nextValue === prevValue ||
      (nextValue !== nextValue && prevValue !== prevValue)
    ) {
      return
    }

    if (isPlainObject(nextValue)) {
      observeState(nextValue, key)
    }

    $state[key] = nextValue

    notifyListeners(key)
  }

  function getter(currentKey: string) {
    if (isRecording) {
      recordedDependencies.add(currentKey)
    }

    return $state[currentKey]
  }

  function getState(): State {
    return state
  }

  function replaceState(nextState: State) {
    state = middlewaresChain({ key: ROOT_KEY, value: nextState })

    observeState(state, ROOT_KEY)
    notifyListeners(ROOT_KEY)
  }

  function notifyListeners(dependency: string) {
    const listeners = subscribers[dependency]

    if (listeners) {
      listeners.forEach(listener => listener(state, dependency))
    }

    globalListeners.forEach(listener => listener(state, dependency))
  }

  function recordDependencies(recorder: () => void) {
    recordedDependencies = new Set()
    recordedDependencies.add(ROOT_KEY)
    isRecording = true
    recorder()
    isRecording = false

    return recordedDependencies
  }

  function observeState<S: {}>(statePiece: S, key: string) {
    const fields = Object.keys(statePiece)
    let idx = fields.length

    while (idx--) {
      const field = fields[idx]
      const currentKey = key + '/' + field
      const value = statePiece[field]

      $state[currentKey] = value

      _defineProperty(statePiece, field, {
        get: getter.bind(undefined, currentKey),
        set: setter.bind(undefined, currentKey),
      })

      if (isPlainObject(value)) {
        observeState(value, currentKey)
      }
    }
  }

  function subscribe(
    listener: Listener<State>,
    dependencies: Set<string> = defaultDependencies,
  ): Subscription {
    if (!isFunc(listener)) {
      throw new TypeError(
        // eslint-disable-next-line max-len
        `[@leactive/core]: Store listener should be a function, you passed: ${typeof listener}`,
      )
    }

    dependencies.forEach(dependency => {
      const listeners =
        subscribers[dependency] || (subscribers[dependency] = new Set())

      listeners.add(listener)
    })

    return {
      unsubscribe() {
        dependencies.forEach(dependency => {
          subscribers[dependency].delete(listener)
        })
      },
    }
  }

  return store
}

export default createStore
