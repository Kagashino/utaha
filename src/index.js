import * as util from './util'
import * as dom from './dom'
import * as array from './array'
import * as string from './string'
import * as date from './date'

export const utaha = Object.assign({
  ...array,
  ...string,
  ...util,
  ...date
}, util.isBrowser() ? dom : {})

if (util.isBrowser()) {
  global.utaha = utaha
}

export default utaha
