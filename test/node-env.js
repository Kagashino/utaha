/**
 * @jest-environment node
 */
import utaha from '../src/index'

/**
 * 测试node环境下的utaha
 */
describe('test node environment', ()=>{

  test('whether the dom method impored in node-env',()=>{
    expect(utaha.removeNode).toBeUndefined()
    expect(utaha.addClass).toBeUndefined()
    expect(utaha.removeClass).toBeUndefined()
  })

})
