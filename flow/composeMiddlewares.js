/* @flow */
import type { Middleware } from './'

declare function composeMiddlewares(
  middlewares: Array<Middleware>,
): Middleware;

export default composeMiddlewares
