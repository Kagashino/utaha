import * as util from './util';
import * as dom from './dom';
import * as array from './array';
import * as string from './string';
import * as date from './date';

/**
 * KSMGOK_UTH
 * @type {Object}
 */
const utaha = Object.create({
  /**
   * 将所有方法声明到全局变量中
   * @param {Object} option
   * noConflict : 全局对象中声明过的不再声明
   */
  declareAll (option = {}) {
    let _global = this.isBrowser() ? window : global;
    let _option = Object.assign({ noConflict : true, extendNative: false }, option)
    let noConflict = _option.noConflict;
    let extendTo = _option.extendNative ?
      ( util.isArray(_option.extendNative)? _option.extendNative:[Array,String,Date] ) : [];

    for (let i of Object.keys(this)) {
      if ( (noConflict && this.isUndef( _global[i])) || !noConflict ) {
        _global[i] = this[i];
      }

      if ( this[i]._canExtendTo && extendTo.indexOf(this[i]._canExtendTo) !== -1 && !noConflict ) {
        this[i]._canExtendTo.prototype[i] = this[i];
      }
    }
    return this;
  }
});

Object.assign(utaha, {
  ...array,
  ...string,
  ...util,
  ...date
},util.isBrowser()?dom:{})

export default utaha;
