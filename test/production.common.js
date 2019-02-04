const utaha = require ('../dist/main')

describe('[[production]] (CommonJS) test', ()=>{
  test('build file import correctly', ()=>{
    expect(utaha.isUndef).toBeInstanceOf(Function)
    expect(utaha.range).toBeInstanceOf(Function)
    expect(utaha.selfFilter).toBeInstanceOf(Function)
    expect(utaha.serializeStr).toBeInstanceOf(Function)
  })
})
