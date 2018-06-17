/* @flow */

declare function bindActions<Actions: {}, State: {}>(
  actions: Actions,
  state: $ReadOnly<State>,
/* eslint-disable flowtype/generic-spacing */
): $ObjMap<
  Actions,
  <Rest, T>((state: State, ...rest: Rest) => T) => (...args: Rest) => T,
>
/* eslint-enable flowtype/generic-spacing */

export default bindActions
