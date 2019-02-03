import {
  createDebounce,
  createThrottle,
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

/**
 * util方法：
 * 定时器Promise化
 * 类型判断
 * 深拷贝
 * 随机整数
 */
describe('[util]: test util methods', () => {
  test('test promisefy', (done) => {
    let tm = timeoutPromise((resolve) => {
      resolve('time up!')
    }, 200).then((res) => {
      expect(res).toBe('time up!')
      done()
    })
    expect(() => timeoutPromise('not a function')).toThrowError()
    expect(tm instanceof Promise).toBe(true)
  })

  test('test all "typo" methods', () => {
    let a
    expect(isObject({ a: 1, b: 2 })).toBe(true)
    expect(isObject([1, 2, 3])).not.toBe(true)

    expect(isUndef(a)).toBe(true)
    expect(isUndef(null)).not.toBe(true)

    expect(isNull(null)).toBe(true)
    expect(isNull(a)).not.toBe(true)

    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray({ '0': 1, '1': 2, length: 2 })).not.toBe(true)

    expect(isFunction(function () { return 0 })).toBe(true)
    expect(isFunction(() => 0)).toBe(true)

    expect(isDate(new Date(2016))).toBe(true)
    expect(isDate('2019/3/1')).not.toBe(true)

    expect(isEmptyObject({})).toBe(true)
    expect(isEmptyObject({ a: 1, b: 2 })).not.toBe(true)
    expect(isEmptyObject(Object.create({ a: 1 }))).not.toBe(true)

    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(a)).toBe(true)
    expect(isPrimitive(4)).toBe(true)
    expect(isPrimitive('string')).toBe(true)
    expect(isPrimitive(Symbol('this'))).toBe(true)
    expect(isPrimitive({})).not.toBe(true)

    let QoB = { name: 'Kerrigan', age: 18 }
    QoB.self = QoB
    expect(isCircular(QoB)).toBe(true)
  })

  test('test deepCopy', () => {
    let Plannet = ['Char', 'Aiur', 'Shakuras', 'Tarsonis']
    expect(deepCopy(Plannet)).not.toBe(Plannet)
    expect(deepCopy(Plannet)).toEqual(['Char', 'Aiur', 'Shakuras', 'Tarsonis'])

    let Zasz = { underling: 200, mine: 10000 }
    expect(deepCopy(Zasz)).not.toBe(Zasz)
    expect(deepCopy(Zasz)).toEqual({ underling: 200, mine: 10000 })

    let QoB = { name: 'Kerrigan', age: 18 }
    QoB.body = {
      self : QoB
    }

    let Sarah = deepCopy(QoB)
    expect(Sarah).not.toBe(QoB)
    expect(Sarah).toEqual(QoB)
  })

  test('test randInt', () => {
    let randomResults = Array.of(10).fill(randInt(20, 10))
    for (let i of randomResults) {
      expect(i).toBeLessThan(30)
      expect(i).toBeGreaterThanOrEqual(10)
    }
  })
})

/**
 * util方法：节流/防抖
 */
describe('[util]: test debounce/throttle function', () => {
  test('go throttle', (done) => {
    let invokeCount = 10
    const freq = 100
    const limit = 300
    const mockFunc = jest.fn()
    const paramPassedFunc = createThrottle((a) => {
      expect(a).toBe('hello')
    })
    const rapidInvokeFunc = createThrottle(mockFunc, limit)

    for (let i = 0; i < invokeCount; i++) {
      setTimeout(() => {
        rapidInvokeFunc()
        if (i >= invokeCount - 1) {
          // ...
          expect(mockFunc).not.toHaveBeenCalledTimes(invokeCount)
          done()
        }
      }, i * freq)
    }
    paramPassedFunc('hello')
  })

  test('go debounce', () => {
    jest.useFakeTimers()

    const invokeCount = 5
    const debounceDelay = 300
    const mockFunc = jest.fn()
    const defaultDebounceFunc = createDebounce(mockFunc)
    const debounceFunc = createDebounce(mockFunc, debounceDelay)
    for (let i = 0; i < invokeCount; i++) {
      debounceFunc()
    }
    jest.runAllTimers()

    expect(typeof debounceFunc).toBe('function')
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })
})
