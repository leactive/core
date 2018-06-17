import test from 'ava'
import sinon from 'sinon'

import composeMiddlewares from '@/composeMiddlewares'

test('works with no middleware provided', t => {
  const rootMiddleware = composeMiddlewares([])
  const middlewaresChain = rootMiddleware(null)
  const expected = {}
  const mutation = { value: expected, key: 'key' }
  const result = middlewaresChain(mutation)

  t.deepEqual(result, expected)
})

test('middlewares chain fires each middleware handler with mutation', t => {
  const handlerA = sinon.spy()
  const handlerB = sinon.spy()
  const middlewareA = () => handlerA
  const middlewareB = () => handlerB
  const fakeStore = null
  const mutation = { key: 'state', value: false }
  const rootMiddleware = composeMiddlewares([middlewareA, middlewareB])
  const middlewaresChain = rootMiddleware(fakeStore)

  middlewaresChain(mutation)

  t.true(handlerA.calledWithMatch(mutation))
  t.true(handlerB.calledWithMatch(mutation))
})

test('returns what middleware handler returns', t => {
  const middlewareHandler = ({ value }) => value + 1
  const middleware = () => middlewareHandler
  const fakeStore = null

  const oneMiddleware = composeMiddlewares([middleware])
  const twoMiddlewares = composeMiddlewares([middleware, middleware])

  const firstValue = oneMiddleware(fakeStore)({ value: 0 })
  const secondValue = twoMiddlewares(fakeStore)({ value: 0 })

  t.is(firstValue, 1)
  t.is(secondValue, 2)
})
