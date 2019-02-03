import { formatDate } from '../src/date'

/**
 * 日期格式化
 */
describe('[date]: test date methods', () => {
  test('test date formation', () => {
    let date = new Date('2019/2/2 10:24:06')
    let strDate = '2019/2/2 10:24:06'
    let errorDate = 'bazinga!'

    expect(() => formatDate(errorDate, 'yyyy-MM-dd hh:mm:ss')).toThrow(/Invalid Date/)
    expect(formatDate(date, 'yyyy-MM-dd hh:mm:ss')).toBe('2019-02-02 10:24:06')
    expect(formatDate(date, 'yyyy年M月d日 h时m分s秒')).toBe('2019年2月2日 10时24分6秒')
    expect(formatDate(strDate, 'yyyy-MM-dd hh:mm:ss')).toBe('2019-02-02 10:24:06')

    expect(formatDate(date, 'MM dd yyyy')).toBe('02 02 2019')
    expect(formatDate(date, 'hh:mm:ss')).toBe('10:24:06')
  })
})
