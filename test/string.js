import {
  getQueryValue,
  serializeStr,
  htmlEscape
} from '../src/string'

/**
 * String方法：
 * Object序列化
 * 查询Query String
 */
describe('[string]: test string methods:', () => {
  test('test serializeStr', () => {
    const data1 = { a: 1, b: 2 }
    const data2 = { a: 1, b: ['b1', 'b2'] }
    const data3 = {
      a: 1,
      b: {
        b1: 'b1',
        b2: {
          bb1: 'bbb'
        }
      }
    }

    expect(serializeStr(data1)).toBe('a=1&b=2') // plain object
    expect(serializeStr(data2)).toBe('a=1&b[0]=b1&b[1]=b2') // array contained object
    expect(serializeStr(data3)).toBe('a=1&b[b1]=b1&b[b2][bb1]=bbb') // nested json object
  })

  test('test getQueryValue', () => {
    expect(getQueryValue('goodbye', '?hello=js&goodbye=php')).toBe('php')
    expect(getQueryValue('seeu', '?hello=js&goodbye=php')).toBeUndefined()
  })

  test('test htmlEscape', ()=>{
    let origin = '<h3>hello world & "goodbye" !</h3>'

    expect(htmlEscape('normal text')).toBe('normal text')
    expect(htmlEscape(origin)).toBe('&lt;h3&gt;hello world &amp; &quot;goodbye&quot; !&lt;/h3&gt;')
  })
})
