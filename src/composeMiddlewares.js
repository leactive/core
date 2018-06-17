/* @flow */
import type { Store, Mutation, Middleware } from './'

function composeMiddlewares(
  // eslint-disable-next-line flowtype/no-weak-types
  middlewares: Array<Middleware>,
): Middleware {
  return <State: {}>(store: Store<State>) => {
    const middlewareHandlers = middlewares.map(middleware => middleware(store))

    return (mutation: Mutation) => {
      let idx = 0

      while (idx < middlewares.length) {
        mutation.value = middlewareHandlers[idx](mutation)
        idx++
      }

      return mutation.value
    }
  }
}

export default composeMiddlewares
