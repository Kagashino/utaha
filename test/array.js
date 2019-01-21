import { getRandomItem, includeItem, removeItem, selfFilter, swapItems } from '../src/array'
describe ('[string]: test string methods:', ()=>{
  test('test getRandomItem',()=>{
    const array = [1,2,3,4,5,6]
    let result = getRandomItem(array)

    expect(array.indexOf(result)).not.toBe(-1)
  })
  test('test includeItem',()=>{
    const array = [{value:1},{value:2},{value:3},{value:4},{value:5}]
    const result = selfFilter(array,(item)=>item.value%2 !== 0 )

    expect(result).toEqual([{value:1},{value:3},{value:5}])
    expect(result).toBe(array);
  })
  // test('test removeItem',()=>{
  //
  // })
  // test('test selfFilter',()=>{
  //
  // })
  // test('test swapItems',()=>{
  //
  // })
})
