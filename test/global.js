import getType from 'jest-get-type'
import utaha from '../src/index'

/**
 * 测试浏览器环境下的utaha；
 */
describe ( '[[global]]: no-conflict declaration', ()=>{

  test ('whether the dom methods imported in jsdom-env', ()=>{
    expect( getType(utaha.removeNode) ).toBe('function')
    expect( getType(utaha.addClass) ).toBe('function')
    expect( getType(utaha.removeClass) ).toBe('function')
  })

})
