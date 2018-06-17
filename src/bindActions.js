/* @flow */

type Actions = {
  [key: string]: (...args: Array<mixed>) => void,
}

type BindedActions<State: {}> = {
  [key: string]: (state: State, ...args: Array<mixed>) => void,
}

function bindActions<State: {}>(
  actions: Actions,
  state: $ReadOnly<State>,
): BindedActions<State> {
  const bindedActions: BindedActions<State> = {}
  const keys = Object.keys(actions)
  let idx: number = keys.length

  while (idx--) {
    const key = keys[idx]
    const action = actions[key]

    bindedActions[key] = action.bind(undefined, state)
  }

  return bindedActions
}

export default bindActions
