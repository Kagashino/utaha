import { isArray, isObject } from './util'

/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
export function getQueryValue (name, querystring) {
  let result = new RegExp(name + '=(.+)&?$').exec(querystring) || []
  return result[1]
}

/**
 * 将Object序列化为QueryString，可以兼容嵌套的数组/Object
 * @param {Object} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 'hello=js&hi=test'
 */
export function serializeStr (data) {
  let qs = ''
  for (let key of Object.keys(data)) {
    if (isArray(data[key]) || isObject(data[key])) {
      qs += serializeObject(key, data[key])
    } else {
      qs += `${key}=${data[key]}&`
    }
  }
  function serializeObject (key, obj) {
    let oqs = ''
    for (let subkey of Object.keys(obj)) {
      if (isArray(obj[subkey]) || isObject(obj[subkey])) {
        oqs += serializeObject(`${key}[${subkey}]`, obj[subkey])
      } else {
        oqs += `${key}[${subkey}]=${obj[subkey]}&`
      }
    }
    return oqs
  }
  return qs.substr(0, qs.length - 1)
}
