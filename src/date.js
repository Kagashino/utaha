import { isDate } from "./util";

export function formatDate (dateOrFmt,_fmt) {
  let date = isDate(this)? this : dateOrFmt;
  let fmt = isDate(this)? dateOrFmt : _fmt;
  let o = {
    "M+":date.getMonth() + 1,//月份
    "d+":date.getDate(),//日
    "h+":date.getHours(),//hours
    "m+":date.getMinutes(),//分钟
    's+':date.getSeconds(),//秒,
  };

  if( /(y+)/.test(fmt) ){
    let $1 = RegExp.$1;
    fmt = fmt.replace($1,(this.getFullYear()+'').substr(4 - $1.length));
  }
  for (let k of Object.keys(o) ){
    if( new RegExp(`(${k})`).test(fmt) ){
      let $1 = RegExp.$1;
      fmt = fmt.replace($1, ($1.length===1)?(o[k]) : (("00"+o[k]).substr( (""+o[k]).length)))
    }
  }
  return fmt;
}

formatDate._canExtendTo = Date;

export default {
  formatDate
}
