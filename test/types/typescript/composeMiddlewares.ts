import { Mutation, createStore, composeMiddlewares } from 'package'

import { middleware } from './initials'

const state = {
  a: 1,
}

const store = createStore({ state })
const rootMiddleware = composeMiddlewares([ middleware ])
const middlewaresChain = rootMiddleware(store)
const meta: Mutation = {
  key: 'state',
  value: false,
}

middlewaresChain(meta)
