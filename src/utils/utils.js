export default {
  /**
   * 取出某个数组对象中某个key的所有值
   * @param arr array
   * @param key string
   * @returns {Array}
   */
  array_column (arr, key) {
    let column = []
    arr.forEach(item => {
      if (item.hasOwnProperty(key)) {
        column.push(item[key])
      }
    })
    return column
  },
  /**
   * 反转对象
   * @param obj
   */
  object_reverse (obj) {
    let newKey = Object.keys(obj).sort().reverse()
    let newObj = {}
    for (let i = 0; i < newKey.length; i++) {
      newObj[newKey[i]] = obj[newKey[i]]
    }
    return newObj
  },
  /**
   * 取出某个数组对象中key=value的第一个对象
   * @param array array
   * @param field string
   * @param value string
   * @returns {Object|null}
   */
  filterByField (array, field, value) {
    let filterArr = array.filter(item => item[field] === value)
    return (filterArr.length) ? Object.assign({}, filterArr[0]) : null
  },
  /**
   * 获取数组中某个key = value时的index位置
   * @param array
   * @param field
   * @param value
   * @param defaultValue
   * @returns {*}
   */
  getIndexByField (array, field, value, defaultValue) {
    let arrayIndex = (defaultValue !== undefined) ? defaultValue : null
    array.map(function (item, index) {
      if (item[field] === value) {
        arrayIndex = index
      }
    })
    return arrayIndex
  },
  /**
   * 取出数组中某个key的最小值
   * @param array
   * @param field
   * @returns {*}
   */
  getMinByArrayField (array, field) {
    let min = null
    array.map(function (item) {
      if (min === null || min > item[field]) {
        min = item[field]
      }
    })
    return min
  },
  /**
   * 查找某个值是否在数组中
   * @param array
   * @param search
   * @returns {boolean}
   */
  inArray (array, search) {
    for (let i in array) {
      if (array.hasOwnProperty(i) && array[i] === search) {
        return true
      }
    }
    return false
  },
  /**
   * 判断对象是否为空
   * @param obj
   * @returns {boolean}
   */
  isEmpty (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
}
