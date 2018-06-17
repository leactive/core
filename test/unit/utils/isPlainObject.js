import test from 'ava'

import { isPlainObject } from '@/utils'
import dataTypes from '_helpers/dataTypes'

const { object, ...rest } = dataTypes
const invalidTypes = Object.values(rest)

test('returns `true` for Object', t => {
  t.true(isPlainObject(object), true)
})

test('returns `false` for invalid types', t => {
  invalidTypes.forEach(type => {
    t.false(isPlainObject(type), false)
  })
})
