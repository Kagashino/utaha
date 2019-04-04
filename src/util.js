const toString = Object.prototype.toString

export function isUndef (obj) {
  return typeof obj === 'undefined'
}

export function isObject (obj) {
  return toString.call(obj) === '[object Object]'
}

export function isNull (obj) {
  return toString.call(obj) === '[object Null]'
}

export function isArray (obj) {
  return toString.call(obj) === '[object Array]'
}

export function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}

export function isDate (obj) {
  return toString.call(obj) === '[object Date]'
}

export function isEmptyObject (obj) {
  return isObject(obj) && !Object.keys(obj).length && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * 判断是否为闭环对象（形如window这样循环引用的对象）
 * @param obj
 * @returns {boolean}
 */
export function isCircular (obj) {
  let seenObjects = []

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true
      }
      seenObjects.push(obj)
      for (let key of Object.keys(obj)) {
        if (detect(obj[key])) {
          return true
        }
      }
    }
    return false
  }

  return detect(obj)
}

/**
 * 是否为原始类型
 * @param val
 * @returns {boolean}
 */
export function isPrimitive (val) {
  return typeof val === 'number' ||
         typeof val === 'string' ||
         typeof val === 'boolean' ||
         typeof val === 'symbol' ||
         isUndef(val) || isNull(val)
}

/**
 * 对象拷贝，支持闭环对象/数组
 * @param obj
 * @param cache
 * @returns {*}
 */
export function deepCopy (obj, cache = []) {

  if (!isObject(obj) && !isArray(obj)) {
    return obj
  }
  // 返回闭环对象
  for ( let i of cache ) {
    if ( i.original === obj ) {
      return i.copy
    }
  }

  const copy = isArray(obj) ? [] : {}

  cache.push({
    original: obj,
    copy
  })

  for (let key of Object.keys(obj) ) {
    copy[key] = deepCopy(obj[key], cache)
  }

  return copy
}

export function randInt (count, startWith = 0) {
  return Math.floor(Math.random() * count) + startWith
}

/**
 * 防抖函数，多个函数调用间隔小于延迟时间，仅执行最后一次调用
 * @param callback 回调函数，支持自定参数
 * @param delay 延迟间隔/最后一次调用的延迟时间
 * @returns {Function}
 */
export function createDebounce (callback, delay = 300) {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(callback, delay, ...args)
  }
}

/**
 * 节流函数
 * @param callback 回调函数，支持自定参数
 * @param delay 设定多少间隔后调用，默认300
 * @returns {Function}
 */
export function createThrottle (callback, delay = 300) {
  let start = Date.now()
  return (...arg) => {
    let diff = Date.now() - start
    if (!diff || diff >= delay) {
      start = Date.now()
      callback(...arg)
    }
  }
}

/**
 * 定时器函数Promise化
 * @param fn
 * @param delay
 * @returns {Promise<any>}
 */
export function timeoutPromise (fn, delay = 100) {
  if (!isFunction(fn)) {
    throw new TypeError(`argument[0]: ${fn} is not a function`)
  }
  return new Promise((resolve, reject, context = null) => {
    setTimeout(fn.bind(context, resolve, reject), delay)
  })
}


export function promisfy (fn) {
  if (!isFunction(fn)) {
    throw new TypeError(`argument[0]: ${fn} is not a function`)
  }
  return new Promise(fn)
}
export const log = console.log
export const dir = console.dir
