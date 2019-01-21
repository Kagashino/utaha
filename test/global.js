import getType from 'jest-get-type'
import utaha from '../src/index'

/**
 * 测试全局声明/全局覆盖声明；
 */
describe ( '[[global]]: no-conflict declaration', ()=>{
  test ('no conflict declare', ()=>{
    global.isUndef = 'not a function'
    utaha.declareAll()
    expect(isUndef).toBe('not a function')
  })

  test ('conflict declare',()=>{
    global.isUndef = 'this will be overwritten'
    utaha.declareAll({ noConflict : false })
    expect(isUndef).not.toBe('this will be overwritten')
    expect(getType(isUndef)).toBe('function')
  })

})

/**
 * 测试Array,String,Date拓展和覆盖拓展；
 */
describe ( '[[global]]: extend native Object', ()=>{
  test ('all no-conflict extend',()=>{
    Array.prototype.includeItem = 'not a function'
    utaha.declareAll({
      noConflict : true,
      extendNative : true

    })
    expect(Array.prototype.includeItem).toBe('not a function')
  })

  test ('all override extend', ()=>{
    Array.prototype.includeItem = 'not a function';
    utaha.declareAll({
      noConflict : false,
      extendNative : true
    })
    expect(Array.prototype.includeItem).toBe(utaha.includeItem)

  })

})
