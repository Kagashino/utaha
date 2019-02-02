import * as util from './util';
import * as dom from './dom';
import * as array from './array';
import * as string from './string';
import * as date from './date';

/**
 * KSMGOK_UTH
 */
export const utaha = Object.assign({
  ...array,
  ...string,
  ...util,
  ...date
},util.isBrowser()?dom:{})

export default utaha;
