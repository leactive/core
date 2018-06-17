type Actions<State> = {
  [key: string]: (state: State, ...args: Array<any>) => void,
}

declare function bindActions<State extends {}>(
  actions: Actions<State>,
  bindTo: State,
): {
  [key in keyof Actions<State>]: (...args: Array<any>) => void
}

export default bindActions
