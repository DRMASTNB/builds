/*
 * @Descripttion: 
 * @version: 
 * @Author: xuxingxing
 * @Date: 2023-03-06 20:48:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-28 12:23:48
 */

const DB_NAME = 'ModelsDB'
const STORE_NAME = 'model'
// indexedDB 查询数据
function get(id) {
  return new Promise((resolve, reject) => {
    const openDBRequest = indexedDB.open(DB_NAME)

    openDBRequest.onsuccess = () => {
      const db = openDBRequest.result

      const transaction = db.transaction(STORE_NAME, 'readonly')
      const objectStore = transaction.objectStore(STORE_NAME)
      const _get = objectStore.get(id)

      _get.onsuccess = (e) => {
        const res = e.target.result
        resolve(res)
      }
      _get.onerror = (e) => {
        reject(undefined)
      }
    }
  })
}

// 使用onmessage回调函数来获取从主线程传递来的数据
onmessage = function(data) {
  get(data.data.url).then(value => {
    if (!value || value.version !== data.data.version) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', data.data.url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function(e) {
        console.log(this.status)
        buffer = xhr.response
        // put(url.data, buffer)
        postMessage({ data: this.status==200?buffer:new ArrayBuffer(), url: data.data.url, version: data.data.version, isNone: true }) // 调用postMessage将数据传递给主线程
      }
      xhr.onerror = function(e) {
        console.log('xxxx')
      }
      xhr.send()
    } else {
      value.isNone = false
      postMessage(value) // 调用postMessage将数据传递给主线程
    }
  })
}
