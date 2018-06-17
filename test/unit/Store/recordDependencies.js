import test from 'ava'
import sinon from 'sinon'

import createStore from '@/createStore'
import { ROOT_KEY } from '@/constants'

let store

test.beforeEach(() => {
  store = createStore({
    state: {
      a: false,
      b: {
        c: 1,
        d: {
          e: [],
        },
      },
    },
  })
})

test('returns set with ROOT_DEPENDENCY if no dependencies recorded', t => {
  const expected = new Set([ROOT_KEY])
  const recorded = store.recordDependencies(sinon.spy())

  t.deepEqual(recorded, expected)
})

test('each time returns another Set', t => {
  const firstResult = store.recordDependencies(sinon.spy())
  const secondResult = store.recordDependencies(sinon.spy())

  t.not(firstResult, secondResult)
})

test('correctly records dependencies', t => {
  const state = store.getState()
  const recorded = store.recordDependencies(() => ({
    a: state.a,
    b: {
      c: state.b.c,
      d: {
        e: state.b.d.e,
      },
    },
  }))
  const expected = new Set([
    ROOT_KEY,
    `${ROOT_KEY}/a`,
    `${ROOT_KEY}/b`,
    `${ROOT_KEY}/b/c`,
    `${ROOT_KEY}/b/d`,
    `${ROOT_KEY}/b/d/e`,
  ])

  t.deepEqual(recorded, expected)
})
