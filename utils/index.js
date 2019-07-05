/*
 * @Author: czy0729
 * @Date: 2019-06-21 11:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 22:05:05
 */
import Router from 'next/router'
import { server, linkPrefix } from '@/constants'

/**
 * [*]Router.push
 * @param {*} path
 */
export function routerPush(path) {
  Router.push(path, `${linkPrefix}${path}`)
}

/**
 * [*]获取query
 * @param {String} *name
 */
export function getQuery(name) {
  if (server) {
    return null
  }

  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * url字符串化
 * @param {*} data
 * @param {*} encode
 */
export function urlStringify(data, encode = true) {
  if (!data) return ''

  const arr = Object.keys(data).map(
    key => `${key}=${encode ? encodeURIComponent(data[key]) : data[key]}`
  )
  return arr.join('&')
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 * @param {*} c
 */
export function pad(n) {
  return Number(n) < 10 ? `0${n}` : n
}

/**
 * 返回timestamp
 * @version 170814 1.0
 * @version 181107 1.1
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
export function getTimestamp(date) {
  if (date) {
    return Math.floor(new Date(date.replace(/-/g, '/')).valueOf() / 1000)
  }
  return Math.floor(new Date().valueOf() / 1000)
}

/**
 * 和PHP一样的时间戳格式化函数
 * @version 160421 1.0
 * @version 170104 1.1 变得可以省略format
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 * @return {String}
 */
/* eslint-disable */
export function date(format, timestamp) {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  let jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  let txt_weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  let txt_months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let f = {
    d: function() {
      return pad(f.j(), 2)
    },
    D: function() {
      t = f.l()
      return t.substr(0, 3)
    },
    j: function() {
      return jsdate.getDate()
    },
    l: function() {
      return txt_weekdays[f.w()]
    },
    N: function() {
      return f.w() + 1
    },
    S: function() {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function() {
      return jsdate.getDay()
    },
    z: function() {
      return (
        ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 86400000) >> 0
      )
    },
    W: function() {
      let a = f.z(),
        b = 364 + f.L() - a
      let nd2,
        nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function() {
      return txt_months[f.n()]
    },
    m: function() {
      return pad(f.n(), 2)
    },
    M: function() {
      t = f.F()
      return t.substr(0, 3)
    },
    n: function() {
      return jsdate.getMonth() + 1
    },
    t: function() {
      let n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function() {
      let y = f.Y()
      return !(y & 3) && (y % 100 || !(y % 400)) ? 1 : 0
    },
    Y: function() {
      return jsdate.getFullYear()
    },
    y: function() {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function() {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function() {
      return f.a().toUpperCase()
    },
    B: function() {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) {
        beat -= 1000
      }
      if (beat < 0) {
        beat += 1000
      }
      if (String(beat).length == 1) {
        beat = '00' + beat
      }
      if (String(beat).length == 2) {
        beat = '0' + beat
      }
      return beat
    },
    g: function() {
      return jsdate.getHours() % 12 || 12
    },
    G: function() {
      return jsdate.getHours()
    },
    h: function() {
      return pad(f.g(), 2)
    },
    H: function() {
      return pad(jsdate.getHours(), 2)
    },
    i: function() {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function() {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function() {
      let t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function() {
      let O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function() {
      return (
        f.Y() +
        '-' +
        f.m() +
        '-' +
        f.d() +
        'T' +
        f.h() +
        ':' +
        f.i() +
        ':' +
        f.s() +
        f.P()
      )
    },
    U: function() {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}
/* eslint-enable */

/**
 * 睡眠函数
 * @version 180417 1.0
 * @return {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 随机数
 * @version 190626 1.0
 */
export function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

/**
 * 统一取Label
 * @version 190626 1.0
 * @param  {Array}  *ds    检测数组 Array<{ label: string, value: string }>
 * @param  {String} *value 查找值
 * @return {String}
 */
export function getText(ds, value) {
  if (!ds) {
    return false
  }

  const find = ds.find(item => item.value == value)

  if (find) {
    return find.text
  }

  return false
}

/**
 * 统一取Value
 * @version 190626 1.0
 * @param  {Array}  *ds    检测数组 Array<{ label: string, value: string }>
 * @param  {String} *label 查找名字
 * @return {String}
 */
export function getValue(ds, label) {
  if (!ds) {
    return false
  }

  const find = ds.find(item => item.text == label)

  if (find) {
    return find.value
  }

  return false
}

/**
 * 统一取Status
 * @version 190626 1.0
 * @param  {Array}  *ds    检测数组 Array<{ label: string, value: string }>
 * @param  {String} *label label or value
 * @return {String}
 */
export function getStatus(ds, text) {
  if (!ds) {
    return false
  }

  const find = ds.find(item => item.value == text || item.text == text)

  if (find) {
    return find.status
  }

  return 'default'
}

/**
 * localStorage set
 * @version 190704 1.0
 * @param {String} key
 * @param {Mix}    data
 */
export function setStorage(key, data) {
  if (typeof window.localStorage === 'undefined') {
    return false
  }

  try {
    const value = typeof data === 'string' ? data : JSON.stringify(data)

    window.localStorage.setItem(key, value)
    return true
  } catch (err) {
    console.log('localStorage set fail: ', key)
    return false
  }
}

/**
 * localStorage get
 * @version 190704 1.0
 * @param {String} key
 */
export function getStorage(key) {
  let data = null

  if (typeof window.localStorage === 'undefined') {
    return data
  }

  try {
    data = JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    console.log('localStorage get fail: ', key)
    return null
  }

  return data
}

/**
 * 获取文件Base64
 * @param {*} file
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
