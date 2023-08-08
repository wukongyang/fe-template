import {
  baseUrl
} from "./config"
export function httpRequest(options = {}, successCallback = () => {}, failCallback = () => {}, completeCallback = () => {}) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })
    let env = __wxConfig.envVersion
    // 区分环境拼接请求地址
    options.url = baseUrl[env] + options.url

    //根据业务处理
    let token = wx.getStorageSync('token') || ''
    wx.request({
      // 配置 "wx.request" 请求参数
      ...options,
      // 具体根据业务处理校验逻辑
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //   'token': `${token}`
      // },
      success: (res) => {
        console.log("network-res=>", res);
        if (res.statusCode === 200) {
          // 返回成功信息
          successCallback(res.data)
          resolve(res.data)
        } else {
          handleError(res.statusCode)
          failCallback(res)
          reject(res)
        }

      },
      fail: (error) => {
        console.log("network-err=>", error);
        // 返回错误信息
        failCallback(error)
        handleError(error.errno)
        reject(error)
      },
      complete: () => {
        wx.hideLoading()
        completeCallback()
      }
    })
  })
}

// 根据业务处理逻辑
function handleError(code) {
  switch (code) {
    case 404:
      console.log('客户端地址错误');
      break;
    default:
      break;
  }
}
// 校验参数
function checkParams(param = '') {
  if (!param) {
    console.error(`request函数需要必要的参数${param}`)
    return false
  }
  return true
}

function get(url, data, successCallback, failCallback, completeCallback) {
  if (!checkParams(url)) return
  return httpRequest({
    url,
    data,
    method: 'GET'
  }, successCallback, failCallback, completeCallback)
}

function post(url, data, successCallback, failCallback, completeCallback) {
  if (!checkParams(url)) return
  return httpRequest({
    url,
    data,
    method: 'POST'
  }, successCallback, failCallback, completeCallback)
}
export default {
  get,
  post
}