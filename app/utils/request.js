/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
import { Toast } from 'antd-mobile'

export default async function request(url, options = {}) {
  const response = await fetch(url, options)
  checkStatus(response)
  const data = await response.json()
  // parseErrorMessage(data)
  return data
}

// 检查返回状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

    alert('请求出错')

    throw ''
}

// 获取数据失败报错
function parseErrorMessage(data) {
  const { status, info } = data

  if (status === false) {
    throw new Error(info)
  }
}

