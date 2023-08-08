import { baseUrl } from "./path";
type callbackType = (res: Record<string, any> | string) => void;
interface httpRequestType<T = any> {
  code: number;
  data: T;
  msg: string;
}
export function httpRequest<T>(
  options: WechatMiniprogram.RequestOption,
  successCallback?: callbackType,
  failCallback?: callbackType,
  completeCallback?: callbackType
) {
  return new Promise<httpRequestType<T>>((resolve, reject) => {
    wx.showLoading({
      title: "加载中",
    });
    let env: "develop" | "trial" | "release" = __wxConfig.envVersion;
    // 区分环境拼接请求地址
    options.url = baseUrl[env] + options.url;

    //根据业务处理
    // let token = wx.getStorageSync('token') || ''
    wx.request({
      // 配置 "wx.request" 请求参数
      ...options,
      // 具体根据业务处理校验逻辑
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //   'token': `${token}`
      // },
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        console.log("network-res=>", res);
        if (res?.statusCode === 200) {
          // 返回成功信息
          successCallback?.(res.data);
          resolve(res.data as httpRequestType<T>);
        } else {
          handleError(res?.statusCode);
          failCallback?.(res);
          reject(res);
        }
      },
      fail: (error: WechatMiniprogram.Err) => {
        console.log("network-err=>", error);
        // 返回错误信息
        failCallback?.(error);
        handleError(error.errno);
        reject(error);
      },
      complete: (complete: WechatMiniprogram.GeneralCallbackResult) => {
        wx.hideLoading();
        completeCallback?.(complete);
      },
    });
  });
}

// 根据业务处理逻辑
function handleError(code: number) {
  switch (code) {
    case 404:
      console.log("客户端地址错误");
      break;
    default:
      break;
  }
}

function get<T = any>(
  url: string,
  data: string | Record<string, any>,
  successCallback?: callbackType,
  failCallback?: callbackType,
  completeCallback?: callbackType
) {
  return httpRequest<T>(
    {
      url,
      data,
      method: "GET",
    },
    successCallback,
    failCallback,
    completeCallback
  );
}

function post<T = any>(
  url: string,
  data: string | Record<string, any>,
  successCallback?: callbackType,
  failCallback?: callbackType,
  completeCallback?: callbackType
) {
  return httpRequest<T>(
    {
      url,
      data,
      method: "POST",
    },
    successCallback,
    failCallback,
    completeCallback
  );
}
export default {
  get,
  post,
};
