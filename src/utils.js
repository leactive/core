/* @flow */

function isFunc(arg: mixed): boolean %checks {
  return typeof arg === 'function'
}

function isPlainObject(arg: mixed): boolean %checks {
  return (
    /*:: typeof arg === 'object' && */
    Object.prototype.toString.call(arg) === '[object Object]'
  )
}

export { isFunc, isPlainObject }
