import { Store } from './Store'

export type Listener<State> = (state: Readonly<State>, dependency: string) => void

export type Subscribers<State> = {
  [key: string]: Set<Listener<State>>
}

export type Subscription = {
  unsubscribe: () => void
}

export type Mutation = {
  key: string,
  value: any,
};

export type MiddlewareHandler = (mutation: Mutation) => any;

export type Middleware = <State extends {}>(store: Store<State>) => MiddlewareHandler;

export type Options<State> = {
  state: State,
  middlewares?: Array<Middleware>,
};
