/* @flow */
import { type Store } from './Store'

// eslint-disable-next-line max-len
export type Listener<State> = (state: $ReadOnly<State>, dependency: string) => void

export type Subscribers<State> = {
  [key: string]: Set<Listener<State>>,
};

export type Subscription = {|
  unsubscribe: () => void,
|};

export type Mutation = {|
  key: string,
  // eslint-disable-next-line flowtype/no-weak-types
  value: any,
|};

// eslint-disable-next-line flowtype/no-weak-types
export type MiddlewareHandler = (mutation: Mutation) => any;

export type Middleware = <State: {}>(store: Store<State>) => MiddlewareHandler;

export type Options<State> = {|
  state: State,
  middlewares?: Array<Middleware>,
|};
