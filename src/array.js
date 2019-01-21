import { isArray, isFunction, randInt } from "./util";


/**
 * 当函数未拓展到原生对象Prototype时，参数1为数组，参数2为实现功能参数
 * 拓展后，参数1为实现功能参数，数组为this引用；
 * @param arg1
 * @param arg2
 * @param context
 * @returns {{array: *, entity: *}}
 */
function assignParameter(arg1,arg2,context) {
  let isArrayContext = isArray(context);
  if ( isArrayContext && !isFunction(arg1) ) {
    throw TypeError(`Array context case error:\n arguments[0] was function expected, got ${typeof arg1}`)
  } else if ( !isArray(arg1) ) {
    throw TypeError(`Global context case error:\n arguments[0] was array expected, got ${typeof arg1}`)
  }
  return {
    array : isArrayContext? context : arg1,
    entity : isArrayContext? arg1 : arg2
  }
}

/**
 * 删除数组内特定元素
 * @param arrOrElem
 * @param elem
 */
export function removeItem(arrOrElem,elem) {
  let { array, entity } = assignParameter(arg1,elem,this);
  let index = array.indexOf(entity);
  if ( index !== -1 ) {
    array.splice(index,1);
  }
  return array;
}

/**
 * 交换2个数组元素的位置；
 * @param arrOrIndex
 * @param arg1
 * @param arg2
 * swapItem([1,2,3,4,5],0,4)=>[5,1,2,3,4]
 */
export function swapItems ( arrOrIndex, arg1, arg2 ) {
  let { array, entity } = assignParameter(arrOrIndex,[arg1,arg2],this);
  let [ elem1, elem2 ] = entity;
  let index1 = array.indexOf(elem1)
  let index2 = array.indexOf(elem2)
  if ( index1 !== -1 && index2 !== -1 ) {
    let temp = elem1;
    array[index1] = elem2;
    array.splice(index2,1,temp)
  }
  return array;
}

/**
 * 直接对当前数组过滤，而不是返回一个新数组；
 * @param arrOrFunc
 * @param func
 * @returns {*}
 */
export function selfFilter (arrOrFunc, func) {
  let { array, entity } = assignParameter(arrOrFunc,func,this);
  let falseIndex = []
  for (let i = 0,len = array.length; i < len; i++) {
    if ( !entity(array[i],i,array) ) {
      falseIndex.push(i)
    }
  }
  while( falseIndex.length ) {
    array.splice(falseIndex.pop(),1);
  }
  return array;
}

export function getRandomItem (arr) {
  let { array } = assignParameter(arr)
  return array[randInt(array.length)]
}

export function includeItem (arrOrItem,item) {
  let { array, entity } = assignParameter(arrOrItem, item, this);
  if (array.include) {
    return array.include(item)
  } else {
    return array.indexOf(item) !== -1;
  }
}

removeItem._canExtendTo =
swapItems._canExtendTo =
selfFilter._canExtendTo =
includeItem._canExtendTo =
getRandomItem._canExtendTo = Array;

export default {
  removeItem,
  swapItems,
  selfFilter,
  includeItem,
  getRandomItem
}
