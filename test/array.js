import { getRandomItem, includeItem, removeItem, selfFilter, swapItems } from '../src/array'

describe ('[array]: test array methods:', ()=>{

  test('test getRandomItem',()=>{
    const array = [1,2,3,4,5,6]
    let result = getRandomItem(array)

    expect(array.indexOf(result)).not.toBe(-1)
  })

  test('test includeItem', ()=>{
    const include = {hello:'world!'}
    expect(includeItem('c',['a','b','c','d','e'])).toBe(true)
    expect(includeItem('F',['a','b','c','d','e'])).not.toBe(true)

    expect(includeItem(include,['a','b','c', include ,'d','e'])).toBe(true)
    expect(includeItem('F',['a','b', {hello:'world!'} ,'d','e'])).not.toBe(true)
  })

  test('test polyfill includeItem', ()=>{
    Array.prototype.includes = null;
    const include = {hello:'world!'}
    expect(includeItem('c',['a','b','c','d','e'])).toBe(true)
    expect(includeItem('F',['a','b','c','d','e'])).not.toBe(true)

    expect(includeItem(include,['a','b','c', include ,'d','e'])).toBe(true)
    expect(includeItem('F',['a','b', {hello:'world!'} ,'d','e'])).not.toBe(true)
  })

  test('test selfFilter',()=>{
    const array = [{value:1},{value:2},{value:3},{value:4},{value:5}]
    const result = selfFilter(array,(item)=>item.value%2 !== 0 )

    expect(result).toEqual([{value:1},{value:3},{value:5}])
    expect(result).toBe(array);
  })

  test('test removeItem',()=>{
    const array = [1,2,3,4,5]
    const removedArray = removeItem(2,array)

    expect(array).toBe(removedArray)

    removeItem(6, array)
    expect(array).toEqual([1,3,4,5])

  })


  test('test selfFilter',()=>{
    const array = [{value:1},{value:2},{value:3},{value:4},{value:5},{value:6}]
    const filtered = selfFilter(array,item=>item.value%2===0)

    expect(array).toBe(filtered)
    expect(array).toEqual([{value:2},{value:4},{value:6}])
  })

  test('test swapItems',()=>{
    const array = [5,4,3,2,1]
    const swaped = swapItems(1,5,array)

    expect(array).toBe(swaped)
    expect(array).toEqual([1,4,3,2,5])

    swapItems(4,3,array)
    expect(array).toEqual([1,3,4,2,5])

    swapItems(2,100000, array)
    expect(array).toEqual([1,3,4,2,5])

  })
})
