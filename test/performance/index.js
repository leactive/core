import createStore from '../../src/createStore'
import test from './util/test'

const initialState = {
  a: {
    b: 1,
    c: {
      d: [],
      e: {
        f: false,
      },
    },
  },
}
const store = createStore({ state: initialState })
const dependencies = store.recordDependencies(() => {
  const state = store.getState()
  // eslint-disable-next-line no-unused-vars
  const newState = {
    a: {
      b: state.a.b,
      c: {
        d: state.a.c.d,
        e: {
          f: state.a.c.e.f,
        },
      },
    },
  }
})

store.subscribe(() => {}, dependencies)

test(done => {
  const state = store.getState()

  for (let idx = 0; idx < 500000; idx++) {
    state.a.c.e.f = true
    state.a.c.e = {
      f: true,
    }
    state.a.c.d = [1, 2, 3]
    state.a.c = {
      d: [1, 2, 3],
      e: {
        f: true,
      },
    }
    state.a.b = 2
    state.a = {
      b: 2,
      c: {
        d: [1, 2, 3],
        e: {
          f: true,
        },
      },
    }
  }

  done()
})
