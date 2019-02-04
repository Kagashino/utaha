import * as util from './util'
import * as dom from './dom'
import * as array from './array'
import * as string from './string'
import * as date from './date'


const utaha = Object.assign({
  ...array,
  ...string,
  ...util,
  ...date,
  ...dom
})

export default utaha;
