import axios from 'axios'
import md5 from 'js-md5'
import appConfig from '../config/appConfig'
let cancel; let promiseArr = {}
const CancelToken = axios.CancelToken

axios.defaults.baseURL = '/'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response.data
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '资源不存在'
        break
      case 500:
        err.message = '服务器出错'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '请求失败'
  }
  return Promise.resolve(err.response)
})

// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: appConfig.api.domain + url,
        params: this.setToken(param),
        headers: {
          // [config.tokenHeaderName]: store.state.userInfo.appKey
        },
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (res !== undefined) {
          if (res.code === appConfig.api.successCode) {
            resolve(res.data)
          } else {
            this.errorInterceptors(res)
            reject(res)
          }
        }
      })
    })
  },
  // post请求
  post (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: appConfig.api.domain + url,
        data: this.setToken(param),
        headers: {
          // [config.tokenHeaderName]: store.state.userInfo.appKey
        },
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (res !== undefined) { // 防止拦截相同请求后报错
          if (res.code === appConfig.api.successCode) {
            resolve(res)
          } else {
            this.errorInterceptors(res)
            reject(res)
          }
        }
      })
    })
  },
  errorInterceptors (res) {
    switch (res.code) {
      case 3002:
        setTimeout(() => {
          history.go(-1)
        }, 500)
        break
      case 4004:
        // history.go(-1)
        break
      case 5001:
        // store.dispatch('clearUserInfo')
        // helper.checkLogin()
        break
      default:
        break
    }
  },
  setToken (params) {
    /**
     * 判断参数是否为数组
     * @param param 参数
     * @returns {boolean}
     */
    function isArray (param) {
      return Object.prototype.toString.call(param) === '[object Array]'
    }

    /**
     * 判断参数是否为对象
     * @param param 参数
     * @returns {boolean}
     */
    function isObject (param) {
      return Object.prototype.toString.call(param) === '[object Object]'
    }

    /**
     * 判断参数是否为布尔值
     * @param param 参数
     * @param param
     */
    function isBoolean (param) {
      return Object.prototype.toString.call(param) === '[object Boolean]'
    }

    /**
     * 遍历数组并进行json字符化转义
     * @param arr array 数组内容
     * @returns string
     */
    function judge (arr) {
      let a = []
      arr.forEach(function (ar) {
        !ar ? a.push(JSON.stringify(ar)) : (typeof ar === 'number' ? a.push(ar) : a.push('"' + ar.toString() + '"'))
      })
      return a.join(',')
    }

    /**
     * 对传入的参数进行排序
     * @param obj object 传入参数
     * @returns object 排序后的参数
     */
    function sortByKey (obj) {
      let newArr = []
      let newObj = {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 判断自身中是否存在该属性
          newArr.push(key)
        }
      }
      // 排序
      newArr = newArr.sort()
      newArr.forEach(function (key) {
        (!!obj[key] || typeof (obj[key]) === 'boolean' || obj[key] === 0) && (newObj[key] = obj[key])
      })
      newArr = null
      return newObj
    }

    /**
     * 对参数进行签名
     * @param obj object 传入参数
     * @returns string 签名字符串
     */
    function getStr (obj) {
      // 定义一个数组存放keyValue
      let str = []
      // 定义一个value存放处理后的键值
      let value = ''
      // 定义emoji正则表达式
      // var regRule = /\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2600-\u27FF]/g;
      var regRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]/ig
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (isArray(obj[key])) { // 数组
            value = '[' + judge(obj[key]) + ']'
          } else if (isObject(obj[key])) { // 对象
            value = JSON.stringify(obj[key])
            if (value.match(regRule)) {
              value = value.replace(regRule, '') // 旧的js emoji正则表达式
            }
          } else if (isBoolean(obj[key])) { // Boolean
            value = (obj[key]) ? '1' : '0'
          } else { // 其他格式
            value = obj[key] // 先复制一份值
            // 如果变量是文本类型且存在emoji则过滤emoji再签名
            if (Object.prototype.toString.call(obj[key]) === '[object String]' && obj[key].match(regRule)) {
              value = value.replace(regRule, '') // 旧的js emoji正则表达式
            }
          }
          str.push(key + '=' + value)
        }
      }
      return md5(str.join('&').toLowerCase())
    }
    let signParams = {}// 定义一个签名对象
    let isFormData = false // 是否为文件
    let authTimeStamp = new Date().getTime().toString() // 签名时间
    let authNonce = (parseInt(Math.random() * 10000000000)).toString() // 随机字符串
    // 传入参数为空或者不是对象
    if (!params || typeof (params) !== 'object') {
      params = {}
    }

    if (params instanceof FormData) { // FormData对象则单独处理
      let iterator = params.entries()
      do {
        var iteratorItem = iterator.next()
        if (iteratorItem.value && iteratorItem.value[0] !== 'uploadFile') {
          signParams[iteratorItem.value[0]] = iteratorItem.value[1]
        }
      } while (!iteratorItem.done)
      isFormData = true
    } else {
      for (let key in params) {
        if (params.hasOwnProperty(key)) signParams[key] = params[key]
      }
    }
    signParams.auth_time_stamp = authTimeStamp
    signParams.auth_nonce = authNonce
    signParams.auth_secret_key = '564890TshRjZCaAFDGg1560912785264R1dA9uizxJK'
    signParams = sortByKey(signParams)
    // 参数完整性签名
    signParams.auth_sign = getStr(signParams)
    delete signParams['auth_secret_key']
    // 返回拼接的参数
    if (isFormData) {
      let formData = new FormData()
      for (let key in signParams) {
        if (signParams.hasOwnProperty(key)) {
          formData.append(key, signParams[key])
        }
      }
      if (params.has('uploadFile')) {
        formData.append('uploadFile', params.get('uploadFile'))
      }
      return formData
    } else {
      return signParams
    }
  }
}
