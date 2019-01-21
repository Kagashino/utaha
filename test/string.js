import * as string from "../src/string";

describe('[string]: test string methods:',()=>{
  const { serializeStr } = string;
  test('test serializeStr',()=>{
    const data1 = { a:1, b:2 }
    const data2 = { a:1,b:['b1','b2'] }
    const data3 = {
      a:1,
      b: {
        b1 : 'b1',
        b2 : {
          bb1 : 'bbb'
        }
      }
    }

    expect( serializeStr(data1) ).toBe('a=1&b=2')
    expect( serializeStr(data2) ).toBe('a=1&b[0]=b1&b[1]=b2')
    expect( serializeStr(data3) ).toBe('a=1&b[b1]=b1&b[b2][bb1]=bbb')
  })
})
