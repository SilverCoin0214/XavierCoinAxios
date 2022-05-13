/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-13 10:52:56
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 14:56:12
 * @FilePath: /XavierCoinAxios/src/helpers/util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ToString函数用于获取每个对象的类型
const toString = Object.prototype.toString

// eslint-disable-next-line func-names
// 将数据类型保存在缓存中
let kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing: any) {
    let str = toString.call(thing)
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase())
  }
})(Object.create(null))

// 返回数据类型的判断
function kindOfTest(type: any) {
  type = type.toLowerCase()
  return function isKindOf(thing: any) {
    return kindOf(thing) === type
  }
}

// -----------------------------------------------

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// export function isPlainObject(val: any): val is Object {
//   if (kindOf(val) !== 'object') {
//     return false
//   }

//   // 获取val的原型, 判断原型是否指向null或者Object
//   let prototype = Object.getPrototypeOf(val)
//   return prototype === null || prototype === Object.prototype
// }
