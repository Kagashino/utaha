/**
 * 根据选择器查找 DOM
 * @param {String} selector
 * @return {HTMLElement|Null}
 */
import { includeItem, removeItem } from './array'

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
  return node.parent.removeChild(node);
}


/**
 * 添加类名
 * @param {HTMLElement} node
 * @param {String|Array} className
 */
export function addClass (node, className) {
  let classes = node.className.split(' ');
  if ( !includeItem(classes) ) {
    node.className += ' ' + className;
  }
  return node;
}


/**
 * 移除类名
 * @param {HTMLElement} node
 * @param {String|Array} className
 */
export function removeClass (node, className) {
  let classes = node.className.split(' ')
  let index = classes.indexOf(className);
  if ( index !== -1 ) {
    classes.splice(index,1)
    node.className = classes.join(' ')
  }
  return node;
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
