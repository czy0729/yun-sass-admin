/* eslint-disable no-useless-escape */
/*
 * rc-form 规则
 * @Doc: https://github.com/yiminghe/async-validator
 * @Author: czy0729
 * @Date: 2019-06-27 16:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 16:35:04
 */

/**
 * rules生成器
 * @version 190627 1.0
 * @param  {String}  *type      规则
 * @param  {Boolean} isRequierd 是否必须
 * @return {Object}  rc-form    Decorator rules
 */
const genRules = (type, isRequired = true) => {
  const rules = []
  const required = {
    required: true,
    message: '必填'
  }

  if (isRequired) {
    rules.push(required)
  }

  switch (type) {
    // async-validator没有提供以下这些验证，手动实现
    case 'email':
    case 'mobile':
    case 'wechat':
    case 'number':
      rules.push({
        validator(rule, value, callback) {
          // callback需要至少执行一次
          // https://github.com/ant-design/ant-design/issues/5155
          let errMsg

          // v1.2
          if (isRequired || (!isRequired && value)) {
            if (!validate(value, type)) {
              errMsg = '格式错误'
            }
          }
          callback(errMsg)
        }
      })
      break

    // 170506 银行卡检验
    case 'bank':
      rules.push({
        validator(rule, value, callback) {
          let errMsg
          if (isRequired || (!isRequired && value)) {
            if (!bankCheck(value)) {
              errMsg = '格式错误'
            }
          }
          callback(errMsg)
        }
      })
      break

    // 170607 RangePicker检验
    case 'range':
      rules.push({
        validator(rule, value, callback) {
          let errMsg
          if (isRequired || (!isRequired && value)) {
            if (!Array.isArray(value) || !value[0] || !value[1]) {
              errMsg = '格式错误'
            }
          }
          callback(errMsg)
        }
      })
      break

    // 170722 非空数组
    case 'object':
      rules.push({
        validator(rule, value, callback) {
          let errMsg
          if (isRequired || (!isRequired && value)) {
            if (value && Object.keys(value).length === 0) {
              errMsg = '必填'
            }
          }
          callback(errMsg)
        }
      })
      break

    // 数字 len
    // [数字，数字] range
    // string, boolean, method, regexp, integer, float, array, object, enum, date, url, hex
    default:
      if (typeof type === 'number') {
        rules.push({
          len: type,
          message: `长度至少为${type}位`
        })
      } else if (Array.isArray(type)) {
        rules.push({
          min: type[0],
          max: type[1],
          message: `长度应为${type[0]}-${type[1]}位`
        })
      } else if (type) {
        rules.push({
          type,
          message: '格式错误'
        })
      }
      break
  }
  return rules
}

export default {
  required: genRules(),
  gen: genRules
}

/**
 * 简单验证
 * @version 190627 1.0
 * @param  {*} *str  检验值
 * @param  {*} *type 检验类型
 * @return {Boolean}
 */
function validate(str, type) {
  const patrn = {
    email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, // 邮件
    mobile: /^1\d{10}$/, // 手机号
    phone: /^\d{3,4}[-]\d{7,8}$/, // 固话
    number: /^\d*$/, // 数字
    decimal: /^[-]{0,1}(\d+)[\.]+(\d+)$/, // 带小数的数字格式，可为负数
    money: /^[0-9]+[\.][0-9]{0,2}$/, // 金额格式，格式定义为带小数的正数，小数点后最多两位
    zh: /^([\u4e00-\u9fa5]){2,7}$/, // 中文2-7位
    captcha: /^\d{6}$/, // 6位数字验证码
    wechat: /^[a-zA-Z\d_\-]{5,}$/ // 微信号
  }
  if (!type || !patrn[type]) {
    return false
  }
  return patrn[type].test(str)
}

/**
 * 银行卡号码加权验证
 * @version 160421 1.0
 * @param {String} bankno
 * @return {Boolean}
 */
function bankCheck(bankno = '') {
  if (bankno.length < 15 || bankno.length > 19) {
    return false
  }
  const num = /^\d*$/
  if (!num.exec(bankno)) {
    return false
  }
  const strBin =
    '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
    return false
  }
  const lastNum = bankno.substr(bankno.length - 1, 1)
  const first15Num = bankno.substr(0, bankno.length - 1)
  const newArr = []
  for (let i = first15Num.length - 1; i > -1; i -= 1) {
    newArr.push(first15Num.substr(i, 1))
  }
  const arrJiShu = []
  const arrJiShu2 = []
  const arrOuShu = []
  for (let j = 0; j < newArr.length; j += 1) {
    if ((j + 1) % 2 == 1) {
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2)
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2)
      }
    } else {
      arrOuShu.push(newArr[j])
    }
  }
  const jishuChild1 = []
  const jishuChild2 = []
  for (let h = 0; h < arrJiShu2.length; h) {
    jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
    jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
  }
  let sumJiShu = 0
  let sumOuShu = 0
  let sumJiShuChild1 = 0
  let sumJiShuChild2 = 0
  let sumTotal = 0
  for (let m = 0; m < arrJiShu.length; m += 1) {
    sumJiShu += parseInt(arrJiShu[m])
  }
  for (let n = 0; n < arrOuShu.length; n += 1) {
    sumOuShu += parseInt(arrOuShu[n])
  }
  for (let p = 0; p < jishuChild1.length; p += 1) {
    sumJiShuChild1 += parseInt(jishuChild1[p])
    sumJiShuChild2 += parseInt(jishuChild2[p])
  }
  sumTotal =
    parseInt(sumJiShu) +
    parseInt(sumOuShu) +
    parseInt(sumJiShuChild1) +
    parseInt(sumJiShuChild2)
  const k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10
  const luhm = 10 - k
  if (lastNum != luhm) {
    return false
  }
  return true
}
