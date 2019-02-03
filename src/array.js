import { randInt } from './util'

/**
 * 删除数组内特定元素
 * @param elem
 * @param array
 */
export function removeItem (elem, array) {
  let index = array.indexOf(elem)
  if (index !== -1) {
    array.splice(index, 1)
  }
  return array
}

/**
 * 交换2个数组元素的位置；
 * swapItem([1,2,3,4,5],0,4)=>[5,1,2,3,4]
 * @param elem1
 * @param elem2
 * @param array
 */
export function swapItems (elem1, elem2, array) {
  let index1 = array.indexOf(elem1)
  let index2 = array.indexOf(elem2)
  if (index1 !== -1 && index2 !== -1) {
    let temp = elem1
    array[index1] = elem2
    array.splice(index2, 1, temp)
  }
  return array
}

/**
 * 直接对当前数组过滤，而不是返回一个新数组；
 * @param array
 * @param func
 * @returns {*}
 */
export function selfFilter (array, func) {
  let falseIndex = []
  for (let i = 0, len = array.length; i < len; i++) {
    if (!func(array[i], i, array)) {
      falseIndex.push(i)
    }
  }
  while (falseIndex.length) {
    array.splice(falseIndex.pop(), 1)
  }
  return array
}

/**
 * 随机返回数组中的任意元素；
 * @param array
 * @returns {*}
 */
export function getRandomItem (array) {
  return array[randInt(array.length)]
}

/**
 * 判断元素是否存在于数组中；
 * @param item
 * @param array
 * @returns {*}
 */
export function includeItem (item, array) {
  if (array.includes) {
    return array.includes(item)
  } else {
    return array.indexOf(item) !== -1
  }
}

/**
 * 像python一样生成一个可迭代的数组
 * @param start/stop 起始位，当仅有该参数时为终止位
 * @param stop 终止位
 * @param step 步进位
 */
export function range (start = 0,stop = 0,step = 1) {
  let arr = []

  if (!step) {
    return arr
  } if ( start && !stop ) {
    stop = start
    start = 0
  }

  const isDone = (start,stop,step)=> {
    return (stop - start) / step <= 0
  }

  while ( !isDone(start,stop,step) ) {
    arr.push(start)
    start += step
  }

  return arr
}
