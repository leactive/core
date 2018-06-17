/* @flow */
import { bindActions } from 'package'

import { store } from './Store'
import { type State } from './initials'

const actionA = (state: State, a: number, b: string) => {
  state.number = a
  state.string = b
}

const actionB = (state: State, a: number, b: string, c: boolean) => {
  state.number = a
  state.string = b
  state.boolean = c
}

const bindedActions = bindActions({
  actionA,
  actionB,
}, store.getState())

bindedActions.actionA(1, '')
bindedActions.actionB(1, '', false)

export { bindedActions }
