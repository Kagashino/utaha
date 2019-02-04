import utaha from '../dist/main'

describe('[[production]] (ECMAScript2015 module) test', ()=>{
  test('build file import correctly', ()=>{
    expect(utaha.isUndef).toBeInstanceOf(Function)
    expect(utaha.range).toBeInstanceOf(Function)
    expect(utaha.selfFilter).toBeInstanceOf(Function)
    expect(utaha.serializeStr).toBeInstanceOf(Function)
  })
})
