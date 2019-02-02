import {
  createDebounce,
  timeoutPromise,
  isUndef,
  isObject,
  isNull,
  isArray,
  isFunction,
  isDate,
  isEmptyObject,
  isCircular,
  isPrimitive,
  deepCopy,
  randInt
} from '../src/util'

describe ('[util]: test util methods',()=>{
  test('test promisefy', done=>{
    let tm = timeoutPromise(resolve=>{
      resolve('time up!')
    },200).then(res=>{
      expect(res).toBe('time up!');
      done()
    })
    expect(tm instanceof Promise).toBe(true)
  })

  test('test all "typo" methods', ()=>{
    let a;
    expect( isObject({a:1,b:2}) ).toBe(true);
    expect( isObject([1,2,3]) ).not.toBe(true);

    expect ( isUndef(a) ).toBe(true)
    expect ( isUndef(null) ).not.toBe(true)

    expect( isNull(null) ).toBe(true)
    expect( isNull(a) ).not.toBe(true)

    expect( isArray([1,2,3]) ).toBe(true)
    expect( isArray({'0':1,'1':2,length:2}) ).not.toBe(true)

    expect( isFunction(function (){ return 0 }) ).toBe(true)
    expect( isFunction(()=>0 ) ).toBe(true)

    expect( isDate( new Date(2016)) ).toBe(true)
    expect( isDate( '2019/3/1') ).not.toBe(true)

    expect( isEmptyObject({}) ).toBe(true)
    expect( isEmptyObject({a:1,b:2}) ).not.toBe(true)
    expect( isEmptyObject(Object.create({a:1})) ).not.toBe(true)

    expect( isPrimitive(null) ).toBe(true)
    expect( isPrimitive(a) ).toBe(true)
    expect( isPrimitive(4) ).toBe(true)
    expect( isPrimitive('string') ).toBe(true)
    expect( isPrimitive( Symbol('this') ) ).toBe(true)
    expect( isPrimitive( new String('a') ) ).not.toBe(true)

    let QoB = {name:'Kerrigan',age:18}
    QoB.self = QoB;
    expect( isCircular(QoB) ).toBe(true)

  })

  test ('test deepCopy', ()=>{
    let Zasz = { underling: 200, mine:10000 }
    expect ( deepCopy(Zasz) ).not.toBe(Zasz)
    expect ( deepCopy(Zasz) ).toEqual({ underling: 200, mine:10000 })

    let QoB = {name:'Kerrigan',age:18}
    QoB.self = QoB;

    let Sarah = deepCopy(QoB)
    expect( Sarah ).not.toBe(QoB)
    expect( Sarah ).toEqual(QoB)
  })

  test ('test randInt', ()=>{
    let randomResults = Array.of(10).fill( randInt(20,10) )
    for( let i of randomResults ) {
      expect(i).toBeLessThan(30)
      expect(i).toBeGreaterThanOrEqual(10)
    }
  })
})

// describe('[util]: test debounce function',()=>{
//   test ('go debounce', async (done)=>{
//     const invokeCount = 5;
//     const debounceDelay = 300;
//     const mockFunc = jest.fn();
//     const debunceFunc = createDebounce(mockFunc,debounceDelay);
//   })
// })
