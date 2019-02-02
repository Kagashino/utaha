/**
 * 日期格式化
 * @param date { Date| String } Date或者合法的日期字符串
 * @param fmt 日期格式 yyyy-MM-dd hh:mm:ss
 * @returns { String }
 * example: formatDate(new Date('2019/10/23'), 'yyyy年MM月dd日') -> '2019年10月23日'
 */
export function formatDate (date,fmt) {
  const _date = new Date(date)
  if( Number.isNaN(+_date) ) {
    throw TypeError('Invalid Date: ' + date)
  }
  let o = {
    "M+":_date.getMonth() + 1,//月份
    "d+":_date.getDate(),//日
    "h+":_date.getHours(),//hours
    "m+":_date.getMinutes(),//分钟
    's+':_date.getSeconds(),//秒,
  };

  if( /(y+)/.test(fmt) ){
    let $1 = RegExp.$1;
    fmt = fmt.replace($1,(_date.getFullYear()+'').substr(4 - $1.length));
  }
  for (let k of Object.keys(o) ){
    if( new RegExp(`(${k})`).test(fmt) ){
      let $1 = RegExp.$1;
      fmt = fmt.replace($1, ($1.length===1)?(o[k]) : (("00"+o[k]).substr( (""+o[k]).length)))
    }
  }
  return fmt;
}
