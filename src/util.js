const toString = Object.prototype.toString;

export function isBrowser() {
  return typeof window === 'object';
}

export function isUndef(obj) {
  return typeof obj === 'undefined'
}

export function isObject(obj) {
  return toString.call(obj) ===  '[object Object]';
}

export function isNull(obj) {
  return toString.call(obj) === '[object Null]'
}

export function isArray(obj) {
  return toString.call(obj) === '[object Array]'
}

export function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

export function isDate(obj) {
  return toString.call(obj) === '[object Date]'
}

export function isEmptyObject(obj) {
  return isObject(obj) && !Object.keys(obj).length;
}

/**
 * 判断是否为闭环对象（形如window这样循环引用的对象）
 * @param obj
 * @returns {boolean}
 */
function isCircular (obj) {
  let seenObjects = [];

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (let key of Object.keys(obj) ) {
        if ( detect(obj[key]) ) {
          console.log(obj, 'cycle at ' + key);
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

export function isPrimitive(val) {
  return typeof val === 'number' ||
         typeof val === 'string' ||
         typeof val === 'boolean'||
         typeof val === 'symbol' ||
         isUndef(val) || isNull(val)
}

/**
 * 对象深拷贝，支持闭环对象
 * @param obj
 * @param cache
 * @returns {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if ( !isObject(obj) && isArray(obj) ) {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export function randInt(count, startWith = 0 ) {
  return Math.floor(Math.random()*count) + startWith
}

/**
 * 防抖函数，减少延迟时间
 * @param callback
 * @param time
 * @returns {Function}
 */
export function createDebounce(callback, time = 300) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback()
    }, time)
  }
}


export const log = console.log;
export const dir = console.dir;