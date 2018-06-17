import { Store, Mutation, Middleware } from 'package'

export const middleware: Middleware = <State extends {}>(store: Store<State>) => {
  return ({ key, value }: Mutation) => {
    // eslint-disable-next-line no-console
    console.log(key, store)

    return value
  }
}

export const initialState = {
  number: 1,
  string: 'string',
  boolean: true,
  array: [],
  object: {},
}

export type State = typeof initialState
