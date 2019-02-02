import { includeItem } from './array'
/**
 * 根据选择器查找 DOM
 * @param {String} selector
 * @return {HTMLElement|Null}
 */

export function $ (selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}


/**
 * 删除 DOM 节点
 * @param {HTMLElement} node
 * @return {HTMLElement}
 */

export function removeNode (node) {
    return node.parentNode.removeChild(node);
}


/**
 * 添加类名
 * @param {HTMLElement} node
 * @param {String} className
 */
export function addClass ( node, className ) {
  if( !node.className ) {
    node.className = className;
    return;
  }
  let classList = node.className.split(' ');
  if ( !includeItem( className, classList ) ) {
    classList.push(className)
    node.className = classList.join(' ');
  }
}

/**
 * 移除类名
 * @param {HTMLElement} node
 * @param {String} className
 */
export function removeClass ( node, className ) {
  if(!node.className) {
    return;
  }
  let classList = node.className.split(' ');
  let index = classList.indexOf(className)
  if ( index !== -1 ) {
    classList.splice(index,1)
    node.className = classList.join(' ')
  }
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
export function getAbsoluteUrl (url) {
  return location.host + url;
}

/**
 * 设置cookie
 * @param name
 * @param val
 * @param option,可选择传入domain、path和expires
 */
export function setCookie (name,val,option) {
  let kv = encodeURIComponent(name) + '=' + encodeURIComponent(val)
  option = Object.assign({
    domain : '',
    path : '',
    expires : ''
  },option)

  if ( option.domain ) {
    kv += '; domain=' + option.domain;
  }
  if ( option.path ) {
    kv += '; path=' + option.path;
  }
  if ( option.expires ) {
    kv += '; expires=' + new Date(option.expires);
  }
  document.cookie = kv;
}

/**
 * 获取指定的cookie
 * @param cname
 * @returns {string}
 */
export function getCookie (cname) {
  const name = cname + '=';
  const cookie = decodeURIComponent(document.cookie);
  const ca = cookie.split('; ')
  for ( let c of ca ) {
    while ( c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if ( c.indexOf(name) === 0 ) {
      return c.substring(name.length,c.length)
    }
  }
  return '';
}

/**
 * 删除指定的cookie
 * @param name
 */
export function removeCookie (name) {
  let kv = encodeURIComponent(name) + '=' + encodeURIComponent('');
  document.cookie = kv + '; expires=' + new Date(0);
}
